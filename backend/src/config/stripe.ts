import Stripe from 'stripe';
import { logger } from '../utils/logger';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

if (!stripeSecretKey) {
  logger.error('Missing STRIPE_SECRET_KEY');
  process.exit(1);
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-08-16'
});

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

export const PRICING = {
  15: { minutes: 15, amount_cents: 1000, currency: 'EUR', display: '€10' },
  20: { minutes: 20, amount_cents: 1500, currency: 'EUR', display: '€15' },
  30: { minutes: 30, amount_cents: 2000, currency: 'EUR', display: '€20' }
} as const;

export function getPricing(minutes: number) {
  const pricing = PRICING[minutes as keyof typeof PRICING];
  if (!pricing) {
    throw new Error(`Invalid duration: ${minutes}`);
  }
  return pricing;
}
