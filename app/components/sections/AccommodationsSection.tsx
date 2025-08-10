import React from "react";
import { COLORS } from "../../theme/colors";
import { motion } from "framer-motion";
import AccommodationCard from "../ui/AccommodationCard";
import { ACCOMMODATIONS } from "../../data/Accomodations";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2
    }
  }
};

const AccommodationsSection = () => {
  return (
    <section
      className="relative py-16 pt-24 md:px-16 px-4" 
      id="stay"
      style={{
        backgroundColor: COLORS.secondary,
        backgroundImage: "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.03) 0%, transparent 40%)"
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          {/* Minimal decorative elements */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16" style={{ backgroundColor: COLORS.primary, opacity: 0.2 }}></div>
            <span 
              className="mx-8 text-xs tracking-widest uppercase font-extralight"
              style={{ color: COLORS.primary, letterSpacing: '0.25em' }}
            >
              Curated Retreats
            </span>
            <div className="h-px w-16" style={{ backgroundColor: COLORS.primary, opacity: 0.2 }}></div>
          </div>
                   
          <h2 
            className="mb-6 text-4xl md:text-5xl font-light tracking-wider"
            style={{ color: COLORS.primary }}
          >
            Elevated Living Experiences
          </h2>
                   
          <p 
            className="mx-auto max-w-2xl text-base md:text-lg font-light leading-relaxed"
            style={{ color: COLORS.primary, opacity: 0.85 }}
          >
            Discover our thoughtfully designed spaces where modern luxury meets coastal serenity,
            creating perfect moments of quiet indulgence
          </p>
        </motion.div>

        {/* Optimized grid for 2 cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
        >
          {ACCOMMODATIONS.slice(0, 2).map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeIn}
              className="flex justify-center"
            >
              <AccommodationCard item={item} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced bottom decorative element */}
        <motion.div 
          className="mt-24 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeIn}
        >

        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationsSection;