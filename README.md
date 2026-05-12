# 🔮 Plataforma de Tarot Telefónico

Plataforma SaaS moderna para consultas de tarot por teléfono con Stripe integrado, diseñada para máxima conversión y escalabilidad.

## 🚀 Características MVP

- ✅ Landing page optimizada para móvil
- ✅ Selección de planes (10, 15, 20, 30 minutos)
- ✅ Checkout Stripe funcional
- ✅ Página de confirmación con instrucciones
- ✅ Dashboard admin básico
- ✅ Tracking con Google Analytics y Meta Pixel
- ✅ SEO preparado
- ✅ Email de confirmación

## 📁 Estructura del Proyecto

```
tarot/
├── frontend/           # Next.js 15 app
├── backend/            # Express.js API
├── database/           # SQL migrations
├── ARQUITECTURA.md     # Documentación técnica completa
├── ROADMAP.md          # Plan de desarrollo
└── README.md           # Este archivo
```

## 🛠 Stack Tecnológico

### Frontend
- **Next.js 15** con App Router
- **React 19**
- **TailwindCSS 4**
- **Framer Motion** para animaciones
- **React Query** para estado
- **Stripe JS** para pagos

### Backend
- **Node.js 20+**
- **Express.js**
- **Supabase** (PostgreSQL)
- **Stripe API**
- **JWT Auth**
- **Resend** para emails

### Infrastructure
- **Vercel** (Frontend)
- **Railway/Render** (Backend)
- **Supabase Cloud** (Database)

## 📋 Instalación

### Requisitos
- Node.js 20+
- npm o yarn
- Variables de entorno configuradas

### Setup Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### Setup Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

El backend correrá en `http://localhost:3001`
El frontend correrá en `http://localhost:3000`

## 🔑 Variables de Entorno

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-...
NEXT_PUBLIC_META_PIXEL_ID=...
NEXT_PUBLIC_ZADARMA_PHONE_NUMBER=+1234567890
```

### Backend (.env)
```
NODE_ENV=development
PORT=3001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=your-secret-key
ADMIN_EMAIL=admin@tarot.com
ADMIN_PASSWORD_HASH=$2b$10$...
ZADARMA_API_KEY=...
ZADARMA_API_SECRET=...
RESEND_API_KEY=re_...
FRONTEND_URL=http://localhost:3000
```

## 📊 Flujo de Pago

1. Usuario selecciona duración
2. Completa email y teléfono
3. Se abre Stripe Checkout
4. Pago se procesa
5. Webhook de Stripe confirma
6. Email de confirmación enviado
7. Usuario recibe instrucciones de llamada

## 🏠 Landing Page

La página de inicio incluye:
- Hero section atractivo
- Cards de pricing interactivas
- Sección de características
- CTA prominente
- Footer completo
- Responsive mobile-first

## 👨‍💼 Admin Dashboard

Acceso en `/admin`:
- Estadísticas (ingresos, sesiones, conversión)
- Listado de clientes
- Historial de compras
- Datos de analytics

Login con credenciales admin.

## 🔐 Seguridad

- ✅ Stripe webhook signature verification
- ✅ JWT token auth para admin
- ✅ HTTPS only
- ✅ CORS configurado
- ✅ Validación en todos los endpoints
- ✅ Variables de entorno protegidas
- ✅ Supabase RLS policies

## 🚀 Deployment

### Frontend (Vercel)
```bash
git push → Auto-deploy
```

### Backend (Railway)
```bash
Conectar repo a Railway
Las variables env se configuran en dashboard
Auto-deploy en push
```

### Database (Supabase)
- Backups automáticos
- Replicación incluida
- 99.99% SLA

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Optimizado para iPhone, Android
- ✅ Desktop completo
- ✅ Tablet support
- ✅ Performance optimized

## 📈 Analytics

- Google Analytics 4 integrado
- Meta Pixel para conversiones
- Event tracking automático
- Funnel tracking

## 🔄 Fase 2 - Roadmap

- Control automático de minutos
- Transcripción Whisper API
- CRM completo
- Dashboard de operadoras
- Suscripciones recurrentes
- Bitrix24 integration
- Mobile app

Ver `ROADMAP.md` para detalles completos.

## 🤝 Contribuir

1. Crear rama feature
2. Hacer cambios
3. Push y crear PR
4. Deploy a Vercel/Railway

## 📞 Soporte

Para soporte técnico:
- Email: support@tarotplataforma.com
- Documentación: `ARQUITECTURA.md`

## 📄 Licencia

MIT

---

**Construido con ❤️ para conversión máxima**
