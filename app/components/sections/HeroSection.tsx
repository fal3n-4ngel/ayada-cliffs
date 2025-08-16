"use client";
import React from "react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const COLORS = {
  light: "#ffffff",
};

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg (1).webp"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="container mx-auto flex max-w-4xl flex-col items-center">
          {/* Divider line */}
          <div className="mb-6 h-px w-16 bg-white/70 opacity-0 animate-fade-in [animation-delay:700ms]"></div>

          {/* Tagline */}
          <span
            className="mb-5 text-xs uppercase tracking-widest opacity-0 animate-slide-up [animation-delay:800ms]"
            style={{ color: COLORS.light }}
          >
            A Sanctuary of Tranquility
          </span>

          {/* Logo */}
          <div className="mb-10 w-80 opacity-0 animate-slide-up [animation-delay:1000ms] md:mb-0 md:w-[48vw]">
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
            className="mb-12 text-center text-base font-light tracking-wider opacity-0 animate-fade-in [animation-delay:1200ms]"
            style={{ color: COLORS.light }}
          >
            Luxury Private Pool Beach Villas - Varkala, Kerala
          </p>

          {/* Button */}
          <div className="mt-4 opacity-0 animate-slide-up [animation-delay:1400ms]">
            <Link
              href="/reserve"
              className="group relative overflow-hidden border border-white/30 px-12 py-3 text-xs uppercase tracking-widest transition-all duration-500 hover:border-white/50 hover:shadow-lg hover:shadow-white/10"
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
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in [animation-delay:1600ms]">
        <div
          className="group flex animate-bounce cursor-pointer flex-col items-center"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
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
    </section>
  );
};

export default HeroSection;
