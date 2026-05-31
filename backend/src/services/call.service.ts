import axios from 'axios';
import { ZADARMA_CONFIG, getZadarmaAuth, TAROTISTA_EXTENSIONS } from '../config/zadarma';
import { supabase } from '../config/database';
import { ApiError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const callService = {

  // Notificar a tarotista por llamada: "Tienes nuevo cliente de X minutos"
  async notifyTarotista(taroistaNombre: string, minutes: number) {
    try {
      const ext = TAROTISTA_EXTENSIONS[taroistaNombre.toLowerCase()];
      if (!ext) {
        logger.warn(`No extension found for tarotista: ${taroistaNombre}`);
        return;
      }

      const internalFrom = `${ZADARMA_CONFIG.pbxId}-${ext.padStart(3, '0')}`;
      const params: Record<string, string> = {
        from: internalFrom,
        to:   ZADARMA_CONFIG.phoneNumber,
        predicted: '1',
      };

      const response = await axios.post(
        `${ZADARMA_CONFIG.apiUrl}/request/callback/`,
        new URLSearchParams(params).toString(),
        {
          headers: {
            'Authorization': getZadarmaAuth(params),
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      logger.info(`Notified tarotista ${taroistaNombre} (ext ${ext}): ${minutes} min — ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      logger.warn(`Could not notify tarotista ${taroistaNombre}:`, error?.message);
    }
  },

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
          headers: { 'Authorization': getZadarmaAuth({}) }
        }
      );

      if (response.data.status === 'success') {
        // Registrar llamada
        const { data: callLog, error: logError } = await supabase
          .from('call_logs')
          .insert({
            session_id: sessionId,
            user_id: '', // será obtenido de session
            phone_called: tarotista.numero_telefono,
            zadarma_call_id: response.data.call_id,
            call_status: 'initiated',
            duration_seconds: session.minutes * 60,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (logError) {
          logger.warn('Error logging call:', logError);
        }

        // Programar colgar automático al terminar tiempo
        const durationSeconds = session.minutes * 60;
        setTimeout(() => {
          callService.hangupCall(response.data.call_id).catch(err => {
            logger.error('Error auto-hanging up call:', err);
          });
        }, durationSeconds * 1000);

        logger.info(`Llamada iniciada: ${response.data.call_id} (${session.minutes} min)`);
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
          headers: { 'Authorization': getZadarmaAuth({}) }
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
          headers: { 'Authorization': getZadarmaAuth({}) }
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
          updated_at: new Date().toISOString()
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
  },

  // Monitorear llamadas activas y colgar las que superan su duración
  async monitorActiveCalls() {
    try {
      // Obtener todas las llamadas en progreso
      const { data: activeCalls, error } = await supabase
        .from('call_logs')
        .select('id, duration_seconds, created_at, session_id, zadarma_call_id')
        .eq('call_status', 'initiated')
        .or('call_status.eq.connected');

      if (error) {
        logger.error('Error fetching active calls:', error);
        return;
      }

      if (!activeCalls || activeCalls.length === 0) {
        return;
      }

      const now = Date.now();

      for (const call of activeCalls) {
        const createdAt = new Date(call.created_at).getTime();
        const elapsedSeconds = (now - createdAt) / 1000;
        const limitSeconds = call.duration_seconds;

        // Si ha pasado el tiempo límite, colgar
        if (elapsedSeconds > limitSeconds) {
          try {
            await this.hangupCall(call.zadarma_call_id);
            logger.info(`Auto-hang up: ${call.zadarma_call_id} (${elapsedSeconds}s > ${limitSeconds}s)`);

            // Actualizar sesión
            await supabase
              .from('sessions')
              .update({ status: 'completed', minutes_used: limitSeconds / 60 })
              .eq('id', call.session_id);
          } catch (err) {
            logger.error('Error auto-hanging up call:', err);
          }
        }
      }
    } catch (error: any) {
      logger.error('Error monitoring active calls:', error?.message || error);
    }
  }
};
