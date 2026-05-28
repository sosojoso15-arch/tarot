import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { supabase } from '../config/database';

const router = Router();

// Crear sesión de chat (cliente)
router.post('/sessions', asyncHandler(async (req: Request, res: Response) => {
  const { client_name } = req.body;
  if (!client_name) return res.status(400).json({ error: 'Nombre requerido' });

  const { data, error } = await supabase
    .from('chat_sessions')
    .insert([{ client_name, tarotista: 'marcos' }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
}));

// Listar sesiones (para Marcos)
router.get('/sessions', asyncHandler(async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*, chat_messages(count)')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
}));

// Obtener mensajes de una sesión
router.get('/messages/:sessionId', asyncHandler(async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
}));

// Enviar mensaje
router.post('/messages', asyncHandler(async (req: Request, res: Response) => {
  const { session_id, sender, message } = req.body;
  if (!session_id || !sender || !message) return res.status(400).json({ error: 'Faltan campos' });

  const { data, error } = await supabase
    .from('chat_messages')
    .insert([{ session_id, sender, message }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
}));

export default router;
