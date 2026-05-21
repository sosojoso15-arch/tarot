'use client';

import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const taroistaStatsData: Record<string, any> = {
  '1': {
    consultas: '40.632',
    aciertos: '99.9%',
    experiencia: '39 años',
    opiniones: [
      { nombre: 'Marta', hace: '1 hora', texto: 'Silvia es maravillosa, su empatía y su don especial para conectar con las personas la hacen única. Me ayudó muchísimo a entender mi situación.', estrellas: 5 },
      { nombre: 'Ana', hace: '3 horas', texto: 'Increíble su consulta, todo lo que me dijo se cumplió. Muy acertada y con una conexión impresionante. 100% recomendada.', estrellas: 5 }
    ]
  },
  '2': {
    consultas: '35.420',
    aciertos: '99.7%',
    experiencia: '34 años',
    opiniones: [
      { nombre: 'Laura', hace: '2 horas', texto: 'Gloria es increíble, la conocco hace años y siempre me da soluciònes muy concretas y acertadas.', estrellas: 5 },
      { nombre: 'Carlos', hace: '5 horas', texto: 'Muy profesional y empática. Me ayudó a ver claro en una situación confusa.', estrellas: 5 }
    ]
  },
  '3': {
    consultas: '28.150',
    aciertos: '98.8%',
    experiencia: '26 años',
    opiniones: [
      { nombre: 'Patricia', hace: '30 minutos', texto: 'Marian es excelente, muy clara y directa. La recomiendo sin dudarlo.', estrellas: 5 },
      { nombre: 'Diego', hace: '4 horas', texto: 'Tuve mi primera consulta con Marian y fue rápida, directa y muy informativa.', estrellas: 5 }
    ]
  },
  '4': {
    consultas: '31.890',
    aciertos: '99.4%',
    experiencia: '29 años',
    opiniones: [
      { nombre: 'Elena', hace: '45 minutos', texto: 'Excelente en todos los sentidos. La recomiendo, acudo a ella siempre que tengo dudas.', estrellas: 5 },
      { nombre: 'Roberto', hace: '3 horas', texto: 'Me encantó hablar con Paulina, transmite mucha paz y confianza. Sin duda volveré.', estrellas: 5 }
    ]
  },
  '5': {
    consultas: '26.750',
    aciertos: '99.2%',
    experiencia: '25 años',
    opiniones: [
      { nombre: 'Sofía', hace: '1 hora', texto: 'Paola Andrea es increíble, sus lecturas son muy precisas y detalladas. Totalmente recomendada.', estrellas: 5 },
      { nombre: 'Juan', hace: '2 horas', texto: 'Excelente consulta, me ayudó a ver las cosas desde otra perspectiva. Muy profesional.', estrellas: 5 }
    ]
  },
  '6': {
    consultas: '29.450',
    aciertos: '98.9%',
    experiencia: '27 años',
    opiniones: [
      { nombre: 'Daniela', hace: '30 minutos', texto: 'Mercedes es maravillosa, tiene un don especial para conectar. Me siento escuchada y comprendida.', estrellas: 5 },
      { nombre: 'Andrés', hace: '2 horas', texto: 'Sus consultas simentales son las mejores. Recomiendo sin dudarlo a cualquiera que la necesite.', estrellas: 5 }
    ]
  },
  '7': {
    consultas: '24.320',
    aciertos: '99.1%',
    experiencia: '23 años',
    opiniones: [
      { nombre: 'Valeria', hace: '1 hora', texto: 'Marcos es excepcional, sus lecturas nocturnas tienen una vibra muy especial y profunda.', estrellas: 5 },
      { nombre: 'Carlos', hace: '3 horas', texto: 'Acompañamiento nocturno impecable. Me siento transformado después de hablar con él.', estrellas: 5 }
    ]
  },
  '8': {
    consultas: '27.890',
    aciertos: '99.3%',
    experiencia: '26 años',
    opiniones: [
      { nombre: 'Isabela', hace: '45 minutos', texto: 'Raquel tiene un don natural para la lectura intuitiva. Sus interpretaciones son profundas y acertadas.', estrellas: 5 },
      { nombre: 'Miguel', hace: '2 horas', texto: 'Excelente tarotista intuitiva. Me ayudó a entender mensajes que necesitaba escuchar.', estrellas: 5 }
    ]
  },
  '9': {
    consultas: '23.560',
    aciertos: '99.0%',
    experiencia: '22 años',
    opiniones: [
      { nombre: 'Patricia', hace: '1 hora', texto: 'Yeyo ofrece orientación espiritual nocturna excepcional. Sus mensajes llegan al alma.', estrellas: 5 },
      { nombre: 'Diego', hace: '2 horas', texto: 'La orientación espiritual que recibí fue transformadora. Muy recomendado para noches.', estrellas: 5 }
    ]
  },
  '10': {
    consultas: '32.100',
    aciertos: '99.5%',
    experiencia: '31 años',
    opiniones: [
      { nombre: 'Cristina', hace: '30 minutos', texto: 'Verónica es una canalización espiritual pura. Sus mensajes traen claridad y paz.', estrellas: 5 },
      { nombre: 'Fernando', hace: '3 horas', texto: 'Su capacidad de canalización espiritual es extraordinaria. Me cambió la perspectiva de todo.', estrellas: 5 }
    ]
  }
};

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
    <section id="tarotistas" className="bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-yellow-500 text-2xl">✦</div>
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500">TAROTISTAS</h2>
            <div className="text-yellow-500 text-2xl">✦</div>
          </div>
          <p className="text-gray-300 text-lg">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/70 hover:bg-slate-700 p-2 rounded-full shadow-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-500" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/70 hover:bg-slate-700 p-2 rounded-full shadow-lg transition"
          >
            <ChevronRight className="w-6 h-6 text-yellow-500" />
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

              const taroistaIndex = String(index + 1);
              const stats = taroistaStatsData[taroistaIndex];
              const firstOpinion = stats?.opiniones?.[0];

              return (
                <motion.div
                  key={`${tarotista.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 border border-yellow-500/40 rounded-2xl p-5 flex-shrink-0 w-72 hover:border-yellow-500/60 transition flex flex-col items-center"
                >
                  {/* Foto circular - más grande */}
                  <div className="mb-4">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-500 flex-shrink-0">
                      {tarotista.imagen_url ? (
                        <img
                          src={tarotista.imagen_url}
                          alt={tarotista.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                          <span className="text-5xl font-bold text-white">{initials}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nombre */}
                  <h3 className="text-2xl font-bold text-yellow-500 text-center mb-1">{tarotista.nombre}</h3>

                  {/* Especialidad */}
                  <p className="text-yellow-400 font-semibold text-xs text-center mb-3">{tarotista.especialidad}</p>

                  {/* Divider */}
                  <div className="text-yellow-500 text-sm mb-3">✦</div>

                  {/* Opinion */}
                  {firstOpinion && (
                    <div className="mb-4 flex-grow flex flex-col items-center justify-center px-2">
                      <p className="text-yellow-500 text-lg mb-1">❝</p>
                      <p className="text-yellow-400 text-xs text-center leading-relaxed italic">
                        {firstOpinion.texto}
                      </p>
                      <p className="text-yellow-500 mt-1 text-sm">✦</p>
                    </div>
                  )}

                  {/* Botón Ver Perfil */}
                  <button
                    onClick={() => openModal(tarotista)}
                    className="w-full border-2 border-yellow-500 text-yellow-500 font-bold py-2 rounded-lg hover:bg-yellow-500/10 transition uppercase text-xs tracking-wide"
                  >
                    VER PERFIL COMPLETO
                  </button>
                </motion.div>
              );
            }) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Estilo Wengo Completo */}
      {modalOpen && selectedTarotista && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-2 md:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-950 rounded-3xl w-full max-w-5xl my-8 border border-yellow-500/40 relative"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-bold z-10"
            >
              ✕
            </button>

            <div className="p-8">
              {/* Top Section - Photo + Info + Consultas Box */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {/* Photo - Left */}
                <div className="flex justify-center items-start">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl flex-shrink-0 relative">
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
                  </div>
                </div>

                {/* Info - Center */}
                <div className="flex flex-col justify-start">
                  <h2 className="text-3xl font-bold text-yellow-500 mb-1">{selectedTarotista.nombre}</h2>
                  <p className="text-yellow-400 font-semibold text-base mb-4">{selectedTarotista.especialidad}</p>

                  {/* Opinion Quote */}
                  {taroistaStatsData[String(selectedTarotista.id % 10 || 10)]?.opiniones?.[0] && (
                    <div className="mb-4">
                      <p className="text-yellow-400 text-3xl mb-2">❝</p>
                      <p className="text-gray-200 text-sm leading-relaxed italic">
                        {taroistaStatsData[String(selectedTarotista.id % 10 || 10)]?.opiniones?.[0].texto}
                      </p>
                      <p className="text-yellow-400 text-xs mt-2">
                        por {taroistaStatsData[String(selectedTarotista.id % 10 || 10)]?.opiniones?.[0].nombre}, {taroistaStatsData[String(selectedTarotista.id % 10 || 10)]?.opiniones?.[0].hace}
                      </p>
                    </div>
                  )}
                </div>

                {/* Consultas Box - Right */}
                <div className="border-2 border-yellow-500/40 rounded-2xl p-5 bg-slate-900/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-yellow-500 font-bold text-sm mb-4 text-center uppercase tracking-wide">✦ CONSULTAS ✦</h3>

                    {/* Pricing Options */}
                    <div className="space-y-2 mb-4">
                      {[
                        { minutes: 15, price: '10 €' },
                        { minutes: 20, price: '15 €' },
                        { minutes: 30, price: '20 €' }
                      ].map(pkg => (
                        <div
                          key={pkg.minutes}
                          onClick={() => setSelectedMinutes({ ...selectedMinutes, [selectedTarotista.id]: pkg.minutes })}
                          className={`py-2 px-3 rounded-lg font-semibold transition border cursor-pointer flex justify-between items-center text-xs ${
                            selectedMinutes[selectedTarotista.id] === pkg.minutes
                              ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500'
                              : 'bg-transparent text-gray-300 border-yellow-500/30 hover:border-yellow-500'
                          }`}
                        >
                          <span>{pkg.minutes} min</span>
                          <span>{pkg.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Contact Options */}
                    <p className="text-yellow-400 text-xs mb-3 text-center">Forma consulta</p>
                    <div className="space-y-1.5 mb-4">
                      <button className="w-full border-2 border-yellow-500/40 text-yellow-500 py-1.5 px-3 rounded-lg hover:border-yellow-500 transition text-xs font-semibold">
                        ☎️ TELÉFONO
                      </button>
                      <button className="w-full border-2 border-yellow-500/40 text-yellow-500 py-1.5 px-3 rounded-lg hover:border-yellow-500 transition text-xs font-semibold">
                        💬 CHAT
                      </button>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/checkout?minutes=${selectedMinutes[selectedTarotista.id] || 15}&tarotista=${selectedTarotista.id}`}
                    className="w-full bg-yellow-600 hover:bg-yellow-500 text-slate-950 py-2 rounded-lg font-bold transition text-center block uppercase text-xs"
                  >
                    CONSULTAR AHORA
                  </Link>
                </div>
              </div>

              {/* Stats Boxes */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="border-2 border-yellow-500/40 rounded-xl p-4 text-center bg-slate-900/30">
                  <p className="text-yellow-500 text-3xl font-bold">💬 {(taroistaStatsData[String(selectedTarotista.id % 10 || 10)] || taroistaStatsData['1']).consultas}</p>
                  <p className="text-gray-400 text-xs mt-2">consultas</p>
                </div>
                <div className="border-2 border-yellow-500/40 rounded-xl p-4 text-center bg-slate-900/30">
                  <p className="text-yellow-500 text-3xl font-bold">😊 {(taroistaStatsData[String(selectedTarotista.id % 10 || 10)] || taroistaStatsData['1']).aciertos}</p>
                  <p className="text-gray-400 text-xs mt-2">de aciertos</p>
                </div>
                <div className="border-2 border-yellow-500/40 rounded-xl p-4 text-center bg-slate-900/30">
                  <p className="text-yellow-500 text-3xl font-bold">⭐ {(taroistaStatsData[String(selectedTarotista.id % 10 || 10)] || taroistaStatsData['1']).experiencia}</p>
                  <p className="text-gray-400 text-xs mt-2">de experiencia</p>
                </div>
              </div>

              {/* Profile & Agenda - 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Profile */}
                {selectedTarotista.bio && (
                  <div className="border-2 border-yellow-500/40 rounded-xl p-6 bg-slate-900/30">
                    <h3 className="text-yellow-500 font-bold text-lg mb-4 uppercase tracking-wide">✦ EL PERFIL DE {selectedTarotista.nombre.toUpperCase()} ✦</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{selectedTarotista.bio}</p>
                  </div>
                )}

                {/* Agenda */}
                <div className="border-2 border-yellow-500/40 rounded-xl p-6 bg-slate-900/30">
                  <h3 className="text-yellow-500 font-bold text-lg mb-4 uppercase tracking-wide">✦ AGENDA DE {selectedTarotista.nombre.toUpperCase()} ✦</h3>
                  <p className="text-gray-400 text-xs mb-4">Estoy disponible inmediatamente hasta las 24:00.</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'].map((day) => (
                      <div key={day} className="border border-yellow-500/30 rounded p-2 text-center">
                        <p className="text-yellow-500 font-bold mb-1 text-xs">{day}</p>
                        <p className="text-gray-400 text-xs leading-tight">00:00 - 00:15</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Opinions/Comments */}
              {taroistaStatsData[String(selectedTarotista.id % 10 || 10)]?.opiniones && (
                <div>
                  <div className="text-center mb-8">
                    <h3 className="text-yellow-500 font-bold text-lg uppercase tracking-wide">✦ COMENTARIOS DE MIS LLAMADAS ✦</h3>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <span className="text-yellow-500 font-bold">4.9/5</span>
                      <span className="text-gray-400 text-xs">Basado en {(taroistaStatsData[String(selectedTarotista.id % 10 || 10)] || taroistaStatsData['1']).consultas} opiniones</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {taroistaStatsData[String(selectedTarotista.id % 10 || 10)].opiniones.slice(0, 3).map((opinion: any, idx: number) => (
                      <div key={idx} className="border-2 border-yellow-500/30 rounded-xl p-4 bg-slate-900/30">
                        <div className="flex gap-0.5 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < opinion.estrellas
                                  ? 'fill-yellow-500 text-yellow-500'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-yellow-400 text-2xl mb-2">❝</p>
                        <p className="text-gray-300 text-xs leading-relaxed mb-3">"{opinion.texto}"</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                            {opinion.nombre[0]}
                          </div>
                          <div>
                            <p className="text-white font-bold text-xs">{opinion.nombre}</p>
                            <p className="text-gray-400 text-xs">Hace {opinion.hace}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
