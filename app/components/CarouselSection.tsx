import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { COLORS } from "../theme/colors";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { CAROUSELITEMS } from "../data/CarouselItems";

const sliderVariants = {
    incoming: (direction: number) => ({
        x: direction > 0 ? "90%" : "-90%",
        scale: 1.2,
        opacity: 0
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: (direction: number) => ({
        x: direction > 0 ? "-90%" : "90%",
        opacity: 0.2
    })
};

const sliderTransition = {
    duration: 2.5,
    ease: [0.56, 0.03, 0.12, 1.04]
};

const descriptionVariants = {
    incoming: (direction: number) => ({
        x: direction > 0 ? "150%" : "-150%",
        y: direction > 0 ? "20px" : "-20px",
        opacity: 0,
        transition: { duration: 2 }
    }),
    active: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 2,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    exit: (direction: number) => ({
        x: direction > 0 ? "-150%" : "150%",
        y: direction > 0 ? "-20px" : "20px",
        opacity: 0,
        transition: {
            duration: 2,
            ease: [0.6, 0.01, 0.05, 0.95]
        }
    })
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
                onClick={() => setImageCount([index, index > activeImageIndex ? 1 : -1])}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${index === activeImageIndex
                        ? `bg-[${COLORS.primary}] w-6`
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
            className="w-full min-h-screen py-12 px-4 flex flex-col items-center justify-center">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-4xl font-light" style={{ color: COLORS.primary }}>
                TAKE YOUR TIME OUT WITH US
            </h2>
            <p className="mb-10 mx-auto max-w-3xl text-base md:text-lg" style={{ color: `${COLORS.primary}DD` }}>
                Immerse yourself in the wonders of Varkala and its surrounding treasures
            </p>
            <div className="w-full relative h-[500px] rounded-xl ">
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
                        className="absolute inset-0 flex items-center justify-center z-10 cursor-grab active:cursor-grabbing"
                        style={{ color: COLORS.primary }}
                    >
                        <div className="w-full max-w-5xl h-full relative rounded-xl">
                            <div
                                className="scale-80 w-full h-full bg-cover bg-center rounded-xl"
                                style={{ backgroundImage: `url(${activeImage.imageSrc})` }}
                            />

                            <motion.div
                                key={`desc-${imageCount}`}
                                custom={direction}
                                variants={descriptionVariants}
                                initial="incoming"
                                animate="active"
                                exit="exit"
                                className={`absolute ${activeImage.id % 2 === 0 ? "-top-4" : "-bottom-4"} -right-4 max-w-xs border-2 rounded-sm border-[${COLORS.primary}] p-2`}
                            >
                                <div className="bg-white/90 backdrop-blur-sm p-15 shadow-lg">
                                    <h2 className="text-2xl font-bold mb-2">{activeImage.title}</h2>
                                    <p className="text-sm">{activeImage.description}</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col items-center gap-6 z-20">

                <div className="flex items-center justify-center gap-4"
                    style={{ color: COLORS.primary }}
                >
                    <button
                        onClick={() => swipeToImage(-1)}
                        className="px-6 py-2  text-sm font-semibold rounded-full hover:bg-white/30 transition-colors flex items-center"
                    >
                        <ChevronLeftIcon></ChevronLeftIcon>
                        PREV
                    </button>
                    <div className="flex items-center gap-2">
                        {renderProgressDots()}
                    </div>
                    <button
                        onClick={() => swipeToImage(1)}
                        className="px-6 py-2  text-sm font-semibold rounded-full hover:bg-white/30 transition-colors flex items-center"
                    >
                        NEXT
                        <ChevronRightIcon></ChevronRightIcon>
                    </button>
                </div>
            </div>
        </div>
    );
}