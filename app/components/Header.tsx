"use client";
import React from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { COLORS } from "../theme/colors";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "../data/Navigation";

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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-white"
        >
          <div className="container mx-auto h-full px-6 py-24">
            <div className="grid h-full grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-8">
              
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
              {/* Book button */}
              <Link href="/reserve">
                <button
                  className="hover:bg-opacity-10 px-6 py-2 text-sm tracking-widest transition-all duration-300 hover:bg-white"
                  style={{
                    color:  COLORS.primary ,
                    border: `1px solid ${ COLORS.primary}`,
                  }}
                >
                  RESERVE
                </button>
              </Link>

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
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
      {/* MOBILE */}
      <div className="container mx-auto flex items-center justify-between px-6 py-1 md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 text-4xl focus:outline-none md:hidden"
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
              className="josefin-sans text-2xl font-light tracking-widest"
              style={{ color: scrollY > 50 ? COLORS.primary : COLORS.light }}
            >
              
              <img
                src="/images/logo/ayadaclifflogo-typo.png"
                alt="Logo"
                className="w-45"
              />
            </h1>
          </Link>
        </div>
        <div></div>

     
      </div>

      {/* DESKTOP */}
      <div className="container mx-auto hidden items-center justify-between px-6 py-1 md:flex">
        {/* Logo */}
        <div>
          <Link href="/">
            <h1
              className="josefin-sans text-2xl font-light tracking-widest"
              style={{ color: scrollY > 50 ? COLORS.primary : COLORS.light }}
            >
              <div className="flex items-center justify-center gap-4">
                <img
                  src="/images/logo/ayadaclifflogo-mark.png"
                  alt="Logo"
                  className="w-7"
                />
                <img
                  src="/images/logo/ayadaclifflogo-typo.png"
                  alt="Logo"
                  className="w-45"
                />
              </div>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-center">
          <ul className="flex space-x-8">
            {NAV_ITEMS.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.link}
                  className="group text-sm font-light tracking-wider transition-all duration-300 hover:opacity-75"
                  style={{
                    color: scrollY > 50 ? COLORS.primary : COLORS.light,
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Book button */}
        <Link href="/reserve">
          <button
            className="hover:bg-opacity-10 px-6 py-2 text-sm tracking-widest transition-all duration-300 hover:bg-white"
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

export default Header;
