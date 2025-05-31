import React from 'react';
import { COLORS } from '../../theme/colors';
import { motion } from "framer-motion";
import { ANIMATIONS } from '../../data/Animations';
import { DESTINATIONS } from '../../data/Destinations';
import DestinationCard from '../ui/DestinationCard';
import { useRouter } from 'next/navigation';

interface DestinationsSectionProps {
  selectedFeature: number;
  setSelectedFeature: (id: number) => void;
}

const DestinationsSection: React.FC<DestinationsSectionProps> = ({ selectedFeature, setSelectedFeature }) => {

  const router = useRouter();
  return (
    <motion.section
      className="py-20"
      id='destinations'
      style={{ background: COLORS.secondary }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={ANIMATIONS.staggerContainer}
    >
      <div className="container mx-auto px-6">
        {/* Refined section header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATIONS.fadeIn}
        >
          {/* Decorative elements */}
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-10 bg-opacity-40" style={{ backgroundColor: COLORS.primary }}></div>
            <span className="mx-4 text-xs tracking-widest uppercase font-light" style={{ color: COLORS.primary }}>
              Explore
            </span>
            <div className="h-px w-10 bg-opacity-40" style={{ backgroundColor: COLORS.primary }}></div>
          </div>
          
          <h2 className="mb-5 text-2xl md:text-3xl font-light tracking-wide josefin-sans-medium" style={{ color: COLORS.primary }}>
            Discover Extraordinary Destinations
          </h2>
          
          <p className="mx-auto max-w-2xl text-sm md:text-base font-light" style={{ color: COLORS.primary, opacity: 0.8 }}>
            Immerse yourself in the wonders of Varkala and its surrounding treasures
          </p>
        </motion.div>
        
        {/* Destinations grid with improved spacing */}
        <div className="flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-5 md:gap-6">
          {DESTINATIONS.map((destination) => (
            <DestinationCard 
              key={destination.id}
              destination={destination}
              isSelected={selectedFeature === destination.id}
              onSelect={() =>selectedFeature === destination.id? router.push(destination.url): setSelectedFeature(destination.id)}
            />
          ))}
        </div>
        
        {/* Decorative bottom element */}
        <div className="mt-20 h-px w-16 mx-auto opacity-30" style={{ backgroundColor: COLORS.primary }}></div>
      </div>
    </motion.section>
  );
};
  
export default DestinationsSection;