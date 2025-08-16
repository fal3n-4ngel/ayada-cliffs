import React from "react";
import { COLORS } from "../../theme/colors";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { experiences } from "@/app/data/Experiences";

const ExperienceSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 20 },
    },
  };

  const slideIn = (direction: string) => ({
    hidden: { opacity: 0, x: direction === "left" ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50, damping: 18, delay: 0.1 },
    },
  });

  return (
    <section
      className="relative py-24 md:py-32"
      id="experiences"
      style={{
        background: "linear-gradient(to bottom, #fafafa 0%, #fff 100%)",
      }}
    >
      <div className="container mx-auto px-6 md:px-8">
        {/* Heading */}
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="mb-6 flex items-center justify-center">
            <div
              className="h-px w-12"
              style={{ backgroundColor: COLORS.primary, opacity: 0.15 }}
            />
            <span
              className="mx-6 text-xs font-light tracking-[0.25em] uppercase"
              style={{ color: COLORS.primary }}
            >
              Curated Moments
            </span>
            <div
              className="h-px w-12"
              style={{ backgroundColor: COLORS.primary, opacity: 0.15 }}
            />
          </div>

          <h2
            className="mb-6 text-3xl font-light tracking-wide md:text-4xl"
            style={{ color: COLORS.primary }}
          >
            Signature Experiences
          </h2>

          <p
            className="mx-auto max-w-xl text-sm leading-relaxed font-light md:text-base"
            style={{ color: COLORS.primary, opacity: 0.7 }}
          >
            Discover the art of refined leisure through our thoughtfully crafted
            experiences, each designed to create lasting memories in serene
            luxury.
          </p>
        </motion.div>

        {/* Experiences */}
        <div className="space-y-32 md:space-y-40">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`flex flex-col items-center gap-12 md:gap-16 ${
                experience.position === "left"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
              }`}
            >
              {/* Image */}
              <motion.div
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl will-change-transform">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    priority={index === 0} // only first image eager load
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideIn(experience.position)}
              >
                <span
                  className="mb-2 block text-xs font-light tracking-[0.2em]"
                  style={{ color: COLORS.primary, opacity: 0.6 }}
                >
                  0{index + 1}
                </span>
                <h3
                  className="mb-4 text-2xl font-light tracking-wide"
                  style={{ color: COLORS.primary }}
                >
                  {experience.title}
                </h3>
                <p
                  className="mb-8 leading-relaxed font-light"
                  style={{ color: COLORS.primary, opacity: 0.8 }}
                >
                  {experience.description}
                </p>

                <Link href="/gallery">
                  <button
                    className="border-b pb-1 text-xs tracking-widest uppercase transition-colors duration-300 hover:opacity-80"
                    style={{
                      color: COLORS.primary,
                      borderColor: COLORS.primary,
                    }}
                  >
                    Discover More
                  </button>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-28 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <Link href="/gallery">
            <button
              className="border px-8 py-3 text-xs tracking-widest uppercase transition-colors duration-300 hover:bg-black/5 md:px-10 md:py-4"
              style={{
                color: COLORS.primary,
                borderColor: COLORS.primary,
                backgroundColor: "rgba(255,255,255,0.5)",
              }}
            >
              View All Experiences
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
