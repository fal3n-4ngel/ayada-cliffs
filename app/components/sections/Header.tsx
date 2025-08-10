"use client";
import React, { useMemo } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../../theme/colors";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "../../data/Navigation";
import Image from "next/image";

// Types
interface NavigationMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HeaderProps {
  scrollY: number;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NavItemProps {
  item: { name: string; link: string };
  index: number;
  onClick: () => void;
  delay?: number;
}

// Constants
const LOGO_PATHS = {
  mark: "/images/logo/ayadaclifflogo-mark.png",
  typo: "/images/logo/ayadaclifflogo-typo.png",
} as const;

const ANIMATION_VARIANTS = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  navItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
} as const;

// Utility function for dynamic styles
const getColorByScroll = (scrollY: number, isMenuOpen: boolean = false) => ({
  text: scrollY > 50 || isMenuOpen ? COLORS.dark : COLORS.light,
  border: scrollY > 50 ? COLORS.primary : COLORS.light,
  primary: COLORS.primary,
});

// Sub-components
const Logo: React.FC<{ scrollY: number; isMobile?: boolean }> = ({
  scrollY,
  isMobile = false,
}) => {
  const logoColor = getColorByScroll(scrollY).text;

  return (
    <Link href="/">
      <h1
        className="josefin-sans text-2xl font-light tracking-widest"
        style={{ color: logoColor }}
      >
        {isMobile ? (
          <Image
            src={LOGO_PATHS.typo}
            alt="Ayada Cliff Logo"
            width={180}
            height={40}
            className="w-45"
          />
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Image
              src={LOGO_PATHS.mark}
              alt="Ayada Cliff Mark"
              width={28}
              height={28}
              className="w-7"
            />
            <Image
              src={LOGO_PATHS.typo}
              alt="Ayada Cliff Typography"
              width={180}
              height={40}
              className="w-45"
            />
          </div>
        )}
      </h1>
    </Link>
  );
};

const ReserveButton: React.FC<{ scrollY: number; href?: string }> = ({
  scrollY,
  href = "/reserve",
}) => {
  const colors = getColorByScroll(scrollY);

  return (
    <Link href={href}>
      <button
        className={`hover:bg-opacity-10 px-6 py-2 text-sm tracking-widest transition-all duration-300 bg-[${colors.primary}] text-white`}
      >
        RESERVE
      </button>
    </Link>
  );
};

const NavItem: React.FC<NavItemProps> = ({
  item,
  index,
  onClick,
  delay = 0.1,
}) => (
  <motion.li
    initial={ANIMATION_VARIANTS.navItem.initial}
    animate={ANIMATION_VARIANTS.navItem.animate}
    transition={{ delay: delay * index }}
  >
    <Link
      href={item.link}
      className="group flex items-center justify-between text-2xl transition-all duration-300"
      onClick={onClick}
      style={{ color: COLORS.dark }}
    >
      <span>{item.name}</span>
      <ChevronRight
        size={18}
        className="opacity-0 transition-opacity group-hover:opacity-100"
      />
    </Link>
  </motion.li>
);

const DesktopNavigation: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const textColor = getColorByScroll(scrollY).text;

  return (
    <nav className="flex items-center">
      <ul className="flex space-x-8">
        {NAV_ITEMS.map((item, index) => (
          <li key={`desktop-nav-${index}`}>
            <Link
              href={item.link}
              className="group text-sm font-light tracking-wider transition-all duration-300 hover:opacity-75"
              style={{ color: textColor }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MobileMenuButton: React.FC<{
  isMenuOpen: boolean;
  onClick: () => void;
  scrollY: number;
}> = ({ isMenuOpen, onClick, scrollY }) => {
  const iconColor = getColorByScroll(scrollY, isMenuOpen).text;

  return (
    <button
      onClick={onClick}
      className="z-50 text-4xl focus:outline-none md:hidden"
      style={{ color: iconColor }}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  );
};

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const closeMenu = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...ANIMATION_VARIANTS.overlay}
          className="fixed inset-0 z-40 bg-white"
        >
          <div className="container mx-auto h-full px-6 py-24">
            <div className="grid h-full grid-cols-1 gap-12 md:grid-cols-2">
              {/* Primary Navigation */}
              <div className="space-y-8">
                <nav>
                  <ul className="space-y-6">
                    {NAV_ITEMS.map((item, index) => (
                      <NavItem
                        key={`primary-nav-${index}`}
                        item={item}
                        index={index}
                        onClick={closeMenu}
                      />
                    ))}
                  </ul>
                </nav>

                <ReserveButton scrollY={0} />
              </div>

              {/* Secondary Navigation */}
              <div className="space-y-8">
                <h3
                  className="text-sm tracking-widest"
                  style={{ color: COLORS.primary }}
                >
                  INFORMATION
                </h3>
                <nav>
                  <ul className="space-y-6">
                    {SECONDARY_NAV_ITEMS.map((item, index) => (
                      <NavItem
                        key={`secondary-nav-${index}`}
                        item={item}
                        index={index}
                        onClick={closeMenu}
                        delay={0.1}
                      />
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

const Header: React.FC<HeaderProps> = ({
  scrollY,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerClasses = useMemo(
    () =>
      `fixed top-0 z-50 w-full transition-all duration-700 ${scrollY > 50 ? "bg-white py-2 shadow-md" : "bg-transparent py-6"
      }`,
    [scrollY],
  );

  return (
    <>
      <header className={headerClasses}>
        {/* Mobile Header */}
        <div className="container mx-auto flex items-center justify-between px-6 py-1 md:hidden">
          <MobileMenuButton
            isMenuOpen={isMenuOpen}
            onClick={toggleMenu}
            scrollY={scrollY}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <Logo scrollY={scrollY} isMobile />
          </div>

          {/* Spacer for layout balance */}
          <div />
        </div>

        {/* Desktop Header */}
        <div className="container mx-auto hidden items-center justify-between px-6 py-1 md:flex">
          <Logo scrollY={scrollY} />
          <DesktopNavigation scrollY={scrollY} />
          <ReserveButton scrollY={scrollY} />
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <NavigationMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;
