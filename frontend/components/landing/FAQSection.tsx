'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Cómo funciona una lectura de tarot?',
      answer: 'Nuestras tarotistas utilizan el antiguo arte del tarot para proporcionarte guía espiritual. Interpretan las cartas basándose en tu pregunta específica y te ofrecen insights profundos sobre tu situación y los posibles caminos que puedes tomar.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos todas las tarjetas de crédito principales a través de Stripe. Tu pago se procesa de forma segura con encriptación de 256 bits para proteger tu información financiera.'
    },
    {
      question: '¿Cuánto tiempo es válida mi sesión?',
      answer: 'Tu sesión de lectura es válida por 24 horas desde el momento de la compra. Puedes agendar tu llamada en cualquier momento dentro de esta ventana, según tu conveniencia.'
    },
    {
      question: '¿Puedo cambiar el horario de mi lectura?',
      answer: 'Sí, completamente. Si necesitas reagendar, contacta a nuestro equipo de soporte con tu código de sesión. Podemos ajustar el horario dentro de tu ventana de 24 horas.'
    },
    {
      question: '¿Qué pasa si no estoy satisfecho?',
      answer: 'Nos responsabilizamos por la calidad de nuestras lecturas. Si no estás satisfecho, contáctanos dentro de 24 horas para un reembolso completo. Tu satisfacción es nuestra prioridad.'
    },
    {
      question: '¿Mi información es privada?',
      answer: 'Completamente. Toda tu información personal y detalles de la lectura se mantienen confidenciales y encriptados. Nunca compartimos tus datos con terceros.'
    }
  ];

  return (
    <section ref={ref} className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-600">Respuestas a tus dudas más comunes</p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white border border-purple-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6"
              >
                <h3 className="text-gray-900 text-lg font-semibold text-left">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-purple-700" />
                </motion.div>
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 border-t border-purple-200"
                >
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
