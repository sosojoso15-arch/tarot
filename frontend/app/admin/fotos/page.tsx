'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function FotosAdminPage() {
  const [tarotistas, setTarotistas] = useState<any[]>([]);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTarotistas();
  }, []);

  const fetchTarotistas = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tarotistas/available`);
      const data = await response.json();
      if (data.success) {
        setTarotistas(data.data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (taroistaId: string, taroistaNombre: string, file: File) => {
    if (!file) return;

    setUploading(prev => ({ ...prev, [taroistaId]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/api/uploads/tarotista/${taroistaId}`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Actualizar estado local
      setTarotistas(prev =>
        prev.map(t => t.id === taroistaId ? { ...t, imagen_url: result.data.imageUrl } : t)
      );

      alert(`✓ ${taroistaNombre} - Foto actualizada`);
    } catch (error: any) {
      console.error('Error:', error);
      alert(`✗ Error: ${error.message}`);
    } finally {
      setUploading(prev => ({ ...prev, [taroistaId]: false }));
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-[#FFFDF5] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">📸 Cargar Fotos Tarotistas</h1>

        <div className="space-y-4">
          {tarotistas.map(tarotista => (
            <div key={tarotista.id} className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black">{tarotista.nombre}</h3>
                {tarotista.imagen_url && (
                  <p className="text-sm text-green-600">✓ Foto cargada</p>
                )}
              </div>

              <label className="px-6 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition">
                {uploading[tarotista.id] ? 'Subiendo...' : 'Cargar Foto'}
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(tarotista.id, tarotista.nombre, file);
                  }}
                  disabled={uploading[tarotista.id]}
                />
              </label>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            💡 Carga JPG o PNG. Se guarda automático en Supabase y actualiza la BD.
          </p>
        </div>
      </div>
    </div>
  );
}
