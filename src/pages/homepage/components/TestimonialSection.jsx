import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
  {
    id: 1,
    name: "Marcus Rodriguez",
    role: "Tech Entrepreneur",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17b3c9c38-1763299336236.png",
    imageAlt: "Professional headshot of Hispanic male entrepreneur with short dark hair wearing navy blue suit and confident smile in modern office setting",
    rating: 5,
    text: "Working with her transformed my investment approach completely. I started with basic crypto knowledge and now manage a diversified portfolio worth over $2.3M. Her dual expertise in crypto and real estate gave me the confidence to make strategic moves I never would have considered alone. The ROI speaks for itself - 847% growth in just 18 months.",
    result: "$2.3M Portfolio",
    growth: "+847%"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Medical Professional",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_144fe309e-1763299127752.png",
    imageAlt: "Professional portrait of Asian female doctor with long black hair wearing white medical coat and warm smile in clinical environment with medical equipment visible",
    rating: 5,
    text: "As a busy physician, I needed someone who could handle the complexity of both crypto trading and real estate investments. She created a hands-off strategy that generated passive income streams from both sectors. My real estate portfolio now generates $12K monthly, while my crypto holdings have tripled. Best investment decision I ever made.",
    result: "$12K Monthly Income",
    growth: "+340%"
  },
  {
    id: 3,
    name: "David Thompson",
    role: "Retired Executive",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a79b8e72-1763295320816.png",
    imageAlt: "Distinguished senior Caucasian male executive with gray hair and glasses wearing charcoal suit with burgundy tie in elegant office with city skyline background",
    rating: 5,
    text: "After 30 years in corporate finance, I thought I understood investing. She showed me a completely new perspective on wealth diversification. Her strategic approach to balancing crypto volatility with real estate stability has given me peace of mind in retirement while still achieving impressive returns. My portfolio grew 234% while maintaining conservative risk levels.",
    result: "Conservative Growth",
    growth: "+234%"
  }];


  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2 mb-4">
            <Icon name="Star" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Client Success Stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transforming Financial Futures
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real clients who trusted me to guide their investment journey across crypto and real estate markets.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-6 shadow-xl">
                  <Image
                    src={testimonials?.[activeIndex]?.image}
                    alt={testimonials?.[activeIndex]?.imageAlt}
                    className="w-full h-full object-cover" />

                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {testimonials?.[activeIndex]?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {testimonials?.[activeIndex]?.role}
                </p>
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonials?.[activeIndex]?.rating)]?.map((_, i) =>
                  <Icon key={i} name="Star" size={20} className="text-warning fill-warning" />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-card/50 rounded-lg p-4 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Portfolio Value</div>
                    <div className="text-lg font-bold text-foreground">{testimonials?.[activeIndex]?.result}</div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Growth Rate</div>
                    <div className="text-lg font-bold text-success">{testimonials?.[activeIndex]?.growth}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                <Icon name="Quote" size={48} className="text-primary/20 mb-6" />
                <p className="text-lg text-foreground leading-relaxed mb-8">
                  {testimonials?.[activeIndex]?.text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {testimonials?.map((_, index) =>
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-primary w-8' : 'bg-border'}`
                      }
                      aria-label={`Go to testimonial ${index + 1}`} />

                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                      aria-label="Previous testimonial">

                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                      aria-label="Next testimonial">

                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <div className="text-4xl font-bold text-primary mb-2">98.4%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction Rate</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <div className="text-4xl font-bold text-secondary mb-2">$127M+</div>
            <div className="text-sm text-muted-foreground">Assets Under Advisory</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <div className="text-4xl font-bold text-success mb-2">2,340+</div>
            <div className="text-sm text-muted-foreground">Successful Transactions</div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;