import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*, chat_messages(count)')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { client_name, specialist } = body;
  if (!client_name) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert([{ client_name, specialist: specialist || 'marcos' }])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
