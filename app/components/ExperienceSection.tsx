import React from 'react'
import { COLORS } from '../theme/colors';
import { motion } from "framer-motion";
import { ANIMATIONS } from '../data/Animations';
import Link from 'next/link';

const ExperienceSection = () => {
    return (
      <section className="relative py-32" style={{ backgroundColor: `white` }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse items-center md:flex-row">
            <motion.div
              className="mt-12 w-full md:mt-0 md:w-1/2 md:pr-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATIONS.fadeIn}
            >
              <span className="mb-6 block text-sm tracking-widest uppercase" style={{ color: COLORS.primary }}>
                SIGNATURE EXPERIENCE
              </span>
              <h2 className="mb-8 text-4xl leading-tight font-light" style={{ color: COLORS.primary }}>
                Ocean-View Infinity Pool
              </h2>
              <p className="mb-8 text-lg" style={{ color: `${COLORS.primary}DD` }}>
                Immerse yourself in our spectacular CLIFF-edge infinity pool
                where the water seems to merge with the Arabian Sea horizon.
                Perfect for watching the sunset while enjoying a refreshing
                swim.
              </p>
              <Link href="/experiences">
                <button
                  className="px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300"
                  style={{
                    color: COLORS.light,
                    backgroundColor: COLORS.primary,
                  }}
                >
                  View All Experiences
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
              <div className="relative aspect-[4/3]">
                <img
                  src="/placeholder/infinity-pool.avif"
                  alt="Infinity Pool"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };
export default ExperienceSection