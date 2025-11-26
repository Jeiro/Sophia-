import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import LiveMarketWidget from './components/LiveMarketWidget';
import TradingPhilosophy from './components/TradingPhilosophy';
import PerformanceMetrics from './components/PerformanceMetrics';
import ServicesOffered from './components/ServicesOffered';
import EducationalResources from './components/EducationalResources';
import SuccessStories from './components/SuccessStories';
import MarketInsights from './components/MarketInsights';
import CTASection from './components/CTASection';

const CryptoTradingMastery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <LiveMarketWidget />
        <TradingPhilosophy />
        <PerformanceMetrics />
        <ServicesOffered />
        <EducationalResources />
        <SuccessStories />
        <MarketInsights />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default CryptoTradingMastery;