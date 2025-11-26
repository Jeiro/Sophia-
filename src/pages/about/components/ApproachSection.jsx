import React from 'react';
import Icon from '../../../components/AppIcon';

const ApproachSection = () => {
  const approachSteps = [
    {
      step: "01",
      title: "Discovery & Assessment",
      description: "We begin with a comprehensive consultation to understand your current financial situation, investment experience, risk tolerance, and long-term goals. This foundation ensures every recommendation is tailored to your unique circumstances.",
      icon: "Search",
      color: "primary"
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "Based on your profile, I craft a personalized investment strategy that balances crypto and real estate opportunities. This includes specific asset allocation recommendations, entry points, and risk management protocols.",
      icon: "FileText",
      color: "secondary"
    },
    {
      step: "03",
      title: "Implementation Support",
      description: "I guide you through executing your investment strategy, providing step-by-step support for both crypto transactions and real estate acquisitions. You'll never feel alone in the process.",
      icon: "Zap",
      color: "success"
    },
    {
      step: "04",
      title: "Ongoing Optimization",
      description: "Markets evolve, and so should your portfolio. I provide continuous monitoring, regular performance reviews, and strategic adjustments to keep your investments aligned with your goals and market conditions.",
      icon: "RefreshCw",
      color: "primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My Client-Centric Approach
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven four-step process that transforms investment confusion into confident action
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {approachSteps?.map((step, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${step?.color} to-${step?.color}/60 flex items-center justify-center shadow-lg`}>
                    <Icon name={step?.icon} size={36} color="white" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`text-4xl font-bold text-${step?.color}/20`}>
                      {step?.step}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground">
                      {step?.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-12 text-white shadow-2xl">
            <Icon name="Quote" size={48} className="mx-auto mb-6 opacity-50" />
            <blockquote className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
              "Where traditional meets digital, where analysis meets intuition, where your financial goals meet expert guidance."
            </blockquote>
            <p className="text-lg opacity-90">
              This is more than investment advice—it's a partnership in building your financial future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;