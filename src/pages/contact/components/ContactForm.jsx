import React, { useState } from 'react';
import Input from '../../../components/UI/Input';
import Select from '../../../components/UI/Select';
import { Checkbox } from '../../../components/UI/Checkbox';
import Button from '../../../components/UI/Button';
import Icon from '../../../components/Appicon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    expertiseArea: '',
    urgency: '',
    message: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const expertiseOptions = [
    { value: 'crypto', label: 'Cryptocurrency Trading' },
    { value: 'realestate', label: 'Real Estate Investment' },
    { value: 'diversification', label: 'Comprehensive Diversification Strategy' },
    { value: 'general', label: 'General Inquiry' }
  ];

  const urgencyOptions = [
    { value: 'urgent', label: 'Urgent (Same Day Response)' },
    { value: 'high', label: 'High Priority (Within 24 Hours)' },
    { value: 'normal', label: 'Normal (Within 48 Hours)' },
    { value: 'low', label: 'Low Priority (Within 1 Week)' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData?.expertiseArea) {
      newErrors.expertiseArea = 'Please select an expertise area';
    }

    if (!formData?.urgency) {
      newErrors.urgency = 'Please select urgency level';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData?.message?.trim()?.length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via backend or email service
      const emailData = {
        to: 'brookssophiae74@gmail.com',
        subject: `New Contact Form Submission - ${formData.expertiseArea}`,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        expertiseArea: formData.expertiseArea,
        urgency: formData.urgency,
        message: formData.message
      };

      // If you have a backend endpoint, use it here
      // await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailData) });
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          expertiseArea: '',
          urgency: '',
          message: '',
          agreeToTerms: false
        });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Icon name="Send" size={20} color="white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
      </div>
      {submitSuccess && (
        <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg flex items-start space-x-3">
          <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-success">Message Sent Successfully!</p>
            <p className="text-sm text-muted-foreground mt-1">
              We've received your inquiry and will respond within the selected timeframe. Check your email for confirmation.
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={formData?.email}
            onChange={(e) => handleChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData?.phone}
            onChange={(e) => handleChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            label="Expertise Area"
            placeholder="Select area of interest"
            options={expertiseOptions}
            value={formData?.expertiseArea}
            onChange={(value) => handleChange('expertiseArea', value)}
            error={errors?.expertiseArea}
            required
          />

          <Select
            label="Urgency Level"
            placeholder="Select urgency"
            options={urgencyOptions}
            value={formData?.urgency}
            onChange={(value) => handleChange('urgency', value)}
            error={errors?.urgency}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Your Message <span className="text-error">*</span>
          </label>
          <textarea
            value={formData?.message}
            onChange={(e) => handleChange('message', e?.target?.value)}
            placeholder="Tell us about your investment goals, questions, or consultation needs..."
            rows={6}
            className={`w-full px-4 py-3 rounded-md border ${
              errors?.message ? 'border-error' : 'border-input'
            } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 resize-none`}
          />
          {errors?.message && (
            <p className="mt-1.5 text-sm text-error">{errors?.message}</p>
          )}
          <p className="mt-1.5 text-xs text-muted-foreground">
            Minimum 20 characters. Be specific about your needs for better assistance.
          </p>
        </div>

        <Checkbox
          label="I agree to the terms and conditions and privacy policy"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By submitting this form, you consent to being contacted by CryptoRealty Pro regarding your inquiry.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;