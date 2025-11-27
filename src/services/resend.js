// Resend Email Service
// This service handles all email communications through Resend API with Web3Forms backup
import logger from '../utils/logger';

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const BUSINESS_EMAIL = import.meta.env.VITE_BUSINESS_EMAIL || 'noreply@sophiacipherwealth.com';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@sophiacipherwealth.com';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '85159b86-4c6c-4e18-9568-b6f3281a27fa';

/**
 * Send a booking confirmation email
 * @param {string} to - Recipient email address
 * @param {object} bookingDetails - Booking details
 */
export const sendBookingConfirmationEmail = async (to, bookingDetails) => {
  try {
    // Format the consultation type nicely
    const consultationTypeMap = {
      'crypto': 'Crypto Trading Consultation',
      'realestate': 'Real Estate Investment Consultation',
      'comprehensive': 'Comprehensive Wealth Strategy',
    };

    const consultationType = bookingDetails.consultationType ||
      consultationTypeMap[bookingDetails.consultationType] ||
      'Consultation';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0052FF 0%, #0041CC 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background-color: #f9f9f9; padding: 30px 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #0052FF; }
            .details h3 { margin: 0 0 15px 0; color: #0052FF; font-size: 18px; }
            .detail-row { display: grid; grid-template-columns: 120px 1fr; margin-bottom: 12px; }
            .detail-label { font-weight: 600; color: #666; }
            .detail-value { color: #333; }
            .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #0052FF 0%, #0041CC 100%); color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .button:hover { opacity: 0.9; }
            .footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 20px; }
            .next-steps { background-color: #f0f7ff; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #0052FF; }
            .next-steps h3 { margin: 0 0 15px 0; color: #0052FF; }
            .next-steps ul { margin: 0; padding-left: 20px; }
            .next-steps li { margin-bottom: 10px; }
            .success-icon { font-size: 48px; margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="success-icon">✅</div>
              <h1>Booking Confirmed!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your consultation has been successfully scheduled</p>
            </div>
            <div class="content">
              <p>Hello <strong>${bookingDetails.fullName || 'Valued Client'}</strong>,</p>
              <p>Thank you for booking a consultation with Sophia Cipher Wealth! We're excited to help you achieve your investment goals. Your booking has been confirmed and we've reserved your spot.</p>
              
              <div class="details">
                <h3>📅 Your Booking Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Consultation:</span>
                  <span class="detail-value">${consultationType || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${new Date(bookingDetails.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span class="detail-value">${bookingDetails.time || 'N/A'} ${bookingDetails.timezone || ''}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Duration:</span>
                  <span class="detail-value">${consultationType.includes('Comprehensive') ? '90 minutes' : '60 minutes'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Contact:</span>
                  <span class="detail-value">${bookingDetails.preferredContact || 'Email'}</span>
                </div>
              </div>

              <div class="next-steps">
                <h3>📞 What Happens Next?</h3>
                <ul>
                  <li><strong>24 hours before:</strong> You'll receive preparation materials and topics to review</li>
                  <li><strong>1 hour before:</strong> Reminder with video call link will be sent</li>
                  <li><strong>At appointment time:</strong> Join the video consultation with our expert</li>
                  <li><strong>After consultation:</strong> You'll receive a summary and action items</li>
                </ul>
              </div>

              <div class="details">
                <h3>💡 How to Prepare</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Have a quiet space ready for the video call</li>
                  <li>Gather any relevant financial documents you want to discuss</li>
                  <li>Write down any questions you'd like to ask</li>
                  <li>Test your internet connection beforehand</li>
                </ul>
              </div>

              <p style="text-align: center; margin-top: 30px;">
                If you need to reschedule or have any questions before your consultation, please reply to this email or <a href="mailto:${process.env.VITE_BUSINESS_EMAIL || 'support@sophiacipherwealth.com'}" style="color: #0052FF; text-decoration: none;">contact our support team</a>.
              </p>

              <div class="footer">
                <p style="margin: 10px 0;">© 2025 Sophia Cipher Wealth. All rights reserved.</p>
                <p style="margin: 5px 0;">This is an automated confirmation email. Please do not reply directly to this address.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: BUSINESS_EMAIL,
        to: to,
        subject: '✅ Your Consultation Booking is Confirmed',
        html: html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Resend API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    logger.success('Booking confirmation email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    logger.error('Error sending booking confirmation email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send admin notification about new booking
 * @param {object} bookingDetails - Booking details
 */
export const sendAdminBookingNotification = async (bookingDetails) => {
  try {
    // Format the consultation type nicely
    const consultationTypeMap = {
      'crypto': 'Crypto Trading Consultation',
      'realestate': 'Real Estate Investment Consultation',
      'comprehensive': 'Comprehensive Wealth Strategy',
    };

    const consultationType = bookingDetails.consultationType ||
      consultationTypeMap[bookingDetails.consultationType] ||
      'Consultation';

    const priceMap = {
      'crypto': '$299',
      'realestate': '$299',
      'comprehensive': '$449',
    };

    const durationMap = {
      'crypto': '60 minutes',
      'realestate': '60 minutes',
      'comprehensive': '90 minutes',
    };

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0052FF 0%, #0041CC 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background-color: #f9f9f9; padding: 30px 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .section { background-color: white; padding: 20px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #0052FF; }
            .section h3 { margin: 0 0 15px 0; color: #0052FF; font-size: 16px; }
            .detail-row { display: grid; grid-template-columns: 140px 1fr; margin-bottom: 10px; }
            .detail-label { font-weight: 600; color: #666; }
            .detail-value { color: #333; }
            .status-badge { display: inline-block; background: #28a745; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
            .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 20px; }
            .action-button { display: inline-block; padding: 12px 24px; background: #0052FF; color: white; text-decoration: none; border-radius: 6px; margin: 15px 0; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Booking Received</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">A new consultation has been scheduled</p>
            </div>
            <div class="content">
              <div class="section">
                <h3>👤 Client Information</h3>
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value"><strong>${bookingDetails.fullName}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value"><a href="mailto:${bookingDetails.email}">${bookingDetails.email}</a></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value"><a href="tel:${bookingDetails.phone}">${bookingDetails.phone}</a></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Timezone:</span>
                  <span class="detail-value">${bookingDetails.timezone}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Contact Method:</span>
                  <span class="detail-value">${bookingDetails.preferredContact}</span>
                </div>
              </div>

              <div class="section">
                <h3>📅 Consultation Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Type:</span>
                  <span class="detail-value"><strong>${consultationType}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${new Date(bookingDetails.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span class="detail-value">${bookingDetails.time} ${bookingDetails.timezone}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Duration:</span>
                  <span class="detail-value">${durationMap[bookingDetails.consultationType] || '60 minutes'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Price:</span>
                  <span class="detail-value"><strong>${priceMap[bookingDetails.consultationType] || '$299'}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Status:</span>
                  <span class="detail-value"><span class="status-badge">CONFIRMED</span></span>
                </div>
              </div>

              <div class="section">
                <h3>💼 Client Background</h3>
                <div class="detail-row">
                  <span class="detail-label">Experience:</span>
                  <span class="detail-value" style="text-transform: capitalize;">${bookingDetails.investmentExperience}</span>
                </div>
                ${bookingDetails.specificGoals ? `
                <div style="margin-top: 15px;">
                  <p style="margin: 0 0 8px 0; font-weight: 600; color: #666;">Goals/Questions:</p>
                  <p style="margin: 0; color: #333; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">${bookingDetails.specificGoals}</p>
                </div>
                ` : ''}
              </div>

              <p style="text-align: center; margin: 30px 0;">
                <a href="mailto:${bookingDetails.email}" class="action-button">Respond to Client</a>
              </p>

              <div class="footer">
                <p style="margin: 10px 0;">Booking Reference: ${Date.now()}</p>
                <p style="margin: 5px 0;">© 2025 Sophia Cipher Wealth Admin Panel</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: BUSINESS_EMAIL,
        to: ADMIN_EMAIL,
        subject: `📅 New Booking: ${bookingDetails.fullName} - ${consultationType}`,
        html: html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Resend API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    logger.success('Admin notification email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    logger.error('Error sending admin notification:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send test email to verify Resend is working
 * @param {string} to - Recipient email address
 */
export const sendTestEmail = async (to) => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: BUSINESS_EMAIL,
        to: to,
        subject: 'Test Email from Sophia Cipher Wealth',
        html: '<p>This is a test email. If you received this, Resend is working correctly!</p>',
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    const data = await response.json();
    logger.log('Test email sent:', data);
    return { success: true, data };
  } catch (error) {
    logger.error('Error sending test email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send email via Web3Forms as backup service
 * @param {object} formData - Form data including name, email, message
 */
export const sendWebFormEmail = async (formData) => {
  try {
    const data = new FormData();
    data.append('access_key', WEB3FORMS_ACCESS_KEY);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    data.append('from_name', 'Sophia Cipher Wealth Booking System');
    data.append('subject', formData.subject || 'Booking Confirmation');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    });

    const result = await response.json();

    if (result.success) {
      logger.success('Web3Forms email sent successfully:', result);
      return { success: true, data: result };
    } else {
      throw new Error(`Web3Forms error: ${result.message || 'Unknown error'}`);
    }
  } catch (error) {
    logger.error('Error sending Web3Forms email:', error);
    return { success: false, error: error.message };
  }
};

export default {
  sendBookingConfirmationEmail,
  sendAdminBookingNotification,
  sendTestEmail,
  sendWebFormEmail,
};
