'use client';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { Programs } from '@/components/home/Programs';
import { Location } from '@/components/home/Location';
import { Footer } from '@/components/layout/Footer';
import AboutSections from '@/components/home/about';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutSections/>
        <Features />
        <Programs />
        <Location />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;