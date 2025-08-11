"use client";
import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../../theme/colors";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true });

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    if (footerRef.current) {
      footerRef.current.addEventListener("mousemove", handleMouseMove);
      return () =>
        footerRef.current?.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const socialLinks = [
    { name: "Instagram", url: "#", icon: "IG" },
    { name: "Pinterest", url: "#", icon: "PI" },
    { name: "Facebook", url: "#", icon: "FB" },
    { name: "Twitter", url: "#", icon: "TW" },
  ];

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Accommodations", url: "/accommodations" },
        { name: "Experiences", url: "/experiences" },
        { name: "Dining", url: "/dining" },
        { name: "Wellness", url: "/wellness" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "About Us", url: "/about" },
        { name: "Contact", url: "/contact" },
        { name: "Location", url: "/location" },
        { name: "Gallery", url: "/gallery" },
      ],
    },
  ];

  return (
    <motion.footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: COLORS.secondary,
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Ambient background gradient that follows mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${COLORS.primary}, transparent 40%)`,
        }}
      />

      {/* Floating geometric shapes */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
              border: `1px solid ${COLORS.primary}`,
              borderRadius: i % 2 === 0 ? "50%" : "0%",
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-8 py-20">
        {/* Main content grid */}
        <div className="mb-20 grid gap-16 md:grid-cols-1 lg:grid-cols-12">
          {/* Brand section */}
          <motion.div
            className="space-y-8 lg:col-span-5"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center md:w-[400px]">
              <motion.img
                src="/images/logo/ayadaclifflogo.png"
                className="mb-4 h-auto w-[60vw] md:w-[350px]"
                style={{ color: COLORS.primary }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              ></motion.img>
            </div>
          </motion.div>

          {/* Navigation links */}
          <motion.div
            className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:col-span-7"
            variants={itemVariants}
          >
            {footerLinks.map((section, sectionIndex) => (
              <div key={section.title}>
                <motion.h4
                  className="mb-8 text-sm font-medium tracking-widest uppercase"
                  style={{ color: COLORS.primary, opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                >
                  {section.title}
                </motion.h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={link.name}>
                      <Link href={link.url}>
                        <motion.span
                          className="relative block cursor-pointer text-base font-light"
                          style={{ color: COLORS.primary, opacity: 0.7 }}
                          onHoverStart={() =>
                            setHoveredLink(`${sectionIndex}-${linkIndex}`)
                          }
                          onHoverEnd={() => setHoveredLink(null)}
                          whileHover={{
                            opacity: 1,
                            x: 8,
                            transition: { duration: 0.2 },
                          }}
                        >
                          {link.name}
                          <motion.div
                            className="absolute -bottom-1 left-0 h-px"
                            style={{ backgroundColor: COLORS.primary }}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                hoveredLink === `${sectionIndex}-${linkIndex}`
                                  ? "100%"
                                  : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Contact info with hover effects */}
            <div className="col-span-2 space-y-4 md:col-span-1">
              <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                <p
                  className="mb-4 text-sm font-medium tracking-widest uppercase"
                  style={{ color: COLORS.primary, opacity: 0.6 }}
                >
                  LOCATION
                </p>
                <p
                  className="mb-8 text-base font-light"
                  style={{ color: COLORS.primary, opacity: 0.8 }}
                >
                  Vettakada, Edava PO
                  <br />
                  Varkala, Thiruvananthapuram
                  <br />
                  Kerala 695311, India
                </p>
              </motion.div>

              <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                <p
                  className="mb-4 text-sm font-medium tracking-widest uppercase"
                  style={{ color: COLORS.primary, opacity: 0.6 }}
                >
                  CONTACT
                </p>
                <div className="space-y-1">
                  <motion.a
                    href="tel:+911234567890"
                    className="block text-base font-light hover:underline"
                    style={{ color: COLORS.primary, opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    +91 8891916663

                  </motion.a>
                  <motion.a
                    href="mailto:info@ayadacliff.com"
                    className="block text-base font-light hover:underline"
                    style={{ color: COLORS.primary, opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    info@ayadacliff.com
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider with animation */}
        <motion.div
          className="mb-16 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="h-px w-full max-w-6xl"
            style={{ backgroundColor: COLORS.primary, opacity: 0.1 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Bottom section */}
        <motion.div className="space-y-4 text-center" variants={itemVariants}>
          <motion.p
            className="text-sm font-light"
            style={{ color: COLORS.primary, opacity: 0.5 }}
            whileHover={{ opacity: 0.7 }}
          >
            © {new Date().getFullYear()} Ayada Cliff · All rights reserved
          </motion.p>

          <motion.p
            className="text-sm font-light"
            style={{ color: COLORS.primary, opacity: 0.4 }}
            whileHover={{ opacity: 0.6 }}
          >
            Designed & Developed by{" "}
            <motion.a
              href="https://github.com/Deflated-Pappadam"
              className="cursor-pointer hover:underline"
              style={{ color: COLORS.primary }}
              whileHover={{
                opacity: 1,
                scale: 1.05,
              }}
            >
              Deflated Pappadam
            </motion.a>
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
