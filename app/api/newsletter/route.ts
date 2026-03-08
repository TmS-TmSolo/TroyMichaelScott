import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body ?? {};

    if (!email || !EMAIL_RE.test(String(email))) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiKey || !formId) {
      // Not configured — log server-side but don't expose config state to client.
      console.warn('[newsletter] ConvertKit env vars are not set. Subscription skipped.');
      return NextResponse.json({ success: true });
    }

    const ckRes = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey, email: String(email).toLowerCase() }),
      }
    );

    if (!ckRes.ok) {
      const detail = await ckRes.json().catch(() => ({}));
      console.error('[newsletter] ConvertKit error:', detail);
      return NextResponse.json(
        { error: 'Subscription failed. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
