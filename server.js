const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Contact email endpoint
app.post('/api/contact/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required'
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
      secure: smtpSecure,
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
      subject: 'New Contact Form Submission - StormBuddi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #A83119, #D1452A); color: white; padding: 20px; border-radius: 5px 5px 0 0;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 3px; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission - StormBuddi
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    };

    // Email to Customer - Confirmation
    const customerMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: 'Thank You for Contacting StormBuddi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #A83119, #D1452A); color: white; padding: 30px 20px; border-radius: 5px 5px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 5px 5px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Dear ${name},
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Thank you for contacting StormBuddi! We have received your message and appreciate you reaching out to us.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Our team will review your message and you can expect a response within 24 hours.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0;">
              If you need immediate assistance, please feel free to call us at <a href="tel:+14693069209" style="color: #A83119; text-decoration: none;">+1 469 306 9209</a>.
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br><strong>The StormBuddi Team</strong></p>
            </div>
          </div>
        </div>
      `,
      text: `
        Thank You for Contacting StormBuddi
        
        Dear ${name},
        
        Thank you for contacting StormBuddi! We have received your message and appreciate you reaching out to us.
        
        Our team will review your message and you can expect a response within 24 hours.
        
        If you need immediate assistance, please feel free to call us at +1 469 306 9209.
        
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
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
});

// Demo request email endpoint
app.post('/api/demo/send-email', async (req, res) => {
  try {
    const { name, phone, address, source, description, email } = req.body;

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

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

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
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 12px;">If you need immediate help, call us at <a href="tel:+14693069209" style="color: #A83119; text-decoration: none;">+1 469 306 9209</a>.</p>
            <p style="font-size: 14px; color: #666; margin: 0;">— The StormBuddi Team</p>
          </div>
        </div>
      `,
      text: `
        Thanks for Requesting a Demo!

        Hi ${name},
        We received your demo request and will contact you within 24 hours.
        If you need immediate help, call us at +1 469 306 9209.

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
});

// Signup email endpoint
app.post('/api/signup/send-email', async (req, res) => {
  try {
    const { name, email, contactNumber, address, message } = req.body;

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
              If you have any questions, please feel free to call us at <a href="tel:+14693069209" style="color: #A83119; text-decoration: none;">+1 469 306 9209</a> or email us at <a href="mailto:info@stormbuddi.com" style="color: #A83119; text-decoration: none;">info@stormbuddi.com</a>.
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
        
        If you have any questions, please feel free to call us at +1 469 306 9209 or email us at info@stormbuddi.com.
        
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

