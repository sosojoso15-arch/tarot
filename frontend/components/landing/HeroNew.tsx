'use client';

import { motion } from 'framer-motion';
import { Phone, MessageSquare, Video, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-[#FFFDF5] pt-6 pb-20 px-6">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpeg" alt="Logo" width={50} height={50} className="rounded" />
            <span className="text-2xl font-bold text-purple-700">VOCES DEL ALMA</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-gray-700 hover:text-purple-700 transition font-medium">Cómo Funciona</a>
            <a href="#tarotistas" className="text-gray-700 hover:text-purple-700 transition font-medium">Tarotistas</a>
            <a href="#testimonios" className="text-gray-700 hover:text-purple-700 transition font-medium">Testimonios</a>
          </div>

          <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition font-medium">
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* Hero Content - Two Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ilumina tu futuro con guía espiritual
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Conecta con nuestros tarotistas certificados y recibe lecturas personalizadas que te ayudarán a encontrar claridad y propósito en tu vida.
          </p>

          {/* Features List */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">Tarotistas certificadas con años de experiencia</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">Consultas seguras y confidenciales</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">Disponible 24/7 en múltiples canales</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/tarotistas?minutes=15" className="bg-purple-700 text-white px-8 py-4 rounded-lg hover:bg-purple-800 transition font-bold text-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Agendar Consulta
            </Link>
            <Link href="/tarotistas" className="border-2 border-purple-700 text-purple-700 px-8 py-4 rounded-lg hover:bg-purple-50 transition font-bold text-lg">
              Ver Tarotistas
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Stats & Methods */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Stats Box */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-700 mb-2">5000+</p>
                <p className="text-sm text-gray-700">Clientes Satisfechos</p>
              </div>
              <div className="text-center border-l border-r border-purple-300">
                <p className="text-4xl font-bold text-purple-700 mb-2">4.9/5</p>
                <p className="text-sm text-gray-700">Rating Promedio</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-700 mb-2">24/7</p>
                <p className="text-sm text-gray-700">Siempre Disponible</p>
              </div>
            </div>
          </div>

          {/* Consultation Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Elige tu método de consulta:</h3>

            <div className="bg-white border-2 border-purple-200 rounded-xl p-5 hover:border-purple-400 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Consulta Telefónica</p>
                  <p className="text-sm text-gray-600">Directo y personal</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-xl p-5 hover:border-purple-400 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Chat en Vivo</p>
                  <p className="text-sm text-gray-600">Discreto y flexible</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-xl p-5 hover:border-purple-400 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Video className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Videollamada</p>
                  <p className="text-sm text-gray-600">Conexión completa</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
