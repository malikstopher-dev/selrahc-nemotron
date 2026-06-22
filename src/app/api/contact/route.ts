import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured');
  return new Resend(apiKey);
}
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'selrahc.architects@gmail.com';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || '127.0.0.1';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message, phone, projectType, budget, _hp } = body;

    if (_hp) {
      return NextResponse.json({ success: true });
    }

    const errors: string[] = [];
    if (!name || typeof name !== 'string' || !name.trim()) errors.push('Name is required');
    if (!email || typeof email !== 'string' || !email.trim()) errors.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email is invalid');
    if (!message || typeof message !== 'string' || !message.trim()) errors.push('Message is required');

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join('. ') }, { status: 400 });
    }

    const dateTime = new Date().toLocaleString('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    const html = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,sans-serif;">
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Name</td><td style="padding:8px 12px;border:1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Email</td><td style="padding:8px 12px;border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Phone</td><td style="padding:8px 12px;border:1px solid #ddd;">${phone}</td></tr>` : ''}
        ${projectType ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Project Type</td><td style="padding:8px 12px;border:1px solid #ddd;">${projectType}</td></tr>` : ''}
        ${budget ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Budget</td><td style="padding:8px 12px;border:1px solid #ddd;">${budget}</td></tr>` : ''}
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;vertical-align:top;">Message</td><td style="padding:8px 12px;border:1px solid #ddd;">${message}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Submitted</td><td style="padding:8px 12px;border:1px solid #ddd;">${dateTime}</td></tr>
      </table>
    `;

    const { data, error } = await getResend().emails.send({
      from: 'Selrahc Architects <onboarding@resend.dev>',
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html,
    });

    if (error) {
      console.error('[Contact API] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    console.log('[Contact API] Email sent successfully:', data?.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
