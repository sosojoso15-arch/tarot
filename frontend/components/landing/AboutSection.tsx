'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-black pt-40 md:pt-56 pb-20 md:pb-28 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-light">Nuestra Misión</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white leading-[1.15] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Conectar <em className="italic text-white/50" style={{ fontFamily: "'Instrument Serif', serif" }}>almas</em> con su
          <br className="hidden md:block" />
          verdadero <em className="italic text-white/50" style={{ fontFamily: "'Instrument Serif', serif" }}>propósito</em> a través de la sabiduría antigua.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-white/60 text-lg leading-relaxed max-w-2xl font-light"
        >
          Creemos que cada persona merece claridad, guía y comprensión profunda de su camino. Nuestras tarotistas certificadas utilizan el arte ancestral del tarot para revelar insights transformadores que te ayudan a tomar decisiones con confianza y propósito.
        </motion.p>
      </div>
    </section>
  );
}
