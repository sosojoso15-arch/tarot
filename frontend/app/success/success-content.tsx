'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from '@/lib/hooks';
import { ZADARMA_PHONE_NUMBER } from '@/lib/constants';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { useState, useEffect } from 'react';

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { data: session, isLoading } = useSession(sessionId);
  const [chatSpecialist, setChatSpecialist] = useState('');

  useEffect(() => {
    const sp   = localStorage.getItem('vda_pending_specialist');
    const mins = localStorage.getItem('vda_pending_minutes');
    if (sp) {
      localStorage.removeItem('vda_pending_specialist');
      localStorage.removeItem('vda_pending_minutes');
      localStorage.setItem(`vda_chat_unlocked_${sp}`, 'true');
      if (mins) localStorage.setItem(`vda_chat_minutes_${sp}`, mins);
      setChatSpecialist(sp);
    }
  }, []);

  return (
    <div>
      <Header />

      <main className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold mb-4">¡Pago Confirmado!</h1>
            <p className="text-xl text-gray-300">
              Tu sesión de tarot está lista. Sigue las instrucciones abajo para tu consulta.
            </p>
          </motion.div>

          {!isLoading && session && (
            <>
              {/* Instructions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card mb-8 border-mystical-500/50"
              >
                <h2 className="text-2xl font-bold mb-6">📞 Instrucciones para Tu Lectura</h2>

                <div className="space-y-6">
                  <div className="bg-mystical-500/10 border border-mystical-500/30 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 text-mystical-300">Número de Teléfono</h3>
                    <p className="text-3xl font-bold text-white mb-3">{ZADARMA_PHONE_NUMBER}</p>
                    <p className="text-gray-300 text-sm">
                      Llama a este número para iniciar tu sesión de tarot.
                    </p>
                  </div>

                  <div className="bg-mystical-500/10 border border-mystical-500/30 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 text-mystical-300">Código de Sesión (Opcional)</h3>
                    <p className="text-3xl font-bold text-white font-mono">{session.session_code}</p>
                    <p className="text-gray-300 text-sm mt-2">
                      Puedes proporcionarlo cuando llamés para identificar tu sesión.
                    </p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3">Detalles Importantes</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>✓ Duración: <span className="font-bold">{session.minutes} minutos</span></li>
                      <li>✓ Válido hasta: <span className="font-bold">{new Date(session.expires_at).toLocaleString('es-ES')}</span></li>
                      <li>✓ Disponible 24/7</li>
                      <li>✓ Tu tarotista está esperando</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card"
              >
                <h3 className="text-xl font-bold mb-4">Próximos Pasos</h3>

                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-mystical-500 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-bold">Llama al número anterior</p>
                      <p className="text-gray-400 text-sm">Marca el número de teléfono proporcionado arriba</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-mystical-500 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-bold">Proporciona tu código (opcional)</p>
                      <p className="text-gray-400 text-sm">Menciona tu código de sesión si lo deseas</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-mystical-500 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-bold">Disfruta tu lectura</p>
                      <p className="text-gray-400 text-sm">Prepárate mentalmente y haz tus preguntas</p>
                    </div>
                  </li>
                </ol>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-center text-gray-400 text-sm mb-4">
                    ¿Dudas o problemas? Contacta a nuestro soporte
                  </p>
                  <button className="w-full btn-secondary">
                    Contactar Soporte
                  </button>
                </div>
              </motion.div>

              {/* Chat Unlock Button */}
              {chatSpecialist && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ marginTop: '24px', background: 'linear-gradient(180deg,#0d1a37,#0a1530)', border: '1px solid rgba(214,169,87,.4)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}
                >
                  <p style={{ color: '#d6c08a', fontSize: '13px', letterSpacing: '.08em', marginBottom: '8px' }}>¡PAGO CONFIRMADO!</p>
                  <p style={{ color: '#f1deae', fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', marginBottom: '18px' }}>
                    Tu consulta con {chatSpecialist} está lista
                  </p>
                  <Link href={`/chat?para=${chatSpecialist}`} style={{ display: 'inline-block', background: 'linear-gradient(180deg,#c89a47,#a87a30)', color: '#fff8e1', padding: '14px 32px', borderRadius: '8px', fontFamily: 'Cinzel, serif', fontSize: '15px', textDecoration: 'none', letterSpacing: '.1em' }}>
                    ABRIR CHAT CON {chatSpecialist.toUpperCase()}
                  </Link>
                </motion.div>
              )}

              {/* Back Home */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-8"
              >
                <Link href="/" className="text-mystical-300 hover:text-mystical-400 transition">
                  ← Volver a Inicio
                </Link>
              </motion.div>
            </>
          )}

          {isLoading && (
            <div className="card text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mystical-500 mx-auto mb-4"></div>
              <p>Cargando información de tu sesión...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
