import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { stripeService } from '../services/stripe.service';

const router = Router();

// Create checkout session
router.post(
  '/create-checkout',
  asyncHandler(async (req: Request, res: Response) => {
    const { session_id } = req.body;
    const checkoutUrl = await stripeService.createCheckoutSession(session_id);
    res.json({ success: true, data: { checkoutUrl } });
  })
);

// Webhook for Stripe events
router.post(
  '/webhook',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await stripeService.handleWebhook(
      req.body,
      req.headers['stripe-signature'] as string
    );
    res.json(result);
  })
);

// Get payment status
router.get(
  '/payment/:paymentIntentId',
  asyncHandler(async (req: Request, res: Response) => {
    const { paymentIntentId } = req.params;
    const payment = await stripeService.getPaymentStatus(paymentIntentId);
    res.json({ success: true, payment });
  })
);

export default router;
