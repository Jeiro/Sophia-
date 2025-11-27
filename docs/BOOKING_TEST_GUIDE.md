# Quick Test Guide - Booking Consultation

## 🚀 Quick Start Test

### 1. Run Your App
```bash
npm start
```

### 2. Navigate to Booking Page
- URL: `http://localhost:5173/consultation-booking`

### 3. Follow These Steps

#### Step 1: Select Consultation Type
- Choose any option:
  - "Crypto Trading Consultation" ($299 / 60 min)
  - "Real Estate Investment Consultation" ($299 / 60 min)
  - "Comprehensive Wealth Strategy" ($449 / 90 min)
- Click "Continue"

#### Step 2: Choose Date & Time
- Pick any future date using the date picker
- Select a time slot from available times
- Click "Continue"

#### Step 3: Fill Your Details
```
Full Name:              John Doe
Email:                  your-email@example.com
Phone:                  +1 (555) 123-4567
Timezone:               Eastern Time (EST)
Preferred Contact:      Email
Investment Experience:  Beginner
Specific Goals:         Learn about crypto investing
Agree to Terms:         ✓ (checked)
```

#### Step 4: Submit Booking
- Click "Confirm Booking"
- Wait 2-3 seconds for emails to send
- See success/confirmation page

---

## ✅ Expected Results

### On Screen:
- ✓ Green success message appears
- ✓ Page transitions to confirmation
- ✓ Shows all your booking details
- ✓ Lists next steps
- ✓ Displays preparation tips

### Email Inbox:
- ✓ **Client Email** arrives with:
  - Consultation type
  - Date and time
  - What to expect
  - How to prepare
  - Support contact info

- ✓ **Admin Email** arrives to `admin@sophiacipherwealth.com`:
  - Your name and contact details
  - Consultation type and pricing
  - Your experience level
  - Your goals/questions
  - Timezone and preferred contact method

---

## 🔍 What to Check

### 1. Form Validation
Try submitting with:
- **Empty email** → Should show error: "Email is required"
- **Invalid email** (e.g., "test") → Should show error: "Please enter a valid email address"
- **Empty name** → Should show error: "Full name is required"
- **No timezone selected** → Should show error: "Please select your timezone"
- **Unchecked terms** → Should show error: "You must agree to the terms and conditions"

### 2. Email Sending
After successful submission:
- Check your email inbox (usually arrives in 1-2 seconds)
- Check spam/junk folder if not in inbox
- Look for sender: `payments@sophiacipherwealth.com`

### 3. Browser Console
Open DevTools (F12) and check:
- **Console Tab:**
  - `✅ Both emails sent successfully` (success message)
  - or `⚠️ One or more emails may not have been sent` (warning)
  - or `❌ Error during form submission:` (if error occurred)

### 4. Success Page
Verify confirmation page shows:
- Green checkmark icon
- Message: "Consultation Confirmed!"
- Your email address
- All booking details (type, date, time, name)
- "What's Next?" section with timeline
- Buttons to add to calendar and return home

---

## 🐛 Debugging

### If emails don't arrive:

1. **Check API Key:**
   - Open `.env` file
   - Verify: `VITE_RESEND_API_KEY=re_QagRY2Mu_2gawKbjv2PmuvUiCnDtyC1V2`

2. **Check Email Settings:**
   - Verify: `VITE_BUSINESS_EMAIL=payments@sophiacipherwealth.com`
   - Verify: `VITE_ADMIN_EMAIL=admin@sophiacipherwealth.com`

3. **Check Browser Console:**
   - Open DevTools (F12)
   - Click Console tab
   - Look for error messages
   - Copy error and search for solutions

4. **Check Resend Dashboard:**
   - Go to https://resend.com/dashboard
   - Sign in
   - Check "Emails" section
   - See if your emails appear
   - Check delivery status

### If form won't submit:

1. Make sure all required fields are filled
2. Ensure email format is correct (user@domain.com)
3. Make sure terms & conditions checkbox is checked
4. Try refreshing the page
5. Check browser console for JavaScript errors

### If page looks broken:

1. Try clearing browser cache (Ctrl+Shift+Delete on Windows)
2. Hard refresh: Ctrl+Shift+R
3. Check that all CSS files loaded (no red X in DevTools)
4. Verify styles in: `src/styles/`

---

## 📊 Testing Checklist

### Form Functionality
- [ ] Can select consultation type
- [ ] Can select date
- [ ] Can select time
- [ ] Can enter name
- [ ] Can enter email
- [ ] Can enter phone
- [ ] Can select timezone
- [ ] Can select contact method
- [ ] Can select experience level
- [ ] Can enter goals (optional)
- [ ] Can check terms checkbox

### Validation
- [ ] Form won't submit without required fields
- [ ] Email validation works
- [ ] Error messages appear
- [ ] Error messages clear when corrected

### Email Sending
- [ ] Client email is received
- [ ] Admin email is received
- [ ] Email subject is correct
- [ ] Email content is formatted correctly
- [ ] All booking details included

### User Experience
- [ ] Success message displays
- [ ] Booking confirmation page loads
- [ ] All details displayed correctly
- [ ] Loading state works
- [ ] Can click "Back" to edit
- [ ] Can click "Home" to return

### Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on tablet (768x1024)
- [ ] Works on mobile (375x667)
- [ ] Buttons are clickable
- [ ] Text is readable

---

## 🎯 Test Cases

### Test Case 1: Happy Path
- Select consultation type
- Choose date/time
- Fill all fields correctly
- Submit and receive emails ✓

### Test Case 2: Form Validation
- Try submitting with empty fields
- Try invalid email
- Try unchecked terms
- Verify error messages ✓

### Test Case 3: Email Delivery
- Submit form
- Check inbox within 5 seconds
- Verify both client and admin emails ✓

### Test Case 4: Mobile Responsiveness
- Test on mobile device
- Verify all elements visible
- Test form submission
- Verify email received ✓

### Test Case 5: Error Recovery
- Simulate network error
- Verify graceful error handling
- Try submitting again ✓

---

## 📞 Support

If you encounter issues:

1. **Check console errors** (F12 → Console tab)
2. **Verify .env configuration**
3. **Check Resend dashboard** for API status
4. **Review browser network tab** (F12 → Network tab)
5. **Test with different email address**

---

## ✨ Success Indicators

You know it's working when:

✅ Form validates before submission
✅ Email appears in inbox quickly (1-5 seconds)
✅ Email is nicely formatted
✅ All booking details are in the email
✅ Success page displays correctly
✅ Works on mobile and desktop
✅ Admin gets notified
✅ No console errors

---

**Test Status:** Ready to go! 🚀
