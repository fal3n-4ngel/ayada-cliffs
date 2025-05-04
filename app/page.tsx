"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import IntroductionSection from "./components/IntroductionSection";
import AccommodationsSection from "./components/AccommodationsSection";
import DestinationsSection from "./components/DestinationsSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";

const AyadaCLIFFPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="text-dark min-h-screen overflow-x-hidden bg-white font-light">
      <Header
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <HeroSection />

      <IntroductionSection />

      <AccommodationsSection />

      <DestinationsSection
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
      />

      <ExperienceSection />

      <Footer />
    </div>
  );
};

export default AyadaCLIFFPage;
