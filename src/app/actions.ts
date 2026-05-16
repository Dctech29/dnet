"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendLeadEmail } from "@/lib/mailer";

// --- CONTACT FORM ACTIONS ---

export async function submitContactForm(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string | null;
        const phone = formData.get("phone") as string | null;
        const body = formData.get("body") as string | null;

        if (!name || !phone) {
            return { success: false, error: "Name and mobile number are required." };
        }

        await prisma.message.create({
            data: {
                name,
                email: email || "notprovided@dnet.studio",
                phone: phone || null,
                body: body || "(No message provided)",
            },
        });

        // Trigger email notification (don't await so user doesn't wait for mail server)
        sendLeadEmail({
            name,
            phone: phone!,
            email: email || undefined,
            body: body || undefined,
        }).catch(err => console.error("Email notification failed:", err));

        return { success: true };
    } catch (error) {
        console.error("Failed to submit message:", error);
        return { success: false, error: "Failed to send message." };
    }
}

export async function getMessages() {
    try {
        const messages = await prisma.message.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, messages };
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return { success: false, messages: [] };
    }
}

export async function deleteMessage(id: string) {
    "use server";
    try {
        await prisma.message.delete({ where: { id } });
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete message:", error);
        return { success: false, error: "Failed to delete message." };
    }
}


// --- PROJECT CATALOG ACTIONS ---

export async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, projects };
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return { success: false, projects: [] };
    }
}

export async function addProject(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const imageUrl = formData.get("imageUrl") as string;
        const link = formData.get("link") as string | null;

        if (!title || !category || !description || !imageUrl) {
            return { success: false, error: "Missing required fields for project." };
        }

        await prisma.project.create({
            data: {
                title,
                category,
                description,
                imageUrl,
                link: link || null,
            },
        });

        revalidatePath("/admin/projects");
        revalidatePath("/"); // Revalidate the front page projects section
        return { success: true };
    } catch (error) {
        console.error("Failed to add project:", error);
        return { success: false, error: "Failed to add project." };
    }
}

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({
            where: { id },
        });
        revalidatePath("/admin/projects");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete project:", error);
        return { success: false, error: "Failed to delete project." };
    }
}

// --- SITE SETTINGS ACTIONS ---

export async function getSiteSettings() {
    try {
        const settings = await prisma.siteSettings.findUnique({
            where: { id: "globalSettings" },
        });
        return { success: true, settings };
    } catch (error) {
        console.error("Failed to fetch site settings:", error);
        return { success: false, settings: null };
    }
}

export async function updateSiteSettings(formData: FormData) {
    try {
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const whatsapp = formData.get("whatsapp") as string;
        const github = formData.get("github") as string;
        const linkedin = formData.get("linkedin") as string;
        const address = formData.get("address") as string;

        await prisma.siteSettings.upsert({
            where: { id: "globalSettings" },
            update: { phone, email, whatsapp, github, linkedin, address },
            create: { id: "globalSettings", phone, email, whatsapp, github, linkedin, address },
        });

        revalidatePath("/");
        revalidatePath("/admin/settings");
        return { success: true };
    } catch (error) {
        console.error("Failed to update site settings:", error);
        return { success: false, error: "Failed to update settings" };
    }
}

// --- AUTHENTICATION ACTIONS ---

export async function handleLogin(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const adminUsername = process.env.ADMIN_USERNAME || "DCTECH";
    const adminPassword = process.env.ADMIN_PASSWORD || "Dctech@89504@29";

    if (username === adminUsername && password === adminPassword) {
        // Dynamic import to avoid edge edge cases in Next.js Server Actions bundling
        const { setSession } = await import("@/lib/auth");
        await setSession();
        return { success: true };
    }

    return { success: false, error: "Invalid credentials" };
}

export async function handleLogout() {
    const { logout } = await import("@/lib/auth");
    await logout();
}

// --- TECHNOLOGY ACTIONS ---

export async function getTechnologies() {
    try {
        const technologies = await prisma.technology.findMany({
            orderBy: { order: "asc" },
        });
        return { success: true, technologies };
    } catch (error) {
        console.error("Failed to fetch technologies:", error);
        return { success: false, technologies: [] };
    }
}

export async function addTechnology(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const iconUrl = formData.get("iconUrl") as string;
        const order = parseInt(formData.get("order") as string || "0");

        if (!name || !iconUrl) {
            return { success: false, error: "Missing required fields." };
        }

        await prisma.technology.create({
            data: { name, iconUrl, order },
        });

        revalidatePath("/");
        revalidatePath("/admin/technologies");
        return { success: true };
    } catch (error) {
        console.error("Failed to add technology:", error);
        return { success: false, error: "Failed to add technology." };
    }
}

export async function deleteTechnology(id: string) {
    try {
        await prisma.technology.delete({
            where: { id },
        });
        revalidatePath("/");
        revalidatePath("/admin/technologies");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete technology:", error);
        return { success: false, error: "Failed to delete technology." };
    }
}

// --- TESTIMONIAL ACTIONS ---

export async function getTestimonials() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { order: "asc" },
        });
        return { success: true, testimonials };
    } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        return { success: false, testimonials: [] };
    }
}

export async function addTestimonial(formData: FormData) {
    try {
        const personName = formData.get("personName") as string;
        const personImage = formData.get("personImage") as string;
        const projectName = formData.get("projectName") as string;
        const siteImage = formData.get("siteImage") as string;
        const rating = parseInt(formData.get("rating") as string) || 5;
        const review = formData.get("review") as string;
        const order = parseInt(formData.get("order") as string) || 0;

        if (!personName || !projectName || !review) {
            return { success: false, error: "Name, project and review are required." };
        }

        await prisma.testimonial.create({
            data: { personName, personImage, projectName, siteImage, rating, review, order },
        });
        revalidatePath("/");
        revalidatePath("/admin/testimonials");
        return { success: true };
    } catch (error) {
        console.error("Failed to add testimonial:", error);
        return { success: false, error: "Failed to add testimonial." };
    }
}

export async function deleteTestimonial(id: string) {
    "use server";
    try {
        await prisma.testimonial.delete({ where: { id } });
        revalidatePath("/");
        revalidatePath("/admin/testimonials");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete testimonial:", error);
        return { success: false, error: "Failed to delete testimonial." };
    }
}

// --- PAGE ACTIONS ---

export async function getPages() {
    try {
        const pages = await prisma.page.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, pages };
    } catch (error) {
        console.error("Failed to fetch pages:", error);
        return { success: false, pages: [] };
    }
}

export async function addPage(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const content = formData.get("content") as string;

        if (!title || !slug || !content) {
            return { success: false, error: "Missing required fields for page." };
        }

        await prisma.page.upsert({
            where: { slug },
            update: { title, content },
            create: { title, slug, content },
        });

        revalidatePath("/");
        revalidatePath("/admin/pages");
        revalidatePath(`/${slug}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to add/update page:", error);
        return { success: false, error: "Failed to add/update page." };
    }
}

export async function deletePage(id: string) {
    try {
        await prisma.page.delete({
            where: { id },
        });
        revalidatePath("/");
        revalidatePath("/admin/pages");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete page:", error);
        return { success: false, error: "Failed to delete page." };
    }
}
