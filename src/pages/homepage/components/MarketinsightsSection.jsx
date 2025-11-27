import React, { useState } from 'react';
import Icon from '../../../components/Appicon';

const MarketInsightsSection = () => {
  const [activeTab, setActiveTab] = useState('crypto');

  const cryptoData = [
    { symbol: "BTC", name: "Bitcoin", price: "$67,842.50", change: "+5.24%", trend: "up", volume: "$28.4B" },
    { symbol: "ETH", name: "Ethereum", price: "$3,456.78", change: "+3.87%", trend: "up", volume: "$14.2B" },
    { symbol: "BNB", name: "Binance Coin", price: "$589.23", change: "-1.45%", trend: "down", volume: "$2.1B" },
    { symbol: "SOL", name: "Solana", price: "$142.67", change: "+8.92%", trend: "up", volume: "$3.8B" },
    { symbol: "ADA", name: "Cardano", price: "$0.6234", change: "+2.14%", trend: "up", volume: "$890M" }
  ];

  const realEstateData = [
    { market: "Miami, FL", avgPrice: "$542,000", change: "+12.4%", trend: "up", inventory: "2,340 units" },
    { market: "Austin, TX", avgPrice: "$478,500", change: "+8.7%", trend: "up", inventory: "1,890 units" },
    { market: "Phoenix, AZ", avgPrice: "$395,200", change: "+6.3%", trend: "up", inventory: "3,120 units" },
    { market: "Nashville, TN", avgPrice: "$425,800", change: "+9.1%", trend: "up", inventory: "1,560 units" },
    { market: "Denver, CO", avgPrice: "$567,300", change: "-2.3%", trend: "down", inventory: "2,780 units" }
  ];

  const insights = [
    {
      title: "Q4 2025 Crypto Market Outlook",
      description: "Bitcoin's institutional adoption continues to drive market sentiment. Key resistance levels and strategic entry points for the upcoming quarter.",
      date: "Nov 15, 2025",
      category: "Crypto Analysis",
      icon: "TrendingUp"
    },
    {
      title: "Emerging Real Estate Hotspots",
      description: "Secondary markets showing unprecedented growth potential. Analysis of demographic shifts and investment opportunities in Sun Belt regions.",
      date: "Nov 12, 2025",
      category: "Real Estate",
      icon: "MapPin"
    },
    {
      title: "Portfolio Diversification Strategy",
      description: "Balancing digital and physical assets for optimal risk-adjusted returns. Case study: 60/40 crypto-real estate allocation performance.",
      date: "Nov 8, 2025",
      category: "Investment Strategy",
      icon: "PieChart"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 mb-4">
            <Icon name="Activity" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-secondary">Live Market Intelligence</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real-Time Market Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with live market data, expert analysis, and actionable investment insights across both domains.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden mb-12">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('crypto')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'crypto' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Bitcoin" size={18} />
                <span>Cryptocurrency Markets</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('realestate')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'realestate' ?'bg-secondary text-secondary-foreground' :'text-muted-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Home" size={18} />
                <span>Real Estate Markets</span>
              </div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'crypto' ? (
              <div className="space-y-4">
                {cryptoData?.map((crypto, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-muted transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{crypto?.symbol}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{crypto?.name}</div>
                        <div className="text-sm text-muted-foreground">Vol: {crypto?.volume}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{crypto?.price}</div>
                      <div className={`text-sm font-medium flex items-center justify-end space-x-1 ${
                        crypto?.trend === 'up' ? 'text-success' : 'text-error'
                      }`}>
                        <Icon name={crypto?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                        <span>{crypto?.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {realEstateData?.map((market, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-muted transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Icon name="MapPin" size={20} className="text-secondary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{market?.market}</div>
                        <div className="text-sm text-muted-foreground">{market?.inventory}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{market?.avgPrice}</div>
                      <div className={`text-sm font-medium flex items-center justify-end space-x-1 ${
                        market?.trend === 'up' ? 'text-success' : 'text-error'
                      }`}>
                        <Icon name={market?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                        <span>{market?.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {insights?.map((insight, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={insight?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-xs font-medium text-primary mb-2">{insight?.category}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{insight?.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{insight?.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{insight?.date}</span>
                <Icon name="ArrowRight" size={16} className="text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketInsightsSection;