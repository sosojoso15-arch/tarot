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

function getZadarmaAuth(params: Record<string, string> = {}): string {
  const apiKey    = process.env.ZADARMA_API_KEY    || '';
  const apiSecret = process.env.ZADARMA_API_SECRET || '';
  const sortedStr = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
  const md5  = crypto.createHash('md5').update(sortedStr).digest('hex');
  const sign = crypto.createHmac('sha1', apiSecret).update(sortedStr + md5).digest('base64');
  return `Zadarma ${apiKey}:${sign}`;
}

export async function GET() {
  try {
    const res = await fetch('https://api.zadarma.com/v1/pbx/internal/', {
      headers: { 'Authorization': getZadarmaAuth() },
      next: { revalidate: 0 },
    });
    const data = await res.json();

    // Build status map: nombre -> online|offline
    const status: Record<string, boolean> = {};
    if (data.status === 'success' && Array.isArray(data.info)) {
      for (const ext of data.info) {
        const nombre = EXTENSION_MAP[String(ext.number || ext.extension)];
        if (nombre) status[nombre] = ext.status === 'online' || ext.online === true || ext.registered === true;
      }
    }

    return NextResponse.json({ success: true, status });
  } catch {
    return NextResponse.json({ success: false, status: {} });
  }
}
