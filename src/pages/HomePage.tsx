import React from 'react';
import HeroSection from '../components/home/HeroSection';
import IntroSection from '../components/home/IntroSection';
import BusinessAreasCards from '../components/home/BusinessAreasCards';
import ValueChainPipeline from '../components/home/ValueChainPipeline';
import WhyGhanaSection from '../components/home/WhyGhanaSection';
import FinalCTA from '../components/home/FinalCTA';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <IntroSection />
      <BusinessAreasCards />
      <ValueChainPipeline />
      <WhyGhanaSection />
      <FinalCTA />
    </div>
  );
};

export default HomePage;
