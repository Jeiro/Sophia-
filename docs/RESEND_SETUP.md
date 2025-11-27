# RESEND EMAIL SERVICE SETUP - Payment Confirmations

Add this to your `backend/server.js`

---

## **STEP 1: Install Resend**

```bash
npm install resend
```

---

## **STEP 2: Add to backend/.env**

```env
RESEND_API_KEY=re_YOUR_API_KEY_HERE
BUSINESS_EMAIL=payments@sophiacipherwealth.com
ADMIN_EMAIL=admin@sophiacipherwealth.com
```

---

## **STEP 3: Add Backend Email Endpoints**

Copy this code into `backend/server.js`:

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'onboarding@resend.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sophiacipherwealth.com';

// ============================================
// EMAIL ENDPOINTS
// ============================================

// Send booking confirmation email
app.post('/api/email/booking-confirmation', async (req, res) => {
  const { to, bookingDetails } = req.body;

  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0052FF; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .details p { margin: 8px 0; }
            .button { display: inline-block; padding: 12px 24px; background-color: #0052FF; color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
            .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Confirmed!</h1>
            </div>
            <div class="content">
              <p>Hello ${bookingDetails.clientName || 'Valued Client'},</p>
              <p>Thank you for booking a consultation with Sophia Cipher Wealth. Your booking has been confirmed!</p>
              
              <div class="details">
                <h3>📅 Booking Details</h3>
                <p><strong>Consultation Type:</strong> ${bookingDetails.consultationType || 'N/A'}</p>
                <p><strong>Date:</strong> ${bookingDetails.date || 'N/A'}</p>
                <p><strong>Time:</strong> ${bookingDetails.time || 'N/A'}</p>
                <p><strong>Amount Paid:</strong> $${bookingDetails.amount?.toFixed(2) || '0.00'}</p>
                ${bookingDetails.reference ? `<p><strong>Reference:</strong> ${bookingDetails.reference}</p>` : ''}
              </div>

              <div class="details">
                <h3>📞 Next Steps</h3>
                <ul>
                  <li>You'll receive a video call link 30 minutes before your appointment</li>
                  <li>Make sure you have a quiet space for the call</li>
                  <li>Have any documents ready that you need to discuss</li>
                </ul>
              </div>

              <p>If you have any questions, please don't hesitate to contact us.</p>

              <a href="${process.env.APP_URL || 'https://sophiacipherwealth.com'}" class="button">View Your Booking</a>

              <div class="footer">
                <p>© 2025 Sophia Cipher Wealth. All rights reserved.</p>
                <p>This is an automated email. Please do not reply directly.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: BUSINESS_EMAIL,
      to,
      subject: '✅ Your Consultation Booking is Confirmed',
      html
    });

    // Also send to admin
    await resend.emails.send({
      from: BUSINESS_EMAIL,
      to: ADMIN_EMAIL,
      subject: `📅 New Booking: ${bookingDetails.clientName}`,
      html: `<p>New booking from ${bookingDetails.clientName}</p><p>Amount: $${bookingDetails.amount}</p><p>Date: ${bookingDetails.date}</p>`
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send payment approved email (Apple Card)
app.post('/api/email/payment-approved', async (req, res) => {
  const { to, paymentDetails } = req.body;

  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .button { display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Payment Approved!</h1>
            </div>
            <div class="content">
              <p>Great news! Your Apple Card payment has been verified and approved.</p>
              
              <div class="details">
                <h3>💳 Payment Details</h3>
                <p><strong>Amount:</strong> $${paymentDetails.amount?.toFixed(2) || '0.00'}</p>
                <p><strong>Card:</strong> ••••${paymentDetails.cardLast4}</p>
                <p><strong>Status:</strong> ✅ Verified</p>
                <p><strong>Verification ID:</strong> ${paymentDetails.verificationId}</p>
              </div>

              <p>Your booking is now confirmed! You should receive your booking confirmation email shortly.</p>

              <a href="${process.env.APP_URL || 'https://sophiacipherwealth.com'}/bookings" class="button">View Your Bookings</a>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: BUSINESS_EMAIL,
      to,
      subject: '✅ Payment Verified - Booking Confirmed',
      html
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send payment rejection email
app.post('/api/email/payment-rejected', async (req, res) => {
  const { to, paymentDetails, reason } = req.body;

  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .button { display: inline-block; padding: 12px 24px; background-color: #0052FF; color: white; text-decoration: none; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>❌ Payment Could Not Be Verified</h1>
            </div>
            <div class="content">
              <p>Unfortunately, we were unable to verify your payment. Here's what happened:</p>
              
              <div class="details">
                <h3>💳 Payment Details</h3>
                <p><strong>Amount:</strong> $${paymentDetails.amount?.toFixed(2) || '0.00'}</p>
                <p><strong>Card:</strong> ••••${paymentDetails.cardLast4}</p>
                <p><strong>Status:</strong> ❌ Could Not Verify</p>
              </div>

              <div class="details">
                <h3>⚠️ Reason</h3>
                <p>${reason || 'The payment image could not be verified. Please try again with a clearer image.'}</p>
              </div>

              <p><strong>What you can do:</strong></p>
              <ul>
                <li>Make sure the transaction image is clear and shows the card details</li>
                <li>Try submitting again with a better quality image</li>
                <li>Contact us if you need assistance</li>
              </ul>

              <a href="${process.env.APP_URL || 'https://sophiacipherwealth.com'}/booking" class="button">Try Again</a>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: BUSINESS_EMAIL,
      to,
      subject: '❌ Payment Verification Failed - Please Try Again',
      html
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send crypto payment pending email
app.post('/api/email/crypto-pending', async (req, res) => {
  const { to, paymentDetails } = req.body;

  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0052FF; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; font-family: monospace; }
            .code { background-color: #f0f0f0; padding: 12px; border-radius: 4px; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🪙 Send Your ${paymentDetails.paymentType.toUpperCase()} Payment</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>To complete your booking, please send the following ${paymentDetails.paymentType.toUpperCase()} payment:</p>
              
              <div class="details">
                <h3>💰 Payment Instructions</h3>
                <p><strong>Amount to Send:</strong> ${paymentDetails.cryptoAmount} ${paymentDetails.paymentType.toUpperCase()}</p>
                <p><strong>USD Value:</strong> $${paymentDetails.amount.toFixed(2)}</p>
                <p><strong>Network:</strong> ${paymentDetails.network || 'Polygon/Bitcoin'}</p>
                <p><strong>Send To:</strong></p>
                <div class="code">${paymentDetails.paymentAddress}</div>
              </div>

              <div style="background-color: #fff3cd; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <h3>⏱️ Important</h3>
                <ul>
                  <li>This address expires in 30 minutes</li>
                  <li>Double-check the address before sending</li>
                  <li>Your booking will be confirmed once we receive the payment</li>
                </ul>
              </div>

              <p><strong>Having trouble?</strong> Contact us for assistance.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: BUSINESS_EMAIL,
      to,
      subject: `🪙 Send Your ${paymentDetails.paymentType.toUpperCase()} Payment`,
      html
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send crypto payment received email
app.post('/api/email/crypto-received', async (req, res) => {
  const { to, paymentDetails } = req.body;

  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .button { display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 6px; }
            .code { background-color: #f0f0f0; padding: 10px; border-radius: 4px; word-break: break-all; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Payment Received!</h1>
            </div>
            <div class="content">
              <p>Great! We've received your ${paymentDetails.paymentType.toUpperCase()} payment!</p>
              
              <div class="details">
                <h3>💰 Payment Confirmation</h3>
                <p><strong>Amount Received:</strong> ${paymentDetails.cryptoAmount} ${paymentDetails.paymentType.toUpperCase()}</p>
                <p><strong>USD Value:</strong> $${paymentDetails.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> ✅ Confirmed</p>
                ${paymentDetails.txHash ? `
                  <p><strong>Transaction Hash:</strong></p>
                  <div class="code">${paymentDetails.txHash}</div>
                ` : ''}
              </div>

              <p>Your booking is now confirmed! You should receive your confirmation details shortly.</p>

              <a href="${process.env.APP_URL || 'https://sophiacipherwealth.com'}/bookings" class="button">View Your Booking</a>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: BUSINESS_EMAIL,
      to,
      subject: `✅ ${paymentDetails.paymentType.toUpperCase()} Payment Received - Booking Confirmed`,
      html
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test email endpoint
app.post('/api/email/test', async (req, res) => {
  const { to } = req.body;

  try {
    const result = await resend.emails.send({
      from: BUSINESS_EMAIL,
      to,
      subject: 'Test Email from Sophia Cipher Wealth',
      html: '<p>This is a test email. If you received this, Resend is working correctly!</p>'
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
});
```

---

## **STEP 4: Update Payment Verification to Send Email**

When verifying Apple Card payments, add email sending:

```javascript
// In the verify endpoint, after approving:
if (approved) {
  // Send approval email
  await fetch(`${process.env.FRONTEND_URL}/api/email/payment-approved`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: userEmail,
      paymentDetails: {
        amount: payment.amount_usd,
        cardLast4: payment.card_last4,
        verificationId: verificationId
      }
    })
  });
}
```

---

## **STEP 5: Setup Resend Account**

1. Go to: https://resend.com
2. Sign up with email
3. Get your API Key from dashboard
4. Add to `backend/.env`:
   ```env
   RESEND_API_KEY=re_YOUR_API_KEY_HERE
   ```

---

## **STEP 6: Add Custom Domain (Optional but Recommended)**

For production:

1. In Resend dashboard → **Domains**
2. Click **Add Domain**
3. Add your domain (e.g., `sophiacipherwealth.com`)
4. Follow DNS setup instructions
5. Update `BUSINESS_EMAIL` in backend

---

## **SUCCESS CHECKLIST**

- [ ] Resend account created
- [ ] API key in `backend/.env`
- [ ] All email endpoints added
- [ ] Backend restarted
- [ ] Test email sent successfully
- [ ] Payment approval emails working
- [ ] Booking confirmation emails working
- [ ] Admin notifications working

