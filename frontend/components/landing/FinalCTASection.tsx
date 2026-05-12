'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-gradient-to-r from-purple-700 to-purple-600 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para tu Transformación Espiritual?
          </h2>

          <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
            Conecta con nuestros tarotistas ahora y descubre la guía que estabas buscando
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#planes"
              className="bg-white text-purple-700 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition flex items-center justify-center gap-2"
            >
              AGENDAR LECTURA
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="#tarotistas"
              className="bg-purple-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-400 transition"
            >
              VER TAROTISTAS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
