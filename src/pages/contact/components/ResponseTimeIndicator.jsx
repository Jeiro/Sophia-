import React from 'react';
import Icon from '../../../components/AppIcon';

const ResponseTimeIndicator = () => {
  const responseMetrics = [
    {
      icon: 'Zap',
      label: 'Urgent Inquiries',
      time: '2-4 Hours',
      description: 'Same-day response for time-sensitive matters',
      color: 'from-error to-warning'
    },
    {
      icon: 'Clock',
      label: 'Standard Inquiries',
      time: '24 Hours',
      description: 'Next business day response guaranteed',
      color: 'from-primary to-accent'
    },
    {
      icon: 'Calendar',
      label: 'General Questions',
      time: '48 Hours',
      description: 'Comprehensive response within 2 business days',
      color: 'from-secondary to-primary'
    }
  ];

  const currentHour = new Date()?.getHours();
  const isBusinessHours = currentHour >= 9 && currentHour < 18;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success to-secondary flex items-center justify-center">
            <Icon name="Timer" size={20} color="white" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Response Times</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isBusinessHours ? 'bg-success' : 'bg-warning'} animate-pulse`} />
          <span className="text-sm font-medium text-foreground">
            {isBusinessHours ? 'Online Now' : 'After Hours'}
          </span>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {responseMetrics?.map((metric, index) => (
          <div key={index} className="p-4 rounded-lg border border-border hover:border-primary transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric?.color} flex items-center justify-center flex-shrink-0`}>
                <Icon name={metric?.icon} size={22} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{metric?.label}</h3>
                  <span className="text-sm font-bold text-primary">{metric?.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{metric?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} color="var(--color-secondary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Business Hours</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Monday - Friday: 9:00 AM - 6:00 PM EST\nWeekend consultations available by appointment\nEmergency consultations: Contact via WhatsApp for immediate assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseTimeIndicator;