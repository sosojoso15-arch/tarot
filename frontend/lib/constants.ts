export const PRICING = {
  10: {
    minutes: 10,
    price: 9.99,
    display: '$9.99',
  },
  15: {
    minutes: 15,
    price: 14.99,
    display: '$14.99',
  },
  20: {
    minutes: 20,
    price: 19.99,
    display: '$19.99',
  },
  30: {
    minutes: 30,
    price: 29.99,
    display: '$29.99',
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
