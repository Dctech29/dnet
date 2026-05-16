import { getTechnologies } from "@/app/actions";
import TechStackClient from "./TechStackClient";

// Fallback default technologies if the database is empty
const defaultTechnologies = [
    { id: "1", name: "Next.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", order: 1 },
    { id: "2", name: "React.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", order: 2 },
    { id: "3", name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", order: 3 },
    { id: "4", name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", order: 4 },
    { id: "5", name: "Tailwind CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", order: 5 },
    { id: "6", name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", order: 6 },
    { id: "7", name: "AWS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", order: 7 },
    { id: "8", name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", order: 8 },
];

export default async function TechStack() {
    const result = await getTechnologies();
    const technologies = result.technologies && result.technologies.length > 0
        ? result.technologies
        : defaultTechnologies;

    return <TechStackClient technologies={technologies} />;
}
