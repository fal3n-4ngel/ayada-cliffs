import React from 'react';
import { COLORS } from '../theme/colors';
import { motion } from "framer-motion";
import Link from 'next/link';

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const socialLinks = [
    { name: "Instagram", url: "#" },
    { name: "Pinterest", url: "#" },
    { name: "Facebook", url: "#" },
    { name: "Twitter", url: "#" }
  ];

  const footerLinks = [
    { 
      title: "Explore",
      links: [
        { name: "Accommodations", url: "/accommodations" },
        { name: "Experiences", url: "/experiences" },
        { name: "Dining", url: "/dining" },
        { name: "Wellness", url: "/wellness" }
      ]
    },
    {
      title: "Information",
      links: [
        { name: "About Us", url: "/about" },
        { name: "Contact", url: "/contact" },
        { name: "Location", url: "/location" },
        { name: "Gallery", url: "/gallery" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms & Conditions", url: "/terms" },
        { name: "Cookie Policy", url: "/cookies" },
        { name: "Accessibility", url: "/accessibility" }
      ]
    }
  ];

  return (
    <motion.footer
      className="pt-24 pb-16"
      style={{ 
        background: COLORS.secondary,
        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(255,255,255,0.03) 0%, transparent 40%)'
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-8">
        <div className="mb-20 flex flex-col items-center">
          <div className="mb-6">
            <img 
              src="/images/logo/ayadaclifflogo-mark.png" 
              alt="AYADA CLIFF" 
              className="w-48"
            />
          </div>
          
          <div className="h-px w-12 my-8" style={{ backgroundColor: COLORS.primary, opacity: 0.15 }}></div>
          
          <div className="max-w-md text-center">
            <p 
              className="text-sm font-light leading-relaxed" 
              style={{ color: COLORS.primary, opacity: 0.7 }}
            >
              An intimate retreat perched on the dramatic cliffs of Varkala,
              where tranquility and natural beauty create an unforgettable sanctuary
            </p>
          </div>
        </div>

      

        <div className="mb-16 flex justify-center">
          <div className="h-px w-full max-w-4xl" style={{ backgroundColor: COLORS.primary, opacity: 0.08 }}></div>
        </div>

        <div className="mb-16 flex flex-col items-center">
          <h5 
            className="mb-8 text-xs tracking-widest uppercase font-extralight"
            style={{ color: COLORS.primary, letterSpacing: '0.15em' }}
          >
            Follow Our Journey
          </h5>
          
          <div className="flex space-x-10">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                className="text-xs tracking-wider font-light"
                style={{ color: COLORS.primary, opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p 
            className="mb-4 text-xs font-light"
            style={{ color: COLORS.primary, opacity: 0.6 }}
          >
            Varkala Cliff Road, Varkala, Kerala 695141, India
          </p>
          <p 
            className="mb-8 text-xs font-light"
            style={{ color: COLORS.primary, opacity: 0.6 }}
          >
            <a href="tel:+911234567890" className="hover:opacity-80">+91 12345 67890</a> · <a href="mailto:info@ayadacliff.com" className="hover:opacity-80">info@ayadacliff.com</a>
          </p>
          <p 
            className="text-xs font-extralight"
            style={{ color: COLORS.primary, opacity: 0.5 }}
          >
            © {new Date().getFullYear()} Ayada Cliff · All rights reserved
          </p>
          <p className="text-xs font-extralight pt-10"> crafted by <a  href="mailto:deflatedpappadam@gmail.com"className='hover:text-blue-600 cursor-pointer'>Deflated Pappadam</a></p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;