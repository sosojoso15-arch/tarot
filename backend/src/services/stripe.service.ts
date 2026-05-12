import { stripe, STRIPE_WEBHOOK_SECRET, getPricing } from '../config/stripe';
import { supabase } from '../config/database';
import { ApiError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { emailService } from './email.service';
import { callService } from './call.service';
import crypto from 'crypto';

export const stripeService = {
  async createCheckoutSession(sessionId: string) {
    try {
      // Get session details
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionError || !session) {
        throw new ApiError(404, 'Session not found');
      }

      // Get user details
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user_id)
        .single();

      if (userError || !user) {
        throw new ApiError(404, 'User not found');
      }

      const pricing = getPricing(session.minutes);

      // Create Stripe checkout session
      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Tarot Reading - ${session.minutes} minutes`,
                description: `Professional tarot reading consultation`
              },
              unit_amount: pricing.amount_cents
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success?session_id=${sessionId}&checkout_session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?session_id=${sessionId}`,
        customer_email: user.email,
        metadata: {
          session_id: sessionId,
          user_id: session.user_id,
          minutes: session.minutes
        }
      });

      // Save stripe session ID
      await supabase
        .from('sessions')
        .update({ stripe_payment_intent_id: checkoutSession.payment_intent || checkoutSession.id })
        .eq('id', sessionId);

      return checkoutSession.url;
    } catch (error) {
      logger.error('Create checkout session error:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Failed to create checkout session');
    }
  },

  async handleWebhook(rawBody: any, signature: string) {
    try {
      if (!STRIPE_WEBHOOK_SECRET) {
        throw new ApiError(500, 'Webhook secret not configured');
      }

      // Verify webhook signature
      let event;
      try {
        const payload = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);
        const sig = signature;
        event = stripe.webhooks.constructEvent(payload, sig, STRIPE_WEBHOOK_SECRET);
      } catch (error) {
        logger.error('Webhook signature verification failed:', error);
        throw new ApiError(400, 'Invalid signature');
      }

      logger.info(`Processing webhook event: ${event.type}`);

      // Handle different event types
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSucceeded(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(event.data.object);
          break;
        case 'charge.refunded':
          await this.handleRefund(event.data.object);
          break;
      }

      return { success: true };
    } catch (error) {
      logger.error('Webhook handler error:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Webhook processing failed');
    }
  },

  async handlePaymentSucceeded(paymentIntent: any) {
    try {
      const metadata = paymentIntent.metadata;
      const sessionId = metadata?.session_id;

      if (!sessionId) {
        logger.warn('No session_id in webhook metadata');
        return;
      }

      // Update session status to confirmed
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .update({ status: 'confirmed', updated_at: new Date().toISOString() })
        .eq('id', sessionId)
        .select()
        .single();

      if (sessionError) {
        throw sessionError;
      }

      // Create payment record
      await supabase.from('payments').insert({
        user_id: metadata.user_id,
        session_id: sessionId,
        stripe_customer_id: paymentIntent.customer,
        stripe_charge_id: paymentIntent.charges?.data[0]?.id,
        amount_cents: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'succeeded',
        payment_method: paymentIntent.charges?.data[0]?.payment_method_details?.type
      });

      // Get user and session details
      const { data: user } = await supabase
        .from('users')
        .select('email, phone')
        .eq('id', metadata.user_id)
        .single();

      // Initiate call if tarotista assigned
      if (session?.tarotista_id && user?.phone) {
        try {
          await callService.initiateCall(sessionId, user.phone, session.tarotista_id);
          logger.info(`Call initiated for session: ${sessionId}`);
        } catch (callError) {
          logger.warn('Failed to initiate call:', callError);
          // Don't throw - payment is successful even if call fails
        }
      }

      if (user?.email) {
        // Send confirmation email
        await emailService.sendConfirmationEmail(user.email, session);
      }

      logger.info(`Payment succeeded for session: ${sessionId}`);
    } catch (error) {
      logger.error('Handle payment succeeded error:', error);
      throw error;
    }
  },

  async handlePaymentFailed(paymentIntent: any) {
    try {
      const sessionId = paymentIntent.metadata?.session_id;

      if (!sessionId) return;

      // Update session status to failed
      await supabase
        .from('sessions')
        .update({ status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('id', sessionId);

      // Create failed payment record
      await supabase.from('payments').insert({
        user_id: paymentIntent.metadata.user_id,
        session_id: sessionId,
        amount_cents: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'failed',
        error_message: paymentIntent.last_payment_error?.message
      });

      logger.info(`Payment failed for session: ${sessionId}`);
    } catch (error) {
      logger.error('Handle payment failed error:', error);
      throw error;
    }
  },

  async handleRefund(charge: any) {
    try {
      // Find related payment and update
      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('stripe_charge_id', charge.id)
        .single();

      if (payment) {
        await supabase
          .from('payments')
          .update({ status: 'refunded', updated_at: new Date().toISOString() })
          .eq('id', payment.id);
      }

      logger.info(`Refund processed for charge: ${charge.id}`);
    } catch (error) {
      logger.error('Handle refund error:', error);
      throw error;
    }
  },

  async getPaymentStatus(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('stripe_charge_id', paymentIntentId)
        .single();

      return {
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        ...payment
      };
    } catch (error) {
      logger.error('Get payment status error:', error);
      throw new ApiError(500, 'Failed to get payment status');
    }
  }
};
