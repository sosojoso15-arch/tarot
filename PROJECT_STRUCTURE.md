# 📁 Project Structure

## Complete Directory Tree

```
tarot/
│
├── 📄 README.md                    # Documentación general
├── 📄 ARQUITECTURA.md              # Documentación técnica completa
├── 📄 ROADMAP.md                   # Plan de desarrollo
├── 📄 QUICKSTART.md                # Guía rápida
├── 📄 PROJECT_STRUCTURE.md         # Este archivo
├── 📄 .gitignore                   # Git ignore rules
├── 📄 package.json                 # Root workspace
│
├── 📂 frontend/                    # Next.js Frontend
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 next.config.ts
│   ├── 📄 tailwind.config.ts
│   ├── 📄 postcss.config.mjs
│   ├── 📄 .env.local.example
│   │
│   ├── 📂 app/                     # App Router (Next.js 15)
│   │   ├── 📄 layout.tsx           # Root layout
│   │   ├── 📄 page.tsx             # Landing page (/)
│   │   ├── 📄 globals.css          # Global styles
│   │   │
│   │   ├── 📂 checkout/
│   │   │   └── 📄 page.tsx         # Checkout page
│   │   │
│   │   ├── 📂 success/
│   │   │   └── 📄 page.tsx         # Success/confirmation page
│   │   │
│   │   └── 📂 admin/               # Admin dashboard (Fase 2)
│   │       ├── 📄 layout.tsx
│   │       ├── 📄 page.tsx         # Dashboard
│   │       ├── 📂 clientes/
│   │       └── 📂 compras/
│   │
│   ├── 📂 components/
│   │   ├── 📂 landing/
│   │   │   ├── 📄 Hero.tsx         # Hero section
│   │   │   ├── 📄 PricingCards.tsx # Pricing component
│   │   │   └── 📄 CTA.tsx          # Call-to-action
│   │   │
│   │   ├── 📂 checkout/
│   │   │   ├── 📄 StripeForm.tsx   # Stripe form
│   │   │   └── 📄 OrderSummary.tsx # Order summary
│   │   │
│   │   └── 📂 shared/
│   │       ├── 📄 Header.tsx       # Navigation
│   │       ├── 📄 Footer.tsx
│   │       └── 📄 LoadingSpinner.tsx
│   │
│   ├── 📂 lib/
│   │   ├── 📄 api.ts               # API client (axios)
│   │   ├── 📄 hooks.ts             # Custom React hooks
│   │   ├── 📄 constants.ts         # Constants & config
│   │   └── 📄 analytics.ts         # GA4 & Meta Pixel
│   │
│   ├── 📂 types/
│   │   └── 📄 index.ts             # TypeScript types
│   │
│   └── 📂 public/
│       ├── 📂 images/
│       └── 📂 icons/
│
├── 📂 backend/                     # Express.js Backend
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 .env.example
│   │
│   ├── 📂 src/
│   │   ├── 📄 server.ts            # Express app & startup
│   │   │
│   │   ├── 📂 config/
│   │   │   ├── 📄 database.ts      # Supabase client
│   │   │   ├── 📄 stripe.ts        # Stripe config
│   │   │   └── 📄 zadarma.ts       # Zadarma config
│   │   │
│   │   ├── 📂 routes/
│   │   │   ├── 📄 stripe.routes.ts    # Stripe endpoints
│   │   │   ├── 📄 sessions.routes.ts  # Session endpoints
│   │   │   ├── 📄 admin.routes.ts     # Admin endpoints
│   │   │   └── 📄 auth.routes.ts      # Auth endpoints
│   │   │
│   │   ├── 📂 controllers/
│   │   │   ├── 📄 payment.controller.ts
│   │   │   ├── 📄 session.controller.ts
│   │   │   └── 📄 admin.controller.ts
│   │   │
│   │   ├── 📂 services/
│   │   │   ├── 📄 stripe.service.ts    # Stripe logic
│   │   │   ├── 📄 session.service.ts   # Session logic
│   │   │   ├── 📄 email.service.ts     # Email logic
│   │   │   ├── 📄 admin.service.ts     # Admin logic
│   │   │   ├── 📄 zadarma.service.ts   # Zadarma integration (Fase 2)
│   │   │   └── 📄 auth.service.ts      # Auth logic
│   │   │
│   │   ├── 📂 middleware/
│   │   │   ├── 📄 errorHandler.ts      # Error handling
│   │   │   ├── 📄 auth.ts             # JWT auth
│   │   │   └── 📄 validator.ts        # Input validation
│   │   │
│   │   ├── 📂 utils/
│   │   │   ├── 📄 logger.ts
│   │   │   └── 📄 validators.ts       # Zod schemas
│   │   │
│   │   ├── 📂 types/
│   │   │   └── 📄 index.ts            # TypeScript types
│   │   │
│   │   └── 📂 database/
│   │       ├── 📄 migrations.ts        # SQL migrations
│   │       └── 📄 seed.ts             # Database seeding
│   │
│   └── 📂 dist/                    # Compiled JS (build output)
│
└── 📂 database/                    # Database files
    ├── 📂 migrations/
    │   ├── 📄 001_init.sql          # Initial schema
    │   ├── 📄 002_add_payments.sql
    │   └── 📄 003_add_sessions.sql
    │
    └── 📂 seeds/
        └── 📄 seed.sql              # Sample data
```

