// client/src/pages/LandingPage.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { FaPaintBrush, FaUsers, FaShareAlt } from 'react-icons/fa';

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 12,
            },
        },
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
    };

    return (
        <motion.div
            className="flex flex-col items-center bg-primary-dark text-neutral-50 relative z-10 min-h-screen overflow-x-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Section */}
            <section className="w-full py-16 px-4 sm:px-8 md:px-16 bg-gradient-to-br from-primary-dark to-primary-DEFAULT">
                <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
                    
                    {/* Left: Text Content */}
                    <motion.div
                        className="flex-1 text-left"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-accent-DEFAULT mb-4 font-montserrat leading-tight drop-shadow-lg"
                            variants={itemVariants}
                        >
                            CanvasConnect
                        </motion.h1>
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl"
                            variants={itemVariants}
                        >
                            Your ultimate real-time collaborative whiteboard. <strong>Draw, ideate, and share instantly</strong> with anyone, anywhere, with a touch of magic.
                        </motion.p>
                        <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                            <Link to="/login">
                                <Button variant="primary" className="text-lg px-6 py-3 border-white border text-white hover:text-black">Get Started</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="neutral" className="text-lg px-6 py-3">Register Now</Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right: Illustration */}
                    <motion.div
                        className="flex-1 flex justify-center"
                        variants={fadeInVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="relative w-full max-w-md">
                            <img
                                src="/hero.jpg"
                                alt="Whiteboard Collaboration Illustration"
                                className="w-full h-auto object-contain rounded-2xl shadow-2xl border border-neutral-700"
                            />
                            {/* Optional Gradient Overlay */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-primary-dark opacity-60 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="w-full py-16 px-4 sm:px-8 md:px-16 bg-primary-light text-neutral-50">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent-DEFAULT mb-10 text-center font-montserrat"
                    variants={fadeInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    Unleash Your Creativity Together
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[{
                        Icon: FaPaintBrush,
                        title: "Intuitive Drawing Tools",
                        desc: "Express your ideas effortlessly with a vibrant palette and customizable brushes.",
                        color: "accent"
                    }, {
                        Icon: FaUsers,
                        title: "Seamless Collaboration",
                        desc: "See real-time updates as teammates draw, chat, and interact on the same canvas.",
                        color: "secondary"
                    }, {
                        Icon: FaShareAlt,
                        title: "Persistent & Shareable",
                        desc: "Your whiteboards are saved securely and can be revisited or shared anytime.",
                        color: "accent"
                    }].map(({ Icon, title, desc, color }, i) => (
                        <motion.div
                            key={i}
                            className={`bg-primary-DEFAULT p-6 sm:p-8 rounded-xl shadow-lg border border-${color}-DEFAULT flex flex-col items-center text-center hover:scale-105 transition-transform duration-300`}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Icon size={48} className={`text-${color}-light mb-4`} />
                            <h3 className="text-xl sm:text-2xl font-bold font-montserrat mb-2">{title}</h3>
                            <p className="text-neutral-300 text-sm sm:text-base">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="w-full py-16 px-4 sm:px-8 md:px-16 bg-primary-dark text-neutral-50">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-DEFAULT mb-10 text-center font-montserrat"
                    variants={fadeInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    How It Works
                </motion.h2>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
                    {[
                        { step: 1, title: "Create or Join", desc: "Start a new whiteboard with a unique ID or jump into an existing one." },
                        { step: 2, title: "Collaborate Live", desc: "Draw, type, and chat in real-time. See everyone's contributions instantly." },
                        { step: 3, title: "Save & Revisit", desc: "All your work is automatically saved and can be accessed anytime." }
                    ].map(({ step, title, desc }, i) => (
                        <motion.div
                            key={i}
                            className="bg-primary-light p-6 sm:p-8 rounded-xl shadow-lg border border-neutral-700 text-center flex flex-col items-center"
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            <div className={`text-${step % 2 === 0 ? 'secondary' : 'accent'}-DEFAULT text-5xl font-bold mb-3`}>{step}</div>
                            <h3 className="text-xl sm:text-2xl font-bold font-montserrat mb-2">{title}</h3>
                            <p className="text-neutral-300 text-sm sm:text-base">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Footer */}
            <section className="w-full py-16 px-4 sm:px-8 md:px-16 bg-gradient-to-tl from-primary-dark to-primary-DEFAULT text-center">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent-DEFAULT mb-8 font-montserrat"
                    variants={fadeInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    Ready to Connect and Create?
                </motion.h2>
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Link to="/register">
                        <Button variant="primary" className="text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4">Start Drawing Now</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="secondary" className="text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4">Existing User? Log In</Button>
                    </Link>
                </motion.div>
                <motion.p className="text-neutral-400 text-xs sm:text-sm mt-12" variants={fadeInVariants}>
                    &copy; {new Date().getFullYear()} CanvasConnect. All rights reserved.
                </motion.p>
            </section>
        </motion.div>
    );
};

export default LandingPage; 