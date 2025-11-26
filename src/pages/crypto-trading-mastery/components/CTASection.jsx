import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const benefits = [
    "Personalized trading strategy tailored to your goals",
    "Comprehensive portfolio analysis and optimization",
    "Risk management framework implementation",
    "Ongoing support and market guidance"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8">
            <Icon name="Sparkles" size={20} />
            <span className="text-sm font-semibold">Limited Availability</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Crypto Portfolio?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join 150+ successful clients who have achieved exceptional returns through expert guidance and proven strategies. Book your consultation today.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
            {benefits?.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={16} color="var(--color-primary)" />
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/consultation-booking">
              <Button variant="secondary" size="xl" iconName="Calendar" iconPosition="left">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="xl" 
                iconName="MessageCircle" 
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Contact via WhatsApp
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} />
              <span className="text-sm">100% Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span className="text-sm">60-Min Session</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} />
              <span className="text-sm">Expert Certified</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default CTASection;