import { NextResponse } from 'next/server';
import crypto from 'crypto';

const EXTENSION_MAP: Record<string, string> = {
  '100': 'Paqui',
  '101': 'Gloria Miranda',
  '102': 'Marian',
  '103': 'Paulina',
  '104': 'Mercedes',
  '105': 'Marcos',
  '106': 'Minerva',
  '107': 'Verónica',
  '108': 'Yeyo',
  '109': 'Duende',
};

function zadarmaGet(method: string) {
  const apiKey    = process.env.ZADARMA_API_KEY    || '';
  const apiSecret = process.env.ZADARMA_API_SECRET || '';
  const params = '';
  const md5  = crypto.createHash('md5').update(params).digest('hex');
  const sign = crypto.createHmac('sha1', apiSecret).update(method + params + md5).digest('hex');
  const auth = `${apiKey}:${Buffer.from(sign).toString('base64')}`;
  return fetch('https://api.zadarma.com' + method, { headers: { 'Authorization': auth }, next: { revalidate: 0 } });
}

export async function GET() {
  const apiKey = process.env.ZADARMA_API_KEY || '';
  if (!apiKey) return NextResponse.json({ success: true, status: {}, unknown: true });

  try {
    // Get list of extensions
    const listRes = await zadarmaGet('/v1/pbx/internal/');
    const listData = await listRes.json();
    if (listData.status !== 'success' || !Array.isArray(listData.numbers)) {
      return NextResponse.json({ success: true, status: {}, unknown: true });
    }

    // Query online status for each extension in parallel
    const status: Record<string, boolean> = {};
    await Promise.all(
      listData.numbers.map(async (num: number) => {
        const nombre = EXTENSION_MAP[String(num)];
        if (!nombre) return;
        try {
          const r = await zadarmaGet(`/v1/pbx/internal/${num}/status/`);
          const d = await r.json();
          const online = d.status === 'success' && (
            d.is_online === true || d.is_online === 'true' || d.is_online === 1 ||
            d.online === true || d.online === 'true' || d.online === 1 ||
            d.registered === true || d.registration === 'online'
          );
          status[nombre] = !!online;
        } catch {
          status[nombre] = false;
        }
      })
    );

    return NextResponse.json({ success: true, status, unknown: false });
  } catch {
    return NextResponse.json({ success: true, status: {}, unknown: true });
  }
}
