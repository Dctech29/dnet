import { ArrowUpRight } from "lucide-react";
import { getProjects } from "@/app/actions";
import ProjectsCarousel from "./ProjectsCarousel";

const defaultProjects = [
    { title: "Jyotish Platform", category: "Web Application", imageUrl: "/jyotish.png", description: "A premium Vedic Astrology platform featuring cosmic aesthetics, real-time birth charts, and expert consultations.", link: "#" },
    { title: "Medical Scheduling SaaS", category: "SaaS Product", imageUrl: "/appointment.png", description: "An ultra-modern appointment booking system for clinics with an intuitive calendar UI and seamless workflow.", link: "#" },
    { title: "Vibe E-Commerce", category: "E-Commerce", imageUrl: "/ecommerce.png", description: "High-converting online store with dynamic product grids, lightning-fast checkout, and vibrant visual design.", link: "#" },
    { title: "Luxe Real Estate", category: "Real Estate Portal", imageUrl: "/real_estate.png", description: "A stunning, high-converting property search platform featuring luxury architectural photography and elegant UI.", link: "#" },
    { title: "Creative Agency Portfolio", category: "Portfolio Website", imageUrl: "/portfolio.png", description: "An award-winning digital agency portfolio with vibrant neon accents, dark mode aesthetics, and smooth animations.", link: "#" },
    { title: "Gourmet Bites Delivery", category: "Restaurant Platform", imageUrl: "/restaurant.png", description: "A beautiful, premium food delivery website with high-quality imagery and a frictionless online ordering experience.", link: "#" },
];

function DesktopCard({ project, index }: { project: any; index: number }) {
    return (
        <div
            className="group relative rounded-3xl overflow-hidden border border-white/10 flex flex-col bg-gray-950/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-500"
            style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
        >
            <div className="relative h-56 w-full overflow-hidden">
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

export default async function Projects() {
    const result = await getProjects();
    const displayProjects = result.projects && result.projects.length > 0 ? result.projects : defaultProjects;

    return (
        <section id="projects" className="py-20 bg-black/40 relative">
            {/* Header */}
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl mb-10 md:mb-14">
                <h2 className="text-3xl md:text-5xl font-bold mb-3">Recent Projects</h2>
                <p className="text-gray-400 text-base md:text-lg">
                    Premium web applications we&apos;ve built for clients across various industries.
                </p>
            </div>

            {/* Mobile: horizontal scroll carousel */}
            <ProjectsCarousel projects={displayProjects} />

            {/* Desktop: 3-column grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4 sm:px-6 max-w-7xl">
                {displayProjects.map((project: any, index: number) => (
                    <DesktopCard key={project.title || index} project={project} index={index} />
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                [class*="overflow-x-auto"]::-webkit-scrollbar { display: none; }
            `}} />
        </section>
    );
}
