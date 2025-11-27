import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/UI/Button';
import ConsultationTypeCard from './components/ConsulationTypeCard';
import TimeSlotSelector from './components/TimeSlotSelector';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import TrustSignals from './components/TrustSignals';

const ConsultationBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const consultationTypes = [
    {
      id: 'crypto',
      icon: 'TrendingUp',
      title: 'Crypto Trading Consultation',
      description: 'Deep dive into cryptocurrency trading strategies, portfolio optimization, and market analysis for digital assets.',
      duration: '60 minutes',
      price: '$299',
    },
    {
      id: 'realestate',
      icon: 'Building2',
      title: 'Real Estate Investment Consultation',
      description: 'Comprehensive guidance on property investment, market trends, and real estate portfolio development.',
      duration: '60 minutes',
      price: '$299',
    },
    {
      id: 'comprehensive',
      icon: 'Briefcase',
      title: 'Comprehensive Wealth Strategy',
      description: 'Complete diversification consultation covering both crypto and real estate for balanced wealth creation.',
      duration: '90 minutes',
      price: '$449',
    },
  ];

  const generateTimeSlots = () => {
    const slots = [];
    const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
    
    times?.forEach((time, index) => {
      slots?.push({
        time,
        available: index !== 2 && index !== 5,
      });
    });
    
    return slots;
  };

  const availableSlots = generateTimeSlots();

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedType) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedTime) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (formData) => {
    const booking = {
      ...formData,
      consultationType: consultationTypes?.find((t) => t?.id === selectedType)?.title,
      date: selectedDate,
      time: selectedTime,
    };
    setBookingDetails(booking);
    setCurrentStep(4);
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
    setSelectedTime(null);
  };

  const steps = [
    { number: 1, title: 'Select Type', icon: 'Briefcase' },
    { number: 2, title: 'Choose Time', icon: 'Calendar' },
    { number: 3, title: 'Your Details', icon: 'User' },
    { number: 4, title: 'Confirmation', icon: 'CheckCircle2' },
  ];

  return (
    <>
      <Helmet>
        <title>Book Consultation - CryptoRealty Pro</title>
        <meta
          name="description"
          content="Schedule your personalized consultation for cryptocurrency trading or real estate investment guidance. Expert advice for wealth diversification."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Book Your Consultation
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Schedule a personalized consultation to discuss your investment goals and create a tailored strategy for success.
                </p>
              </div>

              {currentStep < 4 && (
                <div className="mb-12">
                  <div className="flex items-center justify-center space-x-2 md:space-x-4">
                    {steps?.map((step, index) => (
                      <React.Fragment key={step?.number}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                              currentStep >= step?.number
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <Icon name={step?.icon} size={20} />
                          </div>
                          <span
                            className={`text-xs mt-2 font-medium hidden sm:block ${
                              currentStep >= step?.number ? 'text-foreground' : 'text-muted-foreground'
                            }`}
                          >
                            {step?.title}
                          </span>
                        </div>
                        {index < steps?.length - 1 && (
                          <div
                            className={`h-0.5 w-8 md:w-16 transition-all duration-300 ${
                              currentStep > step?.number ? 'bg-primary' : 'bg-border'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">Select Consultation Type</h2>
                          <p className="text-muted-foreground">
                            Choose the consultation that best fits your investment goals and needs.
                          </p>
                        </div>
                        <div className="space-y-4">
                          {consultationTypes?.map((type) => (
                            <ConsultationTypeCard
                              key={type?.id}
                              type={type}
                              isSelected={selectedType === type?.id}
                              onClick={() => handleTypeSelect(type?.id)}
                            />
                          ))}
                        </div>
                        <div className="flex justify-end pt-4">
                          <Button
                            variant="default"
                            onClick={handleNextStep}
                            disabled={!selectedType}
                            iconName="ArrowRight"
                            iconPosition="right"
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">Choose Date & Time</h2>
                          <p className="text-muted-foreground">
                            Select your preferred date and time slot for the consultation.
                          </p>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Select Date</label>
                            <input
                              type="date"
                              value={selectedDate?.toISOString()?.split('T')?.[0]}
                              onChange={handleDateChange}
                              min={new Date()?.toISOString()?.split('T')?.[0]}
                              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Available Time Slots</label>
                            <TimeSlotSelector
                              selectedDate={selectedDate}
                              selectedTime={selectedTime}
                              onTimeSelect={setSelectedTime}
                              availableSlots={availableSlots}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button variant="outline" onClick={handlePreviousStep} iconName="ArrowLeft" iconPosition="left">
                            Back
                          </Button>
                          <Button
                            variant="default"
                            onClick={handleNextStep}
                            disabled={!selectedTime}
                            iconName="ArrowRight"
                            iconPosition="right"
                            fullWidth
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">Your Information</h2>
                          <p className="text-muted-foreground">
                            Please provide your details to complete the booking.
                          </p>
                        </div>
                        <BookingForm
                          consultationType={selectedType}
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onSubmit={handleFormSubmit}
                          onBack={handlePreviousStep}
                        />
                      </div>
                    )}

                    {currentStep === 4 && bookingDetails && (
                      <BookingConfirmation bookingDetails={bookingDetails} />
                    )}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    <TrustSignals />

                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                        <Icon name="MessageCircle" size={20} className="mr-2" color="var(--color-primary)" />
                        Need Help?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Have questions about which consultation is right for you? Our team is here to help.
                      </p>
                      <div className="space-y-3">
                        <Button variant="outline" fullWidth iconName="Mail" iconPosition="left">
                          Email Us
                        </Button>
                        <Button variant="outline" fullWidth iconName="MessageCircle" iconPosition="left">
                          WhatsApp
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon name="Clock" size={24} color="white" />
                        <h4 className="font-semibold">Multi-Timezone Support</h4>
                      </div>
                      <p className="text-sm opacity-90">
                        We offer consultations across all major timezones to accommodate international clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ConsultationBooking;