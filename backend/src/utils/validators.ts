import { z } from 'zod';

export const createSessionSchema = z.object({
  minutes: z.number().int().refine(
    val => [10, 15, 20, 30].includes(val),
    'Minutes must be 10, 15, 20, or 30'
  ),
  email: z.string().email('Invalid email'),
  phone: z.string().optional()
});

export const createCheckoutSchema = z.object({
  session_id: z.string().uuid('Invalid session ID')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short')
});

export const webhookEventSchema = z.object({
  id: z.string(),
  object: z.string(),
  type: z.string(),
  data: z.object({
    object: z.any()
  })
});

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  const re = /^\+?[\d\s\-()]{10,}$/;
  return re.test(phone);
}

export function generateSessionCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
