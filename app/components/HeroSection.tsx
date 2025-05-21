import React from 'react';
import { COLORS } from '../theme/colors';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      {/* Background with overlay */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {/* Hero Image */}
          <img
            src="/placeholder/bg2.avif"
            alt="AYADA CLIFF"
            className="h-full w-full object-cover"
          />
          
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        </motion.div>
      </div>

      {/* Content container with vertical centering */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero content with refined animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            {/* Thin line above logo */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="mb-6 h-px bg-white/70"
            ></motion.div>
            
            {/* Tagline */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mb-5 text-xs tracking-widest uppercase"
              style={{ color: COLORS.light }}
            >
              A Sanctuary of Tranquility
            </motion.span>

            {/* Logo container with subtle animation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="mb-10 w-80 md:w-[45vw]"
            >
              <img 
                src="/images/logo/ayadaclifflogotypo-white.png" 
                alt="AYADA CLIFF" 
                className="w-full"
              />
            </motion.div>

            {/* Location description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 1.5, delay: 1.4 }}
              className="mb-12 text-sm font-light tracking-wider md:text-base"
              style={{ color: COLORS.light }}
            >
              Luxury Ocean View Pool Villa · Varkala, Kerala
            </motion.p>

            {/* Button with hover effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mt-4"
            >
              <Link href="/discover">
                <button
                  className="group relative overflow-hidden border border-white/30 bg-transparent px-12 py-3 text-xs tracking-widest uppercase transition-all duration-500"
                  style={{ color: COLORS.light }}
                >
                  <span className="relative z-10">Discover Experience</span>
                  <div className="absolute inset-0 -translate-y-full bg-white/10 transition-transform duration-500 ease-in-out group-hover:translate-y-0"></div>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 transform"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
          className="flex flex-col items-center"
        >
          <div className="mb-2 h-10 w-px bg-white/30"></div>
          <ArrowDown size={18} style={{ color: COLORS.light }} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;