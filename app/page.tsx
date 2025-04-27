"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

const AyadaCliffsPage: React.FC = () => {
  const heroControls = useAnimation();
  const featureControls = useAnimation();
  const [selectedFeature, setSelectedFeature] = useState<number | null>(0);

  const destinations = [
    {
      id: 0,
      name: "Varkala Cliff",
      image: "/varkala-cliff.jpg",
      description:
        "Experience breathtaking views from dramatic red cliffs overlooking the Arabian Sea, lined with shops and cafes offering the perfect sunset viewpoint.",
    },
    {
      id: 1,
      name: "Papanasam Beach",
      image: "/papanasam-beach.jpg", // Fixed missing leading slash
      description:
        "Known as Varkala Beach, this pristine shore is believed to have holy waters that wash away sins, perfect for swimming and surrounded by natural beauty.",
    },
    {
      id: 2,
      name: "Janardanaswamy Temple",
      image: "/janardanaswamy-temple.jpg", // Fixed missing leading slash
      description:
        "Ancient 2,000-year-old temple dedicated to Lord Vishnu, featuring traditional Kerala architecture and peaceful spiritual surroundings.",
    },
    {
      id: 3,
      name: "Kappil Beach & Lake",
      image: "/kappil-lake.jpg", // Fixed missing leading slash
      description:
        "Where backwaters meet the sea, creating a stunning landscape of palm-fringed shores, perfect for boating and witnessing the merging of ecosystems.",
    },
  ];

  // Animation variants
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const navHover = {
    hover: {
      color: "#000",
      borderBottom: "1px solid #000",
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        heroControls.start({ scale: 1.05 });
      } else {
        heroControls.start({ scale: 1 });
      }

      if (window.scrollY > 500) {
        featureControls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroControls, featureControls]);

  return (
    <div className="min-h-screen font-serif text-black bg-white">
      {/* Header with subtle animation */}
      <motion.header
        className="bg-white border-b border-gray-200 fixed w-full z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <motion.div
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl font-bold mr-2">AYADA CLIFFS</span>
              </motion.div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {[
              "THE VILLA",
              "EXPERIENCES",
              "AMENITIES",
              "GALLERY",
              "VARKALA",
              "BOOK NOW",
            ].map((item, index) => (
              <motion.div key={index} variants={navHover} whileHover="hover">
                <Link
                  href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-gray-800"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Hero Section with video background */}
      <section className="relative h-screen">
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Video background */}
          <video
            className="object-cover w-full h-full"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/villa-aerial.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img
              src="/images/villa-aerial.jpg"
              alt="AYADA CLIFFS"
              className="object-cover w-full h-full"
            />
          </video>
          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 mb-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.span
                className="block text-gray-200 uppercase tracking-wider text-sm mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                A sanctuary of tranquility
              </motion.span>
              <motion.h1
                className="text-5xl md:text-6xl font-light mb-6 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              >
                AYADA CLIFFS
              </motion.h1>
              <motion.p
                className="text-xl font-light text-gray-100 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.8 }}
              >
                Luxury Ocean View Villa in Varkala, Kerala
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.1 }}
              >
                <Link href="/discover">
                  <motion.button
                    className="bg-transparent text-white border border-white px-8 py-3 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Discover More
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome Section with scroll animations */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <motion.div
              className="w-full md:w-1/2 mb-8 md:mb-0"
              variants={fadeInUp}
            >
              <div className="pr-0 md:pr-12 max-w-lg mx-auto md:mx-0">
                <motion.h2
                  className="text-4xl font-light mb-6"
                  variants={fadeInUp}
                >
                  Perched on the dramatic cliffs of Varkala, where the Arabian
                  Sea meets the sky.
                </motion.h2>
                <motion.p className="text-gray-600 mb-6" variants={fadeInUp}>
                  AYADA Cliffs is a sanctuary of tranquility, offering
                  uninterrupted ocean views from every corner of our luxury
                  villa. Experience the perfect blend of modern comfort and
                  traditional Kerala architecture.
                </motion.p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/about"
                    className="text-sm border-b border-gray-400 pb-1 hover:border-gray-800"
                  >
                    Discover our story
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-80 md:h-96">
                {/* Using placeholder API instead of empty div */}
                <img
                  src="/api/placeholder/800/600"
                  alt="Villa exterior"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Villa Features with staggered animations */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <motion.span
                className="text-sm text-gray-600 uppercase mb-2 block"
                variants={fadeInUp}
              >
                A PRIVATE PARADISE
              </motion.span>
              <motion.h2 className="text-3xl font-light" variants={fadeInUp}>
                Luxury Living on the Cliff Edge
              </motion.h2>
              <motion.div
                className="mt-4"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <Link
                  href="/villa-details"
                  className="text-sm border-b border-gray-400 pb-1 hover:border-gray-800"
                >
                  Explore the villa
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-wrap -mx-4 mt-12">
            <motion.div
              className="w-full md:w-1/2 px-4 mb-8 md:mb-0"
              variants={fadeInUp}
            >
              <motion.div
                className="relative h-80 md:h-96 mb-6 overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              >
                {/* Using placeholder API instead of empty div */}
                <img
                  src="/api/placeholder/800/600"
                  alt="Infinity pool"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div className="mb-4" variants={fadeInUp}>
                <span className="text-xs text-gray-500 uppercase">
                  INFINITY POOL
                </span>
              </motion.div>
              <motion.h3
                className="text-2xl font-light mb-4"
                variants={fadeInUp}
              >
                Ocean-View Infinity Pool
              </motion.h3>
              <motion.p className="text-gray-600 mb-4" variants={fadeInUp}>
                Immerse yourself in our spectacular cliff-edge infinity pool
                where the water seems to merge with the Arabian Sea horizon.
                Perfect for watching the sunset while enjoying a refreshing
                swim.
              </motion.p>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                <Link
                  href="/pool"
                  className="text-sm border-b border-gray-400 pb-1 hover:border-gray-800"
                >
                  View pool details
                </Link>
              </motion.div>
            </motion.div>

            <motion.div className="w-full md:w-1/2 px-4" variants={fadeInUp}>
              <motion.div
                className="relative h-80 md:h-96 mb-6 overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              >
                {/* Using placeholder API instead of empty div */}
                <img
                  src="/api/placeholder/800/600"
                  alt="Luxury suite"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div className="mb-4" variants={fadeInUp}>
                <span className="text-xs text-gray-500 uppercase">
                  LUXURY ACCOMMODATION
                </span>
              </motion.div>
              <motion.h3
                className="text-2xl font-light mb-4"
                variants={fadeInUp}
              >
                Private Luxury Suites
              </motion.h3>
              <motion.p className="text-gray-600 mb-4" variants={fadeInUp}>
                Each of our four spacious suites offers panoramic ocean views,
                private balconies, and a harmonious blend of contemporary luxury
                with traditional Kerala craftsmanship.
              </motion.p>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                <Link
                  href="/suites"
                  className="text-sm border-b border-gray-400 pb-1 hover:border-gray-800"
                >
                  Explore suites
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Destinations Section with interactive panels */}
      <motion.section
        className="py-16 bg-[#1d1d1d] min-h-full text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 py-16">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            variants={fadeIn}
          >
            Discover Extraordinary Destinations
          </motion.h2>

          <div className="flex flex-wrap justify-center items-stretch gap-4">
            {destinations.map((destination) => (
              <motion.div
                key={destination.id}
                className={`relative overflow-hidden transition-all duration-700 ease-in-out cursor-pointer
                ${
                  selectedFeature === destination.id ? "w-[600px]" : "w-[200px]"
                } h-[600px] ${
                  destination.id % 2 === 0 ? "mt-10" : "mt-0"
                } transition-all duration-1500 delay-75`}
                variants={fadeIn}
                onClick={() =>
                  setSelectedFeature(
                    selectedFeature === destination.id
                      ? (destination.id + 1) % destinations.length
                      : destination.id
                  )
                }
                whileHover={{
                  scale: selectedFeature === destination.id ? 1 : 1.02,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                {/* Using placeholder API for images */}
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-all duration-700"
                />

                <div className="absolute bottom-0 left-0 right-0 z-20 transition-all duration-500">
                  {selectedFeature === destination.id && (
                    <motion.div
                      initial={{ opacity: 0, height: "auto" }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }} // Optimized animation timing
                      className="overflow-hidden h-[40%] absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                    >
                      <h3 className="text-2xl font-bold mb-2">
                        {destination.name}
                      </h3>
                      <p className="text-lg mb-6">{destination.description}</p>
                    </motion.div>
                  )}
                </div>
                {selectedFeature !== destination.id && (
                  <motion.button
                    className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experiences Section with hover effects */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto text-center mb-12"
            variants={fadeInUp}
          >
            <span className="text-sm text-gray-600 uppercase mb-2 block">
              CURATED EXPERIENCES
            </span>
            <h2 className="text-3xl font-light">Discover Varkala's Magic</h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap -mx-4"
            variants={staggerChildren}
          >
            {[
              {
                title: "Sunrise Yoga",
                desc: "Begin your day with a rejuvenating yoga session on our cliff-edge platform as the sun rises over the Arabian Sea.",
                img: "/api/placeholder/600/400"
              },
              {
                title: "Ayurvedic Treatments",
                desc: "Experience authentic Kerala Ayurvedic therapies in our private spa pavilion with ocean views.",
                img: "/api/placeholder/600/400"
              },
              {
                title: "Beach Excursions",
                desc: "Take a private path down to Varkala Beach for swimming, sunbathing, and exploring local fishing villages.",
                img: "/api/placeholder/600/400"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="w-full md:w-1/3 px-4 mb-8"
                variants={fadeInUp}
              >
                <motion.div
                  className="relative h-64 mb-4 overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Using placeholder API instead of empty div */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.h3
                  className="text-xl font-light mb-2"
                  variants={fadeInUp}
                >
                  {item.title}
                </motion.h3>
                <motion.p className="text-gray-600" variants={fadeInUp}>
                  {item.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/experiences"
              className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition"
            >
              VIEW ALL EXPERIENCES
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer with subtle animations */}
      <motion.footer
        className="bg-black text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <motion.div
              className="w-full md:w-1/4 px-4 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h3 className="text-xl font-light mb-4">AYADA CLIFFS</h3>
              <p className="text-gray-400">
                Varkala Cliff Road
                <br />
                Varkala, Kerala 695141
                <br />
                India
              </p>
            </motion.div>

            <motion.div
              className="w-full md:w-1/4 px-4 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h4 className="text-lg font-light mb-4">Contact</h4>
              <p className="text-gray-400">
                +91 12345 67890
                <br />
                info@AYADAcliffs.com
              </p>
            </motion.div>

            <motion.div
              className="w-full md:w-1/4 px-4 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h4 className="text-lg font-light mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-gray-400"
                  whileHover={{ color: "#ffffff", x: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  Instagram
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400"
                  whileHover={{ color: "#ffffff", x: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  Facebook
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/4 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h4 className="text-lg font-light mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe for exclusive offers and updates
              </p>
              <motion.div
                className="flex"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 w-full"
                />
                <motion.button
                  className="bg-white text-black px-4"
                  whileHover={{ backgroundColor: "#f0f0f0" }}
                  whileTap={{ scale: 0.95 }}
                >
                  →
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p>
              © {new Date().getFullYear()} AYADA Cliffs. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default AyadaCliffsPage;