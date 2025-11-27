import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Appicon';

const LiveMarketWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cryptoData = [
    {
      id: 1,
      symbol: "BTC",
      name: "Bitcoin",
      price: 67842.50,
      change: 5.24,
      volume: "28.4B",
      marketCap: "1.32T",
      icon: "Bitcoin"
    },
    {
      id: 2,
      symbol: "ETH",
      name: "Ethereum",
      price: 3456.78,
      change: 3.87,
      volume: "15.2B",
      marketCap: "415.6B",
      icon: "Coins"
    },
    {
      id: 3,
      symbol: "BNB",
      name: "Binance Coin",
      price: 612.34,
      change: -1.23,
      volume: "2.1B",
      marketCap: "94.3B",
      icon: "Coins"
    },
    {
      id: 4,
      symbol: "SOL",
      name: "Solana",
      price: 234.56,
      change: 8.92,
      volume: "3.8B",
      marketCap: "108.7B",
      icon: "Coins"
    },
    {
      id: 5,
      symbol: "XRP",
      name: "Ripple",
      price: 0.6789,
      change: 2.45,
      volume: "1.9B",
      marketCap: "38.2B",
      icon: "Coins"
    },
    {
      id: 6,
      symbol: "ADA",
      name: "Cardano",
      price: 0.5432,
      change: -0.87,
      volume: "892M",
      marketCap: "19.1B",
      icon: "Coins"
    }
  ];

  return (
    <section className="bg-card border-y border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="Activity" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Live Market Data</h2>
              <p className="text-sm text-muted-foreground">
                Updated: {currentTime?.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-success">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptoData?.map((crypto) => (
            <div 
              key={crypto?.id}
              className="bg-background border border-border rounded-xl p-4 hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon name={crypto?.icon} size={20} color="white" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{crypto?.symbol}</div>
                    <div className="text-xs text-muted-foreground">{crypto?.name}</div>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                  crypto?.change >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  <Icon 
                    name={crypto?.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                  />
                  <span className="text-xs font-semibold">
                    {Math.abs(crypto?.change)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="text-lg font-bold text-foreground">
                    ${crypto?.price?.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Volume</span>
                  <span className="text-foreground font-medium">{crypto?.volume}</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="text-foreground font-medium">{crypto?.marketCap}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMarketWidget;