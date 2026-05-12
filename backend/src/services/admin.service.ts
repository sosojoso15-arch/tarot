import { supabase } from '../config/database';
import { logger } from '../utils/logger';
import { AdminDashboardStats, PaginatedResponse, Session, User } from '../types';

export const adminService = {
  async getDashboardStats(): Promise<AdminDashboardStats> {
    try {
      // Total revenue
      const { data: payments } = await supabase
        .from('payments')
        .select('amount_cents')
        .eq('status', 'succeeded');

      const totalRevenue = (payments || []).reduce((sum, p) => sum + p.amount_cents, 0);

      // Total sessions
      const { count: totalSessions } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true });

      // Active sessions
      const { count: activeSessions } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'in_progress');

      // Total customers
      const { count: totalCustomers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Conversion rate
      const { count: confirmedSessions } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'confirmed');

      const conversionRate = totalSessions ? ((confirmedSessions || 0) / totalSessions) * 100 : 0;

      // Average session duration
      const { data: completedSessions } = await supabase
        .from('call_logs')
        .select('duration_seconds')
        .eq('call_status', 'completed');

      const avgSessionDuration = completedSessions && completedSessions.length > 0
        ? completedSessions.reduce((sum, s) => sum + s.duration_seconds, 0) / completedSessions.length / 60
        : 0;

      return {
        totalRevenue: Math.round(totalRevenue),
        totalSessions: totalSessions || 0,
        activeSessions: activeSessions || 0,
        totalCustomers: totalCustomers || 0,
        conversionRate,
        avgSessionDuration: Math.round(avgSessionDuration)
      };
    } catch (error) {
      logger.error('Get dashboard stats error:', error);
      throw error;
    }
  },

  async getAllSessions(
    page: number = 1,
    limit: number = 50
  ): Promise<PaginatedResponse<Session>> {
    try {
      const offset = (page - 1) * limit;

      const { data: sessions, error, count } = await supabase
        .from('sessions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        success: true,
        data: sessions || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      logger.error('Get all sessions error:', error);
      throw error;
    }
  },

  async getAllCustomers(
    page: number = 1,
    limit: number = 50
  ): Promise<PaginatedResponse<User>> {
    try {
      const offset = (page - 1) * limit;

      const { data: users, error, count } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        success: true,
        data: users || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      logger.error('Get all customers error:', error);
      throw error;
    }
  },

  async getCustomerDetails(email: string) {
    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError || !user) {
        return null;
      }

      const { data: sessions } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', user.id);

      const { data: payments } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id);

      return {
        user,
        sessions: sessions || [],
        payments: payments || [],
        totalSpent: (payments || []).reduce((sum, p) => sum + p.amount_cents, 0)
      };
    } catch (error) {
      logger.error('Get customer details error:', error);
      throw error;
    }
  },

  async getAnalytics(from?: string, to?: string) {
    try {
      const fromDate = from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = to || new Date().toISOString();

      // Revenue by day
      const { data: dailyRevenue } = await supabase
        .from('payments')
        .select('created_at, amount_cents')
        .eq('status', 'succeeded')
        .gte('created_at', fromDate)
        .lte('created_at', toDate);

      // Sessions by status
      const { data: sessionsByStatus } = await supabase
        .from('sessions')
        .select('status')
        .gte('created_at', fromDate)
        .lte('created_at', toDate);

      // Top conversion times
      const { data: analyticsEvents } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('event_name', 'session_created')
        .gte('created_at', fromDate)
        .lte('created_at', toDate);

      const groupByStatus = (sessions: any[]) => {
        return sessions.reduce((acc, session) => {
          const status = session.status;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      };

      return {
        dateRange: { from: fromDate, to: toDate },
        dailyRevenue,
        sessionsByStatus: groupByStatus(sessionsByStatus || []),
        events: analyticsEvents || []
      };
    } catch (error) {
      logger.error('Get analytics error:', error);
      throw error;
    }
  }
};
