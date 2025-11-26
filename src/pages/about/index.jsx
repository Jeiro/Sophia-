import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import JourneyTimeline from './components/JourneyTimeline';
import PhilosophySection from './components/PhilosophySection';
import CredentialsSection from './components/CredentialsSection';
import ApproachSection from './components/ApproachSection';
import CTASection from './components/CTASection';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <JourneyTimeline />
        <PhilosophySection />
        <CredentialsSection />
        <ApproachSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default About;