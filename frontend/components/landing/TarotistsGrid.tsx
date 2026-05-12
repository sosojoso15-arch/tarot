'use client';

import { motion } from 'framer-motion';
import { Star, MessageCircle, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const tarotistas = [
  {
    id: 1,
    name: 'María Delgado',
    specialty: 'Tarot Completo',
    rating: 4.9,
    reviews: 328,
    price: '$9.99',
    priceMin: '10 min',
    available: true,
    initials: 'MD',
  },
  {
    id: 2,
    name: 'Lucía Rivera',
    specialty: 'Lectura de Amor',
    rating: 5.0,
    reviews: 412,
    price: '$9.99',
    priceMin: '10 min',
    available: true,
    initials: 'LR',
  },
  {
    id: 3,
    name: 'Carmen López',
    specialty: 'Videncia Espiritual',
    rating: 4.8,
    reviews: 267,
    price: '$14.99',
    priceMin: '15 min',
    available: true,
    initials: 'CL',
  },
  {
    id: 4,
    name: 'Sofía Martínez',
    specialty: 'Tarot Futuro',
    rating: 4.9,
    reviews: 356,
    price: '$9.99',
    priceMin: '10 min',
    available: true,
    initials: 'SM',
  },
  {
    id: 5,
    name: 'Rosa García',
    specialty: 'Consulta Integral',
    rating: 4.7,
    reviews: 189,
    price: '$14.99',
    priceMin: '15 min',
    available: false,
    initials: 'RG',
  },
  {
    id: 6,
    name: 'Isabel Rodríguez',
    specialty: 'Lectura Profunda',
    rating: 5.0,
    reviews: 298,
    price: '$19.99',
    priceMin: '20 min',
    available: true,
    initials: 'IR',
  },
  {
    id: 7,
    name: 'Patricia Sánchez',
    specialty: 'Astrología Tarot',
    rating: 4.9,
    reviews: 245,
    price: '$14.99',
    priceMin: '15 min',
    available: true,
    initials: 'PS',
  },
  {
    id: 8,
    name: 'Alejandra Ruiz',
    specialty: 'Lectura Espiritual',
    rating: 5.0,
    reviews: 378,
    price: '$19.99',
    priceMin: '20 min',
    available: true,
    initials: 'AR',
  },
];

export default function TarotistsGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 100);
    }
  };

  // Autoplay - scroll lento y fluido continuo
  useEffect(() => {
    let scrollSpeed = 0.5; // píxeles por frame
    let animationFrameId: number;

    const autoScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // Si llegó al final, reinicia
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section id="tarotistas" className="bg-gradient-to-b from-purple-50 to-white py-20 px-6">
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

        {/* Carousel Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/3 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition"
            >
              <ChevronLeft className="w-6 h-6 text-purple-700" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/3 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition"
            >
              <ChevronRight className="w-6 h-6 text-purple-700" />
            </button>
          )}

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-8"
            style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tarotistas.map((tarotista, index) => (
              <motion.div
                key={tarotista.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition border border-purple-100"
              >
                {/* Header with gradient */}
                <div className="h-24 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 relative">
                  {tarotista.available && (
                    <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      Disponible
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative px-6 pb-6">
                  <div className="flex justify-center -mt-12 mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
                      {tarotista.initials}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{tarotista.name}</h3>
                    <p className="text-purple-700 font-semibold text-sm mb-3">{tarotista.specialty}</p>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-gold-500 text-gold-500"
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 text-xs font-medium">
                        {tarotista.rating} ({tarotista.reviews})
                      </span>
                    </div>

                    {/* Price tag */}
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 px-4 rounded-full inline-block mb-5">
                      <div className="font-bold text-sm">{tarotista.price}</div>
                      <div className="text-xs opacity-90">{tarotista.priceMin}</div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2 font-semibold text-xs">
                        <Phone className="w-4 h-4" />
                        Llamar
                      </button>
                      <button className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition flex items-center justify-center gap-2 font-semibold text-xs">
                        <MessageCircle className="w-4 h-4" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-8">
          <p className="text-gray-500 text-sm">Desliza para ver más tarotistas →</p>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
