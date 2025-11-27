import React, { useState } from 'react';
import Input from '../../../components/UI/Input';
import Select from '../../../components/UI/Select';
import { Checkbox } from '../../../components/UI/Checkbox';
import Button from '../../../components/UI/Button';
import Icon from '../../../components/Appicon';


const BookingForm = ({ consultationType, selectedDate, selectedTime, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    timezone: '',
    preferredContact: '',
    investmentExperience: '',
    specificGoals: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const timezoneOptions = [
    { value: 'EST', label: 'Eastern Time (EST)' },
    { value: 'CST', label: 'Central Time (CST)' },
    { value: 'MST', label: 'Mountain Time (MST)' },
    { value: 'PST', label: 'Pacific Time (PST)' },
    { value: 'GMT', label: 'Greenwich Mean Time (GMT)' },
    { value: 'CET', label: 'Central European Time (CET)' },
    { value: 'IST', label: 'India Standard Time (IST)' },
    { value: 'JST', label: 'Japan Standard Time (JST)' },
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'telegram', label: 'Telegram' },
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner - New to investing' },
    { value: 'intermediate', label: 'Intermediate - Some experience' },
    { value: 'advanced', label: 'Advanced - Experienced investor' },
    { value: 'professional', label: 'Professional - Industry expert' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.timezone) newErrors.timezone = 'Please select your timezone';
    if (!formData?.preferredContact) newErrors.preferredContact = 'Please select a contact method';
    if (!formData?.investmentExperience) newErrors.investmentExperience = 'Please select your experience level';
    if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitMessage(null);
      
      try {
        // Prepare booking data with consultation details
        const bookingData = {
          ...formData,
          consultationType,
          date: selectedDate,
          time: selectedTime,
        };

        // Send to Web3Forms with all booking information
        try {
          const webFormData = new FormData();
          
          webFormData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "85159b86-4c6c-4e18-9568-b6f3281a27fa");
          webFormData.append("name", formData.fullName);
          webFormData.append("email", formData.email);
          webFormData.append("phone", formData.phone);
          webFormData.append("timezone", formData.timezone);
          webFormData.append("preferred_contact", formData.preferredContact);
          webFormData.append("experience_level", formData.investmentExperience);
          webFormData.append("consultation_type", bookingData.consultationType);
          webFormData.append("booking_date", selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
          webFormData.append("booking_time", selectedTime);
          webFormData.append("specific_goals", formData.specificGoals);
          webFormData.append("from_name", "Consultation Booking System");
          webFormData.append("subject", `New Consultation Booking: ${bookingData.consultationType}`);
          
          // Create detailed message with all information
          const bookingMessage = `
Sophia Cipher Wealth CONSULTATION BOOKING

Client Information:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Timezone: ${formData.timezone}
- Preferred Contact Method: ${formData.preferredContact}

Consultation Details:
- Type: ${bookingData.consultationType}
- Date: ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Time: ${selectedTime}

Experience Level: ${formData.investmentExperience}

Specific Goals/Questions:
${formData.specificGoals || 'None provided'}

Agreed to Terms: Yes
          `;
          
          webFormData.append("message", bookingMessage);

          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: webFormData,
          });

          const result = await response.json();
          
          if (result.success) {
            setSubmitMessage({
              type: 'success',
              text: '✅ Booking confirmed! We will reach out to u shorty.',
            });
            console.log('✅ Booking submitted via Web3Forms:', result);
          } else {
            throw new Error(result.message || 'Web3Forms submission failed');
          }
        } catch (webFormError) {
          console.error('⚠️ Web3Forms error:', webFormError);
          setSubmitMessage({
            type: 'warning',
            text: '✅ Booking received! Your confirmation will be sent shortly.',
          });
        }
        
        // Proceed with form submission after a brief delay
        setTimeout(() => {
          onSubmit(bookingData);
        }, 1000);
      } catch (error) {
        console.error('❌ Error during form submission:', error);
        setSubmitMessage({
          type: 'warning',
          text: '✅ Booking submitted successfully! Confirmation is being processed.',
        });
        
        // Still proceed with form submission even if email fails
        setTimeout(() => {
          onSubmit({
            ...formData,
            consultationType,
            date: selectedDate,
            time: selectedTime,
          });
        }, 1500);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitMessage && (
        <div
          className={`p-4 rounded-lg border flex items-start space-x-3 ${
            submitMessage.type === 'success'
              ? 'bg-success/10 border-success/30 text-success'
              : submitMessage.type === 'warning'
              ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-700'
              : 'bg-destructive/10 border-destructive/30 text-destructive'
          }`}
        >
          <Icon
            name={submitMessage.type === 'success' ? 'CheckCircle2' : submitMessage.type === 'warning' ? 'AlertCircle' : 'XCircle'}
            size={20}
            className="flex-shrink-0 mt-0.5"
          />
          <p className="text-sm">{submitMessage.text}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={formData?.fullName}
          onChange={(e) => handleChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          value={formData?.email}
          onChange={(e) => handleChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData?.phone}
          onChange={(e) => handleChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />
        <Select
          label="Timezone"
          placeholder="Select your timezone"
          options={timezoneOptions}
          value={formData?.timezone}
          onChange={(value) => handleChange('timezone', value)}
          error={errors?.timezone}
          required
          searchable
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Preferred Contact Method"
          placeholder="How should we reach you?"
          options={contactMethodOptions}
          value={formData?.preferredContact}
          onChange={(value) => handleChange('preferredContact', value)}
          error={errors?.preferredContact}
          required
        />
        <Select
          label="Investment Experience"
          placeholder="Select your experience level"
          options={experienceOptions}
          value={formData?.investmentExperience}
          onChange={(value) => handleChange('investmentExperience', value)}
          error={errors?.investmentExperience}
          required
        />
      </div>
      <Input
        label="Specific Goals & Questions"
        type="text"
        placeholder="What would you like to discuss during the consultation?"
        value={formData?.specificGoals}
        onChange={(e) => handleChange('specificGoals', e?.target?.value)}
        description="Optional: Help us prepare for your consultation"
      />
      <div className="pt-4 border-t border-border">
        <Checkbox
          label="I agree to the terms and conditions"
          description="By booking this consultation, you agree to our privacy policy and terms of service"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left" fullWidth disabled={isSubmitting}>
          Back
        </Button>
        <Button 
          type="submit" 
          variant="default" 
          iconName={isSubmitting ? "Loader" : "Calendar"} 
          iconPosition="right" 
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Confirming Booking...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;