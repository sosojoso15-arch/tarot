# ARQUITECTURA - PLATAFORMA TAROT TELEFÓNICO

## 1. STACK TECNOLÓGICO FINAL

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TailwindCSS 4**
- **Framer Motion** (animaciones)
- **TypeScript**
- **React Query** (state management)

### Backend
- **Node.js 20+**
- **Express.js**
- **Supabase** (PostgreSQL + Auth + Storage)
- **Stripe API**
- **JWT Auth**
- **WebSockets** (para futuro real-time)

### Integraciones
- **Stripe Checkout / Payment Intent**
- **Zadarma API** (enrutamiento)
- **Google Analytics 4 + GA4 Event Tracking**
- **Meta Pixel**
- **SendGrid / Resend** (emails)
- **Sentry** (error tracking)

### Infraestructura
- **Vercel** (Frontend)
- **Railway / Render** (Backend)
- **Supabase Cloud** (Database)
- **GitHub Actions** (CI/CD)

---

## 2. ESTRUCTURA DE CARPETAS

```
tarot-platform/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (landing)
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── success/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── stripe/webhook/route.ts
│   │   │   └── session/route.ts
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── dashboard/page.tsx
│   │       ├── clientes/page.tsx
│   │       └── compras/page.tsx
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── PricingCards.tsx
│   │   │   └── CTA.tsx
│   │   ├── checkout/
│   │   │   ├── StripeForm.tsx
│   │   │   └── OrderSummary.tsx
│   │   └── shared/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── LoadingSpinner.tsx
│   ├── lib/
│   │   ├── stripe.ts
│   │   ├── api.ts
│   │   ├── analytics.ts
│   │   └── hooks.ts
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   │   ├── images/
│   │   └── icons/
│   ├── .env.local
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── stripe.ts
│   │   │   └── zadarma.ts
│   │   ├── routes/
│   │   │   ├── stripe.routes.ts
│   │   │   ├── payments.routes.ts
│   │   │   ├── sessions.routes.ts
│   │   │   └── admin.routes.ts
│   │   ├── controllers/
│   │   │   ├── payment.controller.ts
│   │   │   ├── session.controller.ts
│   │   │   └── admin.controller.ts
│   │   ├── services/
│   │   │   ├── stripe.service.ts
│   │   │   ├── session.service.ts
│   │   │   ├── zadarma.service.ts
│   │   │   └── email.service.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Session.ts
│   │   │   └── Payment.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validator.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── validators.ts
│   │   └── types/
│   │       └── index.ts
│   ├── .env
│   ├── .env.example
│   ├── tsconfig.json
│   ├── package.json
│   └── Dockerfile
│
├── database/
│   ├── migrations/
│   │   ├── 001_init.sql
│   │   ├── 002_add_payments.sql
│   │   └── 003_add_sessions.sql
│   └── seeds/
│       └── seed.sql
│
└── docs/
    ├── API.md
    ├── DEPLOYMENT.md
    └── ROADMAP.md
```

---

## 3. BASE DE DATOS (PostgreSQL/Supabase)

### Tablas SQL

```sql
-- Usuarios (clients)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sesiones/Compras
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  minutes INTEGER NOT NULL (10, 15, 20, 30),
  status VARCHAR(50) DEFAULT 'pending' (pending, confirmed, in_progress, completed, expired),
  price_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  session_code VARCHAR(20) UNIQUE,
  call_started_at TIMESTAMP,
  call_ended_at TIMESTAMP,
  minutes_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pagos/Transacciones
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255),
  stripe_charge_id VARCHAR(255) UNIQUE,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending' (pending, succeeded, failed, refunded),
  payment_method VARCHAR(50),
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Llamadas (Call Log)
CREATE TABLE call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  call_sid VARCHAR(255),
  zadarma_call_id VARCHAR(255),
  phone_called VARCHAR(20),
  duration_seconds INTEGER DEFAULT 0,
  call_status VARCHAR(50),
  recording_url TEXT,
  transcription TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Operadoras (Tarotistas - Fase 2)
CREATE TABLE operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'active' (active, inactive, on_break),
  rate_per_minute DECIMAL(10,2) NOT NULL,
  bio TEXT,
  image_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Event Log
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name VARCHAR(100) NOT NULL,
  user_id UUID REFERENCES users(id),
  session_id UUID REFERENCES sessions(id),
  event_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_session_id ON payments(session_id);
CREATE INDEX idx_call_logs_session_id ON call_logs(session_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
```

---

## 4. FLUJO DE PAGO (STRIPE)

### Payment Flow Diagram

```
1. Usuario selecciona minutos
   ↓
2. Frontend: POST /api/session/create
   - Crea Session en DB (status: pending)
   - Obtiene session_id
   ↓
3. Frontend: Stripe Checkout
   - Cargar checkout con session_id como metadata
   - Usuario completa pago
   ↓
4. Stripe webhook: POST /api/stripe/webhook
   - Event: payment_intent.succeeded
   - Verifica firma webhook
   - Actualiza session (status: confirmed)
   - Guarda payment record
   - Envía email con instrucciones
   ↓
5. Frontend: Página de Success
   - Muestra número de teléfono
   - Muestra código de sesión
   - Instrucciones claras
   ↓
6. Usuario llama
   - Zadarma recibe llamada
   - Enruta a Zoiper (tarotista)
   - Se crea call_log record
```

