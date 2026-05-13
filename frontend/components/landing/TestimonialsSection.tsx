'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: 'María Delgado',
      role: '',
      content: 'La lectura fue increíblemente precisa. Me ayudó a ver mi situación laboral desde una perspectiva completamente nueva. La recomiendo sin dudas.',
      rating: 5
    },
    {
      name: 'Carlos Mendez',
      role: '',
      content: 'Profesional, acertada y transformadora. Esta experiencia superó mis expectativas. Definitivamente vuelvo a hacer una consulta.',
      rating: 5
    },
    {
      name: 'Lucía Rivera',
      role: '',
      content: 'La tarotista captó cosas que yo nunca mencioné. Sentí una conexión espiritual genuina. Experiencia maravillosa y sanadora.',
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Testimonios de Nuestros Clientes
          </h2>
          <p className="text-gray-600 text-lg">
            Miles de personas han transformado sus vidas con nuestros tarotistas
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 border border-purple-200 hover:shadow-lg transition"
            >
              {/* Rating */}
              <div className="flex gap-2 mb-6">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-purple-200 pt-4">
                <p className="text-gray-900 font-bold text-sm">{testimonial.name}</p>
                {testimonial.role && <p className="text-gray-600 text-xs">{testimonial.role}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
