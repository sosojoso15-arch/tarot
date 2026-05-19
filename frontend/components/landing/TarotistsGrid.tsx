'use client';

import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function TarotistsGrid() {
  const [tarotistas, setTarotistas] = useState<any[]>([]);
  const [selectedMinutes, setSelectedMinutes] = useState<Record<string, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTarotista, setSelectedTarotista] = useState<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTarotistas = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tarotistas/available`);
        const result = await response.json();
        if (result.success) {
          setTarotistas(result.data);
        }
      } catch (error) {
        console.error('Error loading tarotistas:', error);
      }
    };
    loadTarotistas();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // w-80 = 320px
      const current = scrollContainerRef.current.scrollLeft;
      const target = direction === 'left' ? current - scrollAmount : current + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: target,
        behavior: 'smooth'
      });
    }
  };

  const openModal = (tarotista: any) => {
    setSelectedTarotista(tarotista);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTarotista(null);
  };

  return (
    <section id="tarotistas" className="bg-yellow-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Nuestros Tarotistas Certificados
          </h2>
          <p className="text-blue-950 text-lg">
            Expertos en lecturas de tarot con años de experiencia
          </p>
        </motion.div>

        {/* Carrusel Horizontal */}
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="relative">
          {/* Botones navegación */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-slate-950" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
          >
            <ChevronRight className="w-6 h-6 text-slate-950" />
          </button>

          {/* Carrusel */}
          <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide -mx-6 px-6">
            <div className="flex gap-4 sm:gap-6 pb-4">
              {tarotistas.length > 0 ? tarotistas.map((tarotista, index) => {
              const initials = tarotista.nombre
                .split(' ')
                .map((word: string) => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <motion.div
                  key={`${tarotista.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition flex-shrink-0 w-64 sm:w-72"
                >
                  {/* Imagen */}
                  <div className="relative h-96 bg-gray-100 overflow-hidden">
                    {tarotista.imagen_url ? (
                      <img
                        src={tarotista.imagen_url}
                        alt={tarotista.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{initials}</span>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-blue-950 mb-1">{tarotista.nombre}</h3>
                    <p className="text-yellow-600 font-semibold text-xs mb-2">{tarotista.especialidad}</p>

                    {/* Descripción */}
                    {tarotista.bio && (
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                        {tarotista.bio}
                      </p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(tarotista.rating || 5)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 text-xs ml-1">
                        {(tarotista.rating || 5).toFixed(1)}
                      </span>
                    </div>

                    {/* Modalidad */}
                    <div className="mb-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Llamada
                      </span>
                    </div>

                    {/* Botón Ver Más */}
                    <button
                      onClick={() => openModal(tarotista)}
                      className="w-full bg-blue-50 text-blue-700 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-blue-100 transition mb-3"
                    >
                      Ver información completa
                    </button>

                    {/* Selector de Paquete */}
                    <div className="space-y-2 mb-4">
                      {[
                        { minutes: 15, price: '€10' },
                        { minutes: 20, price: '€15' },
                        { minutes: 30, price: '€20' }
                      ].map(pkg => (
                        <button
                          key={pkg.minutes}
                          onClick={() => setSelectedMinutes({ ...selectedMinutes, [tarotista.id]: pkg.minutes })}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition border-2 ${
                            selectedMinutes[tarotista.id] === pkg.minutes
                              ? 'bg-yellow-500 text-white border-yellow-500'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-500'
                          }`}
                        >
                          {pkg.minutes} min - {pkg.price}
                        </button>
                      ))}
                    </div>

                    {/* Botón */}
                    <Link
                      href={`/checkout?minutes=${selectedMinutes[tarotista.id] || 15}&tarotista=${tarotista.id}`}
                      className="w-full bg-gray-900 text-white py-2 rounded-lg text-xs font-semibold hover:bg-gray-800 transition text-center block"
                    >
                      Seleccionar
                    </Link>
                  </div>
                </motion.div>
              );
            }) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedTarotista && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] overflow-y-auto flex flex-col md:flex-row"
          >
            {/* Header con foto - Grande en desktop */}
            <div className="relative w-full md:w-1/2 h-64 md:h-full bg-gray-100 flex-shrink-0">
              {selectedTarotista.imagen_url ? (
                <img
                  src={selectedTarotista.imagen_url}
                  alt={selectedTarotista.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">
                    {selectedTarotista.nombre
                      .split(' ')
                      .map((w: string) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                </div>
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 p-6 md:p-8 space-y-4 overflow-y-auto">
              <div>
                <h2 className="text-3xl font-bold text-blue-950 mb-2">{selectedTarotista.nombre}</h2>
                <p className="text-yellow-600 font-semibold text-lg mb-3">{selectedTarotista.especialidad}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(selectedTarotista.rating || 5)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {(selectedTarotista.rating || 5).toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Modalidad */}
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                  Llamada
                </span>
              </div>

              {/* Descripción */}
              {selectedTarotista.bio && (
                <div>
                  <h3 className="font-bold text-blue-950 mb-2">Sobre ella</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedTarotista.bio}</p>
                </div>
              )}

              {/* Selector de Paquete */}
              <div>
                <h3 className="font-bold text-blue-950 mb-3">Elige tu sesión</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { minutes: 15, price: '€10' },
                    { minutes: 20, price: '€15' },
                    { minutes: 30, price: '€20' }
                  ].map(pkg => (
                    <button
                      key={pkg.minutes}
                      onClick={() => setSelectedMinutes({ ...selectedMinutes, [selectedTarotista.id]: pkg.minutes })}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition border-2 ${
                        selectedMinutes[selectedTarotista.id] === pkg.minutes
                          ? 'bg-yellow-500 text-white border-yellow-500'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-500'
                      }`}
                    >
                      {pkg.minutes} min<br/>{pkg.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-blue-950 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cerrar
                </button>
                <Link
                  href={`/checkout?minutes=${selectedMinutes[selectedTarotista.id] || 15}&tarotista=${selectedTarotista.id}`}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-center"
                >
                  Continuar
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
