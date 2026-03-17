const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { officeName, email } = body;

  if (!email || !officeName) {
    return { statusCode: 400, body: 'Missing required fields: email and officeName' };
  }

  const subscribeUrl = 'https://taupe-pudding-cfc634.netlify.app/subscribe.html';

  try {
    await resend.emails.send({
      from: 'Dental Dash Pro <noreply@dentaldashpro.com>',
      to: email,
      subject: 'Your Dental Dash Pro Office Has Been Approved!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>You're Approved!</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background-color:#2563eb;padding:32px 40px;text-align:center;">
                      <h1 style="color:#ffffff;font-size:24px;margin:0;">Dental Dash Pro</h1>
                      <p style="color:#bfdbfe;margin:8px 0 0;">Office Approval Notification</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="color:#1a202c;font-size:22px;margin-bottom:16px;">Congratulations, ${officeName}!</h2>

                      <p style="color:#4a5568;font-size:16px;line-height:1.6;margin-bottom:16px;">
                        Your dental office application has been <strong>approved</strong>. You are now eligible to start receiving patient treatment estimate requests on Dental Dash Pro.
                      </p>

                      <p style="color:#4a5568;font-size:16px;line-height:1.6;margin-bottom:24px;">
                        As one of our early partner offices, you qualify for our <strong>Founding Dentist Program</strong> &mdash; a limited-time offer for the first 50 offices to join.
                      </p>

                      <!-- Founder Offer Box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;margin-bottom:32px;">
                        <tr>
                          <td style="padding:24px;">
                            <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.05em;">Founding Office Offer</p>
                            <h3 style="color:#1a202c;font-size:20px;margin:0 0 4px;">Leader Plan &mdash; Founder Pricing</h3>
                            <p style="color:#888;font-size:14px;text-decoration:line-through;margin:0 0 4px;">$1,499 / month</p>
                            <p style="color:#1d4ed8;font-size:28px;font-weight:700;margin:0 0 8px;">$1,000 / month</p>
                            <p style="color:#4a5568;font-size:14px;margin:0;">Limited to the first 50 offices &mdash; lock in this rate before it's gone.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA Button -->
                      <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                        <tr>
                          <td align="center" style="border-radius:6px;background-color:#2563eb;">
                            <a href="${subscribeUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;border-radius:6px;">Claim Founder Pricing</a>
                          </td>
                        </tr>
                      </table>

                      <p style="color:#718096;font-size:14px;line-height:1.6;margin-bottom:8px;">
                        If you have any questions, reply to this email or contact our support team.
                      </p>

                      <p style="color:#a0aec0;font-size:13px;margin:0;">
                        Secure subscription billing powered by Stripe. Cancel anytime.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                      <p style="color:#a0aec0;font-size:13px;margin:0;">&copy; 2026 Dental Dash Pro. All rights reserved.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Approval email sent successfully' }),
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
