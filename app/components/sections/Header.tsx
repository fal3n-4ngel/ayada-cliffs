"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../../theme/colors";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS, VILLAS_DROPDOWN_ITEMS } from "../../data/Navigation";
import Image from "next/image";

interface NavigationMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HeaderProps {
  scrollY: number;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LOGO_PATHS = {
  mark: "/images/logo/ayadaclifflogo-mark.png",
  typo: "/images/logo/ayadaclifflogo-typo.png",
} as const;

const VARIANTS = {
  overlay: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  navItem: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  dropdown: { 
    initial: { opacity: 0, y: -10 }, 
    animate: { opacity: 1, y: 0 }, 
    exit: { opacity: 0, y: -10 } 
  },
} as const;

const getColors = (scrollY: number, isMenuOpen = false) => ({
  text: scrollY > 50 || isMenuOpen ? COLORS.dark : COLORS.light,
  border: scrollY > 50 ? COLORS.primary : COLORS.light,
  primary: COLORS.primary,
});

const Logo = ({ scrollY, isMobile = false }: { scrollY: number; isMobile?: boolean }) => {
  const color = getColors(scrollY).text;
  return (
    <Link href="/" aria-label="Ayada Cliff Home">
      {isMobile ? (
        <Image src={LOGO_PATHS.typo} alt="Ayada Cliff Logo" width={180} height={40} priority />
      ) : (
        <div className="flex items-center gap-4">
          <Image src={LOGO_PATHS.mark} alt="Ayada Cliff Mark" width={28} height={28} priority />
          <Image src={LOGO_PATHS.typo} alt="Ayada Cliff Typography" width={180} height={40} priority />
        </div>
      )}
    </Link>
  );
};

const ReserveButton = ({ href = "/reserve", color }: { href?: string; color: string }) => (
  <Link href={href}>
    <button
      className="px-6 py-2 text-sm tracking-widest text-white transition-all duration-300 hover:bg-opacity-90"
      style={{ backgroundColor: color }}
    >
      BOOK NOW
    </button>
  </Link>
);

const NavItem = ({
  item,
  index,
  onClick,
  delay = 0.1,
}: {
  item: { name: string; link: string };
  index: number;
  onClick: () => void;
  delay?: number;
}) => (
  <motion.li
    initial={VARIANTS.navItem.initial}
    animate={VARIANTS.navItem.animate}
    transition={{ delay: delay * index }}
  >
    <Link
      href={item.link}
      className="group flex items-center justify-between text-2xl transition-all duration-300 text-dark"
      onClick={onClick}
    >
      <span>{item.name}</span>
      <ChevronRight size={18} className="opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  </motion.li>
);

const MobileStayItem = ({ onClick, delay = 0.1 }: { onClick: () => void; delay?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.li
      initial={VARIANTS.navItem.initial}
      animate={VARIANTS.navItem.animate}
      transition={{ delay }}
    >
      <div className="space-y-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-between text-2xl transition-all duration-300 text-dark w-full text-left"
        >
          <span>VILLAS</span>
          <ChevronDown 
            size={18} 
            className={`transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 space-y-3 overflow-hidden"
            >
              {VILLAS_DROPDOWN_ITEMS.map((subItem, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={subItem.link}
                    className="block text-lg text-gray-600 hover:text-dark transition-colors"
                    onClick={onClick}
                  >
                    {subItem.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
};

const DesktopNavigation = ({ scrollY }: { scrollY: number }) => {
  const color = getColors(scrollY).text;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav>
      <ul className="flex space-x-8 items-center">
        {NAV_ITEMS.map((item, i) => (
          <li 
            key={i} 
            ref={item.name === "VILLAS" ? dropdownRef : null}
            className={item.name === "VILLAS" ? "relative" : ""}
          >
            {item.name === "VILLAS" ? (
              <div className="relative">
                <button
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="flex items-center space-x-1 py-2 text-sm text-gray-700 hover:text-primary transition-colors"
                  style={{ color }}
                >
                  <span>{item.name}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      {...VARIANTS.dropdown}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 min-w-[160px] z-50"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      {VILLAS_DROPDOWN_ITEMS.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={item.link}
                className="text-sm font-light tracking-wider transition-opacity hover:opacity-75"
                style={{ color }}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MobileMenuButton = ({
  isMenuOpen,
  onClick,
  scrollY,
}: {
  isMenuOpen: boolean;
  onClick: () => void;
  scrollY: number;
}) => {
  const color = getColors(scrollY, isMenuOpen).text;
  return (
    <button
      onClick={onClick}
      className="z-50 md:hidden"
      style={{ color }}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  );
};

const NavigationMenu = ({ isOpen, setIsOpen }: NavigationMenuProps) => {
  const close = () => setIsOpen(false);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...VARIANTS.overlay}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-white overflow-y-auto"
        >
          {/* Scrollable container with proper padding */}
          <div className="min-h-full px-6 py-24">
            <div className="container mx-auto grid gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <ul className="space-y-6">
                  {NAV_ITEMS.map((item, i) => (
                    item.name === "VILLAS" ? (
                      <MobileStayItem key={i} onClick={close} delay={0.1 * i} />
                    ) : (
                      <NavItem key={i} item={item} index={i} onClick={close} />
                    )
                  ))}
                </ul>
                <ReserveButton color={COLORS.primary} />
              </div>
              <div className="space-y-8">
                <h3 className="text-sm tracking-widest text-primary">INFORMATION</h3>
                <ul className="space-y-6">
                  {SECONDARY_NAV_ITEMS.map((item, i) => (
                    <NavItem key={i} item={item} index={i} onClick={close} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = ({ scrollY, isMenuOpen, setIsMenuOpen }: HeaderProps) => {
  const colors = getColors(scrollY, isMenuOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const headerClasses =
    `fixed top-0 z-50 w-full transition-all duration-700 ` +
    (scrollY > 50 ? "bg-white py-2 shadow-md" : "bg-transparent py-6");

  return (
    <>
      <header className={headerClasses}>
        {/* Mobile */}
        <div className="container mx-auto flex items-center justify-between px-6 md:hidden">
          <MobileMenuButton isMenuOpen={isMenuOpen} onClick={toggleMenu} scrollY={scrollY} />
          <Logo scrollY={scrollY} isMobile />
          <div /> {/* spacer */}
        </div>

        {/* Desktop */}
        <div className="container mx-auto hidden items-center justify-between  md:flex px-2">
          <Logo scrollY={scrollY} />
          <DesktopNavigation scrollY={scrollY} />
          <ReserveButton color={colors.primary} />
        </div>
      </header>

      <NavigationMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;