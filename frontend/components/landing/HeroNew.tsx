'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Star, Lock, Clock } from 'lucide-react';

export default function Hero() {
  const stats = [
    { number: '5000+', label: 'Clientes satisfechos', icon: Users },
    { number: '4.9/5', label: 'Valoración promedio', icon: Star },
    { number: '100%', label: 'Consultas confidenciales', icon: Lock },
    { number: '24/7', label: 'Siempre disponibles', icon: Clock }
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpeg" alt="Logo" width={50} height={50} className="rounded" />
            <span className="text-xl font-bold text-gray-900">VOCES DEL ALMA</span>
          </Link>
        </nav>
      </header>

      {/* Hero Section - imagen inicio.jpeg como fondo completo */}
      <section
        className="relative min-h-screen pt-8 pb-16 px-6"
        style={{ backgroundImage: 'url(/inicio.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}
      >
        {/* Overlay oscuro para leer texto */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Texto hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center pt-8 pb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Cuando todo <br />
              parece confuso, <br />
              <span className="text-yellow-400">tu alma ya conoce <br />
              la respuesta.</span>
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Conecta con nuestras tarotistas y descubre las respuestas que necesitas para avanzar con más paz y claridad.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white mb-1">{stat.number}</p>
                  <p className="text-xs text-white/80">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
