import React from 'react'
import { COLORS } from '../theme/colors';
import { motion } from "framer-motion";
import { ANIMATIONS } from '../data/Animations';
import { DESTINATIONS } from '../data/Destinations';
import DestinationCard from './DestinationCard';

const DestinationsSection: React.FC<{
    selectedFeature: number;
    setSelectedFeature: React.Dispatch<React.SetStateAction<number>>;
  }> = ({ selectedFeature, setSelectedFeature }) => {
    return (
      <motion.section
        className="min-h-full py-16"
        style={{ background: COLORS.secondary }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={ANIMATIONS.staggerContainer}
      >
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATIONS.fadeIn}
          >
            <span className="mb-4 block text-sm tracking-widest uppercase" style={{ color: COLORS.primary }}>
              EXPLORE
            </span>
            <h2 className="mb-6 text-4xl font-light" style={{ color: COLORS.primary }}>
              Discover Extraordinary Destinations
            </h2>
            <p className="mx-auto max-w-3xl text-lg" style={{ color: `${COLORS.primary}DD` }}>
              Immerse yourself in the wonders of Varkala and its surrounding treasures
            </p>
          </motion.div>
  
          <div className="flex flex-wrap items-stretch justify-center gap-4">
            {DESTINATIONS.map((destination) => (
              <DestinationCard 
                key={destination.id}
                destination={destination}
                isSelected={selectedFeature === destination.id}
                onSelect={() => setSelectedFeature(
                  selectedFeature === destination.id
                    ? (destination.id + 1) % DESTINATIONS.length
                    : destination.id
                )}
              />
            ))}
          </div>
        </div>
      </motion.section>
    );
  };
  

  
  


export default DestinationsSection