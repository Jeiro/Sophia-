import React from 'react';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                The Confident Navigator
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Where Digital Innovation Meets Tangible Assets
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm not just another trader or real estate agent. I'm the bridge between two worlds that many investors struggle to understand simultaneously. My journey combines traditional real estate wisdom with cutting-edge crypto innovation, positioning me as your trusted advisor in modern wealth creation.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">8+</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Years</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">500+</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Clients</p>
                  <p className="text-xs text-muted-foreground">Served</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-success">$50M+</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Portfolio</p>
                  <p className="text-xs text-muted-foreground">Managed</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1a9a0e7b9-1763295971680.png"
                alt="Professional businesswoman with confident smile wearing elegant navy blazer standing in modern office with glass windows and city skyline background"
                className="w-full h-[600px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-secondary to-primary rounded-2xl opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;