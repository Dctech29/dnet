import { getTestimonials } from "@/app/actions";
import TestimonialsClient from "./TestimonialsClient";

export default async function Testimonials() {
    const result = await getTestimonials();
    const testimonials = result.testimonials || [];

    if (testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="py-20 relative overflow-hidden bg-black/30">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl mb-12 relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-4 py-2 rounded-full mb-5">
                        ⭐ Client Reviews
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        Trusted by businesses across India — here&apos;s what they&apos;re saying about working with DNet Studio.
                    </p>
                </div>
            </div>

            {/* Fade edges */}
            <div className="relative z-10">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-20 pointer-events-none" />
                <TestimonialsClient testimonials={testimonials} />
            </div>
        </section>
    );
}
