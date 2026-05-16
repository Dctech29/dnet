"use client";

import { Star } from "lucide-react";
import Image from "next/image";

type Testimonial = {
    id: string;
    personName: string;
    personImage: string;
    projectName: string;
    siteImage: string;
    rating: number;
    review: string;
};

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-700 text-gray-700"}`}
                />
            ))}
        </div>
    );
}

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <div className="relative flex-shrink-0 w-[320px] sm:w-[360px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300">
            {/* Site screenshot banner */}
            <div className="relative h-36 w-full overflow-hidden">
                <Image
                    src={t.siteImage || "https://picsum.photos/seed/default/600/400"}
                    alt={t.projectName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />
                {/* Project name badge */}
                <div className="absolute bottom-3 left-3">
                    <span className="bg-purple-600/80 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {t.projectName}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Star rating */}
                <StarRating rating={t.rating} />

                {/* Review */}
                <p className="mt-3 text-sm text-gray-300 leading-relaxed line-clamp-3">
                    &ldquo;{t.review}&rdquo;
                </p>

                {/* Person */}
                <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
                    <Image
                        src={t.personImage || "https://i.pravatar.cc/150?img=1"}
                        alt={t.personName}
                        width={36}
                        height={36}
                        className="rounded-full object-cover border-2 border-white/10"
                    />
                    <div>
                        <p className="text-white font-semibold text-sm">{t.personName}</p>
                        <p className="text-gray-500 text-xs">Client</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
    // Duplicate for seamless infinite loop
    const items = [...testimonials, ...testimonials];

    return (
        <div className="w-full overflow-hidden">
            {/* Row 1 — scrolls left */}
            <div className="flex gap-5 mb-5 animate-marquee-left" style={{ width: "max-content" }}>
                {items.map((t, i) => (
                    <TestimonialCard key={`r1-${t.id}-${i}`} t={t} />
                ))}
            </div>
            {/* Row 2 — scrolls right (reversed) */}
            <div className="flex gap-5 animate-marquee-right" style={{ width: "max-content" }}>
                {[...items].reverse().map((t, i) => (
                    <TestimonialCard key={`r2-${t.id}-${i}`} t={t} />
                ))}
            </div>

            <style>{`
                @keyframes marqueeLeft {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee-left  { animation: marqueeLeft  40s linear infinite; }
                .animate-marquee-right { animation: marqueeRight 40s linear infinite; }
                .animate-marquee-left:hover,
                .animate-marquee-right:hover { animation-play-state: paused; }
            `}</style>
        </div>
    );
}
