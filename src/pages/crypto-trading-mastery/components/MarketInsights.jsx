import React from 'react';
import Icon from '../../../components/Appicon';
import Button from '../../../components/UI/Button';


const MarketInsights = () => {
  const insights = [
    {
      id: 1,
      date: "November 15, 2025",
      category: "Market Analysis",
      title: "Bitcoin\'s Path to $100K: Technical and Fundamental Drivers",
      excerpt: "Analyzing the convergence of institutional adoption, ETF inflows, and technical breakout patterns that suggest BTC could reach six figures by Q2 2026.",
      readTime: "8 min read",
      icon: "TrendingUp"
    },
    {
      id: 2,
      date: "November 12, 2025",
      category: "Strategy",
      title: "Navigating Altcoin Season: Portfolio Allocation Strategies",
      excerpt: "How to identify promising altcoins and manage position sizing during periods of high volatility and market rotation from Bitcoin to alternative cryptocurrencies.",
      readTime: "6 min read",
      icon: "Target"
    },
    {
      id: 3,
      date: "November 8, 2025",
      category: "Risk Management",
      title: "The 2% Rule: Why Position Sizing Matters More Than Entry Points",
      excerpt: "Deep dive into risk management principles that separate successful traders from those who blow up their accounts. Real examples from client portfolios.",
      readTime: "10 min read",
      icon: "Shield"
    }
  ];

  const marketSentiment = [
    { label: "Fear & Greed Index", value: 72, status: "Greed", color: "warning" },
    { label: "Market Dominance", value: 54, status: "BTC", color: "primary" },
    { label: "Volatility Index", value: 38, status: "Moderate", color: "secondary" }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Icon name="Newspaper" size={20} />
                <span className="text-sm font-semibold">Market Insights</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Latest Analysis & Trading Insights
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Weekly market commentary, trading strategies, and educational content to keep you ahead of the curve.
              </p>
            </div>
            
            <div className="space-y-6">
              {insights?.map((insight) => (
                <div 
                  key={insight?.id}
                  className="bg-background border border-border rounded-2xl p-6 hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon name={insight?.icon} size={24} color="white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {insight?.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{insight?.date}</span>
                        <span className="text-xs text-muted-foreground flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{insight?.readTime}</span>
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {insight?.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {insight?.excerpt}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                        <span>Read Full Analysis</span>
                        <Icon name="ArrowRight" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-background border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Activity" size={24} color="var(--color-secondary)" />
                <h3 className="text-xl font-bold text-foreground">Market Sentiment</h3>
              </div>
              
              <div className="space-y-6">
                {marketSentiment?.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{item?.label}</span>
                      <span className={`text-sm font-bold text-${item?.color}`}>{item?.status}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-${item?.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item?.value}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 text-right">{item?.value}%</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Bell" size={20} color="var(--color-primary)" />
                    <span className="font-semibold text-foreground">Market Alerts</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get instant notifications for major market movements and trading opportunities.
                  </p>
                </div>
                
                <Button variant="outline" size="default" fullWidth iconName="Bell" iconPosition="left">
                  Enable Alerts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;