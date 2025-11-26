import { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Icon from './AppIcon';

/**
 * ContactForm Component
 * 
 * A reusable contact form that sends messages via Web3Forms
 * Perfect for inquiry forms, contact pages, and general messaging
 * 
 * Features:
 * - Email validation
 * - Success/error feedback
 * - Accessible form inputs
 * - Responsive design
 * 
 * Usage:
 * <ContactForm onSuccess={() => alert('Message sent!')} />
 */
export default function ContactForm({ onSuccess, onError, title, description, showPhoneField = false }) {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResult("");

    try {
      const webFormData = new FormData();
      
      // Add all form fields to FormData
      webFormData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "85159b86-4c6c-4e18-9568-b6f3281a27fa");
      webFormData.append("name", formData.name);
      webFormData.append("email", formData.email);
      webFormData.append("phone", formData.phone);
      webFormData.append("subject", formData.subject);
      webFormData.append("message", formData.message);
      webFormData.append("from_name", "Contact Form Submission");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: webFormData
      });

      const data = await response.json();
      
      console.log("Web3Forms Response:", data);

      if (data.success) {
        setResult("success");
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        
        if (onSuccess) {
          onSuccess();
        }
        
        // Clear success message after 5 seconds
        setTimeout(() => setResult(""), 5000);
      } else {
        setResult("error");
        console.error("Web3Forms Error:", data.message);
        if (onError) {
          onError(data.message || "Failed to send message");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setResult("error");
      if (onError) {
        onError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      {result === "success" && (
        <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success/30 flex items-start space-x-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-success">Message Sent Successfully!</p>
            <p className="text-sm text-success/80">Thank you for reaching out. We'll get back to you shortly.</p>
          </div>
        </div>
      )}

      {result === "error" && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start space-x-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Icon name="AlertCircle" size={20} color="var(--color-destructive)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-destructive">Failed to Send Message</p>
            <p className="text-sm text-destructive/80">Please try again or contact support if the problem persists.</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {showPhoneField && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Phone Number (Optional)"
              type="tel"
              name="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Input
              label="Subject (Optional)"
              type="text"
              name="subject"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            name="message"
            required
            placeholder="Tell us what's on your mind..."
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows="6"
          />
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          disabled={isLoading}
          iconName={isLoading ? "Loader" : "Send"}
          iconPosition="right"
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          We respect your privacy. Your information will only be used to respond to your inquiry.
        </p>
      </form>
    </div>
  );
}
