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
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4, delayChildren: 0.2 },
  },
};

const AccommodationsSection = () => {
  return (
    <section
      id="stay"
      className="relative py-16 pt-24 px-4 md:px-16"
      style={{
        backgroundColor: COLORS.secondary,
        backgroundImage:
          "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.03) 0%, transparent 40%)",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          {/* Decorative Label */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-primary opacity-20" />
            <span
              className="mx-8 text-xs uppercase font-extralight tracking-[0.25em]"
              style={{ color: COLORS.primary }}
            >
              Curated Retreats
            </span>
            <div className="h-px w-16 bg-primary opacity-20" />
          </div>

          <h2
            className="mb-6 text-4xl md:text-5xl font-light tracking-wide"
            style={{ color: COLORS.primary }}
          >
            Elevated Living Experiences
          </h2>

          <p
            className="mx-auto max-w-2xl text-base md:text-lg font-light leading-relaxed opacity-85"
            style={{ color: COLORS.primary }}
          >
            Discover our thoughtfully designed spaces where modern luxury meets
            coastal serenity—creating perfect moments of quiet indulgence.
          </p>
        </motion.div>

        {/* Accommodation Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
        >
          {ACCOMMODATIONS.slice(0, 2).map((item, index) => (
            <motion.div key={item.id} variants={fadeIn} className="flex justify-center">
              <AccommodationCard item={item} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationsSection;
