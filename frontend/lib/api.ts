import axios from 'axios';
import { CreateSessionRequest, ApiResponse, Session } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async createSession(data: CreateSessionRequest): Promise<Session> {
    const response = await client.post<ApiResponse<Session>>('/api/sessions/create', data);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create session');
    }
    return response.data.data!;
  },

  async getSession(sessionId: string): Promise<Session> {
    const response = await client.get<ApiResponse<Session>>(`/api/sessions/${sessionId}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to get session');
    }
    return response.data.data!;
  },

  async createCheckout(sessionId: string): Promise<{ checkoutUrl: string }> {
    const response = await client.post<ApiResponse<{ checkoutUrl: string }>>('/api/stripe/create-checkout', {
      session_id: sessionId,
    });
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create checkout');
    }
    return response.data.data!;
  },

  async getCheckoutStatus(checkoutSessionId: string): Promise<any> {
    const response = await client.get(`/api/stripe/checkout/${checkoutSessionId}`);
    return response.data;
  },

  async getSessionHistory(email: string): Promise<Session[]> {
    const response = await client.get<ApiResponse<Session[]>>(`/api/sessions/${email}/history`);
    if (!response.data.success) {
      return [];
    }
    return response.data.data || [];
  },

  async getAvailableTarotistas(): Promise<any[]> {
    const response = await client.get<ApiResponse<any[]>>('/api/tarotistas/available');
    if (!response.data.success) {
      return [];
    }
    return response.data.data || [];
  },
};
