import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
}

// Mark a specialist as online (heartbeat from their panel)
export async function POST(req: NextRequest) {
  try {
    const { specialist } = await req.json();
    if (!specialist) return NextResponse.json({ error: 'specialist required' }, { status: 400 });
    const supabase = getSupabase();
    await supabase
      .from('presence')
      .upsert({ specialist, last_seen: new Date().toISOString() }, { onConflict: 'specialist' });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message });
  }
}

// Return who is online (seen in last 60s)
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data } = await supabase.from('presence').select('specialist, last_seen');
    const online: Record<string, boolean> = {};
    const now = Date.now();
    for (const row of data || []) {
      online[row.specialist] = (now - new Date(row.last_seen).getTime()) < 60000;
    }
    return NextResponse.json({ success: true, online });
  } catch (e: any) {
    return NextResponse.json({ success: false, online: {} });
  }
}
