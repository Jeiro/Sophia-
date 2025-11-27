import React from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/AppImage';

const CredentialsSection = () => {
  const certifications = [
  {
    title: "Certified Financial Planner (CFP)",
    issuer: "CFP Board",
    year: "2020",
    icon: "Award",
    verified: true
  },
  {
    title: "Real Estate Investment Analyst",
    issuer: "CCIM Institute",
    year: "2019",
    icon: "Building2",
    verified: true
  },
  {
    title: "Blockchain & Cryptocurrency Expert",
    issuer: "Blockchain Council",
    year: "2021",
    icon: "Bitcoin",
    verified: true
  },
  {
    title: "Advanced Trading Strategies",
    issuer: "CMT Association",
    year: "2022",
    icon: "TrendingUp",
    verified: true
  }];


  const achievements = [
  {
    metric: "500+",
    label: "Successful Consultations",
    icon: "Users"
  },
  {
    metric: "$50M+",
    label: "Portfolio Value Managed",
    icon: "DollarSign"
  },
  {
    metric: "98%",
    label: "Client Satisfaction Rate",
    icon: "ThumbsUp"
  },
  {
    metric: "8+",
    label: "Years of Experience",
    icon: "Calendar"
  }];


  const mediaFeatures = [
  {
    outlet: "Forbes",
    title: "Top Investment Advisors to Watch",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14e329bed-1763550409445.png",
    imageAlt: "Forbes magazine cover with bold red logo on white background featuring financial market graphs and business headlines"
  },
  {
    outlet: "Bloomberg",
    title: "Crypto-Real Estate Convergence",
    image: "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c",
    imageAlt: "Bloomberg terminal screen displaying real-time financial data with green and red market indicators and stock price charts"
  },
  {
    outlet: "CNBC",
    title: "Modern Wealth Diversification",
    image: "https://images.unsplash.com/photo-1658326597924-627adadb352c",
    imageAlt: "CNBC news studio with professional broadcast setup featuring blue lighting and financial ticker displays on multiple screens"
  }];


  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Credentials & Recognition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and industry recognition that validate my expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications?.map((cert, index) =>
          <div
            key={index}
            className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={cert?.icon} size={24} color="var(--color-primary)" strokeWidth={2} />
                </div>
                {cert?.verified &&
              <div className="flex items-center space-x-1 text-success text-xs font-semibold">
                    <Icon name="CheckCircle" size={16} />
                    <span>Verified</span>
                  </div>
              }
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2 leading-tight">
                {cert?.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-1">{cert?.issuer}</p>
              <p className="text-xs text-muted-foreground">{cert?.year}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements?.map((achievement, index) =>
          <div
            key={index}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 text-center border border-primary/20">

              <div className="w-16 h-16 rounded-full bg-card mx-auto mb-4 flex items-center justify-center shadow-md">
                <Icon name={achievement?.icon} size={28} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {achievement?.metric}
              </div>
              <div className="text-sm text-muted-foreground">
                {achievement?.label}
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Featured In
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mediaFeatures?.map((feature, index) =>
            <div
              key={index}
              className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group">

                <div className="relative h-48 overflow-hidden">
                  <Image
                  src={feature?.image}
                  alt={feature?.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="text-primary font-bold text-lg mb-2">
                    {feature?.outlet}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature?.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default CredentialsSection;