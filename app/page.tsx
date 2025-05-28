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
import LogoFooterCard from "./components/LogoFooterCard";
import ComingSoonPage from "./components/ComingSoon";

const AyadaCLIFFPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [loading, setLoading] = useState(true);

  const prodEnvironment = "production";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  if (loading) {
    return <LoadingScreen />;
  }


  if (prodEnvironment === "production") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <ComingSoonPage />
      </div>
    );
  }


  return (
    <div className="text-dark hide-scrollbar min-h-screen overflow-x-hidden bg-white font-light">
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

      <LogoFooterCard />

      <Footer />
    </div>
  );
};

export default AyadaCLIFFPage;