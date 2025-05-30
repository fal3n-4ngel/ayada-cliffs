import React from "react";
import { COLORS } from "../theme/colors";
import { motion } from "framer-motion";
import Link from "next/link";

const ExperienceSection = () => {
  const experiences = [
    {
      id: "infinity-pool",
      title: "Cliffside Infinity Pool",
      description:
        "Float between sky and sea in our signature infinity pool, where the boundaries between water and horizon dissolve into an endless canvas of blue.",
      image: "/placeholder/infinity-pool.avif",
      position: "right",
    },
    {
      id: "private-dining",
      title: "Private Sunset Dining",
      description:
        "Experience intimate culinary moments under the stars, as our chefs create bespoke dining experiences on your private terrace overlooking the Arabian Sea.",
      image: "/placeholder/infinity-pool.avif",
      position: "left",
    },
    {
      id: "ayurvedic-spa",
      title: "Ayurvedic Wellness Rituals",
      description:
        "Surrender to ancient healing practices in our tranquil spa sanctuary, where time-honored Ayurvedic treatments restore harmony to body and mind.",
      image: "/placeholder/infinity-pool.avif",
      position: "right",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const slideIn = (direction: string) => ({
    hidden: {
      opacity: 0,
      x: direction === "left" ? -30 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      },
    },
  });

  return (
    <section
      className="relative py-32"
      style={{
        backgroundColor: "white",
        backgroundImage:
          "linear-gradient(to bottom, rgba(250,250,250,0.8) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="container mx-auto px-8">
        <motion.div
          className="mb-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="mb-6 flex items-center justify-center">
            <div
              className="h-px w-12"
              style={{ backgroundColor: COLORS.primary, opacity: 0.15 }}
            ></div>
            <span
              className="mx-6 text-xs font-extralight tracking-widest uppercase"
              style={{ color: COLORS.primary, letterSpacing: "0.25em" }}
            >
              Curated Moments
            </span>
            <div
              className="h-px w-12"
              style={{ backgroundColor: COLORS.primary, opacity: 0.15 }}
            ></div>
          </div>

          <h2
            className="mb-6 text-3xl font-light tracking-wider md:text-4xl"
            style={{ color: COLORS.primary }}
          >
            Signature Experiences
          </h2>

          <p
            className="mx-auto max-w-xl text-sm leading-relaxed font-light md:text-base"
            style={{ color: COLORS.primary, opacity: 0.7 }}
          >
            Discover the art of refined leisure through our collection of
            thoughtfully crafted experiences, each designed to create lasting
            memories in serene luxury
          </p>
        </motion.div>

        <div className="space-y-40">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`flex flex-col items-center ${experience.position === "left" ? "md:flex-row-reverse" : "md:flex-row"} gap-16`}
            >
              <motion.div
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 z-10 shadow-inner" />
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  />
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={slideIn(experience.position)}
              >
                <div className="relative">
                  <div
                    className="absolute top-0 -left-5 h-20 w-px"
                    style={{ backgroundColor: COLORS.primary, opacity: 0.1 }}
                  />
                  <span
                    className="mb-2 block text-xs font-light tracking-widest"
                    style={{
                      color: COLORS.primary,
                      opacity: 0.6,
                      letterSpacing: "0.2em",
                    }}
                  >
                    0{index + 1}
                  </span>
                  <h3
                    className="mb-6 text-2xl font-light tracking-wide"
                    style={{ color: COLORS.primary }}
                  >
                    {experience.title}
                  </h3>
                  <p
                    className="mb-10 pr-6 leading-relaxed font-light"
                    style={{ color: COLORS.primary, opacity: 0.8 }}
                  >
                    {experience.description}
                  </p>

                  <Link href={`/experiences/${experience.id}`}>
                    <button
                      className="hover:border-opacity-100 border-b pb-1 text-xs tracking-widest uppercase transition-all duration-300"
                      style={{
                        color: COLORS.primary,
                        borderColor: COLORS.primary,
                      }}
                    >
                      Discover More
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-32 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <Link href="/experiences">
            <button
              className="hover:bg-opacity-5 border px-10 py-4 text-xs tracking-widest uppercase transition-all duration-500"
              style={{
                color: COLORS.primary,
                borderColor: COLORS.primary,

                backgroundColor: "rgba(255,255,255,0.5)",
              }}
            >
              View All Experiences
            </button>
          </Link>

          <div className="mt-24 flex justify-center">
            <div
              className="h-px w-24"
              style={{ backgroundColor: COLORS.primary, opacity: 0.1 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
