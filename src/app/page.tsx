'use client';

import { useState } from 'react';
import Loader from '../app/components/Loader';

import Herosection from '../app/components/Herosection';
import Footer from '../app/components/Footer';
import OurDomains from '../app/components/OurDomains';
import Navbar from '../app/components/Navbar';
import AboutUs from '../app/components/AboutUs';
import Joincodenex from '../app/components/Joincodenex';

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
      <section id="contact">
        <Joincodenex />
      </section>
      <Footer />
    </div>
  );
}
