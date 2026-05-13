export const PRICING = {
  15: {
    minutes: 15,
    price: 10,
    display: '€10,00',
  },
  20: {
    minutes: 20,
    price: 15,
    display: '€15,00',
  },
  30: {
    minutes: 30,
    price: 20,
    display: '€20,00',
  },
} as const;

export const ZADARMA_PHONE_NUMBER = process.env.NEXT_PUBLIC_ZADARMA_PHONE_NUMBER || '+1234567890';

export const SEO = {
  title: 'Lectura de Tarot Telefónica | Consulta Online',
  description: 'Consulta tarot profesional por teléfono. Sesiones de 10, 15, 20 o 30 minutos. Pago seguro con Stripe. Respuestas claras y precisas.',
  keywords: 'tarot, lectura de tarot, tarot telefónico, consulta tarot online',
  og: {
    title: 'Lectura de Tarot Telefónica',
    description: 'Consulta tarot profesional por teléfono con pago seguro.',
    image: '/og-image.jpg',
  },
};

export const ANALYTICS = {
  GA_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
};
