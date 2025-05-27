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
      className="group pb-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.2, delay: index * 0.3, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      <div className="relative mb-8 overflow-hidden rounded-sm">
        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
        <img
          src={`/placeholder/${item.image}`}
          alt={item.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div 
          className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
        />
      </div>
      <h3
        className="mb-4 text-xl font-light tracking-wide"
        style={{ color: COLORS.primary }}
      >
        {item.name}
      </h3>
      <p 
        className="mb-4 text-sm font-light leading-relaxed" 
        style={{ color: COLORS.primary, opacity: 0.85 }}
      >
        {item.description}
      </p>
      <Link href={`/accommodations/${item.id}`}>
        <button
          className="border-b pb-1 text-xs tracking-widest uppercase transition-all duration-300 group-hover:border-opacity-100"
          style={{
            color: COLORS.primary,
            borderColor: COLORS.primary,
          }}
        >
          Discover
        </button>
      </Link>
    </motion.div>
  );
};

export default AccommodationCard;