import React from "react";
import { COLORS } from "../theme/colors";
import { motion } from "framer-motion";
import AccommodationCard from "./AccommodationCard";
import { ACCOMMODATIONS } from "../data/Accomodations";

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
      staggerChildren: 0.3
    }
  }
};

const AccommodationsSection = () => {
  return (
    <section
      className="relative py-10 pt-20 md:px-16 px-4"
      style={{ 
        backgroundColor: COLORS.secondary,
        backgroundImage: "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.03) 0%, transparent 40%)"
      }}
    >
      <div className="container mx-auto px-8">
        <motion.div
          className="mb-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          {/* Minimal decorative elements */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12" style={{ backgroundColor: COLORS.primary, opacity: 0.15 }}></div>
            <span 
              className="mx-6 text-xs tracking-widest uppercase font-extralight" 
              style={{ color: COLORS.primary, letterSpacing: '0.2em' }}
            >
              Curated Retreats
            </span>
            <div className="h-px w-12" style={{ backgroundColor: COLORS.primary, opacity: 0.15 }}></div>
          </div>
          
          <h2 
            className="mb-8 text-3xl md:text-4xl font-light tracking-wider" 
            style={{ color: COLORS.primary }}
          >
            Elevated Living Experiences
          </h2>
          
          <p 
            className="mx-auto max-w-xl text-sm md:text-base font-light leading-relaxed" 
            style={{ color: COLORS.primary, opacity: 0.8 }}
          >
            Discover our thoughtfully designed spaces where modern luxury meets coastal serenity,
            creating perfect moments of quiet indulgence
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:gap-x-16 md:gap-y-20 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
        >
          {ACCOMMODATIONS.map((item, index) => (
            <AccommodationCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
        
        {/* Subtle decorative element at bottom */}
        <div className="mt-32 flex justify-center">
          <div 
            className="h-px w-24" 
            style={{ backgroundColor: COLORS.primary, opacity: 0.1 }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationsSection;