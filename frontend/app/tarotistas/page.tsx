'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Tarotista } from '@/types';

export default function TarotistasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const minutes = searchParams.get('minutes') || '15';

  const [tarotistas, setTarotistas] = useState<Tarotista[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTarotista, setSelectedTarotista] = useState<Tarotista | null>(null);

  useEffect(() => {
    const fetchTarotistas = async () => {
      try {
        setLoading(true);
        const tarotistas = await api.getAvailableTarotistas();
        setTarotistas(tarotistas);
      } catch (error) {
        console.error('Error loading tarotistas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTarotistas();
  }, []);

  const handleSelectTarotista = (tarotista: Tarotista) => {
    setSelectedTarotista(tarotista);
  };

  const handleConfirmSelection = (taroistaId: string) => {
    router.push(`/checkout?minutes=${minutes}&tarotista=${taroistaId}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FFFDF5] border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 text-2xl font-black">
            <Image src="/logo.jpeg" alt="Logo" width={50} height={50} className="rounded" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-500">
              VOCES DEL ALMA
            </span>
          </Link>
          <Link href="/" className="text-purple-600 font-bold text-sm hover:text-purple-700">
            ← Volver
          </Link>
        </nav>
      </header>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-black mb-3">
              Selecciona tu Voz del Alma
            </h1>
            <p className="text-gray-600 text-lg">
              Elige tu voz del alma para tu consulta de {minutes} minutos
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando tarotistas...</p>
              </div>
            </div>
          ) : tarotistas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-6">No hay tarotistas disponibles en este momento</p>
              <Link href="/" className="text-purple-600 font-bold hover:text-purple-700">
                Volver al inicio
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tarotistas.map((tarotista, index) => (
                <motion.div
                  key={tarotista.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/90 border border-gray-200 rounded-2xl overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                    {/* Avatar/Photo */}
                    <div className="w-full h-80 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-5xl group-hover:from-purple-500 group-hover:to-purple-700 transition-all relative overflow-hidden">
                      {tarotista.imagen_url ? (
                        <img
                          src={tarotista.imagen_url}
                          alt={tarotista.nombre}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <span>✨</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-black mb-2">
                        {tarotista.nombre}
                      </h3>

                      <p className="text-sm text-purple-600 font-semibold mb-3">
                        {tarotista.especialidad || 'Tarot General'}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.min(Math.max(Math.round(tarotista.rating || 5), 0), 5))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {tarotista.rating?.toFixed(1) || '5.0'}/5
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                        {tarotista.bio || 'Tarotista certificada con años de experiencia'}
                      </p>

                      <button
                        onClick={() => handleSelectTarotista(tarotista)}
                        className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 group-hover:shadow-lg"
                      >
                        Seleccionar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedTarotista && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTarotista(null)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-black">{selectedTarotista.nombre}</h2>
                  <button
                    onClick={() => setSelectedTarotista(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Photo */}
                  {selectedTarotista.imagen_url && (
                    <div className="w-full h-96 rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
                      <img
                        src={selectedTarotista.imagen_url}
                        alt={selectedTarotista.nombre}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}

                  {/* Specialty */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">ESPECIALIDAD</h3>
                    <p className="text-lg font-bold text-purple-600">
                      {selectedTarotista.especialidad || 'Tarot General'}
                    </p>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">CALIFICACIÓN</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex text-yellow-400 text-lg">
                        {'★'.repeat(Math.min(Math.max(Math.round(selectedTarotista.rating || 5), 0), 5))}
                      </div>
                      <span className="text-lg font-bold text-gray-700">
                        {selectedTarotista.rating?.toFixed(1) || '5.0'}/5
                      </span>
                      <span className="text-sm text-gray-500">
                        ({selectedTarotista.numero_resenas || 0} reseñas)
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">ACERCA DE</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedTarotista.bio || 'Tarotista certificada con años de experiencia'}
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">TELÉFONO</h3>
                      <p className="text-gray-700 font-mono">{selectedTarotista.numero_telefono}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">EMAIL</h3>
                      <p className="text-gray-700 font-mono text-sm">{selectedTarotista.email}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">TARIFA</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      €{selectedTarotista.precio_por_minuto}/min
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      handleConfirmSelection(selectedTarotista.id);
                      setSelectedTarotista(null);
                    }}
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                  >
                    Continuar con {selectedTarotista.nombre} ({minutes} minutos)
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
