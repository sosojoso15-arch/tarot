# 🚀 Quick Start Guide

## 5 Minutos para Empezar

### 1. Instalar Dependencias

```bash
# Instalar todo (frontend + backend)
npm install

# O por separado
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configurar Variables de Entorno

```bash
# Frontend
cp frontend/.env.local.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

**Edita los archivos .env con tus claves reales** (Stripe, Supabase, etc.)

### 3. Base de Datos

Desde el dashboard de Supabase:

1. Copia el SQL de `backend/src/database/migrations.ts`
2. Ejecuta en SQL Editor de Supabase
3. O usa tu herramienta SQL favorita

### 4. Ejecutar en Desarrollo

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### 5. Test Rápido

1. Abre http://localhost:3000
2. Haz clic en "Comenzar Lectura"
3. Selecciona 15 minutos
4. Completa email y teléfono
5. Prueba el checkout (usa tarjeta test: 4242 4242 4242 4242)

---

## 🔑 Claves de Prueba

### Stripe Test Mode
- Tarjeta válida: `4242 4242 4242 4242`
- Tarjeta rechazada: `4000 0000 0000 0002`
- Cualquier fecha futura y CVC de 3 dígitos

### Admin Login (MVP)
```
Email: admin@tarot.com
Password: (se configura en ADMIN_PASSWORD_HASH)
```

Para generar hash:
```bash
# Node.js
const bcrypt = require('bcrypt');
bcrypt.hash('tu-password-aqui', 10).then(hash => console.log(hash));
```

---

## 📂 Estructura Importante

```
tarot/
├── frontend/app/page.tsx          ← Landing page
├── frontend/app/checkout/page.tsx  ← Checkout
├── frontend/app/success/page.tsx   ← Confirmación
├── backend/src/server.ts           ← API principal
├── backend/src/routes/             ← Endpoints
├── backend/src/services/           ← Lógica
└── ARQUITECTURA.md                 ← Docs técnicas
```

---

## 🐛 Troubleshooting

### Error: CORS
- Verifica `CORS_ORIGIN` en backend `.env`
- Debe coincidir con URL del frontend

### Error: Stripe
- Verifica `STRIPE_SECRET_KEY` y `STRIPE_WEBHOOK_SECRET`
- Deben ser claves de test (comienzan con `sk_test_`)

### Error: Supabase
- Verifica `SUPABASE_URL` y `SUPABASE_SERVICE_KEY`
- Las tablas deben existir (corre las migrations)

### Puerto en uso
```bash
# Cambiar puerto en backend
PORT=3002 npm run dev
```

---

## ✅ Checklist Pre-Producción

- [ ] Claves de API reales configuradas
- [ ] Dominio custom configurado en Vercel
- [ ] SSL/HTTPS habilitado
- [ ] Stripe webhook configurado correctamente
- [ ] Email de confirmación en Resend
- [ ] Google Analytics configurado
- [ ] Meta Pixel configurado
- [ ] Base de datos en Supabase Cloud
- [ ] Backups configurados
- [ ] Logs y monitoreo (Sentry)
- [ ] Robots.txt y sitemap
- [ ] Privacy policy y terms configurados

---

## 📚 Recursos

- `ARQUITECTURA.md` - Diseño técnico completo
- `ROADMAP.md` - Plan de desarrollo
- `README.md` - Información general

---

## 🎉 ¡Listo!

Ya tienes la plataforma base ejecutándose. Ahora puedes:

1. Personalizar el diseño
2. Integrar Zadarma
3. Configurar CRM
4. Lanzar a producción

¡Éxito con tu plataforma de tarot! 🔮
