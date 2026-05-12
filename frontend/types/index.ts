export interface Session {
  id: string;
  minutes: 10 | 15 | 20 | 30;
  session_code: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'expired';
  created_at: string;
  expires_at: string;
}

export interface Pricing {
  minutes: 10 | 15 | 20 | 30;
  price: number;
  display: string;
}

export interface CreateSessionRequest {
  minutes: 10 | 15 | 20 | 30;
  email: string;
  phone: string;
  tarotista_id?: string;
}

export interface Tarotista {
  id: string;
  nombre: string;
  especialidad: string;
  bio?: string;
  rating?: number;
  disponible: boolean;
}

export interface CreateCheckoutRequest {
  session_id: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
