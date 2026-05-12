'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-40 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Main CTA Card */}
        <div className="glass rounded-3xl p-16 text-center relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <h2 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
              ¿Listo para tu
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Lectura Transformadora?
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Miles de personas han encontrado respuestas y claridad. Tu momento de transformación está aquí. Comienza ahora mismo.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                href="#pricing"
                className="group relative px-10 py-4 text-lg font-bold text-white rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Ver Planes Premium
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <button className="group px-10 py-4 text-lg font-bold border-2 border-purple-400/50 text-white rounded-xl hover:border-purple-400 hover:bg-purple-400/10 transition-all duration-300">
                Contactar Soporte
              </button>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 text-center pt-8 border-t border-white/10"
            >
              <div className="group">
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="font-black text-4xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"
                >
                  4.9/5
                </motion.p>
                <p className="text-gray-400 text-sm font-medium">Calificación Promedio</p>
              </div>
              <div>
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="font-black text-4xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                >
                  5000+
                </motion.p>
                <p className="text-gray-400 text-sm font-medium">Clientes Satisfechos</p>
              </div>
              <div>
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="font-black text-4xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                >
                  24/7
                </motion.p>
                <p className="text-gray-400 text-sm font-medium">Siempre Disponible</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
