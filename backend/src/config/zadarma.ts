import crypto from 'crypto';
import { logger } from '../utils/logger';

export const ZADARMA_CONFIG = {
  apiKey:      process.env.ZADARMA_API_KEY    || '',
  apiSecret:   process.env.ZADARMA_API_SECRET || '',
  phoneNumber: process.env.ZADARMA_PHONE_NUMBER || '+34919933673',
  apiUrl:      'https://api.zadarma.com/v1',
  pbxId:       '564251',
};

// Extension per tarotista
export const TAROTISTA_EXTENSIONS: Record<string, string> = {
  'paqui':    '100',
  'gloria':   '101',
  'marian':   '102',
  'paulina':  '103',
  'mercedes': '104',
  'marcos':   '105',
  'raquel':   '106',
  'verónica': '107',
  'veronica': '107',
  'yeyo':     '108',
  'duende':   '109',
};

if (!ZADARMA_CONFIG.apiKey || !ZADARMA_CONFIG.apiSecret) {
  logger.warn('Zadarma configuration incomplete - some features may not work');
}

// Zadarma HMAC-SHA1 auth
export function getZadarmaAuth(params: Record<string, string>): string {
  const sortedStr = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
  const md5 = crypto.createHash('md5').update(sortedStr).digest('hex');
  const sign = crypto.createHmac('sha1', ZADARMA_CONFIG.apiSecret)
    .update(sortedStr + md5)
    .digest('base64');
  return `Zadarma ${ZADARMA_CONFIG.apiKey}:${sign}`;
}

// Keep old export for compatibility
export function getZadarmaAuthHeaders() {
  return { 'X-Api-Key': ZADARMA_CONFIG.apiKey, 'X-Api-Secret': ZADARMA_CONFIG.apiSecret };
}
