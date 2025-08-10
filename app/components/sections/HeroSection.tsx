import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const COLORS = {
  light: "#ffffff",
};

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 h-full w-full">
        <div
          className={`absolute inset-0 transition-all duration-[2500ms] ease-out ${
            isLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="images/hero-bg.avif"
          >
            <source
              src="/video/hero-bg.mp4"
              type="video/mp4"
              className="h-full w-full"
            />
          </video>

          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        </div>
      </div>

      {/* Content container with vertical centering */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero content with refined animations */}
          <div
            className={`flex flex-col items-center transition-opacity duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Thin line above logo */}
            <div
              className={`mb-6 h-px bg-white/70 transition-all delay-800 duration-1200 ${
                isLoaded ? "w-15 opacity-70" : "w-0 opacity-0"
              }`}
            ></div>

            {/* Tagline */}
            <span
              className={`mb-5 text-xs tracking-widest uppercase transition-all delay-1000 duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-90"
                  : "translate-y-2 opacity-0"
              }`}
              style={{ color: COLORS.light }}
            >
              A Sanctuary of Tranquility
            </span>

            {/* Logo container with subtle animation */}
            <div
              className={`mb-10 w-80 transition-all delay-1200 duration-1500 md:w-[45vw] ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Image
                src="/images/logo/ayadaclifflogotypo-white.png"
                alt="AYADA CLIFF"
                fill
                className="w-full"
              />
            </div>

            {/* Location description */}
            <p
              className={`mb-12 text-sm font-light tracking-wider transition-opacity delay-1400 duration-1500 md:text-base ${
                isLoaded ? "opacity-85" : "opacity-0"
              }`}
              style={{ color: COLORS.light }}
            >
              Luxury Ocean View Pool Villa · Varkala, Kerala
            </p>

            {/* Button with hover effect */}
            <div
              className={`mt-4 transition-all delay-1600 duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <Link
                className="group relative overflow-hidden border border-white/30 bg-transparent px-12 py-3 text-xs tracking-widest uppercase transition-all duration-500 hover:border-white/50 hover:shadow-lg hover:shadow-white/10"
                style={{ color: COLORS.light }}
                href="/reserve"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Reserve Now
                </span>
                </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transform transition-opacity delay-2000 duration-1000 ${
          isLoaded ? "opacity-80" : "opacity-0"
        }`}
      >
        <div
          className="group flex cursor-pointer flex-col items-center"
          style={{
            animation: isLoaded ? "bounce 2s infinite 2s" : "none",
          }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <div className="mb-2 h-10 w-px bg-white/30 transition-colors duration-300 group-hover:bg-white/50"></div>
          <ArrowDown
            size={18}
            style={{ color: COLORS.light }}
            strokeWidth={1}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </div>
      </div>

      {/* Custom keyframes for animations */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
