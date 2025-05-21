import React from 'react';
import { COLORS } from '../theme/colors';
import { motion } from "framer-motion";
import Link from 'next/link';

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 100, y: 0 },
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
      className=" flex flex-col items-center justify-between pb-5"
      style={{ 
        background: COLORS.secondary,
      
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div></div>
      <div className="container mx-auto px-8">
      

      

        <div className="mb-8 flex justify-center">
          <div className="h-px w-full max-w-4xl" style={{ backgroundColor: COLORS.primary, opacity: 0.08 }}></div>
        </div>

        <div className="mb-8 flex flex-col items-center">
          <h5 
            className="mb-8 text-sm tracking-widest uppercase font-extralight"
            style={{ color: COLORS.primary, letterSpacing: '0.15em' }}
          >
            Follow Our Journey
          </h5>
          
          <div className="flex space-x-10">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                className="text-sm tracking-wider font-light"
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
            className="mb-6 text-sm font-light"
            style={{ color: COLORS.primary, opacity: 0.6 }}
          >
            Varkala Cliff Road, Varkala, Kerala 695141, India
          </p>
          <p 
            className="mb-8 text-sm font-light"
            style={{ color: COLORS.primary, opacity: 0.6 }}
          >
            <a href="tel:+911234567890" className="hover:opacity-80">+91 12345 67890</a> · <a href="mailto:info@ayadacliff.com" className="hover:opacity-80">info@ayadacliff.com</a>
          </p>
          <p 
            className="text-sm font-extralight"
            style={{ color: COLORS.primary, opacity: 0.5 }}
          >
            © {new Date().getFullYear()} Ayada Cliff · All rights reserved
          </p>
          <p className="text-sm font-extralight py-10 josefin-sans text-red-900"> Designed & Developed by <a  href="https://github.com/Deflated-Pappadam"className='hover:text-blue-600 cursor-pointer text-black  '>Deflated Pappadam</a></p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;