import React from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/AppImage';

const PerformanceMetrics = () => {
  const metrics = [
  {
    id: 1,
    label: "Average Annual Return",
    value: "247%",
    change: "+32% vs last year",
    icon: "TrendingUp",
    color: "success"
  },
  {
    id: 2,
    label: "Win Rate",
    value: "78.4%",
    change: "Across 500+ trades",
    icon: "Target",
    color: "primary"
  },
  {
    id: 3,
    label: "Risk-Adjusted Return",
    value: "3.2",
    change: "Sharpe Ratio",
    icon: "Shield",
    color: "secondary"
  },
  {
    id: 4,
    label: "Max Drawdown",
    value: "18.5%",
    change: "Well-controlled risk",
    icon: "TrendingDown",
    color: "warning"
  }];


  const portfolioGrowth = [
  { month: "Jan", value: 100000 },
  { month: "Feb", value: 115000 },
  { month: "Mar", value: 128000 },
  { month: "Apr", value: 142000 },
  { month: "May", value: 138000 },
  { month: "Jun", value: 165000 },
  { month: "Jul", value: 182000 },
  { month: "Aug", value: 195000 },
  { month: "Sep", value: 218000 },
  { month: "Oct", value: 235000 },
  { month: "Nov", value: 267000 }];


  const maxValue = Math.max(...portfolioGrowth?.map((item) => item?.value));

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full mb-6">
            <Icon name="BarChart3" size={20} />
            <span className="text-sm font-semibold">Performance Metrics</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Proven Track Record of Excellence
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Real results from real portfolios. These metrics represent actual performance across diverse market conditions and client portfolios.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics?.map((metric) =>
          <div
            key={metric?.id}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300">

              <div className={`w-12 h-12 bg-${metric?.color}/10 rounded-xl flex items-center justify-center mb-4`}>
                <Icon name={metric?.icon} size={24} color={`var(--color-${metric?.color})`} />
              </div>
              
              <div className="text-3xl font-bold text-foreground mb-2">
                {metric?.value}
              </div>
              
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {metric?.label}
              </div>
              
              <div className="text-xs text-muted-foreground">
                {metric?.change}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Portfolio Growth Trajectory
              </h3>
              <p className="text-muted-foreground">
                Sample portfolio performance over 11 months (2025)
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-success">+167%</div>
              <div className="text-sm text-muted-foreground">Total Growth</div>
            </div>
          </div>
          
          <div className="relative h-80">
            <div className="absolute inset-0 flex items-end justify-between space-x-2">
              {portfolioGrowth?.map((item, index) => {
                const height = item?.value / maxValue * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full relative group">
                      <div
                        className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-300 hover:opacity-80"
                        style={{ height: `${height}%` }}>

                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          <div className="text-xs font-semibold text-foreground">
                            ${(item?.value / 1000)?.toFixed(0)}K
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {item?.month}
                    </div>
                  </div>);

              })}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_141b6fda2-1763295319855.png"
                    alt="Professional headshot of confident female financial advisor with warm smile wearing navy blazer against neutral background"
                    className="w-full h-full object-cover" />

                </div>
                <div>
                  <div className="font-semibold text-foreground">Sarah Mitchell</div>
                  <div className="text-sm text-muted-foreground">Crypto Trading Expert</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Award" size={24} color="var(--color-primary)" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Certified Professional</div>
                  <div className="text-xs text-muted-foreground">CFA, CFP, Blockchain Certified</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Users" size={24} color="var(--color-secondary)" />
                <div>
                  <div className="text-sm font-semibold text-foreground">150+ Active Clients</div>
                  <div className="text-xs text-muted-foreground">Across 25 countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default PerformanceMetrics;