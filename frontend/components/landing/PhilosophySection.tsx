'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 font-bold"
        >
          Espiritualidad <em className="italic text-white/40">× en</em> Sabiduría
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <video
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            {/* Block 1 */}
            <div className="mb-12 pb-12 border-b border-white/10">
              <p className="text-white/40 text-xs tracking-[0.15em] uppercase mb-5 font-light">Elige tu lectura</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
                Cada avance significativo comienza en la intersección de la claridad disciplinada y la insight espiritual notable. Operamos en esa encrucijada, transformando preguntas profundas en sabiduría tangible que toca almas y transforma perspectivas.
              </p>
            </div>

            {/* Block 2 */}
            <div>
              <p className="text-white/40 text-xs tracking-[0.15em] uppercase mb-5 font-light">Moldea tu futuro</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
                Creemos que las mejores lecturas emergen cuando la curiosidad se encuentra con la convicción. Nuestro enfoque está diseñado para descubrir verdades ocultas y traducirlas en experiencias que resuenan mucho después del descubrimiento.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
