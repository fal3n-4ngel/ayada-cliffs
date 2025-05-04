import React from 'react'
import { COLORS } from '../theme/colors';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from 'lucide-react';

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
              className="mb-6 text-5xl  tracking-widest md:text-7xl josefin-sans"
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
export default HeroSection