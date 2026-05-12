'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      tag: 'Lectura General',
      title: 'Tirada Completa del Tarot',
      description: 'Exploramos tu situación actual con una lectura completa de tarjetas. Nuestras tarotistas analizan cada arcano para revelarte los mensajes del universo y los caminos posibles que se abren ante ti.',
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'
    },
    {
      tag: 'Consulta Específica',
      title: 'Lectura Temática Profunda',
      description: 'Enfócate en un área específica: amor, carrera, decisiones importantes, o crecimiento personal. Recibe guía tarotista especializada en el tema que más te preocupa en este momento.',
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4'
    }
  ];

  return (
    <section ref={ref} className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0 mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            What we do
          </h2>
          <p className="text-white/40 text-sm hidden md:block">Our services</p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="liquid-glass rounded-3xl overflow-hidden group hover:bg-white/5 transition-colors"
            >
              {/* Video Area */}
              <div className="aspect-video overflow-hidden relative">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={service.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8">
                <p className="uppercase tracking-widest text-white/40 text-xs mb-4">{service.tag}</p>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-white text-xl md:text-2xl tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {service.title}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="liquid-glass rounded-full p-2 flex-shrink-0 mt-1"
                  >
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
