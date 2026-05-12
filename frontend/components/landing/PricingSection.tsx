'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const plans = [
    {
      minutes: 10,
      price: '$9.99',
      description: 'Respuestas rápidas a preguntas puntuales',
      features: [
        'Lectura de 10 minutos',
        'Una pregunta principal',
        'Resumen por email',
        'Código de sesión'
      ]
    },
    {
      minutes: 15,
      price: '$14.99',
      description: 'La opción más elegida',
      features: [
        'Lectura de 15 minutos',
        'Múltiples preguntas',
        'Resumen detallado por email',
        'Código de sesión',
        'Grabación de sesión'
      ],
      highlighted: true
    },
    {
      minutes: 20,
      price: '$19.99',
      description: 'Exploración profunda de tu situación',
      features: [
        'Lectura de 20 minutos',
        'Preguntas ilimitadas',
        'Análisis completo',
        'Resumen por email',
        'Grabación de sesión',
        'Notas personalizadas'
      ]
    },
    {
      minutes: 30,
      price: '$29.99',
      description: 'Experiencia premium transformadora',
      features: [
        'Lectura de 30 minutos',
        'Preguntas ilimitadas',
        'Análisis profundo y detallado',
        'Resumen extenso por email',
        'Grabación de sesión',
        'Notas personalizadas',
        'Seguimiento prioritario'
      ]
    }
  ];

  return (
    <section id="planes" ref={ref} className="bg-gradient-to-b from-[#FFFDF5] to-purple-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Planes de Consulta
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selecciona la duración perfecta para tu consulta espiritual
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              className={`relative rounded-xl p-8 flex flex-col justify-between h-full transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-700 to-purple-600 text-white shadow-xl scale-105'
                  : 'bg-white border border-purple-200 text-gray-900 hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gold-500 text-white px-4 py-1 rounded-full text-xs font-bold">MÁS POPULAR</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Price section */}
                <div>
                  <p className={`text-sm font-semibold tracking-widest uppercase mb-2 ${plan.highlighted ? 'text-purple-100' : 'text-purple-700'}`}>
                    Duración
                  </p>
                  <h3 className="text-4xl font-bold mb-2">{plan.minutes} min</h3>
                  <p className={`text-sm ${plan.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Amount section */}
                <div className={`border-t pt-6 ${plan.highlighted ? 'border-purple-400' : 'border-purple-200'}`}>
                  <p className="text-3xl font-bold mb-1">{plan.price}</p>
                  <p className={`text-xs ${plan.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>por sesión</p>
                </div>

                {/* Features section */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-purple-100' : 'text-purple-600'}`} />
                      <p className={`text-sm ${plan.highlighted ? 'text-purple-100' : 'text-gray-700'}`}>
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 border-t" style={{ borderColor: plan.highlighted ? 'rgba(255,255,255,0.2)' : undefined }}>
                <Link
                  href={`/tarotistas?minutes=${plan.minutes}`}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 text-sm ${
                    plan.highlighted
                      ? 'bg-white text-purple-700 hover:bg-purple-50'
                      : 'bg-purple-700 text-white hover:bg-purple-800'
                  }`}
                >
                  COMENZAR
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
