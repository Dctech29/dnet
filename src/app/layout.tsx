import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import prisma from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dnet.studio";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "DNet Studio";
const PHONE = process.env.NEXT_PUBLIC_PHONE || "+91 89504 96925";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "deepaksolutions29@gmail.com";
const GITHUB = process.env.NEXT_PUBLIC_GITHUB || "https://github.com/Dctech29";
const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN || "https://www.linkedin.com/in/deepak-bishnoi/";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Web Development Agency in Hisar, Haryana | Next.js & React Experts`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    `${SITE_NAME} is a premium web development agency based in Hisar, Haryana. We build blazing-fast websites, e-commerce stores, SaaS platforms, and mobile apps using Next.js, React, and Node.js. Get a free quote today!`,
  keywords: [
    "web development agency Hisar",
    "web developer Haryana",
    "Next.js developer India",
    "React developer Hisar",
    "website design Haryana",
    "e-commerce website development India",
    "freelance web developer Hisar",
    "web app development Haryana",
    "affordable website design India",
    `${SITE_NAME} Hisar`,
    "Deepak Bishnoi web developer",
    "responsive website design",
    "Node.js backend developer India",
  ],
  authors: [{ name: "Deepak Bishnoi", url: SITE_URL }],
  creator: `Deepak Bishnoi - ${SITE_NAME}`,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Web Development Agency in Hisar, Haryana`,
    description:
      "We build high-performance websites, e-commerce platforms & custom web apps for businesses across India. Next.js, React, Node.js experts. Get started today!",
    images: [{ url: "/dnet-studio-logo.webp", width: 1200, height: 630, alt: `${SITE_NAME} - Web Development Agency` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Web Development Agency in India`,
    description: "Premium web development services from Hisar, Haryana. We build Next.js, React & Node.js applications. Contact us for a free quote!",
    images: ["/dnet-studio-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pages = await prisma.page.findMany({ select: { slug: true, title: true } });
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col">
        {/* JSON-LD Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: SITE_NAME,
              description: "Premium web development agency specializing in Next.js, React, and Node.js applications for businesses across India.",
              url: SITE_URL,
              logo: `${SITE_URL}/dnet-studio-logo.webp`,
              image: `${SITE_URL}/dnet-studio-logo.webp`,
              telephone: PHONE,
              email: EMAIL,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Mangali",
                addressLocality: "Hisar",
                addressRegion: "Haryana",
                postalCode: "125001",
                addressCountry: "IN",
              },
              geo: { "@type": "GeoCoordinates", latitude: "29.1481", longitude: "75.7218" },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "20:00",
              },
              sameAs: [GITHUB, LINKEDIN],
              priceRange: "₹₹",
              areaServed: { "@type": "Country", name: "India" },
            }),
          }}
        />
        <LayoutWrapper header={<Navbar />} footer={<Footer pages={pages} />}>
          <main className="flex-1">{children}</main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
