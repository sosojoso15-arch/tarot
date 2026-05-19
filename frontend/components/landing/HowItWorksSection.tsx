'use client';

import { motion } from 'framer-motion';
import { Users, CreditCard, MessageSquare } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Users,
      title: 'Elige tu tarotista',
      description: 'Conecta con la persona indicada para ayudarte a comprender lo que hoy preocupa a tu alma.',
    },
    {
      number: 2,
      icon: CreditCard,
      title: 'Selecciona tu consulta',
      description: 'Dedícate este momento y recibe una guía personalizada para tu situación.',
    },
    {
      number: 3,
      icon: MessageSquare,
      title: 'Recibe tu guía',
      description: 'Habla o chatea ahora con tu tarotista y encuentra la paz, la claridad y las respuestas que tu corazón necesita escuchar.',
    },
  ];

  return (
    <section id="como-funciona" className="bg-yellow-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Tu respuesta puede estar más cerca de lo que imaginas
          </h2>
          <p className="text-blue-950 text-lg">
            Solo 3 pasos simples para conectar con tu tarotista
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number Circle */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                  {step.number}
                </div>

                {/* Card */}
                <div className="bg-gradient-to-br from-yellow-100 to-white rounded-xl p-8 border border-yellow-200 h-full">
                  <div className="flex justify-center mb-6">
                    <div className="bg-yellow-100 p-4 rounded-full">
                      <Icon className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-blue-950 mb-3 text-center">
                    {step.title}
                  </h3>

                  <p className="text-blue-950 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 text-2xl text-yellow-600 font-bold">
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
