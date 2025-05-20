import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "../theme/colors";
import { ANIMATIONS } from "../data/Animations";
import { Plus } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onSelect: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden rounded-sm transition-all duration-700 ease-in-out 
        ${isSelected 
          ? "w-full md:w-[35vw]" 
          : "w-full md:w-[12vw]"
        } 
        h-[300px] md:h-[450px] lg:h-[600px]
        ${destination.id % 2 === 0 ? "md:mt-10" : "mt-0"}
        group`}
      variants={ANIMATIONS.fadeIn}
      onClick={onSelect}
      whileHover={{
        scale: isSelected ? 1 : 1.02,
      }}
    >
      {/* Subtle image overlay */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-700 ${
          isSelected 
            ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent" 
            : "bg-gradient-to-t from-black/70 to-transparent/20"
        }`} 
      />
      
      {/* Image with hover effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className={`h-full w-full object-cover transition-all duration-1000 ${
            isSelected ? "scale-105" : "group-hover:scale-110"
          }`}
        />
      </div>
      
      {/* Content overlay for selected state */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {isSelected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-6 md:p-8 lg:p-10"
          >
            {/* Thin decorative line */}
            <div 
              className="mb-4 h-px w-10 opacity-80"
              style={{ backgroundColor: COLORS.secondary }}
            />
            
            {/* Title with elegant typography */}
            <h3
              className="mb-3 text-xl md:text-2xl font-light tracking-wide josefin-sans-medium"
              style={{ color: COLORS.secondary }}
            >
              {destination.name}
            </h3>
            
            {/* Description with improved styling */}
            <p 
              className="mb-4 text-sm md:text-base font-light max-w-md opacity-90 leading-relaxed"
              style={{ color: COLORS.secondary }}
            >
              {destination.description}
            </p>
            
            {/* Subtle "Discover" link */}
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-all duration-300 group/link hover:opacity-80"
              style={{ color: COLORS.secondary }}
            >
              <span>Discover</span>
              <div className="h-px w-6 opacity-70 group-hover/link:w-10 transition-all duration-500" style={{ backgroundColor: COLORS.secondary }} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-8"
          >
            {/* Minimalist label for non-selected state */}
            <h4
              className="mx-3 text-xs md:text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-0 md:-rotate-90 md:origin-bottom-left"
              style={{ color: COLORS.secondary }}
            >
              {destination.name}
            </h4>
          </motion.div>
        )}
      </div>
      
      {/* Elegant expand button for non-selected state */}
      {!isSelected && (
        <motion.button
          className="absolute bottom-6 right-6 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            backgroundColor: `${COLORS.secondary}40`,
            color: COLORS.secondary,
            border: `1px solid ${COLORS.secondary}80`
          }}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} strokeWidth={1} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default DestinationCard;