import axios from 'axios';
import { ZADARMA_CONFIG, getZadarmaAuthHeaders } from '../config/zadarma';
import { supabase } from '../config/database';
import { ApiError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const callService = {
  // Iniciar llamada entre cliente y tarotista
  async initiateCall(sessionId: string, clientPhone: string, taroistaId: string) {
    try {
      // Obtener tarotista
      const { data: tarotista, error: taroError } = await supabase
        .from('tarotistas')
        .select('numero_telefono')
        .eq('id', taroistaId)
        .single();

      if (taroError || !tarotista) {
        throw new ApiError(404, 'Tarotista no encontrado');
      }

      // Obtener sesión para duración
      const { data: session, error: sessError } = await supabase
        .from('sessions')
        .select('minutes')
        .eq('id', sessionId)
        .single();

      if (sessError || !session) {
        throw new ApiError(404, 'Sesión no encontrada');
      }

      // Hacer llamada a través de Zadarma
      const callData = {
        to: tarotista.numero_telefono,
        from: ZADARMA_CONFIG.phoneNumber,
        callback_phone: clientPhone,
        record: true,
        duration_limit: session.minutes * 60 // convertir minutos a segundos
      };

      const response = await axios.post(
        `${ZADARMA_CONFIG.apiUrl}/call/`,
        callData,
        {
          headers: getZadarmaAuthHeaders()
        }
      );

      if (response.data.status === 'success') {
        // Registrar llamada
        const { data: callLog, error: logError } = await supabase
          .from('call_logs')
          .insert({
            session_id: sessionId,
            tarotista_id: taroistaId,
            client_phone: clientPhone,
            tarotista_phone: tarotista.numero_telefono,
            zadarma_call_id: response.data.call_id,
            status: 'initiated',
            duration_limit: session.minutes * 60,
            started_at: new Date().toISOString()
          })
          .select()
          .single();

        if (logError) {
          logger.warn('Error logging call:', logError);
        }

        logger.info(`Llamada iniciada: ${response.data.call_id}`);
        return {
          success: true,
          callId: response.data.call_id,
          duration: session.minutes
        };
      } else {
        throw new Error(response.data.error || 'Error iniciando llamada');
      }
    } catch (error: any) {
      logger.error('Error initiating call:', error?.message || error);
      throw new ApiError(500, 'Error iniciando llamada');
    }
  },

  // Obtener estado de llamada
  async getCallStatus(callId: string) {
    try {
      const response = await axios.get(
        `${ZADARMA_CONFIG.apiUrl}/call/${callId}/`,
        {
          headers: getZadarmaAuthHeaders()
        }
      );

      return response.data;
    } catch (error: any) {
      logger.error('Error getting call status:', error?.message || error);
      throw new ApiError(500, 'Error obteniendo estado de llamada');
    }
  },

  // Colgar llamada
  async hangupCall(callId: string) {
    try {
      const response = await axios.post(
        `${ZADARMA_CONFIG.apiUrl}/call/${callId}/hangup/`,
        {},
        {
          headers: getZadarmaAuthHeaders()
        }
      );

      logger.info(`Llamada colgada: ${callId}`);
      return response.data;
    } catch (error: any) {
      logger.error('Error hanging up call:', error?.message || error);
      throw new ApiError(500, 'Error colgando llamada');
    }
  },

  // Webhook para actualizaciones de Zadarma
  async handleZadarmaWebhook(webhookData: any) {
    try {
      const { call_id, status, duration, cost } = webhookData;

      // Actualizar log de llamada
      const { error } = await supabase
        .from('call_logs')
        .update({
          call_status: status,
          duration_seconds: duration,
          cost,
          ended_at: new Date().toISOString()
        })
        .eq('zadarma_call_id', call_id);

      if (error) {
        logger.warn('Error updating call log:', error);
      }

      logger.info(`Webhook recibido: ${call_id} - ${status}`);
      return { success: true };
    } catch (error: any) {
      logger.error('Error handling webhook:', error?.message || error);
      throw new ApiError(500, 'Error procesando webhook');
    }
  }
};
