'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Image from 'next/image';
import { Star, Power } from 'lucide-react';

export default function TaroistasAdminPage() {
  const [tarotistas, setTarotistas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTarotistas();
  }, []);

  const loadTarotistas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/tarotistas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setTarotistas(data.data || []);
      }
    } catch (error) {
      console.error('Error loading tarotistas:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (taroistaId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tarotistas/${taroistaId}/toggle`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      const data = await response.json();
      if (data.success) {
        setTarotistas(tarotistas.map(t =>
          t.id === taroistaId ? data.data : t
        ));
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Gestión de Tarotistas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tarotistas.map((tarotista) => (
            <div
              key={tarotista.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {/* Imagen */}
              <div className="relative h-40 bg-gray-100">
                {tarotista.imagen_url ? (
                  <img
                    src={tarotista.imagen_url}
                    alt={tarotista.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {tarotista.nombre.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{tarotista.nombre}</h3>
                <p className="text-amber-600 font-semibold text-sm mb-2">{tarotista.especialidad}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(tarotista.rating || 5)
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-xs">
                    {(tarotista.rating || 5).toFixed(1)}
                  </span>
                </div>

                {/* Status */}
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600 mb-2">Estado:</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${tarotista.activo ? 'text-green-600' : 'text-red-600'}`}>
                      {tarotista.activo ? '✓ Activa' : '✗ Inactiva'}
                    </span>
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleStatus(tarotista.id)}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-white text-sm ${
                    tarotista.activo
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {tarotista.activo ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
