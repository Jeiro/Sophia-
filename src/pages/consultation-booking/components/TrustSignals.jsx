import React from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
  {
    icon: 'Award',
    title: 'Certified Financial Planner',
    description: 'CFP® Professional'
  },
  {
    icon: 'TrendingUp',
    title: 'Crypto Trading Expert',
    description: '8+ Years Experience'
  },
  {
    icon: 'Building2',
    title: 'Real Estate Specialist',
    description: 'Licensed Professional'
  }];


  const testimonials = [
  {
    name: 'Michael Rodriguez',
    role: 'Tech Entrepreneur',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_103972665-1763296698542.png",
    imageAlt: 'Professional headshot of Hispanic male entrepreneur with short black hair wearing navy blue business suit and white shirt',
    rating: 5,
    text: 'The consultation was incredibly valuable. Her dual expertise in crypto and real estate helped me create a perfectly balanced portfolio.'
  },
  {
    name: 'Sarah Chen',
    role: 'Investment Manager',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c95c7b25-1763295913147.png",
    imageAlt: 'Professional portrait of Asian female investment manager with long black hair in elegant gray blazer',
    rating: 5,
    text: 'Best investment decision I made was booking this consultation. The insights were actionable and the follow-up support was exceptional.'
  }];


  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2" color="var(--color-primary)" />
          Professional Credentials
        </h3>
        <div className="space-y-4">
          {certifications?.map((cert, index) =>
          <div key={index} className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={cert?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <p className="font-medium text-foreground">{cert?.title}</p>
                <p className="text-sm text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Star" size={20} className="mr-2" color="var(--color-secondary)" />
          Client Testimonials
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) =>
          <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                  src={testimonial?.image}
                  alt={testimonial?.imageAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{testimonial?.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial?.role}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial?.rating)]?.map((_, i) =>
                <Icon key={i} name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
                )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{testimonial?.text}</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={24} color="var(--color-primary)" className="flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Your Privacy is Protected</h4>
            <p className="text-sm text-muted-foreground">
              All consultations are confidential and your personal information is secured with enterprise-grade encryption. We never share your data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default TrustSignals;