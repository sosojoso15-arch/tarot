import { supabase } from '../config/database';
import { ApiError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const taroistaService = {
  // Obtener todos los tarotistas disponibles
  async getAvailableTarotistas() {
    try {
      const { data, error } = await supabase
        .from('tarotistas')
        .select('*')
        .eq('disponible', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      logger.error('Error getting tarotistas:', error);
      throw new ApiError(500, 'Error obteniendo tarotistas');
    }
  },

  // Obtener tarotista por ID
  async getTaroistaById(id: string) {
    try {
      const { data, error } = await supabase
        .from('tarotistas')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        throw new ApiError(404, 'Tarotista no encontrado');
      }
      return data;
    } catch (error) {
      logger.error('Error getting tarotista:', error);
      throw error;
    }
  },

  // Crear nuevo tarotista
  async createTarotista(taroistaData: any) {
    try {
      const { data, error } = await supabase
        .from('tarotistas')
        .insert([{
          nombre: taroistaData.nombre,
          especialidad: taroistaData.especialidad,
          bio: taroistaData.bio,
          numero_telefono: taroistaData.numero_telefono,
          email: taroistaData.email,
          horario_inicio: taroistaData.horario_inicio,
          horario_fin: taroistaData.horario_fin,
          precio_por_minuto: taroistaData.precio_por_minuto || 0.50,
          disponible: true
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error creating tarotista:', error);
      throw new ApiError(500, 'Error creando tarotista');
    }
  },

  // Actualizar tarotista
  async updateTarotista(id: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('tarotistas')
        .update({
          ...updateData,
          updated_at: new Date()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error updating tarotista:', error);
      throw new ApiError(500, 'Error actualizando tarotista');
    }
  },

  // Marcar como ocupado/disponible
  async setTaroistaAvailability(id: string, ocupado: boolean) {
    try {
      const { data, error } = await supabase
        .from('tarotistas')
        .update({ ocupado })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error setting availability:', error);
      throw new ApiError(500, 'Error actualizando disponibilidad');
    }
  },

  // Obtener tarotista disponible (para asignar llamada)
  async getAvailableTaroista(especialidad?: string) {
    try {
      let query = supabase
        .from('tarotistas')
        .select('*')
        .eq('disponible', true)
        .eq('ocupado', false);

      if (especialidad) {
        query = query.ilike('especialidad', `%${especialidad}%`);
      }

      const { data, error } = await query
        .order('numero_resenas', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        throw new ApiError(404, 'No hay tarotistas disponibles');
      }
      return data;
    } catch (error) {
      logger.error('Error getting available tarotista:', error);
      throw error;
    }
  },

  // Registrar sesión de tarotista
  async createTaroistaSession(taroistaId: string, sessionId: string, minutes: number) {
    try {
      const { data, error } = await supabase
        .from('tarotista_sesiones')
        .insert([{
          tarotista_id: taroistaId,
          session_id: sessionId,
          duracion_minutos: minutes,
          estado: 'pendiente',
          fecha_inicio: new Date()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error creating tarotista session:', error);
      throw new ApiError(500, 'Error registrando sesión');
    }
  },

  // Obtener sesiones de tarotista
  async getTaroistaSessions(taroistaId: string) {
    try {
      const { data, error } = await supabase
        .from('tarotista_sesiones')
        .select('*')
        .eq('tarotista_id', taroistaId)
        .order('fecha_inicio', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      logger.error('Error getting sessions:', error);
      throw new ApiError(500, 'Error obteniendo sesiones');
    }
  }
};
