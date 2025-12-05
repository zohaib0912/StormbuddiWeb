const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Parse request body if it's a string (Vercel sometimes sends it as a string)
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON in request body'
        });
      }
    }

    const { name, phone, address, source, description, email } = body || {};

    // Validate required fields
    if (!name || !phone || !address || !source || !description || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, phone, address, source, description, and email are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromName = process.env.SMTP_FROM_NAME || 'StormBuddi';
    const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;
    const toEmail = process.env.SMTP_TO_EMAIL || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('SMTP configuration is missing');
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Admin notification
    const adminMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      subject: 'New Demo Request - StormBuddi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #A83119, #D1452A); color: white; padding: 20px; border-radius: 5px 5px 0 0;">
            <h2 style="margin: 0;">New Demo Request</h2>
          </div>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Lead Source:</strong> ${source}</p>
            <p><strong>Project Details:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 3px; white-space: pre-wrap;">${description}</p>
          </div>
        </div>
      `,
      text: `
        New Demo Request - StormBuddi

        Name: ${name}
        Phone: ${phone}
        Address: ${address}
        Lead Source: ${source}

        Project Details:
        ${description}
      `,
    };

    // Customer confirmation
    const customerMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: 'Thank You for Requesting a Demo with StormBuddi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #A83119, #D1452A); color: white; padding: 30px 20px; border-radius: 5px 5px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Thanks for Requesting a Demo!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px 20px; border-radius: 0 0 5px 5px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 12px;">Hi ${name},</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 12px;">We received your demo request and will contact you within 24 hours.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 12px;">If you need immediate help, call us at <a href="tel:+18009887435" style="color: #A83119; text-decoration: none;">+1 800-988-7435</a>.</p>
            <p style="font-size: 14px; color: #666; margin: 0;">— The StormBuddi Team</p>
          </div>
        </div>
      `,
      text: `
        Thanks for Requesting a Demo!

        Hi ${name},
        We received your demo request and will contact you within 24 hours.
        If you need immediate help, call us at +1 800-988-7435.

        — The StormBuddi Team
      `,
    };

    // Send both emails (email is now required)
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    return res.status(200).json({
      success: true,
      message: 'Demo request submitted successfully.'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
}

