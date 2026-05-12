'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lock, Star, Phone, Clock, Zap, Shield } from 'lucide-react';

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Lock,
      title: 'Pago 100% Seguro',
      description: 'Todas las transacciones se procesan a través de Stripe. Tu información de pago está encriptada y completamente protegida.'
    },
    {
      icon: Star,
      title: 'Tarotistas Certificadas',
      description: 'Profesionales con años de experiencia verificada y expertise en guía espiritual y lectura de tarjetas.'
    },
    {
      icon: Phone,
      title: 'Consultas Telefónicas',
      description: 'Conéctate directamente con tu tarotista vía teléfono para una experiencia personal y auténtica.'
    },
    {
      icon: Clock,
      title: 'Disponible 24/7',
      description: 'Agenda tu consulta en el horario que mejor te convenga. Nuestras tarotistas siempre están listas para atenderte.'
    },
    {
      icon: Zap,
      title: 'Confirmación Instantánea',
      description: 'Recibe tu código de sesión y detalles inmediatos por email después de completar tu compra.'
    },
    {
      icon: Shield,
      title: 'Confidencialidad Total',
      description: 'Tus lecturas son completamente confidenciales. Nunca compartimos tu información personal con terceros.'
    }
  ];

  return (
    <section ref={ref} className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Why Choose Us</p>
          <h2 className="text-5xl md:text-7xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Premium Features
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="liquid-glass rounded-2xl p-8 hover:bg-white/5 transition-all group"
              >
                <div className="mb-6">
                  <div className="liquid-glass rounded-full p-4 w-fit group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
