import React from 'react';
import Icon from '../../../components/AppIcon';

const TradingPhilosophy = () => {
  const principles = [
    {
      id: 1,
      icon: "Target",
      title: "Data-Driven Decisions",
      description: "Every trade is backed by comprehensive technical analysis, on-chain metrics, and market sentiment indicators. No emotional trading, only calculated moves based on proven strategies."
    },
    {
      id: 2,
      icon: "Shield",
      title: "Risk Management First",
      description: "Protecting your capital is paramount. We implement strict stop-loss protocols, position sizing strategies, and portfolio diversification to minimize downside risk while maximizing upside potential."
    },
    {
      id: 3,
      icon: "TrendingUp",
      title: "Long-Term Value Creation",
      description: "While we capitalize on short-term opportunities, our focus remains on building sustainable wealth through strategic accumulation of fundamentally strong digital assets."
    },
    {
      id: 4,
      icon: "Brain",
      title: "Continuous Learning",
      description: "The crypto market evolves rapidly. We stay ahead through constant research, attending industry conferences, and adapting strategies to emerging trends and technologies."
    },
    {
      id: 5,
      icon: "Users",
      title: "Transparent Communication",
      description: "You'll always know the reasoning behind every recommendation. Regular portfolio reviews, market updates, and open dialogue ensure you're informed and confident in your investments."
    },
    {
      id: 6,
      icon: "Zap",
      title: "Opportunistic Agility",
      description: "Markets move fast, and so do we. Our real-time monitoring systems and rapid execution capabilities ensure we capture profitable opportunities as they emerge."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Icon name="Compass" size={20} />
            <span className="text-sm font-semibold">Trading Philosophy</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Principles That Drive Success
          </h2>
          
          <p className="text-lg text-muted-foreground">
            My approach to cryptocurrency trading is built on six core principles that have consistently delivered exceptional results for clients across market cycles.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles?.map((principle) => (
            <div 
              key={principle?.id}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name={principle?.icon} size={28} color="white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                {principle?.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {principle?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradingPhilosophy;