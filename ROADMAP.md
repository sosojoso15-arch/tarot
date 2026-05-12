# ROADMAP - PLATAFORMA TAROT TELEFÓNICO

## FASE 0: SETUP INICIAL (Semana 1)

### Backend
- [ ] Inicializar proyecto Node.js
- [ ] Setup Express.js
- [ ] Configurar TypeScript
- [ ] Setup Supabase
- [ ] Migrations SQL iniciales
- [ ] Variables de entorno
- [ ] Testing setup

### Frontend
- [ ] Crear proyecto Next.js 15
- [ ] Setup TailwindCSS
- [ ] Setup Framer Motion
- [ ] Estructura de carpetas
- [ ] Variables de entorno
- [ ] Setup React Query

---

## FASE 1: MVP (2-3 semanas)

### Landing Page
- [ ] Diseño responsive mobile-first
- [ ] Hero section con CTA
- [ ] Feature highlights
- [ ] Testimonios/Social proof
- [ ] Footer
- [ ] Performance optimization

### Pricing & Checkout
- [ ] Cards de pricing animadas
- [ ] Selección de duración
- [ ] Integración Stripe Checkout
- [ ] Form de email/teléfono
- [ ] Error handling

### Backend Core
- [ ] Sessions API
- [ ] Payments API
- [ ] Stripe webhook handler
- [ ] JWT auth para admin
- [ ] Email service (confirmación)
- [ ] Validaciones

### Admin Panel (Básico)
- [ ] Login admin
- [ ] Dashboard con stats (Total vendido, sesiones activas, etc)
- [ ] Listado de clientes
- [ ] Listado de compras/sesiones
- [ ] Vista de detalles de compra

### Success Page
- [ ] Mostrar número de teléfono
- [ ] Mostrar código de sesión
- [ ] Instrucciones claras
- [ ] Email enviado confirmando

### SEO & Analytics
- [ ] Meta tags dinámicas
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Google Analytics 4
- [ ] Meta Pixel
- [ ] Event tracking

### Deployment
- [ ] Frontend a Vercel
- [ ] Backend a Railway/Render
- [ ] Database Supabase Cloud
- [ ] CI/CD con GitHub Actions
- [ ] SSL/HTTPS

---

## FASE 2: CONTROL DE LLAMADAS (Semana 4-5)

### Zadarma Integration
- [ ] Configurar Zadarma API
- [ ] Webhook para llamadas entrantes
- [ ] Enrutamiento automático
- [ ] Call logging

### Call Management
- [ ] WebSockets para minutos en tiempo real
- [ ] Contador de minutos durante llamada
- [ ] Corte automático cuando se acabe tiempo
- [ ] Recording de llamadas (opcional)
- [ ] Call history

### Notifications
- [ ] SMS cuando se inicia sesión
- [ ] Push notifications (futuro)
- [ ] Email de resumen

---

## FASE 3: CRM (Semana 6-7)

### Cliente Profile
- [ ] Historial de compras
- [ ] Historial de sesiones
- [ ] Notas internas (operadora)
- [ ] Preferencias
- [ ] Números de teléfono guardados

### Operadora Dashboard
- [ ] Ver clientes activos
- [ ] Notas de sesiones anteriores
- [ ] Disponibilidad online/offline
- [ ] Estadísticas personales (earnings, horas, clientes)

### Admin CRM
- [ ] Gestión de operadoras
- [ ] Comisiones y payouts
- [ ] Reportes de actividad
- [ ] Contratos y acuerdos

---

## FASE 4: TRANSCRIPCIÓN & IA (Semana 8-9)

### Recording & Transcription
- [ ] Guardar recordings en Supabase Storage
- [ ] Integración Whisper API
- [ ] Transcripción automática
- [ ] Análisis de sentimiento (futuro)

### AI Assistant (Futuro)
- [ ] Sugerencias automáticas para operadora
- [ ] Análisis de calidad de sesión
- [ ] Chatbot para preguntas frecuentes

---

## FASE 5: SUSCRIPCIONES (Semana 10-11)

### Recurring Billing
- [ ] Planes de suscripción
- [ ] Billing portal Stripe
- [ ] Invoices automáticos
- [ ] Cancelación automática
- [ ] Reactivación

### Loyalty Program
- [ ] Créditos por referral
- [ ] Descuentos por volumen
- [ ] Sistema de puntos

---

## FASE 6: INTEGRACIONES CRM (Semana 12)

### Bitrix24 Integration
- [ ] Sync de clientes
- [ ] Sync de sesiones
- [ ] Tasks automation
- [ ] Webhooks para eventos

### Google Workspace
- [ ] Calendar sync
- [ ] Sheets reporting
- [ ] Gmail labels

---

## FASE 7: ESCALABILIDAD (Semana 13-14)

### Performance
- [ ] Redis para caching
- [ ] Database optimization
- [ ] CDN global
- [ ] Image optimization

### Infrastructure
- [ ] Load balancing
- [ ] Database replication
- [ ] Disaster recovery
- [ ] Monitoring y alerting

### Analytics Avanzado
- [ ] Funnel analysis
- [ ] Cohort analysis
- [ ] Churn analysis
- [ ] Custom reports

---

## FASE 8: MOBILE APP (Futuro)

- [ ] React Native app
- [ ] Push notifications
- [ ] Offline support
- [ ] Biometric auth

---

## TIMELINE ESTIMADO

```
Semana 1:    Setup + Scaffolding
Semana 2-3:  MVP Landing + Checkout
Semana 4:    Admin básico + Deploy
Semana 5-6:  Zadarma + Call control
Semana 7-8:  CRM + Operadora dashboard
Semana 9:    Transcripción Whisper
Semana 10:   Suscripciones
Semana 11:   Bitrix24 + Integraciones
Semana 12:   Escalabilidad + Monitoring
```

**Total: ~3 meses para plataforma completa y escalable**

