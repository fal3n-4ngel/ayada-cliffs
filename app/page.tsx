"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";

// Theme configuration
const COLORS = {
  primary: "#84321F", // Rusty terracotta brown
  secondary: "#E5DFDA", // Light beige
  light: "#FFFFFF", // White
  dark: "#1D1D1D", // Dark gray/black
  muted: "#9F9F9F", // Muted gray
};

// Animation variants
const ANIMATIONS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
};

// Data
const NAV_ITEMS = [
  { name: "STAY", link: "#stay" },
  { name: "SPA", link: "#spa" },
  { name: "DINE", link: "#dine" },
  { name: "EXPERIENCES", link: "#experiences" },
  { name: "OCCASIONS", link: "#occasions" },
  { name: "OFFERS", link: "#offers" },
];

const SECONDARY_NAV_ITEMS = [
  { name: "DAY RETREAT", link: "#day-retreat" },
  { name: "CAREERS", link: "#careers" },
  { name: "PRESS", link: "#press" },
  { name: "OUR STORIES", link: "#stories" },
  { name: "CONTACT", link: "#contact" },
];

const DESTINATIONS = [
  {
    id: 0,
    name: "Varkala CLIFF",
    image: "/varkala-CLIFF.jpg",
    description:
      "Experience breathtaking views from dramatic red CLIFF overlooking the Arabian Sea, lined with shops and cafes offering the perfect sunset viewpoint.",
  },
  {
    id: 1,
    name: "Papanasam Beach",
    image: "/papanasam-beach.jpg",
    description:
      "Known as Varkala Beach, this pristine shore is believed to have holy waters that wash away sins, perfect for swimming and surrounded by natural beauty.",
  },
  {
    id: 2,
    name: "Janardanaswamy Temple",
    image: "/janardanaswamy-temple.jpg",
    description:
      "Ancient 2,000-year-old temple dedicated to Lord Vishnu, featuring traditional Kerala architecture and peaceful spiritual surroundings.",
  },
  {
    id: 3,
    name: "Kappil Beach & Lake",
    image: "/kappil-lake.jpg",
    description:
      "Where backwaters meet the sea, creating a stunning landscape of palm-fringed shores, perfect for boating and witnessing the merging of ecosystems.",
  },
];

const ACCOMMODATIONS = [
  {
    id: 0,
    image: "ocean-view-suite.avif",
    name: "Ocean View Suite",
    description:
      "Experience panoramic views of the Arabian Sea from your private balcony in our spacious suites.",
  },
  {
    id: 1,
    image: "cliff-edge-villa.avif",
    name: "CLIFF Edge Villa",
    description:
      "Our premium villas positioned on the edge of the cliff offering unparalleled views and privacy.",
  },
  {
    id: 2,
    image: "luxury-villa.jpg",
    name: "Garden Retreat",
    description:
      "Immerse yourself in lush tropical gardens with these serene and spacious accommodations.",
  },
];

const AyadaCLIFFPage = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="text-dark min-h-screen overflow-x-hidden bg-white font-light">
      {/* NAVIGATION */}
      <Header 
        scrollY={scrollY} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      {/* HERO SECTION */}
      <HeroSection />

      {/* INTRODUCTION SECTION */}
      <IntroductionSection />

      {/* ACCOMMODATIONS SECTION */}
      <AccommodationsSection />

      {/* DESTINATIONS SECTION */}
      <DestinationsSection 
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
      />

      {/* EXPERIENCE HIGHLIGHT */}
      <ExperienceSection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

