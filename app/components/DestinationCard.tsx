import React from "react";
import { Destination } from "../types/types";
import { motion } from "framer-motion";
import { COLORS } from "../theme/colors";
import { ANIMATIONS } from "../data/Animations";

const DestinationCard: React.FC<{
  destination: Destination;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ destination, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden transition-all duration-700 ease-in-out ${
        isSelected ? "w-[600px]" : "w-[200px]"
      } h-[600px] ${
        destination.id % 2 === 0 ? "mt-10" : "mt-0"
      } transition-all delay-75 duration-1500`}
      variants={ANIMATIONS.fadeIn}
      onClick={onSelect}
      whileHover={{
        scale: isSelected ? 1 : 1.02,
      }}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent" />

      <img
        src={destination.image}
        alt={destination.name}
        className="h-full w-full object-cover transition-all duration-700"
      />

      <div className="absolute right-0 bottom-0 left-0 z-20 transition-all duration-500">
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: "auto" }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute bottom-0 h-[40%] overflow-hidden bg-gradient-to-t from-black/80 to-transparent p-6"
          >
            <h3
              className="mb-2 text-2xl font-bold"
              style={{ color: COLORS.secondary }}
            >
              {destination.name}
            </h3>
            <p className="mb-6 text-lg" style={{ color: COLORS.secondary }}>
              {destination.description}
            </p>
          </motion.div>
        )}
      </div>

      {!isSelected && (
        <motion.button
          className="absolute bottom-6 left-6 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all"
          style={{
            backgroundColor: `${COLORS.secondary}20`,
            color: COLORS.secondary,
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: `${COLORS.secondary}40`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
};

export default DestinationCard;
