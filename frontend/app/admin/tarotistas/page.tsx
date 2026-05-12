'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

export default function TaroistasAdmin() {
  const [tarotistas, setTarotistas] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: '',
    bio: '',
    numero_telefono: '',
    email: '',
    horario_inicio: '09:00',
    horario_fin: '22:00',
    precio_por_minuto: 0.50
  });

  // Obtener tarotistas
  useEffect(() => {
    fetchTarotistas();
  }, []);

  const fetchTarotistas = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/tarotistas/available');
      const data = await res.json();
      setTarotistas(data.tarotistas || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Crear tarotista
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/tarotistas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Tarotista creado!');
        setFormData({
          nombre: '',
          especialidad: '',
          bio: '',
          numero_telefono: '',
          email: '',
          horario_inicio: '09:00',
          horario_fin: '22:00',
          precio_por_minuto: 0.50
        });
        setShowForm(false);
        fetchTarotistas();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creando tarotista');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Gestionar Tarotistas</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Agregar Tarotista
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-8 rounded-xl mb-8 border border-purple-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Nuevo Tarotista</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700"
                required
              />
              <input
                type="text"
                placeholder="Especialidad"
                value={formData.especialidad}
                onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700"
                required
              />
              <input
                type="tel"
                placeholder="Número Teléfono"
                value={formData.numero_telefono}
                onChange={(e) => setFormData({...formData, numero_telefono: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700"
                required
              />
              <textarea
                placeholder="Biografía"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 md:col-span-2"
                rows={3}
              />
              <div className="flex gap-4">
                <input
                  type="time"
                  value={formData.horario_inicio}
                  onChange={(e) => setFormData({...formData, horario_inicio: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 flex-1"
                />
                <input
                  type="time"
                  value={formData.horario_fin}
                  onChange={(e) => setFormData({...formData, horario_fin: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 flex-1"
                />
              </div>
              <input
                type="number"
                placeholder="Precio por minuto"
                step="0.01"
                value={formData.precio_por_minuto}
                onChange={(e) => setFormData({...formData, precio_por_minuto: parseFloat(e.target.value)})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700"
              />

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-semibold flex-1"
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-8 py-3 rounded-lg hover:bg-gray-500 transition font-semibold flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Lista Tarotistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tarotistas.map((tarotista) => (
            <motion.div
              key={tarotista.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{tarotista.nombre}</h3>
                  <p className="text-purple-700 font-semibold text-sm">{tarotista.especialidad}</p>
                </div>
                <div className="flex gap-2">
                  {tarotista.disponible ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3">{tarotista.bio}</p>

              <div className="space-y-2 mb-4 text-sm text-gray-700">
                <p><strong>Email:</strong> {tarotista.email}</p>
                <p><strong>Teléfono:</strong> {tarotista.numero_telefono}</p>
                <p><strong>Rating:</strong> {tarotista.rating}/5 ({tarotista.numero_resenas})</p>
                <p><strong>Horario:</strong> {tarotista.horario_inicio} - {tarotista.horario_fin}</p>
                <p><strong>Precio/min:</strong> ${tarotista.precio_por_minuto}</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm font-semibold">
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 text-sm font-semibold">
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {tarotistas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay tarotistas aún. Crea uno para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
