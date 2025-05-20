"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.img          className="text-4xl md:text-5xl tracking-widest font-extralight  text-[#84321F] w-40 md:w-[12vw] mb-5"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          src="/images/logo/ayadaclifflogo.png"
          alt="AYADA CLIFF"
        

        >
          
        </motion.img>
        
        <motion.div 
          className="h-px w-16 bg-[#84321F] mx-auto "
          initial={{ width: 0 }}
          animate={{ width: isVisible ? 64 : 0 }}
          transition={{ duration: 2, delay: 0.6 }}
        />
        
      
      </motion.div>
    </div>
  );
}