---

## 5. MODELOS DE DATOS (TypeScript)

```typescript
// types/index.ts

export type SessionStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'expired';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';

export interface User {
  id: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  stripe_payment_intent_id: string;
  minutes: 10 | 15 | 20 | 30;
  status: SessionStatus;
  price_cents: number;
  session_code: string;
  call_started_at?: string;
  call_ended_at?: string;
  minutes_used: number;
  created_at: string;
  expires_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  session_id: string;
  stripe_customer_id: string;
  stripe_charge_id: string;
  amount_cents: number;
  status: PaymentStatus;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

export interface CallLog {
  id: string;
  session_id: string;
  user_id: string;
  duration_seconds: number;
  call_status: string;
  recording_url?: string;
  transcription?: string;
  created_at: string;
}

export interface CreateSessionRequest {
  minutes: 10 | 15 | 20 | 30;
  email: string;
  phone: string;
}

export interface StripeWebhookPayload {
  id: string;
  object: string;
  type: string;
  data: {
    object: any;
  };
}
```

---

## 6. PRICING (Ejemplo)

```typescript
export const PRICING = {
  10: { minutes: 10, price_cents: 999, display: '$9.99' },
  15: { minutes: 15, price_cents: 1499, display: '$14.99' },
  20: { minutes: 20, price_cents: 1999, display: '$19.99' },
  30: { minutes: 30, price_cents: 2999, display: '$29.99' }
};
```

---

## 7. VARIABLES DE ENTORNO

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-...
NEXT_PUBLIC_META_PIXEL_ID=...
```

### Backend (.env)
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ZADARMA_API_KEY=...
ZADARMA_API_SECRET=...
ZADARMA_PHONE_NUMBER=+1234567890
SENDGRID_API_KEY=...
SENTRY_DSN=...
CORS_ORIGIN=http://localhost:3000
```

---

## 8. ENDPOINTS API

### Sessions
```
POST   /api/sessions/create      → Crear sesión
GET    /api/sessions/:id         → Obtener sesión
GET    /api/sessions             → Listar (con auth)
PATCH  /api/sessions/:id/status  → Actualizar estado

POST   /api/stripe/webhook       → Stripe webhook
POST   /api/stripe/create-checkout → Crear checkout
```

### Admin
```
GET    /api/admin/dashboard      → Estadísticas
GET    /api/admin/sessions       → Todas las sesiones
GET    /api/admin/customers      → Clientes
GET    /api/admin/analytics      → Métricas
```

### Auth
```
POST   /api/auth/login           → Login admin
POST   /api/auth/logout          → Logout
GET    /api/auth/verify          → Verificar token
```

---

## 9. SEGURIDAD

- ✅ JWT para autenticación admin
- ✅ Stripe webhook signature verification
- ✅ HTTPS only
- ✅ Rate limiting en endpoints críticos
- ✅ CORS configurado
- ✅ Validación de input en todos los endpoints
- ✅ Sanitización de datos
- ✅ Environment variables (.env nunca en git)
- ✅ Supabase RLS policies
- ✅ API keys cifradas en DB (si es necesario)

---

## 10. FASE 1 MVP CHECKLIST

- [ ] Setup Next.js + Express
- [ ] Base de datos Supabase
- [ ] Landing page responsive
- [ ] Pricing cards animadas
- [ ] Integración Stripe (Checkout)
- [ ] Webhook Stripe
- [ ] Página de success
- [ ] Admin dashboard básico
- [ ] Email confirmación
- [ ] Google Analytics
- [ ] Meta Pixel
- [ ] SEO (sitemap, robots.txt, meta)
- [ ] Testing E2E
- [ ] Deploy Vercel + Backend

---

## 11. FASE 2 ROADMAP

```
Mes 1: Control de minutos en tiempo real
- WebSockets para actualizar minutos
- Corte automático de llamada
- Transcripción Whisper API

Mes 2: CRM
- Historial de clientes
- Notas de sesiones
- Seguimiento

Mes 3: Dashboard operadoras
- Zoiper integration
- Control de disponibilidad
- Estadísticas personales

Mes 4: Suscripciones
- Planes recurrentes
- Cancelación automática
- Invoices

Mes 5: Automatizaciones
- Bitrix24 sync
- Emails automáticos
- Alertas
```

---

## 12. RECOMENDACIONES DE ESCALABILIDAD

1. **Database**: Supabase handle automaticamente backups y scaling
2. **Cache**: Redis para sesiones activas (futuro)
3. **Queue**: Bull/BullMQ para emails y webhooks
4. **CDN**: Vercel CDN para assets estáticos
5. **Monitoring**: Sentry + LogRocket
6. **Analytics**: PostHog (más detallado que GA4)
7. **Load Testing**: k6 para testing bajo carga

---

## 13. DESPLIEGUE

### Frontend (Vercel)
```bash
git push → Vercel auto-deploy
```

### Backend (Railway/Render)
```bash
- GitHub integration
- Auto-deploy en push
- Environment variables en panel
```

### Database (Supabase)
```bash
- Backups automáticos
- Replicación
- 99.99% SLA
```

