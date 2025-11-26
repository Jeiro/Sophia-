import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const stats = [
  { value: "847%", label: "Average Portfolio Growth", icon: "TrendingUp" },
  { value: "2,340+", label: "Successful Trades", icon: "BarChart3" },
  { value: "$127M+", label: "Assets Under Advisory", icon: "DollarSign" },
  { value: "98.4%", label: "Client Satisfaction", icon: "Award" }];


  return (
    <section className="relative bg-gradient-to-br from-background via-muted to-background overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Where Digital Innovation Meets Tangible Assets</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Navigate Modern Wealth with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Dual Expertise
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Master cryptocurrency trading and real estate investment with expert guidance. I bridge the gap between digital innovation and traditional assets, helping you build diversified wealth portfolios that thrive in any market condition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/consultation-booking">
                <Button variant="default" size="lg" iconName="Calendar" iconPosition="left">
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link to="/success-stories">
                <Button variant="outline" size="lg" iconName="TrendingUp" iconPosition="left">
                  View Success Stories
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats?.map((stat, index) =>
              <div key={index} className="text-center p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={stat?.icon} size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat?.label}</div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_148396511-1763294481120.png"
                alt="Professional financial advisor woman with confident smile wearing elegant business attire standing in modern office with city skyline and financial charts visible in background"
                className="w-full h-[600px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-6 border border-border shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Live Market Performance</div>
                    <div className="text-2xl font-bold text-foreground">+24.7% This Quarter</div>
                  </div>
                  <div className="text-success">
                    <Icon name="ArrowUpRight" size={32} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;