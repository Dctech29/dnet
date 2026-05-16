// scripts/seedTechnologies.ts
// Run with: npx ts-node scripts/seedTechnologies.ts

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const technologies = [
    {
        name: "Next.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        order: 1
    },
    {
        name: "React.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        order: 2
    },
    {
        name: "Node.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        order: 3
    },
    {
        name: "MongoDB",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        order: 4
    },
    {
        name: "Tailwind CSS",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        order: 5
    },
    {
        name: "TypeScript",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        order: 6
    },
    {
        name: "AWS",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        order: 7
    },
    {
        name: "PostgreSQL",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        order: 8
    }
];

async function main() {
    console.log(`Seeding ${technologies.length} technologies...`);
    for (const tech of technologies) {
        const t = await prisma.technology.create({ data: tech });
        console.log(`Created: ${t.name} (id: ${t.id})`);
    }
    console.log('Done!');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
