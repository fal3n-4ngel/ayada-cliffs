import React from 'react'
import { COLORS } from '../theme/colors';
import { motion } from "framer-motion";

const Footer = () => {
    return (
      <motion.footer
        className="py-12"
        style={{ background: COLORS.secondary }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center">
            <img src="/placeholder/logo.png" alt="AYADA CLIFF" className="mb-4 w-32" />
            <h3 className="mt-4 text-lg font-light tracking-widest uppercase" style={{ color: COLORS.primary }}>
              CONNECT WITH AYADA CLIFF
            </h3>
          </div>
  
          <div className="mb-12 flex flex-wrap justify-center">
            {["Twitter", "Facebook", "Youtube", "Instagram"].map((social) => (
              <div key={social} className="mx-6 mb-6">
                <motion.a
                  href="#"
                  className="text-sm tracking-wider uppercase"
                  style={{ color: COLORS.primary }}
                  whileHover={{ borderBottom: `1px solid ${COLORS.primary}` }}
                  transition={{ duration: 0.3 }}
                >
                  {social}
                </motion.a>
              </div>
            ))}
          </div>
  
          <div className="mb-10 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {["FAQ", "Terms & Conditions", "Privacy Policy"].map((link) => (
              <div key={link}>
                <motion.a
                  href="#"
                  className="text-xs tracking-wider uppercase"
                  style={{ color: COLORS.primary }}
                  whileHover={{ borderBottom: `1px solid ${COLORS.primary}` }}
                  transition={{ duration: 0.3 }}
                >
                  {link}
                </motion.a>
              </div>
            ))}
          </div>
  
          <div className="text-center text-xs" style={{ color: COLORS.primary }}>
            <p className="mb-4">
              Varkala CLIFF Road, Varkala, Kerala 695141, India. Phone: +91
              12345 67890, Email: info@ayadacliff.com
            </p>
            <p>© {new Date().getFullYear()} Ayada Cliff. All rights reserved</p>
          </div>
        </div>
      </motion.footer>
    );
  };

export default Footer