import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Hero from '@/components/Hero';
import Overview from "@/components/Overview";
import MainHeroes from "@/components/MainHeroes";
import MCUPhases from '@/components/MCUPhases';
import MCUCarousel from '@/components/MCUCarousel';
import Footer from '../components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen isExit={true} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <main className="relative z-[1]">
        <Hero />
        <Overview />
        <MainHeroes />
        <MCUPhases />
        <MCUCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;