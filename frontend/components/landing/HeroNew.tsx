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
            <Image src="/logo.jpeg" alt="Logo" width={45} height={45} className="rounded" />
            <span className="text-xl font-bold text-gray-900">VOCES DEL ALMA</span>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-white pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Cuando todo <br />
              <span className="text-amber-600">parece confuso,</span> <br />
              tu alma ya conoce <br />
              la respuesta.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conecta con nuestras tarotistas certificadas y recibe lecturas personalizadas que te ayudarán a encontrar claridad, propósito y dirección en tu vida.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <Icon className="w-6 h-6 text-amber-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</p>
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
            className="text-center text-gray-700 text-lg mb-12 max-w-3xl mx-auto"
          >
            Detrás de cada consulta hay una emoción, una herida o una esperanza buscando claridad.
          </motion.p>
        </div>
      </section>
    </>
  );
}
