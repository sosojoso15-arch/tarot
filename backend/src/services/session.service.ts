import { supabase } from '../config/database';
import { getPricing } from '../config/stripe';
import { ApiError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { generateSessionCode, createSessionSchema } from '../utils/validators';
import { CreateSessionRequest, Session } from '../types';

export const sessionService = {
  async createSession(data: CreateSessionRequest): Promise<Session> {
    try {
      // Validate input
      logger.info('Creating session with data:', data);
      const { tarotista_id, ...sessionData } = data;
      const validated = createSessionSchema.parse(sessionData);
      logger.info('Validated data:', validated);

      // Check if user exists, if not create
      let { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', validated.email)
        .single();

      if (userError && userError.code === 'PGRST116') {
        // User doesn't exist, create new
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            email: validated.email,
            phone: validated.phone || null
          })
          .select()
          .single();

        if (createError) {
          throw createError;
        }
        user = newUser;
      } else if (userError) {
        throw userError;
      }

      const pricing = getPricing(validated.minutes);
      const sessionCode = generateSessionCode();

      // Create session
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          user_id: user.id,
          tarotista_id: tarotista_id || null,
          minutes: validated.minutes,
          status: 'pending',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (sessionError) {
        throw sessionError;
      }

      logger.info(`Session created: ${session.id}`);

      return session;
    } catch (error: any) {
      logger.error('Create session error:', error?.message || error);
      if (error instanceof ApiError) throw error;
      if (error?.errors) {
        throw new ApiError(400, 'Validation error', error.errors);
      }
      throw new ApiError(400, error?.message || 'Failed to create session');
    }
  },

  async getSessionById(sessionId: string): Promise<Session> {
    try {
      const { data: session, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error || !session) {
        throw new ApiError(404, 'Session not found');
      }

      return session;
    } catch (error) {
      logger.error('Get session error:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Failed to get session');
    }
  },

  async getSessionsByEmail(email: string): Promise<Session[]> {
    try {
      // Get user ID
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (userError || !user) {
        return [];
      }

      // Get sessions
      const { data: sessions, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return sessions || [];
    } catch (error) {
      logger.error('Get sessions by email error:', error);
      return [];
    }
  },

  async updateSessionStatus(sessionId: string, status: string): Promise<Session> {
    try {
      const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'expired', 'cancelled'];

      if (!validStatuses.includes(status)) {
        throw new ApiError(400, 'Invalid status');
      }

      const { data: session, error } = await supabase
        .from('sessions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', sessionId)
        .select()
        .single();

      if (error || !session) {
        throw new ApiError(404, 'Session not found');
      }

      logger.info(`Session ${sessionId} status updated to ${status}`);

      return session;
    } catch (error) {
      logger.error('Update session status error:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Failed to update session');
    }
  },

  async expireOldSessions(): Promise<void> {
    try {
      await supabase
        .from('sessions')
        .update({ status: 'expired' })
        .lt('expires_at', new Date().toISOString())
        .eq('status', 'pending');

      logger.info('Expired old sessions');
    } catch (error) {
      logger.error('Expire sessions error:', error);
    }
  }
};
