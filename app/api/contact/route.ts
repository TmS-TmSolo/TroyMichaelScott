import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = new Set(['general', 'book', 'speaking', 'media', 'other']);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'A valid name is required.' }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(String(email))) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (!subject || !VALID_SUBJECTS.has(String(subject))) {
      return NextResponse.json({ error: 'A valid subject is required.' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const to = process.env.CONTACT_EMAIL ?? 'troy@troymichaelscott.com';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'website@troymichaelscott.com',
          to,
          subject: `[Contact – ${subject}] ${name.trim()}`,
          text: `From: ${name.trim()} <${email}>\n\n${message.trim()}`,
        }),
      });

      if (!res.ok) {
        console.error('Resend error:', await res.text());
        return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 502 });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
