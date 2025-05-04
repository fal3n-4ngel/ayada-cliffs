import React from "react";
import { COLORS } from "../theme/colors";
import { motion } from "framer-motion";
import { ANIMATIONS } from "../data/Animations";
import { ACCOMMODATIONS } from "../data/Accomodations";
import AccommodationCard from "./AccommodationCard";

const AccommodationsSection = () => {
  return (
    <section
      className="relative py-32"
      style={{ backgroundColor: COLORS.secondary }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATIONS.fadeIn}
        >
          <span
            className="mb-4 block text-sm tracking-widest uppercase"
            style={{ color: COLORS.primary }}
          >
            A PRIVATE PARADISE
          </span>
          <h2
            className="mb-6 text-4xl font-light"
            style={{ color: COLORS.primary }}
          >
            Luxury Living on the CLIFF Edge
          </h2>
          <p
            className="mx-auto max-w-3xl text-lg"
            style={{ color: `${COLORS.primary}DD` }}
          >
            Retreat to a world of unmatched elegance and comfort with our
            exquisite accommodations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {ACCOMMODATIONS.map((item, index) => (
            <AccommodationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default AccommodationsSection;
