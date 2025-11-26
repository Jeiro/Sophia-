import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactMethodCard = ({ icon, title, description, action, actionText, isPrimary }) => {
  return (
    <div className={`bg-card rounded-lg border ${isPrimary ? 'border-primary shadow-lg' : 'border-border'} p-6 hover:shadow-xl transition-all duration-300`}>
      <div className={`w-12 h-12 rounded-lg ${isPrimary ? 'bg-gradient-to-br from-primary to-accent' : 'bg-muted'} flex items-center justify-center mb-4`}>
        <Icon name={icon} size={24} color={isPrimary ? 'white' : 'var(--color-foreground)'} strokeWidth={2} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <button
        onClick={action}
        className={`w-full py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-300 ${
          isPrimary
            ? 'bg-primary text-primary-foreground hover:bg-accent shadow-sm'
            : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
        }`}
      >
        {actionText}
      </button>
    </div>
  );
};

export default ContactMethodCard;