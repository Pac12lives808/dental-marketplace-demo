// Unified notification function — handles both patient waitlist and office application emails
// Uses Resend for all email delivery. Set RESEND_API_KEY in Netlify environment variables.

const { Resend } = require('resend');

const ADMIN_EMAIL = 'admin@dentaldashpro.com';
const FROM_EMAIL  = 'Dental Dash Pro <noreply@dentaldashpro.com>';

exports.handler = async (event) => {
  // CORS headers so the browser fetch works from any origin
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { type } = body;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    if (type === 'waitlist') {
      // ---- PATIENT WAITLIST ----
      const { first_name, email, zip_code, procedure, timeline, phone, description } = body;

      if (!first_name || !email) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
      }

      const procedureLabel = procedure || 'Not specified';
      const timelineLabel  = timeline  || 'Not specified';

      // Admin notification
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Patient Waitlist Signup — ${first_name} (${zip_code})`,
        html: `
          <h2>New Patient Waitlist Submission</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${first_name}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Zip Code</td><td style="padding:8px;">${zip_code || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Procedure</td><td style="padding:8px;">${procedureLabel}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Timeline</td><td style="padding:8px;">${timelineLabel}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Description</td><td style="padding:8px;">${description || '—'}</td></tr>
          </table>
          <p style="margin-top:16px;color:#64748b;font-size:13px;">View all submissions in the Supabase dashboard under the <strong>patient_waitlist</strong> table.</p>
        `,
      });

      // User confirmation
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "You're on the Dental Dash Pro waitlist!",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 16px;">
            <h1 style="color:#2563eb;font-size:24px;">You're on the list, ${first_name}!</h1>
            <p style="font-size:16px;color:#1e293b;">Thanks for joining the Dental Dash Pro waitlist. We'll notify you as soon as we launch in your area (${zip_code || 'your zip code'}).</p>
            <p style="font-size:15px;color:#64748b;">Here's what you submitted:</p>
            <ul style="font-size:15px;color:#1e293b;">
              <li><strong>Procedure of interest:</strong> ${procedureLabel}</li>
              <li><strong>Timeline:</strong> ${timelineLabel}</li>
            </ul>
            <p style="font-size:14px;color:#94a3b8;margin-top:32px;">Questions? Reply to this email and we'll get back to you.</p>
            <p style="font-size:13px;color:#cbd5e1;">&copy; 2026 Dental Dash Pro. All rights reserved.</p>
          </div>
        `,
      });

      return { statusCode: 200, headers, body: JSON.stringify({ success: true, type: 'waitlist' }) };
    }

    if (type === 'office_application') {
      // ---- OFFICE APPLICATION ----
      const { full_name, email, phone, practice_name, city, state, specialty, dental_license_number, website } = body;

      if (!full_name || !email) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
      }

      // Admin notification
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Office Application — ${practice_name} (${city}, ${state})`,
        html: `
          <h2>New Office Application Received</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px;">
            <tr><td style="padding:8px;font-weight:bold;">Contact Name</td><td style="padding:8px;">${full_name}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Practice Name</td><td style="padding:8px;">${practice_name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Specialty</td><td style="padding:8px;">${specialty || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Location</td><td style="padding:8px;">${city}, ${state}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">License #</td><td style="padding:8px;">${dental_license_number || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Website</td><td style="padding:8px;">${website || '—'}</td></tr>
          </table>
          <p style="margin-top:16px;color:#64748b;font-size:13px;">View all applications in the Supabase dashboard under the <strong>office_applications</strong> table. Set status to APPROVED to trigger approval email.</p>
        `,
      });

      // Applicant confirmation
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your Dental Dash Pro Office Application Was Received',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 16px;">
            <h1 style="color:#2563eb;font-size:24px;">Application Received, ${full_name}!</h1>
            <p style="font-size:16px;color:#1e293b;">Thank you for applying to join the Dental Dash Pro provider network. We've received your application for <strong>${practice_name}</strong> and our team will review it within 2–3 business days.</p>
            <p style="font-size:15px;color:#64748b;">What happens next:</p>
            <ol style="font-size:15px;color:#1e293b;">
              <li>Our team reviews your application</li>
              <li>You'll receive an approval email with next steps</li>
              <li>You'll get access to the provider dashboard to start connecting with patients</li>
            </ol>
            <p style="font-size:14px;color:#94a3b8;margin-top:32px;">Questions? Reply to this email and we'll get back to you within one business day.</p>
            <p style="font-size:13px;color:#cbd5e1;">&copy; 2026 Dental Dash Pro. All rights reserved.</p>
          </div>
        `,
      });

      return { statusCode: 200, headers, body: JSON.stringify({ success: true, type: 'office_application' }) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Unknown notification type. Use type: waitlist or office_application' }) };

  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
