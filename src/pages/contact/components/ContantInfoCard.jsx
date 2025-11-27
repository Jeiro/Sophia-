import React from 'react';
import Icon from '../../../components/Appicon';

const ContactInfoCard = () => {
  const contactDetails = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'brookssophiae74@gmail.com',
      subValue: 'For detailed inquiries and consultations',
      action: () => window.location.href = 'mailto:brookssophiae74@gmail.com'
    },
    {
      icon: 'MessageCircle',
      label: 'WhatsApp',
      value: '+1 (301) 233-6631',
      subValue: 'Instant messaging for quick responses',
      action: () => window.open('https://wa.me/13012336631?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services', '_blank')
    },
    {
      icon: 'Clock',
      label: 'Response Time',
      value: 'Same Day - 24 Hour Response',
      subValue: 'WhatsApp: 2-4 hours average',
      action: null
    },
    {
      icon: 'Globe',
      label: 'Availability',
      value: 'Global 24/7 Support',
      subValue: 'Multiple timezone support',
      action: null
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com', color: 'hover:text-[#0077B5]' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com', color: 'hover:text-[#1DA1F2]' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com', color: 'hover:text-[#1877F2]' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com', color: 'hover:text-[#E4405F]' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com', color: 'hover:text-[#FF0000]' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
          <Icon name="Info" size={20} color="white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
      </div>
      <div className="space-y-5 mb-8">
        {contactDetails?.map((detail, index) => (
          <div
            key={index}
            onClick={detail?.action}
            className={`flex items-start space-x-4 p-4 rounded-lg border border-border ${
              detail?.action ? 'cursor-pointer hover:bg-muted hover:border-primary transition-all duration-300' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Icon name={detail?.icon} size={20} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {detail?.label}
              </p>
              <p className="text-sm font-semibold text-foreground mb-0.5">{detail?.value}</p>
              <p className="text-xs text-muted-foreground">{detail?.subValue}</p>
            </div>
            {detail?.action && (
              <Icon name="ExternalLink" size={16} className="text-muted-foreground flex-shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>
      <div className="pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Connect With Us</h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks?.map((social) => (
            <a
              key={social?.name}
              href={social?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-11 h-11 rounded-lg bg-muted flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-md ${social?.color}`}
              aria-label={social?.name}
            >
              <Icon name={social?.icon} size={20} />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Secure Communication</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All communications are encrypted and protected. Your privacy and data security are our top priorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;