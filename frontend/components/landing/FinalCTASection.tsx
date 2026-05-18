'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Moon, Lock, Shield, Heart } from 'lucide-react';

export default function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Moon,
      title: '24/7',
      description: 'Atención espiritual disponible cada día, durante todo el día, para acompañarte cuando más lo necesites.'
    },
    {
      icon: Lock,
      title: 'Tu espacio seguro',
      description: 'Un lugar donde sentirte escuchado, comprendido y acompañado.'
    },
    {
      icon: Shield,
      title: '100% Confidencial',
      description: 'Cada consulta es privada, cercana y completamente confidencial.'
    },
    {
      icon: Heart,
      title: 'Conexión desde el alma',
      description: 'Te acompañamos con empatía, claridad y honestidad.'
    }
  ];

  return (
    <>
      {/* Features Row */}
      <section className="bg-slate-950 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ref} className="bg-slate-950 py-20 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Sientes que tu don puede ayudar a otras personas?
            </h2>

            <p className="text-gray-300 text-lg mb-10">
              Únete a un espacio espiritual donde poder ayudar, guiar y conectar con otras almas.
            </p>

            <Link
              href="mailto:hello@vocesdelama.es"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-950 px-8 py-3 rounded-lg font-bold transition"
            >
              ENVIAR CURRICULUM
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
