import { Sparkles, PhoneCall } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-purple-100">Premium Web Development Agency</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                    We Build <span className="text-gradient">Digital Experiences</span>
                    <br className="hidden md:block" /> That Inspire.
                </h1>

                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
                    DNet Studio transforms ambitious ideas into stunning, high-performing websites and web applications using cutting-edge technologies.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                        href="#contact-form"
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all hover:scale-105"
                    >
                        <PhoneCall className="w-5 h-5" /> Get a Call Back
                    </a>
                    <a
                        href="tel:+918950496925"
                        className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white glass hover:bg-white/10 transition-all"
                    >
                        <PhoneCall className="w-5 h-5 text-purple-400" /> Call Now
                    </a>
                </div>
            </div>
        </section>
    );
}
