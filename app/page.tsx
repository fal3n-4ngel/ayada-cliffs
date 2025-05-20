"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import IntroductionSection from "./components/IntroductionSection";
import AccommodationsSection from "./components/AccommodationsSection";
import DestinationsSection from "./components/DestinationsSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import LoadingScreen from "./loading";
import CarouselSection from "./components/CarouselSection";
import PageTransition from "./components/PageTransition";



const AyadaCLIFFPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [loading, setLoading] = useState(true);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle loading state
  useEffect(() => {
    // Show loading screen on initial page load or refresh
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Adjust loading time as needed

    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  // Show loading screen if loading state is true
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="text-dark min-h-screen overflow-x-hidden bg-white font-light hide-scrollbar ">
      <Header
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <PageTransition />
      <HeroSection />

      <IntroductionSection />

      <AccommodationsSection />
      <CarouselSection />
      <ExperienceSection />


      <DestinationsSection
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
      />


      <Footer />
    </div>
  );
};

export default AyadaCLIFFPage;