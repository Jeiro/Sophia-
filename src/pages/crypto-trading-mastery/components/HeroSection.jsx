import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-card to-muted overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
              <Icon name="TrendingUp" size={20} />
              <span className="text-sm font-semibold">Live Market Analysis</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Master Cryptocurrency Trading with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> Expert Guidance</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Navigate the dynamic world of digital assets with confidence. Data-driven strategies, real-time insights, and personalized consultation to maximize your crypto portfolio returns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/consultation-booking">
                <Button variant="default" size="lg" iconName="Calendar" iconPosition="left">
                  Book Crypto Consultation
                </Button>
              </Link>
              <Button variant="outline" size="lg" iconName="Download" iconPosition="left">
                Download Trading Guide
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">247%</div>
                <div className="text-sm text-muted-foreground">Avg. Portfolio Growth</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">150+</div>
                <div className="text-sm text-muted-foreground">Successful Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1605512929729-5745c688f78a"
                alt="Professional cryptocurrency trading dashboard displaying real-time market charts with candlestick patterns, volume indicators, and multiple digital asset price movements on modern dark interface"
                className="w-full h-auto rounded-2xl" />

              
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">+42.8%</div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;