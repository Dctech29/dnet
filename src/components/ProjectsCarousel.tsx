"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";

interface Project {
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    link: string | null;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <div
            className="group relative rounded-3xl overflow-hidden border border-white/10 flex flex-col bg-gray-950/80 backdrop-blur-sm
                       w-[78vw] max-w-[320px] flex-shrink-0"
            style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
        >
            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <img
                    src={project.imageUrl || "/jyotish.png"}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />
                <div className="absolute top-3 left-3">
                    <span className="bg-purple-600/80 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/30">
                        {project.category}
                    </span>
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                </div>
                <a
                    href={project.link || "#"}
                    target={project.link && project.link !== "#" ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-4 flex items-center gap-1.5 text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors w-fit"
                >
                    View Project <ArrowUpRight className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const cardWidth = el.scrollWidth / projects.length;
            const index = Math.round(el.scrollLeft / cardWidth);
            setActiveIndex(Math.min(index, projects.length - 1));
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, [projects.length]);

    const scrollToIndex = (i: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.scrollWidth / projects.length;
        el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
    };

    return (
        <div className="md:hidden ml-4">
            {/* Swipe hint */}
            <div className="flex items-center gap-1 text-gray-500 text-sm px-4 sm:px-6 mb-4">
                Swipe to browse <ChevronRight className="w-4 h-4" />
            </div>

            {/* Carousel track */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto px-4 sm:px-6 pb-5 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {projects.map((project: Project, index: number) => (
                    <div key={project.title || index} className="snap-start">
                        <ProjectCard project={project} index={index} />
                    </div>
                ))}
                <div className="w-4 flex-shrink-0" />
            </div>

            {/* Interactive dots */}
            <div className="flex justify-center gap-2 mt-3 px-6">
                {projects.map((_, i: number) => (
                    <button
                        key={i}
                        onClick={() => scrollToIndex(i)}
                        aria-label={`Go to project ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                            ? "w-7 bg-purple-500"
                            : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