// Component for Header with Navigation
const Header: React.FC<{
  scrollY: number;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ scrollY, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrollY > 50 ? "bg-white py-2 shadow-md" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 text-4xl focus:outline-none"
          style={{
            color: scrollY > 50 || isMenuOpen ? COLORS.primary : COLORS.light,
          }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Link href="/">
            <h1
              className="text-2xl font-light tracking-widest"
              style={{ color: scrollY > 50 ? COLORS.primary : COLORS.light }}
            >
              AYADA CLIFF
            </h1>
          </Link>
        </div>

        {/* Book button */}
        <Link href="/reserve">
          <button
            className="px-6 py-2 text-sm tracking-widest transition-all duration-300"
            style={{
              color: scrollY > 50 ? COLORS.primary : COLORS.light,
              border: `1px solid ${scrollY > 50 ? COLORS.primary : COLORS.light}`,
            }}
          >
            RESERVE
          </button>
        </Link>
      </div>

      {/* Full-screen menu overlay */}
      <NavigationMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </header>
  );
};

// Component for the navigation menu overlay
const NavigationMenu: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-40 bg-white"
        >
          <div className="container mx-auto h-full px-6 py-32">
            <div className="grid h-full grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <h3
                  className="text-sm tracking-widest"
                  style={{ color: COLORS.primary }}
                >
                  EXPERIENCE
                </h3>
                <nav>
                  <ul className="space-y-6">
                    {NAV_ITEMS.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Link
                          href={item.link}
                          className="group flex items-center justify-between text-2xl transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                          style={{ color: COLORS.dark }}
                        >
                          <span>{item.name}</span>
                          <ChevronRight
                            size={18}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="space-y-8">
                <h3
                  className="text-sm tracking-widest"
                  style={{ color: COLORS.primary }}
                >
                  INFORMATION
                </h3>
                <nav>
                  <ul className="space-y-6">
                    {SECONDARY_NAV_ITEMS.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (i + NAV_ITEMS.length) }}
                      >
                        <Link
                          href={item.link}
                          className="group flex items-center justify-between text-2xl transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                          style={{ color: COLORS.dark }}
                        >
                          <span>{item.name}</span>
                          <ChevronRight
                            size={18}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="pt-12">
                  <p className="mb-4 text-sm" style={{ color: COLORS.primary }}>
                    Varkala CLIFF Road, Kerala 695141, India
                  </p>
                  <p className="mb-1 text-sm" style={{ color: COLORS.primary }}>
                    info@ayadacliff.com
                  </p>
                  <p className="text-sm" style={{ color: COLORS.primary }}>
                    +91 12345 67890
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Component for Hero Section
const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 h-full w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Hero Image */}
          <img
            src="/placeholder/bg2.avif"
            alt="AYADA CLIFF"
            className="h-full w-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-4 block text-sm tracking-widest"
            style={{ color: COLORS.light }}
          >
            A SANCTUARY OF TRANQUILITY
          </motion.span>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mb-6 text-5xl font-light tracking-widest md:text-7xl"
            style={{ color: COLORS.light }}
          >
            AYADA CLIFF
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mb-10 text-lg md:text-xl"
            style={{ color: COLORS.light }}
          >
            Luxury Ocean View Villa in Varkala, Kerala
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <Link href="/discover">
              <button
                className="border bg-transparent px-10 py-4 text-sm tracking-widest uppercase transition duration-300"
                style={{
                  color: COLORS.light,
                  borderColor: COLORS.light,
                }}
              >
                Discover More
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 transform">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <ChevronDown size={28} style={{ color: COLORS.light }} />
        </motion.div>
      </div>
    </section>
  );
};

// Component for Introduction Section
const IntroductionSection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center md:flex-row">
          <motion.div
            className="mb-12 w-full md:mb-0 md:w-1/2 md:pr-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATIONS.fadeIn}
          >
            <span
              className="mb-6 block text-sm tracking-widest uppercase"
              style={{ color: COLORS.primary }}
            >
              OUR SANCTUARY
            </span>
            <h2
              className="mb-8 text-4xl leading-tight font-light"
              style={{ color: COLORS.primary }}
            >
              Perched on the dramatic CLIFF of Varkala, where the Arabian Sea
              meets the sky
            </h2>
            <p className="mb-8 text-lg" style={{ color: `${COLORS.primary}DD` }}>
              AYADA CLIFF is a sanctuary of tranquility, offering uninterrupted
              ocean views from every corner of our luxury villa. Experience the
              perfect blend of modern comfort and traditional Kerala architecture.
            </p>
            <Link href="/about">
              <button
                className="border-b pb-1 text-sm tracking-widest uppercase"
                style={{
                  color: COLORS.primary,
                  borderColor: `${COLORS.primary}40`,
                }}
              >
                Discover our story
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATIONS.fadeIn}
          >
            <div className="relative aspect-[4/5]">
              <img
                src="/placeholder/3.avif"
                alt="Villa exterior"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Component for Accommodations Section
