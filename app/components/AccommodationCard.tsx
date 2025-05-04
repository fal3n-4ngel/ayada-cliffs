import React from "react";
import { Accommodation } from "../types/types";
import { COLORS } from "../theme/colors";
import Link from "next/link";
import { motion } from "framer-motion";

const AccommodationCard: React.FC<{ item: Accommodation; index: number }> = ({
  item,
  index,
}) => {
  return (
    <motion.div
      className="group"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay: index * 0.2 },
        },
      }}
    >
      <div className="relative mb-6 overflow-hidden">
        <img
          src={`/placeholder/${item.image}`}
          alt={item.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3
        className="mb-4 text-2xl font-light"
        style={{ color: COLORS.primary }}
      >
        {item.name}
      </h3>
      <p className="mb-6" style={{ color: `${COLORS.primary}DD` }}>
        {item.description}
      </p>
      <Link href={`/accommodations/${item.id}`}>
        <button
          className="border-b pb-1 text-sm tracking-widest uppercase transition-all duration-300"
          style={{
            color: COLORS.primary,
            borderColor: `${COLORS.primary}40`,
          }}
        >
          Explore
        </button>
      </Link>
    </motion.div>
  );
};

export default AccommodationCard;
