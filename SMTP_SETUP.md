# SMTP Email Setup Guide

This guide explains how to configure SMTP email functionality for the signup form.

## Setup Steps

### 1. Create `.env` file

Create a `.env` file in the root directory with the following configuration:

```env
# Server Configuration
PORT=5000

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# SMTP Authentication
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Settings
SMTP_FROM_NAME=StormBuddi
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_TO_EMAIL=info@stormbuddi.com
```

### 2. Gmail Setup (Recommended)

If using Gmail:

1. **Enable 2-Step Verification:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the generated 16-character password
   - Use this as `SMTP_PASS` (not your regular Gmail password)

3. **Configuration:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  (16-character app password)
   ```

### 3. Other Email Providers

**Outlook/Hotmail:**
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Yahoo:**
```
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Custom SMTP:**
Use your email provider's SMTP settings. For port 465, set `SMTP_SECURE=true`.

### 4. Running the Application

**Option 1: Run server and React app separately**
```bash
# Terminal 1 - Start the server
npm run server

# Terminal 2 - Start React app
npm start
```

**Option 2: Run both together**
```bash
npm run dev
```

### 5. Testing

1. Start the server: `npm run server` (or `npm run dev`)
2. Navigate to the signup page
3. Fill out the form and submit
4. Check the email inbox specified in `SMTP_TO_EMAIL`

### 6. Health Check

You can verify the server is running by visiting:
```
http://localhost:5000/health
```

## Troubleshooting

### "Email service is not configured" Error
- Make sure all SMTP environment variables are set in `.env`
- Verify `.env` file is in the root directory
- Restart the server after changing `.env` file

### "Authentication failed" Error
- For Gmail: Make sure you're using an App Password, not your regular password
- Verify your email and password are correct
- Check if 2-Step Verification is enabled (for Gmail)

### "Connection timeout" Error
- Check your SMTP host and port settings
- Verify your firewall isn't blocking the connection
- Try different ports (587 for STARTTLS, 465 for SSL)

### CORS Errors
- The proxy is configured in `setupProxy.js`
- Make sure the server is running on port 5000
- Check that the proxy target matches your server URL

## Production Deployment

For production:
1. Set environment variables on your hosting platform
2. Update the proxy target in `setupProxy.js` if needed
3. Or configure your production server to handle `/api/signup` directly
4. Use secure SMTP settings (port 465 with SSL/TLS)