## 🔑 Key Files at a Glance

### Frontend Critical
- `frontend/app/page.tsx` - Landing page
- `frontend/app/checkout/page.tsx` - Checkout flow
- `frontend/components/landing/PricingCards.tsx` - Pricing UI
- `frontend/lib/api.ts` - API client
- `frontend/lib/hooks.ts` - React Query hooks

### Backend Critical
- `backend/src/server.ts` - App startup
- `backend/src/routes/stripe.routes.ts` - Payment endpoints
- `backend/src/services/stripe.service.ts` - Stripe logic
- `backend/src/config/database.ts` - Supabase setup
- `backend/src/database/migrations.ts` - DB schema

### Configuration
- Root `package.json` - Workspaces config
- `frontend/.env.local` - Frontend env vars
- `backend/.env` - Backend env vars
- `tailwind.config.ts` - Styling config
- `next.config.ts` - Next.js config

---

## 📊 File Count Summary

```
Frontend:
  - React components: 6+
  - Pages: 4+
  - Services/Hooks: 3
  - Total files: 30+

Backend:
  - Routes: 4
  - Services: 6
  - Middleware: 3
  - Config: 3
  - Total files: 25+

Total Project Files: 60+
Lines of Code: ~3000+
```

---

## 🚀 Development Flow

```
1. Edit frontend/app/page.tsx
   ↓
2. Changes reflected at localhost:3000 (hot reload)
   ↓
3. API calls to backend/src/routes/
   ↓
4. Services handle business logic
   ↓
5. Database changes via Supabase
   ↓
6. Response sent back to frontend
```

---

## 📝 How to Navigate

### Want to change the landing page?
→ `frontend/app/page.tsx` and `frontend/components/landing/`

### Want to add a new API endpoint?
→ Create route in `backend/src/routes/`, add service in `backend/src/services/`

### Want to modify database?
→ Edit `backend/src/database/migrations.ts`

### Want to change styling?
→ Modify `frontend/app/globals.css` or `tailwind.config.ts`

### Want to add email functionality?
→ Expand `backend/src/services/email.service.ts`

### Want to integrate Zadarma?
→ Create `backend/src/services/zadarma.service.ts`

---

## 🔄 Building & Deployment

```
Frontend (Vercel):
frontend/ → npm build → .next/ → Vercel auto-deploy

Backend (Railway):
backend/ → npm build → dist/ → Railway auto-deploy

Database (Supabase):
migrations.ts → SQL → Supabase Cloud
```

---

## 📚 Documentation Links

- Architecture: `ARQUITECTURA.md`
- Development Roadmap: `ROADMAP.md`
- Quick Start: `QUICKSTART.md`
- This file: `PROJECT_STRUCTURE.md`

---

¡Todo organizado y listo para empezar! 🚀
