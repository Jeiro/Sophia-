import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const contactMethods = [
    {
      icon: "Calendar",
      title: "Schedule Consultation",
      description: "Book a personalized strategy session",
      link: "/consultation-booking",
      color: "primary"
    },
    {
      icon: "MessageCircle",
      title: "Start a Conversation",
      description: "Get in touch via email or phone",
      link: "/contact",
      color: "secondary"
    },
    {
      icon: "BookOpen",
      title: "Explore Services",
      description: "Learn about crypto and real estate expertise",
      link: "/homepage",
      color: "success"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Navigate Both Worlds?
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's work together to build your diversified investment portfolio with confidence and clarity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {contactMethods?.map((method, index) => (
            <Link 
              key={index}
              to={method?.link}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${method?.color}/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={method?.icon} 
                  size={32} 
                  color={`var(--color-${method?.color})`}
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {method?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {method?.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Your Guide to Intelligent Diversification
            </h3>
            <p className="text-muted-foreground">
              Join hundreds of satisfied clients who have transformed their investment approach through expert guidance in both crypto and real estate markets.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation-booking">
              <Button 
                variant="default" 
                size="lg" 
                iconName="Calendar" 
                iconPosition="left"
                fullWidth
              >
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/success-stories">
              <Button 
                variant="outline" 
                size="lg" 
                iconName="TrendingUp" 
                iconPosition="left"
                fullWidth
              >
                View Success Stories
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Connect with me on social media for daily market insights
          </p>
          <div className="flex justify-center space-x-4">
            {['Twitter', 'Linkedin', 'Instagram', 'Youtube']?.map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                aria-label={social}
              >
                <Icon name={social} size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;