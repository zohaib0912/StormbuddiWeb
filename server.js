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

    // Email content
    const mailOptions = {
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

    // Send email
    await transporter.sendMail(mailOptions);

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

