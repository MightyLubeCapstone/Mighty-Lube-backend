const nodemailer = require('nodemailer');

/**
 * Shared email sender for the whole backend.
 *
 * - If BREVO_API_KEY is set, emails go through Brevo's HTTPS API.
 *   This is required on Sevalla, which blocks outbound SMTP ports
 *   25, 465 and 587.
 * - Otherwise, emails go through Gmail SMTP (SMTP_USER /
 *   SMTP_APP_PASSWORD), which is fine for local development.
 *
 * sendMail() takes nodemailer-style options (from, to, cc, replyTo,
 * subject, text, html, attachments) and returns
 * { messageId, accepted, rejected } for both providers.
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_TIMEOUT_MS = 15000;

// Strips whitespace and wrapping quotes that often sneak in when
// values are pasted into a hosting dashboard.
function cleanEnv(value) {
  if (!value) return '';
  return String(value).trim().replace(/^['"]+|['"]+$/g, '').trim();
}

const brevoApiKey = cleanEnv(process.env.BREVO_API_KEY);
const useBrevo = Boolean(brevoApiKey);

const emailFrom = cleanEnv(process.env.EMAIL_FROM) || process.env.SMTP_USER;
const emailFromName = cleanEnv(process.env.EMAIL_FROM_NAME) || 'Mighty Lube';

const smtpTransporter = useBrevo
  ? null
  : nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true').toLowerCase() === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

function isMailConfigured() {
  if (useBrevo) return Boolean(emailFrom);
  return Boolean(process.env.SMTP_USER && process.env.SMTP_APP_PASSWORD);
}

if (!isMailConfigured()) {
  console.warn(
    useBrevo
      ? '[mailer] BREVO_API_KEY is set but EMAIL_FROM is missing.'
      : '[mailer] Gmail SMTP credentials are missing.'
  );
} else {
  console.log(`[mailer] Sending email via ${useBrevo ? 'Brevo API' : 'Gmail SMTP'}`);
}

// Safe key details for debugging. Never logs the full key.
if (useBrevo) {
  const rawKey = String(process.env.BREVO_API_KEY);
  console.log('[mailer] Brevo key check', {
    startsWith: brevoApiKey.slice(0, 8),
    endsWith: brevoApiKey.slice(-4),
    length: brevoApiKey.length,
    isApiKey: brevoApiKey.startsWith('xkeysib-'),
    isSmtpKey: brevoApiKey.startsWith('xsmtpsib-'),
    hadExtraSpacesOrQuotes: rawKey !== brevoApiKey,
    sender: emailFrom,
  });
}

// Accepts "a@x.com", "a@x.com, b@x.com" or ["a@x.com"] and returns
// Brevo's [{ email }] format.
function toBrevoRecipients(value) {
  if (!value) return [];
  const list = Array.isArray(value) ? value : String(value).split(',');
  return list
    .map((email) => String(email).trim())
    .filter(Boolean)
    .map((email) => ({ email }));
}

async function sendViaBrevo(mailOptions) {
  const to = toBrevoRecipients(mailOptions.to);
  const cc = toBrevoRecipients(mailOptions.cc);

  const body = {
    sender: { name: emailFromName, email: emailFrom },
    to,
    subject: mailOptions.subject,
  };

  if (cc.length) body.cc = cc;
  if (mailOptions.replyTo) body.replyTo = { email: mailOptions.replyTo };
  if (mailOptions.text) body.textContent = mailOptions.text;
  if (mailOptions.html) body.htmlContent = mailOptions.html;

  if (mailOptions.attachments && mailOptions.attachments.length) {
    body.attachment = mailOptions.attachments.map((file) => ({
      name: file.filename,
      content: Buffer.from(file.content).toString('base64'),
    }));
  }

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': brevoApiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      `Brevo API error ${response.status}: ${data.message || response.statusText}`
    );
    error.code = data.code || 'EBREVO';
    error.responseCode = response.status;
    throw error;
  }

  return {
    messageId: data.messageId,
    accepted: [...to, ...cc].map((recipient) => recipient.email),
    rejected: [],
  };
}

async function sendMail(mailOptions) {
  if (!isMailConfigured()) {
    throw new Error('Email is not configured (set BREVO_API_KEY + EMAIL_FROM, or SMTP_USER + SMTP_APP_PASSWORD)');
  }

  if (useBrevo) return sendViaBrevo(mailOptions);

  return smtpTransporter.sendMail({
    ...mailOptions,
    from: mailOptions.from || emailFrom,
  });
}

module.exports = { sendMail, isMailConfigured, emailFrom };
