import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CAROUSELITEMS } from "../../data/CarouselItems";
import { COLORS } from "../../theme/colors";
import Image from "next/image";

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "90%" : "-90%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-80%" : "90%",
    opacity: 0.0,
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
      duration: 5,
      ease: [0.6, 0.1, 0.05, 0.95],
    },
  }),
};

export default function CarouselSection() {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);

  interface WrapFn {
    (min: number, max: number, value: number): number;
  }

  const wrap: WrapFn = (min, max, value) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
  };

  const activeImageIndex = wrap(0, CAROUSELITEMS.length, imageCount);
  const activeImage = CAROUSELITEMS[activeImageIndex];

  interface SwipeToImageFn {
    (swipeDirection: number): void;
  }

  const swipeToImage: SwipeToImageFn = (swipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
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
      <button
        key={index}
        onClick={() =>
          setImageCount([index, index > activeImageIndex ? 1 : -1])
        }
        className={`h-[1px] w-8 transition-all duration-500 hover:opacity-80 ${index === activeImageIndex ? "h-[2px] opacity-100" : "opacity-40"
          }`}
        style={{ backgroundColor: COLORS.primary }}
        aria-label={`Go to slide ${index + 1}`}
      />
    ));
  };

  return (
    <section
      style={{ backgroundColor: COLORS.secondary }}
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-20"
    >
      {/* Header */}
      <div className="mb-16 max-w-2xl text-center">
        <div className="mb-6 flex items-center justify-center">
          <div
            className="h-px w-12 opacity-40"
            style={{ backgroundColor: COLORS.primary }}
          />
          <span
            className="mx-4 text-sm font-light tracking-widest uppercase"
            style={{ color: COLORS.primary }}
          >
            Experiences
          </span>
          <div
            className="h-px w-12 opacity-40"
            style={{ backgroundColor: COLORS.primary }}
          />
        </div>

        <h2
          className="mb-6 text-3xl font-light tracking-wide md:text-4xl"
          style={{ color: COLORS.primary }}
        >
          Take Your Time Out With Us
        </h2>

        <p
          className="text-base leading-relaxed font-light opacity-80 md:text-lg"
          style={{ color: COLORS.primary }}
        >
          Immerse yourself in the wonders of Varkala and its surrounding
          treasures
        </p>
      </div>

      {/* Carousel */}
      <div className="relative h-[500px] w-full max-w-5xl">
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
            className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
          >
            <div className="relative h-full w-full max-w-[70vw]">
              {/* Main Image */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={activeImage.imageSrc}
                  alt="Background"
                  fill
                  priority
                  className="object-cover"
                />
                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Description Card */}
              <motion.div
                key={`desc-${imageCount}`}
                custom={direction}
                variants={descriptionVariants}
                initial="incoming"
                animate="active"
                exit="exit"
                className={`absolute ${activeImage.id % 2 === 0 ? "-top-6" : "-bottom-6"
                  } -right-6 max-w-sm`}
              >
                <div
                  className="rounded-xl border p-6 shadow-xl backdrop-blur-sm"
                  style={{
                    backgroundColor: `${COLORS.light}F5`,
                    borderColor: `${COLORS.primary}20`,
                  }}
                >
                  <h3
                    className="mb-3 text-xl font-light"
                    style={{ color: COLORS.primary }}
                  >
                    {activeImage.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed font-light"
                    style={{ color: COLORS.muted }}
                  >
                    {activeImage.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-12 flex flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-8">
          <motion.button
            onClick={() => swipeToImage(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wider uppercase transition-all duration-300 hover:opacity-70"
            style={{ color: COLORS.primary }}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={18} />
            Prev
          </motion.button>

          {/* Progress Dots */}
          <div className="flex items-center gap-3">{renderProgressDots()}</div>

          <motion.button
            onClick={() => swipeToImage(1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wider uppercase transition-all duration-300 hover:opacity-70"
            style={{ color: COLORS.primary }}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
          >
            Next
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
