"use client";

import { motion } from "framer-motion";

type Technology = {
    id: string;
    name: string;
    iconUrl: string;
    order: number;
};

// Cards gradient colors cycling through
const gradients = [
    "from-gray-700 to-black",
    "from-sky-900 to-blue-900",
    "from-green-900 to-emerald-950",
    "from-green-800 to-green-950",
    "from-teal-900 to-cyan-950",
    "from-blue-900 to-sky-950",
    "from-amber-700 to-orange-950",
    "from-sky-800 to-blue-950",
    "from-violet-900 to-purple-950",
    "from-rose-900 to-red-950",
];

// Some icons look better with invert filter on dark backgrounds
const invertIcons = ["Next.js", "AWS"];

export default function TechStackClient({ technologies }: { technologies: Technology[] }) {
    return (
        <section id="stack" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Technology Stack</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We use the latest, industry-grade technologies to build robust, scalable, and blazingly fast digital products.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {technologies.map((tech, i) => (
                        <motion.div
                            key={tech.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`p-1 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} glass hover:-translate-y-2 transition-transform duration-300`}
                        >
                            <div className="bg-background/90 h-full w-full rounded-xl p-6 flex flex-col items-center text-center gap-4">
                                <div className="mb-2">
                                    <img
                                        src={tech.iconUrl}
                                        alt={tech.name}
                                        className={`w-12 h-12 ${invertIcons.includes(tech.name) ? "invert" : ""}`}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
