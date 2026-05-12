'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PRICING } from '@/lib/constants';
import { useCreateSession, useCreateCheckout } from '@/lib/hooks';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const minutes = parseInt(searchParams.get('minutes') || '15') as 10 | 15 | 20 | 30;
  const taroistaId = searchParams.get('tarotista');
  const pricing = PRICING[minutes];

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const createSession = useCreateSession();
  const createCheckout = useCreateCheckout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create session
      const session = await createSession.mutateAsync({
        minutes,
        ...formData,
        tarotista_id: taroistaId,
      });

      // Create checkout
      const checkout = await createCheckout.mutateAsync(session.id);

      // Redirect to Stripe
      if (checkout.checkoutUrl) {
        window.location.href = checkout.checkoutUrl;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
    }
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Order Summary */}
            <div className="bg-white/80 border border-gray-200 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-8">Resumen de tu Compra</h2>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Consulta de tarot</span>
                  <span className="text-black font-medium">{minutes} minutos</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-black">Total</span>
                  <span className="text-2xl font-bold text-purple-600">{pricing.display}</span>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-lg">✓</span>
                  <span className="text-gray-700">Sesión privada con tarotista certificada</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-lg">✓</span>
                  <span className="text-gray-700">Válido por 24 horas desde la compra</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-lg">✓</span>
                  <span className="text-gray-700">Pago seguro garantizado con Stripe</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-white/80 border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-black mb-8">Información de Contacto</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-black placeholder-gray-400 transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-black placeholder-gray-400 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-8 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isProcessing ? 'Procesando...' : `Proceder al Pago - ${pricing.display}`}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Al hacer clic en "Proceder al Pago", aceptas nuestros Términos y Condiciones
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
