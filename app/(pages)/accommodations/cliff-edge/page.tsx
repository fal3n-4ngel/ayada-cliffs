"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/app/theme/colors';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';

export default function VillaSuite() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };


    return (
        <div className="min-h-screen"
            style={{ backgroundColor: COLORS.light, color: COLORS.primary }}>

            <Header
                scrollY={scrollY}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1.5 }}
                className="relative flex flex-col items-center overflow-hidden px-10 pt-20"
            >
                <motion.div
                    className="z-20 text-center px-6 max-w-4xl flex justify-center flex-col"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h1 className="text-2xl font-semibold  mb-6">CLIFF EDGE VILLA</h1>
                    <p className="text-md font-light mb-8 max-w-[450px]">Perched high above the coastline, Cliff-Edge is a breathtaking retreat offering panoramic ocean views and unrivaled tranquility. This luxurious villa blends modern architecture with natural surroundings, featuring spacious interiors, floor-to-ceiling windows, and seamless indoor-outdoor living. </p>
                </motion.div>
            </motion.div>

            {/* Introduction */}
            <motion.section
                className=" mx-auto py-5 px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: "some" }}
            >
                <motion.div
                    className="grid grid-cols-2 gap-8"
                    variants={containerVariants}
                >
                    <motion.div
                        className="relative md:h-140 overflow-hidden"
                        variants={itemVariants}
                    >
                        <img
                            src="/varkala-cliff.jpg"
                            alt="Villa Interior"
                            className="w-full h-full object-cover"
                        />
                        <p></p>
                    </motion.div>

                    <motion.div
                        className="relative md:h-140 overflow-hidden"
                        variants={itemVariants}
                    >
                        <img
                            src="/Kappil-lake.jpg"
                            alt="Villa Exterior"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>
            </motion.section>

            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-3xl font-light text-center mb-16 border-b border-stone-200 pb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        VILLA EXPERIENCE
                    </motion.h2>

                    {/* First Item - Image Right */}
                    <motion.div
                        className="flex flex-col md:flex-row items-center mb-24"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-light mb-4">Private Zen Garden</h3>
                            <p className="text-stone-600 mb-6 leading-relaxed">
                                Each villa suite features its own private Zen garden, meticulously designed to create a space for
                                meditation and reflection. The careful arrangement of stones, minimal plantings, and raked sand
                                patterns invites contemplation and inner peace.
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                The gardens are visible from several vantage points within the suite, creating a visual connection
                                to nature that changes with the light throughout the day. Sliding glass doors can be fully opened to
                                merge indoor and outdoor spaces into one harmonious environment.
                            </p>
                        </motion.div>

                        <motion.div
                            className="w-full md:w-1/2 h-64 md:h-96"
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="/garden.avif"
                                alt="Private Zen Garden"
                                className="w-full h-full object-cover shadow-lg"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Second Item - Image Left */}
                    <motion.div
                        className="flex flex-col md:flex-row-reverse items-center mb-24"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="w-full md:w-1/2 md:pl-12 mb-8 md:mb-0"
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-light mb-4">Minimalist Living Space</h3>
                            <p className="text-stone-600 mb-6 leading-relaxed">
                                The heart of our villa suite is the thoughtfully designed living space where every element serves
                                a purpose. Custom-made furniture crafted from sustainable materials creates a warm, inviting atmosphere
                                while maintaining the clean lines and uncluttered aesthetic of minimalist design.
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                Natural light floods the space through strategically placed windows, eliminating the need for artificial
                                lighting during daylight hours. The neutral color palette with occasional accents drawn from nature
                                creates a sense of calm that encourages deep relaxation.
                            </p>
                        </motion.div>

                        <motion.div
                            className="w-full md:w-1/2 h-64 md:h-96"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="/living.avif"
                                alt="Minimalist Living Space"
                                className="w-full h-full object-cover shadow-lg"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Third Item - Image Right */}
                    <motion.div
                        className="flex flex-col md:flex-row items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-light mb-4">Tranquil Sleeping Quarters</h3>
                            <p className="text-stone-600 mb-6 leading-relaxed">
                                The sleeping area is a sanctuary within a sanctuary, designed to promote the deepest, most restorative
                                sleep. Our handcrafted beds feature organic cotton bedding and are positioned to maximize energy flow
                                according to traditional principles.
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                Blackout curtains made from natural fibers can be drawn to create perfect darkness, while sound-dampening
                                architectural elements ensure peaceful silence. The absence of electronic devices in this space maintains
                                its purity as a zone dedicated solely to rest and renewal.
                            </p>
                        </motion.div>

                        <motion.div
                            className="w-full md:w-1/2 h-64 md:h-96"
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="/bed.avif"
                                alt="Tranquil Sleeping Quarters"
                                className="w-full h-full object-cover shadow-lg"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery */}
            <motion.section
                style={{ backgroundColor: COLORS.secondary }}
                className="py-20 px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-3xl font-light text-center mb-16 border-b border-stone-200 pb-3"
                        variants={itemVariants}
                    >
                        EXPERIENCE THE SPACE
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        variants={containerVariants}
                    >
                        {[1, 2, 3, 4, 5, 6].map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative h-64 md:h-80 overflow-hidden group"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={`/1.jpeg`}
                                    alt={`Villa Gallery ${item}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>
            {/* Features */}
            <Footer />
            {/* Footer */}
        </div>
    );
}