import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  const apiKey    = process.env.ZADARMA_API_KEY    || '';
  const apiSecret = process.env.ZADARMA_API_SECRET || '';

  const method = '/v1/pbx/internal/';
  const params = '';
  const md5  = crypto.createHash('md5').update(params).digest('hex');
  const sign = crypto.createHmac('sha1', apiSecret).update(method + params + md5).digest('hex');
  const auth = `${apiKey}:${Buffer.from(sign).toString('base64')}`;

  try {
    const res = await fetch('https://api.zadarma.com' + method, {
      headers: { 'Authorization': auth },
    });
    const text = await res.text();
    return NextResponse.json({
      keyPresent: !!apiKey,
      secretPresent: !!apiSecret,
      httpStatus: res.status,
      response: text.slice(0, 1000),
    });
  } catch (e: any) {
    return NextResponse.json({ keyPresent: !!apiKey, error: e?.message });
  }
}
