import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
}

export async function GET() {
  const supabase = getSupabase();

  const { data: sessions, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fetch all messages separately (no JOIN, avoids FK dependency)
  const { data: msgs } = await supabase
    .from('chat_messages')
    .select('session_id, created_at');

  const counts: Record<string, number> = {};
  const lastTs: Record<string, string> = {};
  for (const m of msgs || []) {
    counts[m.session_id] = (counts[m.session_id] || 0) + 1;
    if (!lastTs[m.session_id] || m.created_at > lastTs[m.session_id]) {
      lastTs[m.session_id] = m.created_at;
    }
  }

  const enriched = (sessions || []).map((s: any) => ({
    ...s,
    chat_messages: [{ count: counts[s.id] || 0 }],
    last_message_at: lastTs[s.id] || null,
  }));

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
