import { logger } from '../utils/logger';

export const ZADARMA_CONFIG = {
  apiKey: process.env.ZADARMA_API_KEY || '',
  apiSecret: process.env.ZADARMA_API_SECRET || '',
  phoneNumber: process.env.ZADARMA_PHONE_NUMBER || '',
  apiUrl: 'https://api.zadarma.com/v1'
};

if (!ZADARMA_CONFIG.apiKey || !ZADARMA_CONFIG.apiSecret || !ZADARMA_CONFIG.phoneNumber) {
  logger.warn('Zadarma configuration incomplete - some features may not work');
}

export function getZadarmaAuthHeaders() {
  // Zadarma uses OAuth-like headers
  // Implementation depends on Zadarma's specific auth mechanism
  return {
    'X-Api-Key': ZADARMA_CONFIG.apiKey,
    'X-Api-Secret': ZADARMA_CONFIG.apiSecret
  };
}
