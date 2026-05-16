import { getTestimonials } from "@/app/actions";
import AdminTestimonials from "./AdminTestimonials";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
    const result = await getTestimonials();
    const testimonials = result.testimonials || [];
    return <AdminTestimonials initialTestimonials={testimonials} />;
}
