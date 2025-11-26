import React from 'react';
import Icon from '../../../components/AppIcon';

const JourneyTimeline = () => {
  const timelineData = [
    {
      year: "2016",
      title: "Real Estate Foundation",
      description: "Started my journey in real estate investment, learning the fundamentals of property valuation, market analysis, and traditional wealth building strategies. Closed my first commercial property deal worth $2.5M.",
      icon: "Building2",
      color: "primary"
    },
    {
      year: "2018",
      title: "Crypto Discovery",
      description: "Discovered the transformative potential of cryptocurrency and blockchain technology. Began intensive study of digital assets, trading strategies, and decentralized finance ecosystems.",
      icon: "Bitcoin",
      color: "secondary"
    },
    {
      year: "2019",
      title: "Dual Expertise Development",
      description: "Recognized the powerful synergy between real estate and crypto investments. Developed unique strategies for portfolio diversification across both traditional and digital assets.",
      icon: "TrendingUp",
      color: "success"
    },
    {
      year: "2021",
      title: "Professional Certification",
      description: "Obtained advanced certifications in both real estate investment analysis and cryptocurrency trading. Launched consulting practice to help others navigate both markets confidently.",
      icon: "Award",
      color: "primary"
    },
    {
      year: "2023",
      title: "Thought Leadership",
      description: "Established myself as a recognized authority in dual-domain investment strategy. Featured in major financial publications and speaking at international investment conferences.",
      icon: "Users",
      color: "secondary"
    },
    {
      year: "2024",
      title: "Sophia Cipher Wealth",
      description: "Launched comprehensive platform to democratize access to expert guidance in both crypto and real estate. Helping clients worldwide achieve intelligent prosperity through diversified wealth strategies.",
      icon: "Rocket",
      color: "success"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From traditional real estate to digital assets, here's how I became the bridge between two investment worlds
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {timelineData?.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-32 pb-12 last:pb-0">
              <div className="absolute left-0 md:left-24 top-0 w-16 h-16 rounded-full bg-card border-4 border-background shadow-lg flex items-center justify-center">
                <Icon 
                  name={item?.icon} 
                  size={28} 
                  color={`var(--color-${item?.color})`}
                  strokeWidth={2}
                />
              </div>
              
              {index !== timelineData?.length - 1 && (
                <div className="absolute left-8 md:left-32 top-16 bottom-0 w-0.5 bg-border"></div>
              )}

              <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold" style={{ color: `var(--color-${item?.color})` }}>
                    {item?.year}
                  </span>
                  <div className="h-1 flex-1 rounded-full" style={{ backgroundImage: `linear-gradient(to right, var(--color-${item?.color}), transparent)` }}></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;