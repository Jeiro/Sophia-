import React from 'react';
import Icon from '../../../components/Appicon';

const PhilosophySection = () => {
  const philosophyPillars = [
    {
      icon: "Target",
      title: "Intelligent Diversification",
      description: "True wealth protection comes from understanding how different asset classes complement each other. I help clients build portfolios that balance the stability of real estate with the growth potential of cryptocurrency.",
      color: "primary"
    },
    {
      icon: "Shield",
      title: "Risk-Aware Innovation",
      description: "Innovation without risk management is gambling. I combine cutting-edge crypto strategies with time-tested real estate principles to create investment approaches that are both forward-thinking and fundamentally sound.",
      color: "secondary"
    },
    {
      icon: "Compass",
      title: "Data-Driven Decisions",
      description: "Every recommendation I make is backed by thorough market analysis, historical data, and current trends. I believe in letting the numbers guide our strategy while maintaining the flexibility to adapt to changing conditions.",
      color: "success"
    },
    {
      icon: "Heart",
      title: "Client-Centric Approach",
      description: "Your financial goals are unique, and your investment strategy should be too. I take time to understand your risk tolerance, timeline, and aspirations before crafting a personalized wealth-building plan.",
      color: "primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My Investment Philosophy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide every decision I make for my clients
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {philosophyPillars?.map((pillar, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${pillar?.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={pillar?.icon} 
                  size={32} 
                  color={`var(--color-${pillar?.color})`}
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {pillar?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                <Icon name="Lightbulb" size={48} color="white" strokeWidth={2} />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Navigate Both Worlds with Confidence
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                "I believe that the future of wealth creation lies at the intersection of traditional and digital assets. My mission is to be your trusted guide through both landscapes, helping you make informed decisions that align with your financial goals and risk tolerance."
              </p>
              <p className="text-sm font-semibold text-primary">
                — Your Guide to Intelligent Diversification
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;