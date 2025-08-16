import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const COLORS = {
  light: "#ffffff",
};

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false); // ✅ start as false

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
            isLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        >
          <Image
            src="/images/hero-bg (1).webp"
            alt="Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            onLoadingComplete={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"></div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="container mx-auto max-w-4xl flex flex-col items-center">
          {/* Divider line */}
          <div
            className={`mb-6 h-px bg-white/70 transition-all duration-1000 delay-700 ${
              isLoaded ? "w-16 opacity-70" : "w-0 opacity-0"
            }`}
          ></div>

          {/* Tagline */}
          <span
            className={`mb-5 text-xs tracking-widest uppercase transition-all duration-700 delay-800 ${
              isLoaded ? "translate-y-0 opacity-90" : "translate-y-2 opacity-0"
            }`}
            style={{ color: COLORS.light }}
          >
            A Sanctuary of Tranquility
          </span>

          {/* Logo */}
          <div
            className={`md:mb-0 mb-10 w-80 md:w-[48vw] transition-all duration-1000 delay-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Image
              src="/images/logo/ayadaclifflogotypo-white.png"
              alt="AYADA CLIFF"
              width={500}
              height={300}
              className="w-full"
              priority
            />
          </div>

          {/* Location */}
          <p
            className={`mb-12 text-md font-light tracking-wider md:text-base text-center transition-opacity duration-1000 delay-1200 ${
              isLoaded ? "opacity-85" : "opacity-0"
            }`}
            style={{ color: COLORS.light }}
          >
            Luxury Private Pool Beach Villas - Varkala, Kerala
          </p>

          {/* Button */}
          <div
            className={`mt-4 transition-all duration-700 delay-1400 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <Link
              href="/reserve"
              className="group relative overflow-hidden border border-white/30 px-12 py-3 text-xs tracking-widest uppercase transition-all duration-500 hover:border-white/50 hover:shadow-lg hover:shadow-white/10"
              style={{ color: COLORS.light }}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Reserve Now
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-700 delay-1600 ${
          isLoaded ? "opacity-80" : "opacity-0"
        }`}
      >
        <div
          className="group flex cursor-pointer flex-col items-center animate-bounce"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <div className="mb-2 h-10 w-px bg-white/30 group-hover:bg-white/50 transition-colors duration-300"></div>
          <ArrowDown
            size={18}
            style={{ color: COLORS.light }}
            strokeWidth={1}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
