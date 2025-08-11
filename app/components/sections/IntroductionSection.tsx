import React, { useRef } from 'react'
import { COLORS } from '../../theme/colors';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ANIMATIONS } from '../../data/Animations';
import { ChevronRight } from 'lucide-react';

// Component for Introduction Section
const IntroductionSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });


  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
    return (
      <section className="py-32" ref={sectionRef}>
        <div className="container mx-auto px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center md:flex-row">
            <motion.div
            className="mb-12 w-full md:mb-0 md:w-1/2 md:pr-16"
            style={{ y: textY }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATIONS.fadeIn}
          >
             <motion.span
              className="mb-6 block text-sm tracking-widest uppercase font-light opacity-80"
              style={{ color: COLORS.primary }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                OUR SANCTUARY
              </motion.span>
              <motion.h2
              className="mb-8 text-4xl leading-tight font-light"
              style={{ color: COLORS.primary }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              
                Perched on the dramatic CLIFF of Varkala, where the Arabian Sea
                meets the sky
              </motion.h2>
               <motion.p 
              className="mb-8 text-lg font-light leading-relaxed" 
              style={{ color: COLORS.muted }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
                AYADA CLIFF is a sanctuary of tranquility, offering uninterrupted
                ocean views from every corner of our luxury villa. Experience the
                perfect blend of modern comfort and traditional Kerala architecture.
              </motion.p>
  
            </motion.div>
  
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATIONS.fadeIn}
            >
            <motion.div
                ref={imageRef}
                className="relative aspect-[4/5] overflow-hidden"
                style={{ y: imageY }}
              >
                {/* Subtle shadow behind image */}
                <div 
                  className="absolute inset-0 translate-x-4 translate-y-4 -z-10"
                  style={{ backgroundColor: COLORS.secondary }}
                />
                
                <motion.img
                src="/images/night-image.jpg"
                  alt="Villa exterior overlooking the Arabian Sea"
                  className="h-full w-full object-cover transition-transform duration-700"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Very subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

export default IntroductionSection