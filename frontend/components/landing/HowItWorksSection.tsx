'use client';

import { motion } from 'framer-motion';
import { Users, CreditCard, MessageSquare } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Users,
      title: 'Elige tu tarotista',
      description: 'Conecta con quien más resuena contigo.',
    },
    {
      number: 2,
      icon: CreditCard,
      title: 'Selecciona tu consulta',
      description: 'Escoge la duración que necesitas.',
    },
    {
      number: 3,
      icon: MessageSquare,
      title: 'Recibe tu guía',
      description: 'Habla por llamada o chatea en vivo.',
    },
  ];

  return (
    <section id="como-funciona" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-gray-600 text-lg">
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
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                  {step.number}
                </div>

                {/* Card */}
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 border border-purple-200 h-full">
                  <div className="flex justify-center mb-6">
                    <div className="bg-purple-100 p-4 rounded-full">
                      <Icon className="w-8 h-8 text-purple-700" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 text-2xl text-purple-700 font-bold">
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
