"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import LoadingScreen from "./loading";
import PageTransition from "./components/PageTransition";
import UnderMaintenancePage from "./components/sections/UnderMaintenance";
import dynamic from "next/dynamic";
import HeroSection from "./components/sections/HeroSection";



const IntroductionSection = dynamic(
  () => import("./components/sections/IntroductionSection"),
  { ssr: true },
);

const AccommodationsSection = dynamic(
  () => import("./components/sections/AccommodationsSection"),
  { ssr: false },
);

const DestinationsSection = dynamic(
  () => import("./components/sections/DestinationsSection"),
  { ssr: false },
);
const CarouselSection = dynamic(
  () => import("./components/sections/CarouselSection"),
  { ssr: false },
);
const ExperienceSection = dynamic(
  () => import("./components/sections/ExperienceSection"),
  { ssr: false },
);

const AyadaCLIFFPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Explicit cast + default
  const prodEnvironment: "development" | "production" | "maintenance" =
    (process.env.NEXT_PUBLIC_ENVIRONMENT as
      | "development"
      | "production"
      | "maintenance") || "development";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (prodEnvironment === "maintenance") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <UnderMaintenancePage />
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

      <Footer />
    </div>
  );
};

export default AyadaCLIFFPage;
