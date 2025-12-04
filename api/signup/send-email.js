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

    const { name, email, contactNumber, address, message } = body;

    // Validate required fields
    if (!name || !email || !contactNumber || !address) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, contactNumber, and address are required'
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

    // Email to Admin - Notification
    const adminMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: 'New Signup Form Submission - StormBuddi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #A83119, #D1452A); color: white; padding: 20px; border-radius: 5px 5px 0 0;">
            <h2 style="margin: 0;">New Signup Form Submission</h2>
          </div>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${contactNumber}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 3px; white-space: pre-wrap;">${message || 'No message provided'}</p>
          </div>
        </div>
      `,
      text: `
        New Signup Form Submission - StormBuddi
        
        Name: ${name}
        Email: ${email}
        Contact Number: ${contactNumber}
        Address: ${address}
        
        Message:
        ${message || 'No message provided'}
      `,
    };

    // Email to Customer - Confirmation
    const customerMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: 'Thank You for Signing Up with StormBuddi!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #A83119, #D1452A); color: white; padding: 30px 20px; border-radius: 5px 5px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Thank You for Signing Up!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 5px 5px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Dear ${name},
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Thank you for signing up with StormBuddi! We have received your signup form submission and appreciate you joining our community.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Our team will review your information and you can expect a response within 24 hours.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0;">
              If you have any questions, please feel free to call us at <a href="tel:+18009887435" style="color: #A83119; text-decoration: none;">+1 800-988-7435</a> or email us at <a href="mailto:info@stormbuddi.com" style="color: #A83119; text-decoration: none;">info@stormbuddi.com</a>.
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br><strong>The StormBuddi Team</strong></p>
            </div>
          </div>
        </div>
      `,
      text: `
        Thank You for Signing Up with StormBuddi!
        
        Dear ${name},
        
        Thank you for signing up with StormBuddi! We have received your signup form submission and appreciate you joining our community.
        
        Our team will review your information and you can expect a response within 24 hours.
        
        If you have any questions, please feel free to call us at +1 800-988-7435 or email us at info@stormbuddi.com.
        
        Best regards,
        The StormBuddi Team
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    return res.status(200).json({
      success: true,
      message: 'Thank you for signing up! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
}

