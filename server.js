const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// SMTP Configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Signup email endpoint
app.post('/api/signup/send-email', async (req, res) => {
  try {
    const { name, email, contactNumber, address, message } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    if (!contactNumber || !contactNumber.trim()) {
      return res.status(400).json({ success: false, error: 'Contact number is required' });
    }

    if (!address || !address.trim()) {
      return res.status(400).json({ success: false, error: 'Address is required' });
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
      console.error('SMTP credentials not configured');
      return res.status(500).json({
        success: false,
        error: 'Email service not configured. Please contact the administrator.',
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'StormBuddi'}" <${process.env.SMTP_USERNAME}>`,
      to: process.env.TO_EMAIL || 'info@stormbuddi.com',
      subject: 'New Signup Form Submission - StormBuddi',
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(to right, #A83119, #D1452A); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #042D43; }
              .value { margin-top: 5px; padding: 10px; background: white; border-radius: 3px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Signup Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Contact Number:</div>
                  <div class="value">${contactNumber}</div>
                </div>
                <div class="field">
                  <div class="label">Address:</div>
                  <div class="value">${address}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message || 'No message provided'}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Signup Form Submission
        
        Name: ${name}
        Email: ${email}
        Contact Number: ${contactNumber}
        Address: ${address}
        Message: ${message || 'No message provided'}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Thank you for signing up! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

