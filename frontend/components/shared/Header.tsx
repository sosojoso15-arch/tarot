'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-2xl font-black">
          <Image src="/logo.jpeg" alt="Logo" width={50} height={50} className="rounded" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            VOCES DEL ALMA
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#pricing" className="text-gray-300 hover:text-white transition font-medium text-sm">
            Precios
          </a>
          <a href="#features" className="text-gray-300 hover:text-white transition font-medium text-sm">
            Características
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white transition font-medium text-sm">
            Contacto
          </a>
          <Link
            href="/checkout?minutes=15"
            className="group relative px-6 py-2 text-sm font-bold text-white rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300"></div>
            <span className="relative">Comenzar</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-black/50 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              <a href="#pricing" className="text-gray-300 hover:text-white transition font-medium">
                Precios
              </a>
              <a href="#features" className="text-gray-300 hover:text-white transition font-medium">
                Características
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition font-medium">
                Contacto
              </a>
              <Link
                href="/checkout?minutes=15"
                className="group relative px-6 py-2 text-sm font-bold text-white rounded-lg overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                <span className="relative">Comenzar</span>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
