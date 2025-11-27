import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Button from '../../../components/UI/Button';

const ServicesOffered = () => {
  const services = [
    {
      id: 1,
      icon: "UserCheck",
      title: "1-on-1 Trading Consultation",
      description: "Personalized strategy sessions tailored to your risk tolerance, investment goals, and market experience. Get expert guidance on portfolio construction and trade execution.",
      features: [
        "Comprehensive portfolio analysis",
        "Custom trading strategy development",
        "Risk assessment and management",
        "Ongoing support and guidance"
      ],
      duration: "60 minutes",
      price: "$299",
      popular: true
    },
    {
      id: 2,
      icon: "BookOpen",
      title: "Crypto Trading Masterclass",
      description: "Comprehensive educational program covering technical analysis, fundamental research, risk management, and advanced trading strategies for all experience levels.",
      features: [
        "12 weeks structured curriculum",
        "Live trading sessions",
        "Private community access",
        "Lifetime course updates"
      ],
      duration: "12 weeks",
      price: "$1,997",
      popular: false
    },
    {
      id: 3,
      icon: "LineChart",
      title: "Portfolio Management",
      description: "Full-service portfolio management where I handle all trading decisions, rebalancing, and optimization while you focus on your other priorities.",
      features: [
        "Active portfolio management",
        "Monthly performance reports",
        "Tax optimization strategies",
        "24/7 market monitoring"
      ],
      duration: "Ongoing",
      price: "2% AUM",
      popular: false
    },
    {
      id: 4,
      icon: "Zap",
      title: "Quick Strategy Review",
      description: "Fast-track consultation for specific trading questions, portfolio reviews, or market opportunity analysis. Perfect for experienced traders needing expert validation.",
      features: [
        "30-minute focused session",
        "Specific question resolution",
        "Actionable recommendations",
        "Follow-up email summary"
      ],
      duration: "30 minutes",
      price: "$149",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <Icon name="Briefcase" size={20} />
            <span className="text-sm font-semibold">Services</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Crypto Trading Services Designed for Your Success
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Whether you're just starting or looking to optimize an existing portfolio, I offer tailored services to meet your specific needs and investment goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services?.map((service) => (
            <div 
              key={service?.id}
              className={`bg-card border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 relative ${
                service?.popular ? 'border-primary shadow-lg' : 'border-border'
              }`}
            >
              {service?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  service?.popular ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-muted'
                }`}>
                  <Icon 
                    name={service?.icon} 
                    size={28} 
                    color={service?.popular ? 'white' : 'var(--color-foreground)'} 
                  />
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">{service?.price}</div>
                  <div className="text-sm text-muted-foreground">{service?.duration}</div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {service?.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service?.description}
              </p>
              
              <div className="space-y-3 mb-8">
                {service?.features?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={14} color="var(--color-success)" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/consultation-booking">
                <Button 
                  variant={service?.popular ? "default" : "outline"} 
                  size="lg" 
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Book This Service
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which service is right for you?
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg" iconName="MessageCircle" iconPosition="left">
              Schedule Free Discovery Call
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOffered;