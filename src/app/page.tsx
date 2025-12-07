'use client';

import { useState } from 'react';
import Loader from '../app/components/Loader';
import dynamic from 'next/dynamic';
const Herosection = dynamic(() => import('../app/components/Herosection'), { ssr: false });
import Footer from '../app/components/Footer';
import OurDomains from '../app/components/OurDomains';
import Navbar from '../app/components/Navbar';
import AboutUs from '../app/components/AboutUs';
import Joincodenex from '../app/components/Joincodenex';
import SolutionsInsights from '../app/components/SolutionsInsights';
import HeroSequencer from '../app/components/HeroSequencer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="overflow-hidden scroll-smooth">
      <Navbar />
      <section id="home">
        <Herosection />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="domains">
        <OurDomains />
      </section>
      {/* Hero Sequencer section */}
      <section id="hero-sequencer-section" className="mt-24 md:mt-48 lg:mt-64">
        <HeroSequencer />
      </section>
      {/* Stacked sticky cards section */}
      <section id="why">
        <SolutionsInsights />
      </section>
      <section id="contact">
        <Joincodenex />
      </section>
      <Footer />
    </div>
  );
}
