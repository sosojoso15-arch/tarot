import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
    const { data: sessions, error: se } = await supabase
      .from('chat_sessions')
      .select('id, client_name, specialist, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
    const { data: msgs, error: me } = await supabase
      .from('chat_messages')
      .select('id, session_id, sender, message, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
    return NextResponse.json({
      sessionsError: se?.message || null,
      messagesError: me?.message || null,
      sessions: sessions || [],
      messages: msgs || [],
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message });
  }
}
