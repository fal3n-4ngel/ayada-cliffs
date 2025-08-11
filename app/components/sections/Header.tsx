"use client";
import React from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../../theme/colors";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "../../data/Navigation";
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
      RESERVE
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

const DesktopNavigation = ({ scrollY }: { scrollY: number }) => {
  const color = getColors(scrollY).text;
  return (
    <nav>
      <ul className="flex space-x-8">
        {NAV_ITEMS.map((item, i) => (
          <li key={i}>
            <Link
              href={item.link}
              className="text-sm font-light tracking-wider transition-opacity hover:opacity-75"
              style={{ color }}
            >
              {item.name}
            </Link>
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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...VARIANTS.overlay}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-white"
        >
          <div className="container mx-auto h-full px-6 py-24 grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <ul className="space-y-6">
                {NAV_ITEMS.map((item, i) => (
                  <NavItem key={i} item={item} index={i} onClick={close} />
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
        <div className="container mx-auto hidden items-center justify-between px-6 md:flex">
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
