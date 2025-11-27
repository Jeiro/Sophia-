import React, { useEffect } from 'react';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';
import HeroSection from './components/Herosection';
import ExpertiseSection from './components/ExpertiseSection';
import MarketInsightsSection from './components/MarketinsightsSection';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ExpertiseSection />
        <MarketInsightsSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;