import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExpertiseSection = () => {
  const expertiseAreas = [
  {
    id: 1,
    title: "Cryptocurrency Trading Mastery",
    description: "Navigate the volatile crypto markets with confidence. From Bitcoin to emerging altcoins, I provide strategic trading insights, risk management frameworks, and portfolio optimization techniques that have generated consistent returns for my clients.",
    image: "https://images.unsplash.com/photo-1632249228595-f38c067cbdc0",
    imageAlt: "Modern cryptocurrency trading dashboard displaying Bitcoin Ethereum charts with candlestick patterns technical indicators and real-time market data on multiple monitors in professional trading office",
    icon: "Bitcoin",
    color: "primary",
    stats: [
    { label: "Average ROI", value: "847%" },
    { label: "Win Rate", value: "78.3%" },
    { label: "Active Traders", value: "1,240+" }],

    features: [
    "Advanced technical analysis strategies",
    "Risk-adjusted portfolio construction",
    "24/7 market monitoring and alerts",
    "Exclusive trading signals and insights"],

    link: "/crypto-trading-mastery"
  },
  {
    id: 2,
    title: "Real Estate Investment Excellence",
    description: "Build lasting wealth through strategic property investments. I specialize in identifying high-growth markets, analyzing cash flow opportunities, and structuring deals that maximize returns while minimizing risk in both residential and commercial sectors.",
    image: "https://images.unsplash.com/photo-1637748924648-5b9224977d37",
    imageAlt: "Luxury modern residential property exterior with contemporary architecture featuring glass windows stone facade manicured landscaping and sunset lighting showcasing premium real estate investment opportunity",
    icon: "Home",
    color: "secondary",
    stats: [
    { label: "Properties Analyzed", value: "3,890+" },
    { label: "Avg. Appreciation", value: "34.2%" },
    { label: "Client Portfolio", value: "$89M+" }],

    features: [
    "Market trend analysis and forecasting",
    "Property valuation and due diligence",
    "Investment structuring and financing",
    "Portfolio diversification strategies"],

    link: "/consultation-booking"
  }];


  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Dual Domain Expertise</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Two Worlds, One Vision
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining cutting-edge cryptocurrency strategies with time-tested real estate wisdom to create comprehensive wealth-building solutions.
          </p>
        </div>

        <div className="space-y-20">
          {expertiseAreas?.map((area, index) =>
          <div
            key={area?.id}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`
            }>

              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                  src={area?.image}
                  alt={area?.imageAlt}
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500" />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="grid grid-cols-3 gap-4">
                      {area?.stats?.map((stat, idx) =>
                    <div key={idx} className="text-center bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                          <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                          <div className="text-xs text-muted-foreground mt-1">{stat?.label}</div>
                        </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`w-16 h-16 rounded-2xl bg-${area?.color}/10 flex items-center justify-center`}>
                  <Icon name={area?.icon} size={32} className={`text-${area?.color}`} />
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {area?.title}
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {area?.description}
                </p>

                <div className="space-y-3">
                  {area?.features?.map((feature, idx) =>
                <div key={idx} className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full bg-${area?.color}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon name="Check" size={14} className={`text-${area?.color}`} />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                )}
                </div>

                <div className="pt-4">
                  <Link to={area?.link}>
                    <Button variant="default" size="lg" iconName="ArrowRight" iconPosition="right">
                      Explore {area?.id === 1 ? 'Crypto Services' : 'Real Estate Services'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default ExpertiseSection;