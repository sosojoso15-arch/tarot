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

      {/* Hero Section */}
      <section className="bg-yellow-50 pt-8 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-blue-950 mb-6 leading-tight">
                Cuando todo <br />
                parece confuso, <br />
                <span className="text-yellow-600">tu alma ya conoce <br />
                la respuesta.</span>
              </h1>
              <p className="text-blue-950 leading-relaxed">
                Conecta con nuestras tarotistas y descubre las respuestas y la visión clara que necesitas para avanzar con más paz, seguridad y luz en tu camino.
              </p>
            </motion.div>

            {/* Right - inicio.jpeg */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full"
            >
              <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/inicio.jpeg"
                  alt="Tarot"
                  fill
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl p-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-950 mb-1">{stat.number}</p>
                  <p className="text-xs text-blue-950">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
