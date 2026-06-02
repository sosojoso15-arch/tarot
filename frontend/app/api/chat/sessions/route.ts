import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
}

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*, chat_messages(count, created_at)')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Add last_message_at per session
  const enriched = (data || []).map((s: any) => {
    const msgs = s.chat_messages || [];
    const lastTs = msgs.length > 0
      ? msgs.reduce((max: string, m: any) => m.created_at > max ? m.created_at : max, msgs[0].created_at)
      : null;
    return { ...s, last_message_at: lastTs };
  });

  return NextResponse.json({ success: true, data: enriched });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  const body = await req.json();
  const { client_name, specialist, minutes } = body;
  if (!client_name) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });
  const row: Record<string, unknown> = { client_name, specialist: specialist || 'Marcos' };
  if (minutes) row.minutes = parseInt(minutes);
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert([row])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
