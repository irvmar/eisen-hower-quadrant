'use client';

import React from 'react';
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import DemoSection from './landing/DemoSection';
import BenefitsSection from './landing/BenefitsSection';
import TestimonialsSection from './landing/TestimonialsSection';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <DemoSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;