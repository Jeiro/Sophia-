# Email Configuration Guide for Consultation Booking

## Overview
The consultation booking system uses **dual email services** for maximum reliability:
1. **Resend API** (Primary) - Professional email delivery
2. **Web3Forms** (Backup) - Redundant email service

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```env
# Resend API Configuration
VITE_RESEND_API_KEY=your_resend_api_key_here
VITE_BUSINESS_EMAIL=noreply@sophiacipherwealth.com
VITE_ADMIN_EMAIL=admin@sophiacipherwealth.com

# Web3Forms Configuration (Backup Service)
VITE_WEB3FORMS_ACCESS_KEY=85159b86-4c6c-4e18-9568-b6f3281a27fa
```

## Services

### 1. Resend API (Primary Email Service)

**Setup Steps:**
1. Go to [resend.com](https://resend.com)
2. Create an account and get your API key
3. Add the API key to your `.env.local` file

**Features:**
- Professional email templates
- Detailed booking confirmation emails
- Admin notification emails
- Email tracking and analytics
- High deliverability rate

**Functions:**
```javascript
// Send booking confirmation to client
sendBookingConfirmationEmail(clientEmail, bookingData)

// Send admin notification
sendAdminBookingNotification(bookingData)

// Test email functionality
sendTestEmail(recipientEmail)
```

### 2. Web3Forms (Backup Email Service)

**Setup Steps:**
1. Go to [web3forms.com](https://web3forms.com)
2. Create an account
3. Get your access key (already provided in the config)
4. The service is ready to use!

**Features:**
- Simple form submission
- No backend required
- Instant email delivery
- Easy to set up
- Perfect as a fallback service

**Function:**
```javascript
// Backup email via Web3Forms
sendWebFormEmail(formData)
```

## How Email Flow Works

### When a User Books a Consultation:

1. **User fills out booking form** with:
   - Name, email, phone
   - Timezone preference
   - Contact method preference
   - Investment experience level
   - Specific goals/questions

2. **Form Validation** - Ensures all required fields are filled

3. **Email Sending (Parallel Process)**:
   - Attempt to send via **Resend API** (primary)
   - Attempt to send admin notification
   - If both fail, use **Web3Forms backup**

4. **User Feedback**:
   - Success: "✅ Booking confirmed! Confirmation email sent successfully."
   - Partial Success: "⚠️ Booking confirmed! Email sent via backup service."
   - Still Proceeds: Even if emails fail, booking is confirmed

5. **Confirmation Page** displays:
   - Booking details
   - Consultation type, date, and time
   - Next steps information
   - What to expect before the consultation

## Email Templates

### Booking Confirmation Email (Client)
Includes:
- Booking confirmation status
- Consultation type and details
- Date, time, and duration
- Timezone information
- Preparation tips
- What to expect next
- Reminder schedule

### Admin Notification Email
Includes:
- Client information (name, email, phone)
- Consultation details
- Client's investment background
- Client's specific goals
- Direct response link

## ContactForm Component

A standalone, reusable component for general inquiries:

```jsx
import ContactForm from '@/components/ContactForm';

<ContactForm 
  title="Get In Touch"
  description="Have questions? Send us a message."
  showPhoneField={true}
  onSuccess={() => console.log('Message sent!')}
  onError={(error) => console.log('Error:', error)}
/>
```

## Troubleshooting

### Emails Not Sending

1. **Check API Keys**:
   - Verify Resend API key is valid
   - Check Web3Forms access key

2. **Environment Variables**:
   - Ensure `.env.local` file exists
   - Variables start with `VITE_` prefix
   - Restart dev server after adding env vars

3. **Email Validation**:
   - Verify email format is correct
   - Check domain settings in Resend

4. **Check Console**:
   - Open browser DevTools (F12)
   - Check Console tab for error messages
   - Look for API response details

### Testing Email Functionality

```javascript
// In browser console, test with:
import { sendTestEmail } from '@/services/resend';
await sendTestEmail('your-email@example.com');
```

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Rotate API keys regularly**
3. **Use environment variables** for sensitive data
4. **Validate all user input** on both client and server
5. **Monitor API usage** for unusual activity
6. **Set up email authentication** (SPF, DKIM, DMARC)

## Email Service Limits

### Resend
- Free tier: Up to 100 emails/day
- Paid plans available for higher volumes

### Web3Forms
- Free tier: Up to 500 submissions/month
- Sufficient for most small to medium businesses

## Integration with Other Pages

### Contact Page
Use the `ContactForm` component directly:
```jsx
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div>
      <ContactForm 
        title="Contact Us"
        description="We'd love to hear from you"
        showPhoneField={true}
      />
    </div>
  );
}
```

### Consultation Booking
Already integrated in:
- `src/pages/consultation-booking/components/BookingForm.jsx`
- Handles all confirmation and admin emails automatically

## Monitoring & Analytics

### Resend Dashboard
- Track email delivery status
- View open rates and click rates
- Monitor bounce rates
- Identify deliverability issues

### Web3Forms Dashboard
- Track form submissions
- View response analytics
- Export submission data

## Support & Resources

- **Resend Docs**: https://resend.com/docs
- **Web3Forms Docs**: https://web3forms.com/docs
- **Email Best Practices**: https://resend.com/guides
- **SMTP Configuration**: Available in Resend dashboard

---

**Last Updated**: November 26, 2025
**Status**: ✅ Fully Configured and Tested
