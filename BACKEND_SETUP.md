# Setup del Backend

## Requisitos Previos

1. Node.js v18+ instalado
2. Una cuenta de Supabase
3. Una cuenta de Stripe (para pagos)
4. Una cuenta de Resend (para emails)

## Pasos de Configuración

### 1. Instalar Dependencias

```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Luego edita `.env` con tus valores reales:

```
# Supabase
SUPABASE_URL=tu-url-supabase
SUPABASE_SERVICE_KEY=tu-service-key

# Stripe
STRIPE_SECRET_KEY=sk_test_tu_key
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret

# JWT
JWT_SECRET=tu-secret-super-largo-y-random

# Email
RESEND_API_KEY=re_tu_key
EMAIL_FROM=noreply@tudominio.com

# Admin
ADMIN_EMAIL=tu-email@ejemplo.com
ADMIN_PASSWORD_HASH=generar-con-bcrypt
```

### 3. Configurar Base de Datos (Supabase)

El backend espera estas tablas en Supabase:

#### Tabla `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla `sessions`
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  minutes INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '24 hours'),
  scheduled_at TIMESTAMP,
  completed_at TIMESTAMP
);
```

#### Tabla `payments`
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id),
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

#### Tabla `call_logs`
```sql
CREATE TABLE call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id),
  call_duration_seconds INTEGER,
  recorded BOOLEAN DEFAULT FALSE,
  recording_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Obtener Credenciales

#### Supabase
1. Ve a https://supabase.com
2. Crea un nuevo proyecto
3. Ve a Settings > API
4. Copia `URL` y `Service Role Secret Key`

#### Stripe
1. Ve a https://dashboard.stripe.com
2. Ve a Developers > API keys
3. Copia `Secret Key` (comienza con `sk_test_`)
4. Ve a Webhooks y crea uno para `http://localhost:3001/api/stripe/webhook`
5. Copia el `Webhook Signing Secret`

#### Resend
1. Ve a https://resend.com
2. Ve a API Keys
3. Copia tu API key

### 5. Ejecutar el Backend

```bash
npm run dev
```

El servidor debería estar en `http://localhost:3001`

Verifica la salud:
```bash
curl http://localhost:3001/health
```

## Endpoints Disponibles

### Stripe
- `POST /api/stripe/create-checkout` - Crear sesión de pago
- `POST /api/stripe/webhook` - Webhook de Stripe
- `GET /api/stripe/payment/:paymentIntentId` - Estado de pago

### Sessions
- `POST /api/sessions` - Crear sesión
- `GET /api/sessions/:id` - Obtener sesión
- `PATCH /api/sessions/:id` - Actualizar sesión

### Admin
- `POST /api/auth/login` - Login admin
- `GET /api/admin/stats` - Estadísticas

## Troubleshooting

### Error: "Missing SUPABASE_URL"
→ Verifica que `.env` esté en `backend/` y tenga las variables correctas

### Error: "Database connection failed"
→ Verifica que SUPABASE_URL y SUPABASE_SERVICE_KEY sean correctos

### Error: "Stripe API key not found"
→ Asegúrate que STRIPE_SECRET_KEY esté en `.env`

## Modo Desarrollo vs Producción

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm run build
npm start
```

## Próximos Pasos

1. Integra el frontend con el backend (usa `NEXT_PUBLIC_API_URL=http://localhost:3001`)
2. Configura webhooks de Stripe
3. Prueba el flujo de pago completo
4. Configura emails con Resend
