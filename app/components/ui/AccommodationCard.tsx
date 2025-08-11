import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Accommodation } from "../../types/types";
import { COLORS } from "../../theme/colors";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.25, 0.1, 0.25, 1] 
    },
  },
};

const AccommodationCard: React.FC<{ item: Accommodation; index: number }> = ({
  item,
  index,
}) => {
  return (
    <motion.div
      className="group max-w-md mx-auto w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      transition={{ delay: index * 0.2 }}
    >
      {/* Image Container with Enhanced Hover Effects */}
      <div className="relative mb-6 overflow-hidden rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-all duration-700 group-hover:opacity-100 z-20" />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 z-10"
        />
        
        {/* Next.js Image with optimizations */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-1000 ease-out group-hover:scale-110"
            priority={index === 0} // Prioritize first image
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Subtle corner accent */}
        <div 
          className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 opacity-0 transition-all duration-500 group-hover:opacity-30"
          style={{ borderColor: COLORS.primary }}
        />
      </div>

      {/* Content Section */}
      <div className="px-2">
        <motion.h3
          className="mb-3 text-xl md:text-2xl font-light tracking-wide leading-tight"
          style={{ color: COLORS.primary }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
          {item.name}
        </motion.h3>
        
        <p 
          className="mb-6 text-sm md:text-base font-light leading-relaxed line-clamp-3" 
          style={{ color: COLORS.primary, opacity: 0.8 }}
        >
          {item.description}
        </p>

        {/* Enhanced CTA Button */}
        <Link href={`/accommodations/${item.id}`} className="group/link inline-block">
          <motion.div
            className="relative overflow-hidden"
            whileHover="hover"
            initial="initial"
          >
            <motion.button
              className="relative border-b-2 pb-2 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-500 group-hover/link:tracking-[0.3em]"
              style={{
                color: COLORS.primary,
                borderColor: COLORS.primary,
              }}
              variants={{
                initial: { y: 0 },
                hover: { y: -2 }
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative z-10">Discover More</span>
              
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-current"
                variants={{
                  initial: { width: "0%" },
                  hover: { width: "100%" }
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </motion.button>
            
            {/* Subtle arrow indicator */}
            <motion.span
              className="ml-2 text-xs opacity-0 transition-all duration-300 group-hover/link:opacity-60 group-hover/link:translate-x-1"
              style={{ color: COLORS.primary }}
              variants={{
                initial: { x: -10, opacity: 0 },
                hover: { x: 0, opacity: 0.6 }
              }}
            >
              →
            </motion.span>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default AccommodationCard;