export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[${new Date().toISOString()}] INFO: ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error || '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[${new Date().toISOString()}] WARN: ${message}`, data || '');
  },
  debug: (message: string, data?: any) => {
    if (process.env.DEBUG) {
      console.log(`[${new Date().toISOString()}] DEBUG: ${message}`, data || '');
    }
  }
};
