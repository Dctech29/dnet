// scripts/seedProjects.ts
// To execute: npx ts-node -O '{"module":"CommonJS"}' scripts/seedProjects.ts

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initialProjects = [
    {
        title: "Vedic Astrology Platform",
        category: "E-Commerce / SAAS",
        description: "A comprehensive Jyotish website featuring Kundli generation, online consultations, and digital storefront.",
        imageUrl: "/jyotish.png",
        link: "#"
    },
    {
        title: "Medical Booking System",
        category: "Healthcare",
        description: "An advanced appointment scheduling platform for clinics and hospitals with automated reminders.",
        imageUrl: "/appointment.png",
        link: "#"
    },
    {
        title: "Premium E-Commerce",
        category: "Retail",
        description: "A high-conversion online store with advanced filtering, secure checkout, and dynamic inventory management.",
        imageUrl: "/ecommerce.png",
        link: "#"
    },
    {
        title: "Luxury Real Estate",
        category: "Real Estate",
        description: "Immersive property listing platform featuring virtual tours, location mapping, and lead capture funnels.",
        imageUrl: "/real_estate.png",
        link: "#"
    },
    {
        title: "Creative Portfolio",
        category: "Agency / Design",
        description: "Award-winning portfolio website with fluid animations, custom cursors, and case study presentations.",
        imageUrl: "/portfolio.png",
        link: "#"
    },
    {
        title: "Fine Dining Booking",
        category: "Hospitality",
        description: "Elegant restaurant website with real-time table reservations and interactive menu displays.",
        imageUrl: "/restaurant.png",
        link: "#"
    },
    {
        title: "Digital Fitness Coach",
        category: "Health & Fitness",
        description: "Subscription-based platform delivering personalized workout routines and nutrition tracking.",
        imageUrl: "/fitness.png",
        link: "#"
    },
    {
        title: "NextGen E-Learning",
        category: "Education",
        description: "Scalable learning management system with video streaming, quizzes, and progress analytics.",
        imageUrl: "/elearning.png",
        link: "#"
    },
    {
        title: "Corporate Fintech",
        category: "Finance",
        description: "Secure, high-performance banking dashboard with real-time data visualization and analytics.",
        imageUrl: "/appointment.png", // Reusing image as placeholder for required 10 count
        link: "#"
    },
    {
        title: "SaaS Dashboard",
        category: "Technology",
        description: "Sleek B2B management interface with complex state management and multi-tenant billing.",
        imageUrl: "/ecommerce.png",     // Reusing image as placeholder
        link: "#"
    }
];

async function main() {
    console.log(`Start seeding ${initialProjects.length} projects...`);
    for (const p of initialProjects) {
        const project = await prisma.project.create({
            data: {
                title: p.title,
                category: p.category,
                description: p.description,
                imageUrl: p.imageUrl,
                link: p.link
            }
        });
        console.log(`Created project with id: ${project.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
