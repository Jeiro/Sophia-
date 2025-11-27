import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';
import Icon from '../../components/Appicon';
import Button from '../../components/UI/Button';
import ContactMethodCard from './components/ContactMethodCard';
import QuickFAQ from './components/QuickFAQ';
import ContactForm from './components/ContactForm';
import ContactInfoCard from './components/ContantInfoCard';
import LocationMap from './components/LocationMap';
import ResponseTimeIndicator from './components/ResponseTimeIndicator';

const Contact = () => {
  const handleWhatsAppContact = () => {
    window.open('https://wa.me/13012336631?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services', '_blank');
  };

  const handleTelegramContact = () => {
    window.open('https://t.me/cryptorealtypro', '_blank');
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:brookssophiae74@gmail.com';
  };

  const handleBookConsultation = () => {
    window.location.href = '/consultation-booking';
  };

  const contactMethods = [
    {
      icon: 'MessageCircle',
      title: 'WhatsApp Business',
      description: 'Instant messaging for quick questions and urgent consultation requests. Get real-time responses during business hours.',
      action: handleWhatsAppContact,
      actionText: 'Chat on WhatsApp',
      isPrimary: true
    },
    {
      icon: 'Send',
      title: 'Telegram',
      description: 'Secure messaging platform for confidential discussions about your investment strategies and portfolio.',
      action: handleTelegramContact,
      actionText: 'Message on Telegram',
      isPrimary: false
    },
    {
      icon: 'Mail',
      title: 'Email',
      description: 'Detailed inquiries and comprehensive questions. Perfect for sharing documents and detailed investment plans.',
      action: handleEmailContact,
      actionText: 'Send Email',
      isPrimary: false
    },
    {
      icon: 'Calendar',
      title: 'Book Consultation',
      description: 'Schedule a dedicated consultation session for in-depth discussion about crypto trading or real estate investment.',
      action: handleBookConsultation,
      actionText: 'Schedule Now',
      isPrimary: true
    }
  ];

  const trustSignals = [
    {
      icon: 'Shield',
      label: 'Secure Communication',
      value: 'SSL Encrypted'
    },
    {
      icon: 'Globe',
      label: 'Global Availability',
      value: 'Multi-Timezone Support'
    },
    {
      icon: 'Award',
      label: 'Professional Certified',
      value: 'Licensed Advisor'
    },
    {
      icon: 'Clock',
      label: 'Response Time',
      value: '2-4 Hours Average'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - CryptoRealty Pro | Multi-Channel Communication Hub</title>
        <meta name="description" content="Connect with CryptoRealty Pro through multiple channels. WhatsApp, Telegram, Email, or book a consultation. Expert guidance in cryptocurrency trading and real estate investment." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-card rounded-full border border-border mb-6">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Available Now - Instant Response</span>
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
                  Let's Start Your Investment Journey
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Choose your preferred communication channel and connect with expert guidance in cryptocurrency trading and real estate investment. We're here to help you navigate both digital and physical asset markets.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={handleWhatsAppContact}
                  >
                    Quick WhatsApp Chat
                  </Button>
                  <Link to="/consultation-booking">
                    <Button variant="outline" size="lg" iconName="Calendar" iconPosition="left">
                      Book Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="py-8 border-b border-border bg-card">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {trustSignals?.map((signal, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon name={signal?.icon} size={20} color="var(--color-primary)" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{signal?.label}</p>
                      <p className="text-sm font-semibold text-foreground">{signal?.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Choose Your Communication Channel
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Select the method that works best for you. All channels are monitored during business hours with guaranteed response times.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {contactMethods?.map((method, index) => (
                  <ContactMethodCard key={index} {...method} />
                ))}
              </div>

              {/* Response Time Indicator */}
              <div className="mb-16">
                <ResponseTimeIndicator />
              </div>

              {/* Main Contact Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <ContactForm />
                <ContactInfoCard />
              </div>

              {/* FAQ Section */}
              <div className="mb-16">
                <QuickFAQ />
              </div>

              {/* Location Map */}
              <LocationMap />
            </div>
          </section>

          {/* Emergency Contact Banner */}
          <section className="py-12 bg-gradient-to-r from-primary to-accent">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Icon name="AlertCircle" size={48} color="white" className="mx-auto mb-4" strokeWidth={2} />
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Need Urgent Consultation?
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  For time-sensitive investment opportunities or urgent portfolio questions, contact us immediately via WhatsApp for same-day consultation availability.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={handleWhatsAppContact}
                >
                  Emergency WhatsApp Contact
                </Button>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Explore More Resources
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  While you're here, check out our other resources to learn more about our expertise and services.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/crypto-trading-mastery" className="group">
                  <div className="bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                      <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Crypto Trading Mastery
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore our cryptocurrency trading expertise and performance metrics
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Learn More <Icon name="ArrowRight" size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>

                <Link to="/success-stories" className="group">
                  <div className="bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                      <Icon name="Award" size={24} color="white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Success Stories
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Read about client transformations and portfolio growth achievements
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Stories <Icon name="ArrowRight" size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>

                <Link to="/about" className="group">
                  <div className="bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-success to-secondary flex items-center justify-center mb-4">
                      <Icon name="User" size={24} color="white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      About Us
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn about our expertise, credentials, and professional journey
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Read More <Icon name="ArrowRight" size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;