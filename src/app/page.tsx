import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Pricing from "@/components/Pricing";
import AboutMe from "@/components/AboutMe";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Pricing />
      <AboutMe />
      <Testimonials />

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 blur-[100px] rounded-full w-[500px] h-[500px] mx-auto top-1/2 -translate-y-1/2 -z-10" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 glass border border-white/10 rounded-3xl p-12 md:p-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Let&apos;s collaborate to transform your vision into a stunning digital reality.
            Send us a message below and we will get back to you shortly.
          </p>

          <ContactForm />
        </div>
      </section>
      <TechStack />
    </>
  );
}
