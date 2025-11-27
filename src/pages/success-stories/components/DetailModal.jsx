import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/UI/Button';

const DetailModal = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-foreground">Success Story Details</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors duration-300"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="relative h-80 rounded-lg overflow-hidden mb-6">
            <Image
              src={story?.image}
              alt={story?.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-lg font-bold flex items-center space-x-2">
              <Icon name="TrendingUp" size={20} />
              <span>{story?.growthPercentage}% Growth</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
              <Image
                src={story?.clientAvatar}
                alt={story?.clientAvatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{story?.clientName}</h3>
              <p className="text-muted-foreground">{story?.clientRole}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Initial Investment</p>
              <p className="text-2xl font-bold text-foreground">${story?.initialInvestment?.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Current Value</p>
              <p className="text-2xl font-bold text-success">${story?.currentValue?.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Timeframe</p>
              <p className="text-2xl font-bold text-foreground">{story?.timeframe}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-foreground mb-3">Investment Strategy</h4>
            <div className="flex flex-wrap gap-2">
              {story?.investmentTypes?.map((type, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-foreground mb-3">Client Testimonial</h4>
            <div className="bg-muted rounded-lg p-6">
              <p className="text-foreground italic mb-4">"{story?.fullTestimonial}"</p>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={20}
                    className="text-warning fill-warning"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-foreground mb-3">Journey Highlights</h4>
            <div className="space-y-4">
              {story?.journeyHighlights?.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="CheckCircle" size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">{highlight?.title}</p>
                    <p className="text-muted-foreground text-sm">{highlight?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="default"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={() => window.location.href = '/consultation-booking'}
            >
              Book Your Consultation
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              iconPosition="left"
            >
              Download Case Study
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;