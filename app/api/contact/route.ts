import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { inquirySchema, unitLabelFromValue, type InquiryInput } from '@/lib/contact-schema';

export const runtime = 'nodejs';

type SendResult = { ok: true } | { ok: false; reason: string };

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot — silently drop and pretend success.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const result = await sendInquiryEmails(data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.reason }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

async function sendInquiryEmails(data: InquiryInput): Promise<SendResult> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from =
    process.env.SMTP_FROM ?? 'Bootleggers Landing <experience@bootleggerslanding.com>';
  const to = process.env.CONTACT_EMAIL ?? 'experience@bootleggerslanding.com';

  // Dev fallback: if SMTP env is not configured, log the submission and return
  // success so Aspen can exercise the form locally before the Workspace alias
  // is provisioned. Real sends require SMTP_HOST/USER/PASSWORD in env.
  if (!host || !user || !pass) {
    console.warn(
      '[contact] SMTP env not configured — logging inquiry instead of sending mail.',
    );
    console.log('[contact] inquiry:', { ...data, message: data.message?.slice(0, 200) });
    return { ok: true };
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const unitLabel = unitLabelFromValue(data.unit);
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  const internalSubject = `[BL Inquiry] ${unitLabel} · ${data.checkIn}–${data.checkOut} · ${data.guestCount}p · ${fullName}`;
  const internalBody = renderInternalBody({ ...data, unitLabel, fullName });
  const guestBody = renderGuestBody({ ...data, unitLabel });

  try {
    await Promise.all([
      transport.sendMail({
        from,
        to,
        replyTo: data.email,
        subject: internalSubject,
        text: internalBody,
      }),
      transport.sendMail({
        from,
        to: data.email,
        subject: 'We received your inquiry — Bootleggers Landing',
        text: guestBody,
      }),
    ]);
    return { ok: true };
  } catch (err) {
    console.error('[contact] mail send failed', err);
    const reason = err instanceof Error ? err.message : 'Unknown mail error';
    return { ok: false, reason };
  }
}

function renderInternalBody(d: InquiryInput & { unitLabel: string; fullName: string }) {
  return `New inquiry on bootleggerslanding.com

Home: ${d.unitLabel}
Check-in:  ${d.checkIn}
Check-out: ${d.checkOut}
Guests:    ${d.guestCount}

Guest details
  Name:  ${d.fullName}
  Email: ${d.email}
  Phone: ${d.phone || '(not provided)'}

Message:
${d.message || '(none)'}

—
Submitted: ${new Date().toISOString()}
`;
}

function renderGuestBody(d: InquiryInput & { unitLabel: string }) {
  return `Hi ${d.firstName},

Thank you for reaching out about ${d.unitLabel} at Bootleggers Landing. Your inquiry came through and we'll be in touch within 24 hours — usually much sooner.

If your travel timing is urgent or you'd prefer to talk it through, please reach our team directly at (907) 223-2344 (Janine) — happy to walk you through availability, pairings with the Villa, or anything else.

A quick recap of what you sent:

  Home:      ${d.unitLabel}
  Dates:     ${d.checkIn} – ${d.checkOut}
  Guests:    ${d.guestCount}
  Your note: ${d.message || '(none)'}

Talk soon,
The Bootleggers Landing Team
experience@bootleggerslanding.com
(907) 223-2344
`;
}
