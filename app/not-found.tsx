"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "./components/Header";

export default function NotFound() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Theme configuration from original code
  const COLORS = {
    primary: "#84321F", // Rusty terracotta brown
    secondary: "#E5DFDA", // Light beige
    light: "#FFFFFF", // White
    dark: "#1D1D1D", // Dark gray/black
    muted: "#9F9F9F", // Muted gray
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <Header
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <motion.div
        className="max-w-xl"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Error number */}
        <motion.h1
          variants={fadeIn}
          className="mb-4 text-9xl font-light"
          style={{ color: COLORS.primary }}
        >
          404
        </motion.h1>

        {/* Divider */}
        <motion.div
          variants={{
            hidden: { width: 0 },
            visible: {
              width: 100,
              transition: { duration: 1.2, delay: 0.2 },
            },
          }}
          className="mx-auto my-8 h-px bg-[#84321F]"
        />

        {/* Error title */}
        <motion.h2
          variants={fadeIn}
          className="mb-6 text-3xl font-light tracking-widest"
          style={{ color: COLORS.primary }}
        >
          PAGE NOT FOUND
        </motion.h2>

        {/* Error description */}
        <motion.p
          variants={fadeIn}
          className="mb-12 text-lg"
          style={{ color: `${COLORS.primary}DD` }}
        >
          We apologize, but the page you are looking for cannot be found. Please
          return to our homepage to continue your journey.
        </motion.p>

        {/* Return home button */}
        <motion.div
          variants={fadeIn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href="/">
            <button
              className="px-10 py-4 text-sm tracking-widest uppercase transition duration-300"
              style={{
                color: COLORS.light,
                backgroundColor: COLORS.primary,
              }}
            >
              Return Home
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
