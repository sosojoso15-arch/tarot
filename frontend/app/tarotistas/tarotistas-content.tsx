'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Tarotista } from '@/types';

export function TarotistasContent() {
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
            {selectedTarotista.id === '342320f1-415f-40c0-8abe-255372bc0ce4' ? (
              // Paqui Special Layout
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
              >
                <div className="w-full h-full max-w-2xl max-h-[95vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-slate-950">
                  <button
                    onClick={() => setSelectedTarotista(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-white hover:text-yellow-400 text-xl sm:text-2xl font-light bg-black/50 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>

                  {/* Image Section */}
                  <div className="flex-1 overflow-hidden bg-slate-900">
                    <img
                      src="/PAQUI.jpg"
                      alt="Paqui"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Button Section */}
                  <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t-2 border-yellow-600/30">
                    <button
                      onClick={() => {
                        handleConfirmSelection(selectedTarotista.id);
                        setSelectedTarotista(null);
                      }}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all shadow-lg text-sm sm:text-base"
                    >
                      CONSULTAR AHORA
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Normal Modal for other tarotistas
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
              >
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl sm:rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-y-auto border-2 border-yellow-600/40 shadow-2xl">
                <button
                  onClick={() => setSelectedTarotista(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-yellow-600/60 hover:text-yellow-400 text-xl sm:text-2xl font-light"
                >
                  ✕
                </button>

                {/* Header Section - Photo + Info + Consultas (Responsive) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-5 border-b border-yellow-600/30">
                  {/* Photo - Larger Rectangle */}
                  <div className="sm:col-span-1 flex justify-center sm:justify-start">
                    {selectedTarotista.imagen_url && (
                      <div className="w-32 h-40 sm:w-40 sm:h-48 rounded-xl overflow-hidden border-2 border-yellow-600/60 shadow-lg flex-shrink-0">
                        <img
                          src={selectedTarotista.imagen_url}
                          alt={selectedTarotista.nombre}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                  </div>

                  {/* Name + Specialty + Bio */}
                  <div className="sm:col-span-1 flex flex-col justify-center text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500 tracking-wide mb-1">{selectedTarotista.nombre}</h2>
                    <p className="text-yellow-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2">{selectedTarotista.especialidad || 'Tarot General'}</p>
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                      "{selectedTarotista.bio?.substring(0, 120) || 'Guía espiritual especializada en tarot evolutivo'}..."
                    </p>
                  </div>

                  {/* Consultas Panel */}
                  <div className="sm:col-span-1 border-2 border-yellow-600/40 rounded-xl p-3 sm:p-4 bg-slate-900/80 backdrop-blur h-fit">
                    <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest text-center mb-2">Consultas</p>
                    <div className="space-y-1.5 text-xs text-gray-300 mb-3">
                      <div className="flex justify-between items-center hover:text-yellow-400 transition">
                        <span>15m</span>
                        <span className="text-yellow-500 font-bold">€{((selectedTarotista.precio_por_minuto || 1) * 15).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between items-center hover:text-yellow-400 transition">
                        <span>20m</span>
                        <span className="text-yellow-500 font-bold">€{((selectedTarotista.precio_por_minuto || 1) * 20).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between items-center hover:text-yellow-400 transition">
                        <span>30m</span>
                        <span className="text-yellow-500 font-bold">€{((selectedTarotista.precio_por_minuto || 1) * 30).toFixed(0)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleConfirmSelection(selectedTarotista.id);
                        setSelectedTarotista(null);
                      }}
                      className="w-full py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all shadow-lg text-sm"
                    >
                      AHORA
                    </button>
                  </div>
                </div>

                {/* Stats Row - 4 columns */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-3 sm:px-5 py-3 border-b border-yellow-600/30">
                  <div className="text-center border-2 border-yellow-600/30 rounded-lg p-2 sm:p-3 hover:border-yellow-600/60 transition">
                    <div className="text-lg sm:text-xl text-yellow-500 font-bold">+10</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">años</div>
                  </div>
                  <div className="text-center border-2 border-yellow-600/30 rounded-lg p-2 sm:p-3 hover:border-yellow-600/60 transition">
                    <div className="text-lg sm:text-xl text-yellow-500 font-bold">{selectedTarotista.numero_resenas || 0}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">consultas</div>
                  </div>
                  <div className="text-center border-2 border-yellow-600/30 rounded-lg p-2 sm:p-3 hover:border-yellow-600/60 transition">
                    <div className="text-yellow-500 font-bold text-sm sm:text-lg">⭐ {selectedTarotista.rating?.toFixed(1) || '5.0'}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">rating</div>
                  </div>
                  <div className="text-center border-2 border-yellow-600/30 rounded-lg p-2 sm:p-3 hover:border-yellow-600/60 transition">
                    <div className="text-yellow-500 font-bold text-xs sm:text-sm">✓ Confianza</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">garantizada</div>
                  </div>
                </div>

                {/* Three Column Content Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-3 sm:px-5 py-3 border-b border-yellow-600/30">
                  {/* Perfil */}
                  <div className="border-2 border-yellow-600/30 rounded-lg p-3 hover:border-yellow-600/60 transition">
                    <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">★ Perfil</h3>
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-4">
                      {selectedTarotista.bio?.substring(0, 180) || 'Tarotista intuitiva, guía espiritual especializada en tarot evolutivo, rupturas amorosas y transformación emocional.'}
                    </p>
                  </div>

                  {/* Agenda */}
                  <div className="border-2 border-yellow-600/30 rounded-lg p-3 hover:border-yellow-600/60 transition">
                    <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">🌙 Horario</h3>
                    <div className="space-y-1 text-xs text-gray-300">
                      <div><span className="text-yellow-500 font-semibold">L-V</span><span className="ml-2">09:30 - 18:00</span></div>
                      <div><span className="text-yellow-500 font-semibold">S-D</span><span className="ml-2">00:00 - 24:00</span></div>
                    </div>
                  </div>

                  {/* Especialidades Preview */}
                  <div className="border-2 border-yellow-600/30 rounded-lg p-3 hover:border-yellow-600/60 transition">
                    <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">✨ Especialidades</h3>
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>🔮 Tarot Evolutivo</div>
                      <div>💔 Rupturas Amorosas</div>
                      <div>💫 Guía Espiritual</div>
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="px-3 sm:px-5 py-3 border-b border-yellow-600/30">
                  <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2 text-center">+ Lo que dicen +</h3>
                  <div className="space-y-2">
                    <div className="border-2 border-yellow-600/30 rounded-lg p-2 sm:p-3 bg-slate-900/50 hover:border-yellow-600/60 transition">
                      <div className="flex text-yellow-500 text-xs mb-1">★★★★★</div>
                      <p className="text-gray-300 text-xs italic leading-tight mb-1">
                        "Consulta increíble, muy acertada. 100% recomendada."
                      </p>
                      <p className="text-yellow-600 text-xs font-semibold">- Cristina</p>
                    </div>
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="px-3 sm:px-5 py-3 text-center">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 bg-yellow-600/10 border border-yellow-600/40 rounded-full text-yellow-500 text-xs font-semibold hover:bg-yellow-600/20 transition">
                      🔮 Tarot
                    </span>
                    <span className="px-2 py-1 bg-yellow-600/10 border border-yellow-600/40 rounded-full text-yellow-500 text-xs font-semibold hover:bg-yellow-600/20 transition">
                      💫 Espiritual
                    </span>
                    <span className="px-2 py-1 bg-yellow-600/10 border border-yellow-600/40 rounded-full text-yellow-500 text-xs font-semibold hover:bg-yellow-600/20 transition">
                      💔 Amorosas
                    </span>
                  </div>
                </div>
              </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
