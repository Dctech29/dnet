import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const page = await prisma.page.findUnique({
        where: { slug: params.slug },
    });

    if (!page) {
        return {
            title: "Page Not Found",
        };
    }

    return {
        title: page.title,
    };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
    const page = await prisma.page.findUnique({
        where: { slug: params.slug },
    });

    if (!page) {
        notFound();
    }

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">{page.title}</h1>
            <div className="prose prose-invert prose-purple max-w-none">
                {/* Since we don't have a markdown parser installed yet like react-markdown, we render as dangerouslySetInnerHTML if they input HTML */}
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
        </div>
    );
}
