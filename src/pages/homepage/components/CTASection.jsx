import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Button from '../../../components/UI/Button';

const CTASection = () => {
  const benefits = [
    {
      icon: "Shield",
      title: "Risk-Managed Strategies",
      description: "Proven frameworks that protect your capital while maximizing growth potential"
    },
    {
      icon: "TrendingUp",
      title: "Consistent Performance",
      description: "Track record of delivering above-market returns across market cycles"
    },
    {
      icon: "Users",
      title: "Personalized Guidance",
      description: "One-on-one consultation tailored to your unique financial goals"
    },
    {
      icon: "Clock",
      title: "24/7 Market Monitoring",
      description: "Round-the-clock analysis ensuring you never miss critical opportunities"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-16 text-white">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Icon name="Sparkles" size={16} color="white" />
                  <span className="text-sm font-medium">Limited Consultation Slots Available</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Ready to Transform Your Investment Portfolio?
                </h2>

                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Join over 2,340 successful investors who have achieved financial freedom through strategic crypto trading and real estate investment. Schedule your free consultation today and discover how dual-domain expertise can accelerate your wealth-building journey.
                </p>

                <div className="space-y-4 mb-8">
                  {benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <Icon name={benefit?.icon} size={20} color="white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{benefit?.title}</div>
                        <div className="text-sm text-white/80">{benefit?.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/consultation-booking" className="flex-1">
                    <Button
                      variant="default"
                      size="lg"
                      fullWidth
                      iconName="Calendar"
                      iconPosition="left"
                      className="bg-white text-primary hover:bg-white/90"
                    >
                      Book Free Consultation
                    </Button>
                  </Link>
                  <Link to="/contact" className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      iconName="MessageCircle"
                      iconPosition="left"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Contact Now
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center space-x-6">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4]?.map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center"
                        >
                          <Icon name="User" size={16} color="white" />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-white/90">
                      <span className="font-semibold">2,340+ investors</span> trust our expertise
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-12 lg:p-16 flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-white/80 text-sm font-medium">Average Client Growth</div>
                      <Icon name="TrendingUp" size={20} color="white" />
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">847%</div>
                    <div className="text-white/80 text-sm">Over 18-month period</div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-white/80 text-sm font-medium">Success Rate</div>
                      <Icon name="Award" size={20} color="white" />
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">98.4%</div>
                    <div className="text-white/80 text-sm">Client satisfaction rating</div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-white/80 text-sm font-medium">Portfolio Value</div>
                      <Icon name="DollarSign" size={20} color="white" />
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">$127M+</div>
                    <div className="text-white/80 text-sm">Assets under advisory</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by leading investors and featured in
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-foreground">Forbes</div>
              <div className="text-2xl font-bold text-foreground">Bloomberg</div>
              <div className="text-2xl font-bold text-foreground">CNBC</div>
              <div className="text-2xl font-bold text-foreground">WSJ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;