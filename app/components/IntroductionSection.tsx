import React from 'react'
import { COLORS } from '../theme/colors';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from 'lucide-react';
import { ANIMATIONS } from '../data/Animations';

// Component for Introduction Section
const IntroductionSection = () => {
    return (
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center md:flex-row">
            <motion.div
              className="mb-12 w-full md:mb-0 md:w-1/2 md:pr-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATIONS.fadeIn}
            >
              <span
                className="mb-6 block text-sm tracking-widest uppercase"
                style={{ color: COLORS.primary }}
              >
                OUR SANCTUARY
              </span>
              <h2
                className="mb-8 text-4xl leading-tight font-light"
                style={{ color: COLORS.primary }}
              >
                Perched on the dramatic CLIFF of Varkala, where the Arabian Sea
                meets the sky
              </h2>
              <p className="mb-8 text-lg" style={{ color: `${COLORS.primary}DD` }}>
                AYADA CLIFF is a sanctuary of tranquility, offering uninterrupted
                ocean views from every corner of our luxury villa. Experience the
                perfect blend of modern comfort and traditional Kerala architecture.
              </p>
              <Link href="/about">
                <button
                  className="border-b pb-1 text-sm tracking-widest uppercase"
                  style={{
                    color: COLORS.primary,
                    borderColor: `${COLORS.primary}40`,
                  }}
                >
                  Discover our story
                </button>
              </Link>
            </motion.div>
  
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATIONS.fadeIn}
            >
              <div className="relative aspect-[4/5]">
                <img
                  src="/placeholder/3.avif"
                  alt="Villa exterior"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

export default IntroductionSection