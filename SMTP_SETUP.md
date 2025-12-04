# SMTP Email Setup Guide

This guide explains how to configure SMTP email functionality for the signup form.

## Prerequisites

1. An email account with SMTP access (Gmail, Outlook, etc.)
2. Node.js server running on port 5001

## Setup Steps

### 1. Create `.env` File

Create a `.env` file in the root directory with the following configuration:

```env
# Server Configuration
PORT=5001

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Email Configuration
FROM_NAME=StormBuddi
TO_EMAIL=info@stormbuddi.com
```

### 2. Gmail Setup (Recommended)

If using Gmail:

1. Enable 2-Step Verification on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new App Password for "Mail"
4. Use this App Password as `SMTP_PASSWORD` in your `.env` file

**Note:** Do NOT use your regular Gmail password. You must use an App Password.

### 3. Other Email Providers

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

#### Custom SMTP
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USERNAME=your-username
SMTP_PASSWORD=your-password
```

### 4. Running the Application

#### Option 1: Run Both Servers Separately

Terminal 1 - Start Node.js server:
```bash
npm run server
```

Terminal 2 - Start React app:
```bash
npm start
```

#### Option 2: Run Both Together

```bash
npm run dev
```

This will start both the Node.js server (port 5001) and React app (port 3000) simultaneously.

### 5. Testing

1. Navigate to the signup page
2. Fill out the form
3. Submit the form
4. Check the email inbox specified in `TO_EMAIL`

## Troubleshooting

### "Email service not configured" Error
- Ensure `.env` file exists in the root directory
- Verify `SMTP_USERNAME` and `SMTP_PASSWORD` are set

### "Failed to send email" Error
- Check SMTP credentials are correct
- For Gmail, ensure you're using an App Password, not your regular password
- Verify SMTP host and port are correct for your email provider
- Check firewall/network settings

### Connection Timeout
- Verify SMTP host and port are correct
- Check if your network/firewall blocks SMTP ports
- Try using port 465 with `secure: true` in server.js

### CORS Errors
- Ensure the proxy is configured correctly in `setupProxy.js`
- Verify the Node.js server is running on port 5001

## Security Notes

- Never commit `.env` file to version control
- Use environment variables in production
- Consider using a dedicated email service (SendGrid, Mailgun) for production
- Keep your App Passwords secure

## Production Deployment

For production:
1. Set environment variables on your hosting platform
2. Update the proxy target in `setupProxy.js` if needed
3. Consider using a dedicated email service for better deliverability
4. Enable HTTPS for secure connections