const AccommodationsSection = () => {
  return (
    <section
      className="relative py-32"
      style={{ backgroundColor: COLORS.secondary }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATIONS.fadeIn}
        >
          <span
            className="mb-4 block text-sm tracking-widest uppercase"
            style={{ color: COLORS.primary }}
          >
            A PRIVATE PARADISE
          </span>
          <h2 className="mb-6 text-4xl font-light" style={{ color: COLORS.primary }}>
            Luxury Living on the CLIFF Edge
          </h2>
          <p className="mx-auto max-w-3xl text-lg" style={{ color: `${COLORS.primary}DD` }}>
            Retreat to a world of unmatched elegance and comfort with our exquisite accommodations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {ACCOMMODATIONS.map((item, index) => (
            <AccommodationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Component for Accommodation Card
interface Accommodation {
  id: number;
  image: string;
  name: string;
  description: string;
}

const AccommodationCard: React.FC<{ item: Accommodation; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      className="group"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay: index * 0.2 },
        },
      }}
    >
      <div className="relative mb-6 overflow-hidden">
        <img
          src={`/placeholder/${item.image}`}
          alt={item.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mb-4 text-2xl font-light" style={{ color: COLORS.primary }}>
        {item.name}
      </h3>
      <p className="mb-6" style={{ color: `${COLORS.primary}DD` }}>
        {item.description}
      </p>
      <Link href={`/accommodations/${item.id}`}>
        <button
          className="border-b pb-1 text-sm tracking-widest uppercase transition-all duration-300"
          style={{
            color: COLORS.primary,
            borderColor: `${COLORS.primary}40`,
          }}
        >
          Explore
        </button>
      </Link>
    </motion.div>
  );
};

// Component for Destinations Section
const DestinationsSection: React.FC<{
  selectedFeature: number;
  setSelectedFeature: React.Dispatch<React.SetStateAction<number>>;
}> = ({ selectedFeature, setSelectedFeature }) => {
  return (
    <motion.section
      className="min-h-full py-16"
      style={{ background: COLORS.secondary }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={ANIMATIONS.staggerContainer}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATIONS.fadeIn}
        >
          <span className="mb-4 block text-sm tracking-widest uppercase" style={{ color: COLORS.primary }}>
            EXPLORE
          </span>
          <h2 className="mb-6 text-4xl font-light" style={{ color: COLORS.primary }}>
            Discover Extraordinary Destinations
          </h2>
          <p className="mx-auto max-w-3xl text-lg" style={{ color: `${COLORS.primary}DD` }}>
            Immerse yourself in the wonders of Varkala and its surrounding treasures
          </p>
        </motion.div>

        <div className="flex flex-wrap items-stretch justify-center gap-4">
          {DESTINATIONS.map((destination) => (
            <DestinationCard 
              key={destination.id}
              destination={destination}
              isSelected={selectedFeature === destination.id}
              onSelect={() => setSelectedFeature(
                selectedFeature === destination.id
                  ? (destination.id + 1) % DESTINATIONS.length
                  : destination.id
              )}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Component for Destination Card
interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
}

const DestinationCard: React.FC<{
  destination: Destination;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ destination, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden transition-all duration-700 ease-in-out ${
        isSelected ? "w-[600px]" : "w-[200px]"
      } h-[600px] ${
        destination.id % 2 === 0 ? "mt-10" : "mt-0"
      } transition-all delay-75 duration-1500`}
      variants={ANIMATIONS.fadeIn}
      onClick={onSelect}
      whileHover={{
        scale: isSelected ? 1 : 1.02,
      }}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent" />

      <img
        src={destination.image}
        alt={destination.name}
        className="h-full w-full object-cover transition-all duration-700"
      />

      <div className="absolute right-0 bottom-0 left-0 z-20 transition-all duration-500">
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: "auto" }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute bottom-0 h-[40%] overflow-hidden bg-gradient-to-t from-black/80 to-transparent p-6"
          >
            <h3 className="mb-2 text-2xl font-bold" style={{ color: COLORS.secondary }}>
              {destination.name}
            </h3>
            <p className="mb-6 text-lg" style={{ color: COLORS.secondary }}>
              {destination.description}
            </p>
          </motion.div>
        )}
      </div>
      
      {!isSelected && (
        <motion.button
          className="absolute bottom-6 left-6 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all"
          style={{
            backgroundColor: `${COLORS.secondary}20`,
            color: COLORS.secondary,
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: `${COLORS.secondary}40`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
};

// Component for Experience Section
const ExperienceSection = () => {
  return (
    <section className="relative py-32" style={{ backgroundColor: `${COLORS.primary}15` }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse items-center md:flex-row">
          <motion.div
            className="mt-12 w-full md:mt-0 md:w-1/2 md:pr-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATIONS.fadeIn}
          >
            <span className="mb-6 block text-sm tracking-widest uppercase" style={{ color: COLORS.primary }}>
              SIGNATURE EXPERIENCE
            </span>
            <h2 className="mb-8 text-4xl leading-tight font-light" style={{ color: COLORS.primary }}>
              Ocean-View Infinity Pool
            </h2>
            <p className="mb-8 text-lg" style={{ color: `${COLORS.primary}DD` }}>
              Immerse yourself in our spectacular CLIFF-edge infinity pool
              where the water seems to merge with the Arabian Sea horizon.
              Perfect for watching the sunset while enjoying a refreshing
              swim.
            </p>
            <Link href="/experiences">
              <button
                className="px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300"
                style={{
                  color: COLORS.light,
                  backgroundColor: COLORS.primary,
                }}
              >
                View All Experiences
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATIONS.fadeIn}
          >
            <div className="relative aspect-[4/3]">
              <img
                src="/placeholder/infinity-pool.avif"
                alt="Infinity Pool"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Component for Footer
const Footer = () => {
  return (
    <motion.footer
      className="py-12"
      style={{ background: COLORS.secondary }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center">
          <img src="/placeholder/logo.png" alt="AYADA CLIFF" className="mb-4 w-32" />
          <h3 className="mt-4 text-lg font-light tracking-widest uppercase" style={{ color: COLORS.primary }}>
            CONNECT WITH AYADA CLIFF
          </h3>
        </div>

        <div className="mb-12 flex flex-wrap justify-center">
          {["Twitter", "Facebook", "Youtube", "Instagram"].map((social) => (
            <div key={social} className="mx-6 mb-6">
              <motion.a
                href="#"
                className="text-sm tracking-wider uppercase"
                style={{ color: COLORS.primary }}
                whileHover={{ borderBottom: `1px solid ${COLORS.primary}` }}
                transition={{ duration: 0.3 }}
              >
                {social}
              </motion.a>
            </div>
          ))}
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {["FAQ", "Terms & Conditions", "Privacy Policy"].map((link) => (
            <div key={link}>
              <motion.a
                href="#"
                className="text-xs tracking-wider uppercase"
                style={{ color: COLORS.primary }}
                whileHover={{ borderBottom: `1px solid ${COLORS.primary}` }}
                transition={{ duration: 0.3 }}
              >
                {link}
              </motion.a>
            </div>
          ))}
        </div>

        <div className="text-center text-xs" style={{ color: COLORS.primary }}>
          <p className="mb-4">
            Varkala CLIFF Road, Varkala, Kerala 695141, India. Phone: +91
            12345 67890, Email: info@ayadacliff.com
          </p>
          <p>© {new Date().getFullYear()} Ayada Cliff. All rights reserved</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default AyadaCLIFFPage;