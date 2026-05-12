'use client';

import { Globe, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-gray-700">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-6 h-6 text-purple-500" />
              <span className="font-bold text-lg">Tarot Espiritual</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Guía espiritual profesional a través de lecturas de tarot. Conecta con tarotistas certificadas 24/7.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#como-funciona" className="hover:text-white transition">Cómo Funciona</a></li>
              <li><a href="#tarotistas" className="hover:text-white transition">Nuestros Tarotistas</a></li>
              <li><a href="#testimonios" className="hover:text-white transition">Testimonios</a></li>
              <li><a href="#planes" className="hover:text-white transition">Planes</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition">Contacto</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wide">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-purple-700 hover:bg-purple-800 p-3 rounded-full transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-purple-700 hover:bg-purple-800 p-3 rounded-full transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-purple-700 hover:bg-purple-800 p-3 rounded-full transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <p>&copy; {currentYear} Tarot Espiritual. Todos los derechos reservados.</p>
          <p>Creado con intención espiritual</p>
        </div>
      </div>
    </footer>
  );
}
