import React from 'react';
import Icon from '../../../components/Appicon';

const LocationMap = () => {
  // Mock coordinates for New York, NY
  const latitude = 40.7128;
  const longitude = -74.0060;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Icon name="MapPin" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Our Location</h2>
            <p className="text-sm text-muted-foreground">New York, NY 10001, United States</p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-96 bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="CryptoRealty Pro Office Location"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
          className="border-0"
        />
      </div>

      <div className="p-6 bg-muted/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Icon name="Navigation" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Easy Access</p>
              <p className="text-xs text-muted-foreground">
                Located in the heart of Manhattan with convenient public transportation access
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Car" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Parking Available</p>
              <p className="text-xs text-muted-foreground">
                Visitor parking available in nearby garages and street parking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;