export type SessionStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'expired' | 'cancelled';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';
export type CallStatus = 'initiated' | 'ringing' | 'connected' | 'completed' | 'failed' | 'cancelled';
export type OperatorStatus = 'active' | 'inactive' | 'on_break' | 'busy';

export interface User {
  id: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  stripe_payment_intent_id: string;
  minutes: 10 | 15 | 20 | 30;
  status: SessionStatus;
  price_cents: number;
  currency: string;
  session_code: string;
  call_started_at?: string;
  call_ended_at?: string;
  minutes_used: number;
  created_at: string;
  expires_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  session_id: string;
  stripe_customer_id?: string;
  stripe_charge_id: string;
  amount_cents: number;
  currency: string;
  status: PaymentStatus;
  payment_method: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface CallLog {
  id: string;
  session_id: string;
  user_id: string;
  call_sid?: string;
  zadarma_call_id?: string;
  phone_called: string;
  duration_seconds: number;
  call_status: CallStatus;
  recording_url?: string;
  transcription?: string;
  created_at: string;
  updated_at: string;
}

export interface Operator {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: OperatorStatus;
  rate_per_minute: number;
  bio?: string;
  image_url?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_name: string;
  user_id?: string;
  session_id?: string;
  event_data?: Record<string, any>;
  created_at: string;
}

// Request/Response types
export interface CreateSessionRequest {
  minutes: 10 | 15 | 20 | 30;
  email: string;
  phone: string;
}

export interface CreateCheckoutRequest {
  session_id: string;
}

export interface StripeWebhookPayload {
  id: string;
  object: string;
  type: string;
  data: {
    object: any;
  };
}

export interface AdminDashboardStats {
  totalRevenue: number;
  totalSessions: number;
  activeSessions: number;
  totalCustomers: number;
  conversionRate: number;
  avgSessionDuration: number;
}

export interface JWTPayload {
  adminId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
