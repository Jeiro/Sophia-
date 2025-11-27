import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Appicon';
import Image from '../../../components/AppImage';
import Button from '../../../components/UI/Button';

const SuccessStories = () => {
  const stories = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18177d561-1763301900808.png",
    imageAlt: "Professional headshot of Asian male software engineer with short black hair wearing navy blue suit and white shirt with confident smile against neutral gray background",
    initialInvestment: "$25,000",
    currentValue: "$94,500",
    growth: "+278%",
    duration: "18 months",
    testimonial: "I was skeptical about crypto until I started working with Sarah. Her systematic approach and risk management strategies transformed my portfolio. The education I received was invaluable.",
    highlight: "Achieved financial independence goal 5 years ahead of schedule"
  },
  {
    id: 2,
    name: "Jennifer Rodriguez",
    role: "Marketing Director",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14d9d1e3f-1763293907442.png",
    imageAlt: "Professional portrait of Hispanic female marketing director with long dark hair wearing burgundy blazer and pearl necklace with warm smile in modern office setting",
    initialInvestment: "$50,000",
    currentValue: "$167,000",
    growth: "+234%",
    duration: "24 months",
    testimonial: "Sarah's dual expertise in crypto and real estate helped me create a truly diversified investment strategy. Her guidance during market volatility was crucial to my success.",
    highlight: "Built diversified portfolio across digital and physical assets"
  },
  {
    id: 3,
    name: "David Thompson",
    role: "Business Owner",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_130504d21-1763295915180.png",
    imageAlt: "Professional headshot of Caucasian male business owner with gray hair and beard wearing charcoal suit and blue tie with confident expression against white background",
    initialInvestment: "$100,000",
    currentValue: "$312,000",
    growth: "+212%",
    duration: "30 months",
    testimonial: "As a business owner, I needed someone who understood both traditional and digital assets. Sarah's strategic approach helped me optimize my portfolio while managing risk effectively.",
    highlight: "Successfully diversified business profits into crypto investments"
  }];


  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full mb-6">
            <Icon name="Star" size={20} />
            <span className="text-sm font-semibold">Success Stories</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Real Results from Real People
          </h2>
          
          <p className="text-lg text-muted-foreground">
            See how my clients have transformed their financial futures through strategic cryptocurrency investments and expert guidance.
          </p>
        </div>
        
        <div className="space-y-8 mb-12">
          {stories?.map((story, index) =>
          <div
            key={story?.id}
            className={`bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
            index % 2 === 0 ? '' : 'lg:ml-12'}`
            }>

              <div className="grid lg:grid-cols-3 gap-8 p-8">
                <div className="lg:col-span-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary">
                      <Image
                      src={story?.image}
                      alt={story?.imageAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <div>
                      <div className="font-bold text-lg text-foreground">{story?.name}</div>
                      <div className="text-sm text-muted-foreground">{story?.role}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-muted rounded-xl p-4">
                      <div className="text-sm text-muted-foreground mb-1">Initial Investment</div>
                      <div className="text-2xl font-bold text-foreground">{story?.initialInvestment}</div>
                    </div>
                    
                    <div className="bg-success/10 rounded-xl p-4">
                      <div className="text-sm text-success mb-1">Current Value</div>
                      <div className="text-2xl font-bold text-success">{story?.currentValue}</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Growth</div>
                        <div className="text-xl font-bold text-primary">{story?.growth}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="text-xl font-bold text-foreground">{story?.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="Quote" size={32} color="var(--color-primary)" className="flex-shrink-0" />
                    <p className="text-lg text-foreground leading-relaxed italic">
                      "{story?.testimonial}"
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="TrendingUp" size={20} color="white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary mb-1">Key Highlight</div>
                        <div className="text-foreground">{story?.highlight}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5]?.map((star) =>
                    <Icon key={star} name="Star" size={20} color="var(--color-warning)" fill="var(--color-warning)" />
                    )}
                    </div>
                    <span className="text-sm text-muted-foreground">5.0 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Ready to write your own success story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/success-stories">
              <Button variant="outline" size="lg" iconName="Users" iconPosition="left">
                View All Success Stories
              </Button>
            </Link>
            <Link to="/consultation-booking">
              <Button variant="default" size="lg" iconName="Calendar" iconPosition="left">
                Book Your Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>);

};

export default SuccessStories;