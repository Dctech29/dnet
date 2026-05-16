"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PhoneCall } from "lucide-react";

const pricingPlans = [
    {
        name: "Basic Plan - WP & PHP Website",
        price: "₹4,999 - ₹12,000",
        description: "Perfect for establishing a strong, custom online presence.",
        features: [
            "Custom PHP Backend",
            "Responsive Web Design",
            "Dynamic Admin Panel",
            "Basic SEO Optimization",
            "Contact Form Integration",
            "Fast Loading Speed",
            "12 Month Free Support",
        ],
        popular: false,
    },
    {
        name: "Growth Plan - SEO Optimized",
        price: "₹14,999 - ₹25,000",
        description: "Built for growth, highly optimized to rank on Google.",
        features: [
            "Premium Theme Setup & Customization",
            "Highly Optimized for Google (SEO)",
            "Focused Lead Generation",
            "Modern UI / UX Design",
            "Essential Plugins & Security Setup",
            "E-commerce Ready (WooCommerce)",
            "Fast Caching & Performance Tuning",
            "Email Newsletter Integration",
            "12 Months Free Support",
        ],
        popular: true,
    },
    {
        name: "Premium Plan - Node.js Custom Coded",
        price: "Starting at ₹29,100",
        description: "Enterprise-grade scalable architecture with zero limitations.",
        features: [
            "Custom Node.js/Next.js Architecture",
            "Blazing Fast Performance",
            "Advanced Admin Dashboard",
            "API Development & Integration",
            "Highly Optimized for Google",
            "Modern UI / UX with Custom Animations",
            "Focused Lead Generation Funnels",
            "Robust Database Architecture",
            "Scalable Cloud Infrastructure",
            "Real-time Features (WebSockets)",
            "Advanced Security Measures",
            "Fully Custom Business Logic",
            "Automated Backups",
            "Dedicated Server Setup Assistance",
            "Custom VIP Support",
        ],
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Choose the perfect technology stack and development plan for your business needs. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative p-1 rounded-3xl ${plan.popular ? "bg-gradient-to-b from-purple-500 to-blue-600" : "bg-white/10"
                                }`}
                        >
                            {plan.popular && (
                                <div className="z-10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="bg-background/95 backdrop-blur-xl rounded-[23px] h-full p-8 flex flex-col">
                                <div className="mb-6 border-b border-white/10 pb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-sm text-white mb-6">{plan.description}</p>
                                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                        {plan.price}
                                    </div>
                                </div>

                                <ul className="flex flex-col gap-4 mb-8 flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-purple-400" : "text-blue-400"}`} />
                                            <span className="text-gray-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="tel:+918950496925"
                                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${plan.popular
                                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-[1.02]"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    <PhoneCall className="w-5 h-5" /> Call Now To Start
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
