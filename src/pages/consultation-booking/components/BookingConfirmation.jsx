import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/UI/Button';
import { Link } from 'react-router-dom';

const BookingConfirmation = ({ bookingDetails }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle2" size={48} color="var(--color-success)" />
      </div>
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Consultation Confirmed!</h2>
        <p className="text-lg text-muted-foreground">
          Your consultation has been successfully scheduled. We've sent a confirmation email to{' '}
          <span className="font-medium text-foreground">{bookingDetails?.email}</span>
        </p>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-semibold text-foreground mb-4">Booking Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Briefcase" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Consultation Type</p>
              <p className="font-medium text-foreground">{bookingDetails?.consultationType}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">{formatDate(bookingDetails?.date)}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium text-foreground">{bookingDetails?.time} {bookingDetails?.timezone}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Name</p>
              <p className="font-medium text-foreground">{bookingDetails?.fullName}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted rounded-xl p-6 space-y-3">
        <div className="flex items-center justify-center space-x-2 text-foreground">
          <Icon name="Info" size={20} />
          <h4 className="font-semibold">What's Next?</h4>
        </div>
        <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" color="var(--color-success)" />
            <span>You'll receive a confirmation email with calendar invite</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" color="var(--color-success)" />
            <span>Preparation materials will be sent 24 hours before the consultation</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" color="var(--color-success)" />
            <span>You'll receive a reminder 1 hour before the scheduled time</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" color="var(--color-success)" />
            <span>Video consultation link will be included in the confirmation email</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button variant="outline" iconName="Calendar" iconPosition="left">
          Add to Calendar
        </Button>
        <Link to="/homepage">
          <Button variant="default" iconName="Home" iconPosition="left">
            Return to Homepage
          </Button>
        </Link>
      </div>
      <div className="pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Need to reschedule or have questions?{' '}
          <Link to="/contact" className="text-primary hover:underline font-medium">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;