import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { COLORS } from "../theme/colors";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { CAROUSELITEMS } from "../data/CarouselItems";

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "90%" : "-90%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-90%" : "90%",
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 2.5,
  ease: [0.56, 0.03, 0.12, 1.04],
};

const descriptionVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "150%" : "-150%",
    y: direction > 0 ? "20px" : "-20px",
    opacity: 0,
    transition: { duration: 2 },
  }),
  active: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-150%" : "150%",
    y: direction > 0 ? "-20px" : "20px",
    opacity: 0,
    transition: {
      duration: 2,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  }),
};
export default function Carousel() {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);

  const wrap = (min: number, max: number, value: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
  };

  const activeImageIndex = wrap(0, CAROUSELITEMS.length, imageCount);
  const activeImage = CAROUSELITEMS[activeImageIndex];

  const swipeToImage = (swipeDirection: number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: PanInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;

    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const renderProgressDots = () => {
    return CAROUSELITEMS.map((_, index) => (
      <div
        key={index}
        onClick={() =>
          setImageCount([index, index > activeImageIndex ? 1 : -1])
        }
        className={`h-[1px] w-6 cursor-pointer transition-all duration-300 ${
          index === activeImageIndex
            ? `bg-[${COLORS.primary}] h-[2px]`
            : `bg-[${COLORS.primary}] hover:bg-white/70`
        }`}
      />
    ));
  };

  return (
    <div
      style={{
        backgroundColor: `${COLORS.secondary}`,
      }}
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12"
    >
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-4">
          <div className="h-px w-10 bg-opacity-40" style={{ backgroundColor: COLORS.primary }}></div>
          <span className="mx-4 text-xs tracking-widest uppercase font-light" style={{ color: COLORS.primary }}>
            Experiences
          </span>
          <div className="h-px w-10 bg-opacity-40" style={{ backgroundColor: COLORS.primary }}></div>
        </div>
        
        <h2 className="mb-5 text-2xl md:text-3xl font-light tracking-wide josefin-sans-medium" style={{ color: COLORS.primary }}>
          Take Your Time Out With Us
        </h2>
        
        <p className="mb-0 mx-auto max-w-2xl text-sm md:text-base font-light" style={{ color: COLORS.primary, opacity: 0.8 }}>
          Immerse yourself in the wonders of Varkala and its surrounding treasures
        </p>
      </div>
      <div className="relative h-[500px] w-full rounded-xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={imageCount}
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
            className="absolute inset-0 z-10 flex cursor-grab items-center justify-center active:cursor-grabbing"
            style={{ color: COLORS.primary }}
          >
            <div className="relative h-full w-full max-w-[70vw] rounded-xl">
              <div
                className="h-full w-full  rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${activeImage.imageSrc})` }}
              />

              <motion.div
                key={`desc-${imageCount}`}
                custom={direction}
                variants={descriptionVariants}
                initial="incoming"
                animate="active"
                exit="exit"
                className={`absolute ${activeImage.id % 2 === 0 ? "-top-4" : "-bottom-4"} -right-4 max-w-xs rounded-sm border-2 border-[${COLORS.primary}] p-2`}
              >
                <div className="bg-white/90 p-15 shadow-lg backdrop-blur-sm">
                  <h2 className="mb-2 text-2xl font-bold">
                    {activeImage.title}
                  </h2>
                  <p className="text-sm">{activeImage.description}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="z-20 mt-8 flex flex-col items-center gap-6 text-xs">
        <div
          className="flex items-center justify-center gap-4"
          style={{ color: COLORS.primary }}
        >
          <button
            onClick={() => swipeToImage(-1)}
            className="flex items-center rounded-full px-6 py-2 font-semibold duration-500 hover:scale-95 hover:text-[##84321F70]"
          >
            <ChevronLeftIcon></ChevronLeftIcon>
            PREV
          </button>
          <div className="flex items-center">{renderProgressDots()}</div>
          <button
            onClick={() => swipeToImage(1)}
            className="flex items-center rounded-full px-6 py-2 font-semibold duration-500 hover:scale-95 hover:text-[##84321F70]"
          >
            NEXT
            <ChevronRightIcon></ChevronRightIcon>
          </button>
        </div>
      </div>
    </div>
  );
}
