'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-gray-900 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Quieres formar parte de nuestro equipo?
          </h2>

          <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
            Envíanos tu currículum y únete a nuestras tarotistas certificadas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:hello@vocesdelama.es"
              className="bg-amber-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 transition flex items-center justify-center gap-2"
            >
              ENVIAR CURRICULUM
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
