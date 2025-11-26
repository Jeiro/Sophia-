import React from 'react';
import Icon from '../../../components/AppIcon';

const ConsultationTypeCard = ({ type, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-lg'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
          }`}
        >
          <Icon name={type?.icon} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{type?.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{type?.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">
              <Icon name="Clock" size={14} className="mr-1" />
              {type?.duration}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
              <Icon name="DollarSign" size={14} className="mr-1" />
              {type?.price}
            </span>
          </div>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'border-primary bg-primary' : 'border-border'
          }`}
        >
          {isSelected && <Icon name="Check" size={16} color="white" />}
        </div>
      </div>
    </button>
  );
};

export default ConsultationTypeCard;