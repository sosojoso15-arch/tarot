'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Heart } from 'lucide-react';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: 'Marta, Valencia',
      content: 'Gloria me ayudó a entender lo que estaba viviendo. Su lectura fue clara, profunda y muy certera.',
      rating: 5
    },
    {
      name: 'Lucía, Madrid',
      content: 'Tenía dudas sobre mi relación y salí de la consulta con mucha paz y claridad. Gracias de corazón.',
      rating: 5
    },
    {
      name: 'Ana, Barcelona',
      content: 'La mejor lectura que he tenido. Conecta desde el alma y te dice exactamente lo que necesitas oír.',
      rating: 5
    }
  ];

  return (
    <section ref={ref} id="testimonios" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        {/* Testimonials Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 border border-gray-200 relative hover:shadow-lg transition"
            >
              {/* Heart Icon */}
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                <Heart className="w-5 h-5" />
              </button>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <p className="text-gray-900 font-bold text-sm">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
