import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
}

const TAROTISTA_IDS: Record<string, string> = {
  'Paqui':    '342320f1-4151-40c0-8abe-255372bc0ce4',
  'Gloria':   '939441a0-e85f-485c-8631-2e131dfa1775',
  'Marian':   '4620ebac-2d72-4e24-9693-c502320af724',
  'Paulina':  'b0335491-9e31-4488-9292-ab89532ef7a0',
  'Mercedes': '18beff79-cdc7-4b12-9ef3-066180ac5cf2',
  'Marcos':   '0c12defa-6e5c-4cce-802d-913cd3476136',
  'Minerva':  'ad9be26f-5121-49a6-b5ce-492c6bdba901',
  'Verónica': '0f47986b-191b-463b-8ade-4f6443bdc10f',
  'Yeyo':     '9a4bfc88-8477-44bf-adc3-397cd3ede9ca',
};

export async function GET(req: NextRequest) {
  const nombre = req.nextUrl.searchParams.get('nombre');
  if (!nombre) return NextResponse.json({ error: 'nombre required' }, { status: 400 });

  const taroistaId = TAROTISTA_IDS[nombre];
  if (!taroistaId) return NextResponse.json({ error: 'Tarotista no encontrada' }, { status: 404 });

  const supabase = getSupabase();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('sessions')
    .select('id, minutes, created_at, status, session_code')
    .eq('tarotista_id', taroistaId)
    .gte('created_at', since)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data: data || [] });
}
