# EmailJS Setup Guide

## Overview
This guide will help you set up EmailJS to enable email functionality in your Contact Us form.

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:** New Contact Form Submission from {{user_name}}

**Body:**
```
Name: {{user_name}}
Email: {{user_email}}
Phone: {{user_phone}}
Service Type: {{service_type}}
Message: {{message}}

This message was sent from the EcoLift contact form.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## Step 5: Update Your Code
Replace the placeholder values in `src/Pages/Contact/Contact.jsx`:

```javascript
const serviceId = 'YOUR_EMAILJS_SERVICE_ID'; // Replace with your Service ID
const templateId = 'YOUR_EMAILJS_TEMPLATE_ID'; // Replace with your Template ID
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your Public Key
```

## Step 6: Test
1. Start your React application
2. Go to the Contact Us page
3. Fill out the form and submit
4. Check your email to confirm the message was sent

## Free Plan Limits
- 200 emails per month
- Basic templates
- Standard support

## Troubleshooting
- Make sure all IDs are correct
- Check browser console for errors
- Verify your email service is properly connected
- Ensure your template variables match the form field names

## Security Note
The public key is safe to use in frontend code, but keep your private keys secure and never expose them in client-side code. 