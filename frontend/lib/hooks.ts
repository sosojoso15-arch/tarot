'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from './api';
import { CreateSessionRequest } from '../types';

export function useCreateSession() {
  return useMutation({
    mutationFn: (data: CreateSessionRequest) => api.createSession(data),
  });
}

export function useCreateCheckout() {
  return useMutation({
    mutationFn: (sessionId: string) => api.createCheckout(sessionId),
  });
}

export function useSession(sessionId: string | null) {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => sessionId ? api.getSession(sessionId) : null,
    enabled: !!sessionId,
  });
}

export function useCheckoutSession(checkoutSessionId: string | null) {
  return useQuery({
    queryKey: ['checkout', checkoutSessionId],
    queryFn: () => checkoutSessionId ? api.getCheckoutStatus(checkoutSessionId) : null,
    enabled: !!checkoutSessionId,
  });
}
