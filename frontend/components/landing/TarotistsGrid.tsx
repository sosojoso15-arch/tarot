'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function TarotistsGrid() {
  const [tarotistas, setTarotistas] = useState<any[]>([]);

  useEffect(() => {
    const loadTarotistas = async () => {
      try {
        const data = await api.getAvailableTarotistas();
        setTarotistas(data);
      } catch (error) {
        console.error('Error loading tarotistas:', error);
      }
    };
    loadTarotistas();
  }, []);

  return (
    <section id="tarotistas" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Tarotistas Certificados
          </h2>
          <p className="text-gray-600 text-lg">
            Expertos en lecturas de tarot con años de experiencia
          </p>
        </motion.div>

        {/* Grid 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tarotistas.map((tarotista, index) => {
              const initials = tarotista.nombre
                .split(' ')
                .map((word: string) => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <motion.div
                  key={tarotista.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
                >
                  {/* Imagen */}
                  <div className="relative h-40 bg-gray-100 overflow-hidden">
                    {tarotista.imagen_url ? (
                      <img
                        src={tarotista.imagen_url}
                        alt={tarotista.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{initials}</span>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{tarotista.nombre}</h3>
                    <p className="text-amber-600 font-semibold text-xs mb-3">{tarotista.especialidad}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(tarotista.rating || 5)
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 text-xs ml-1">
                        {(tarotista.rating || 5).toFixed(1)}
                      </span>
                    </div>

                    {/* Precios */}
                    <div className="space-y-1.5 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">15 min</span>
                        <span className="font-bold">€10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">20 min</span>
                        <span className="font-bold">€15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">30 min</span>
                        <span className="font-bold">€20</span>
                      </div>
                    </div>

                    {/* Botón */}
                    <Link
                      href={`/tarotistas?minutes=15&tarotista=${tarotista.id}`}
                      className="w-full bg-gray-900 text-white py-2 rounded-lg text-xs font-semibold hover:bg-gray-800 transition text-center block"
                    >
                      Seleccionar
                    </Link>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
