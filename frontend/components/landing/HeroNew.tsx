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

      {/* Hero Section - 2 Columns */}
      <section className="bg-white pt-8 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Cuando todo <br />
                parece confuso, <br />
                <span className="text-amber-600">tu alma ya conoce <br />
                la respuesta.</span>
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Conecta con nuestras tarotistas certificadas y recibe lecturas personalizadas que te ayudarán a encontrar claridad, propósito y dirección en tu vida.
              </p>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <Image
                src="/hero.jpg"
                alt="Tarot, velas y cartas"
                width={500}
                height={500}
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 bg-amber-50 rounded-2xl p-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-gray-700 text-lg max-w-3xl mx-auto"
          >
            Detrás de cada consulta hay una emoción, <br />
            una herida o una esperanza buscando claridad.
          </motion.p>
        </div>
      </section>
    </>
  );
}
