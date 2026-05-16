"use client";

import { motion } from "framer-motion";
import { PhoneCall, Code2, Users, Star } from "lucide-react";

export default function AboutMeClient({ phone }: { phone: string }) {
    return (
        <section id="about" className="py-20 relative overflow-hidden bg-black/50 border-t border-white/5">
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2 flex justify-center"
                    >
                        <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden glass p-1.5 shadow-[0_0_40px_rgba(59,130,246,0.3)] group">
                            <div className="w-full h-full relative rounded-2xl overflow-hidden bg-gray-900 border border-white/10">
                                <img
                                    src="/deepak_photo.jpg"
                                    alt="Deepak Bishnoi"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-1/2 text-center lg:text-left"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                            <Star className="w-3 h-3" /> Founder & Developer — DNet Studio
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Hi, I am <span className="text-gradient">Deepak</span>
                        </h2>

                        <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed mx-auto lg:mx-0 max-w-lg">
                            I&apos;m a passionate software developer dedicated to crafting modern, high-performance web applications. I&apos;ve helped founders, businesses, and individuals bring their ideas to life using cutting-edge technology — from complex backend architectures to stunning frontend experiences.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 max-w-sm mx-auto lg:mx-0">
                            <div className="flex items-center gap-3 bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/10">
                                <div className="bg-blue-500/20 p-2 sm:p-3 rounded-lg text-blue-400 flex-shrink-0">
                                    <Code2 className="w-5 h-5" />
                                </div>
                                <div className="text-left min-w-0">
                                    <h4 className="text-white font-bold text-sm sm:text-base">Expert</h4>
                                    <p className="text-xs text-gray-400 truncate">Full-Stack Dev</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/10">
                                <div className="bg-purple-500/20 p-2 sm:p-3 rounded-lg text-purple-400 flex-shrink-0">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div className="text-left min-w-0">
                                    <h4 className="text-white font-bold text-sm sm:text-base">Client Focus</h4>
                                    <p className="text-xs text-gray-400 truncate">Driven Results</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <a
                            href={`tel:${phone}`}
                            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-4 rounded-full font-bold text-sm sm:text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                        >
                            <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
                            Let&apos;s Talk: {phone}
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
