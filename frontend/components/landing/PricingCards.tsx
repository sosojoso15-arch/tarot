'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PRICING } from '@/lib/constants';

interface PricingCardsProps {
  onSelect?: (minutes: 10 | 15 | 20 | 30) => void;
}

export default function PricingCards({ onSelect }: PricingCardsProps) {
  const plans = Object.values(PRICING);
  const highlighted = 1; // Highlight the 15-minute plan

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.minutes}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative group ${
            index === highlighted ? 'md:scale-105' : ''
          }`}
        >
          {/* Card */}
          <div className={`card relative transition-all duration-300 ${
            index === highlighted
              ? 'border-blue-400 shadow-lg'
              : 'border-gray-200 hover:shadow-md'
          }`}>

            {/* Best Value Badge */}
            {index === highlighted && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide">
                  Más Popular
                </span>
              </div>
            )}

            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-2 text-center text-gray-900">
                {plan.minutes}
              </h3>
              <p className="text-gray-600 text-center mb-6 font-medium">
                Minutos de Consulta
              </p>

              <div className="mb-6 text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {plan.display}
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  USD
                </p>
              </div>

              <ul className="space-y-3 mb-8 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{plan.minutes} minutos de consulta</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Tarotista certificada</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Sesión privada</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Válido 24 horas</span>
                </li>
              </ul>

              <Link
                href={`/checkout?minutes=${plan.minutes}`}
                onClick={() => onSelect?.(plan.minutes as any)}
                className={`block w-full text-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                  index === highlighted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Seleccionar Plan
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
