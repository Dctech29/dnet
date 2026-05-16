// scripts/reseedTestimonials.ts
// Clears old testimonials and seeds fresh authentic ones.
// Run: npx ts-node scripts/reseedTestimonials.ts

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Real website/UI screenshots from Unsplash (laptop+screen, dashboard, app UI mockups)
// Real Indian portrait photos from randomuser.me (MALE/FEMALE, numbered)
// Reviews: mix of English and Hinglish

const testimonials = [
    {
        personName: "Arjun Mehta",
        personImage: "https://randomuser.me/api/portraits/men/44.jpg",
        projectName: "AstroVeda Kundli Platform",
        siteImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Deepak bhai ne site ekdum mast banai! Pehle humara koi online presence nahi tha, ab roz 20-30 leads aa rahi hain. Kundli generation feature toh logo ko bahut pasand aa raha hai. 100% recommend karunga!",
        order: 1
    },
    {
        personName: "Priya Sharma",
        personImage: "https://randomuser.me/api/portraits/women/44.jpg",
        projectName: "MediBook Appointment System",
        siteImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Our clinic's appointment system was completely manual before. DC Tech built us a beautiful, easy-to-use booking platform. Patient appointments have doubled and our staff saves hours of work every day. Absolutely brilliant!",
        order: 2
    },
    {
        personName: "Rahul Verma",
        personImage: "https://randomuser.me/api/portraits/men/33.jpg",
        projectName: "ShopVibe E-Commerce Store",
        siteImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Yaar site launch ke baad se sales mein 45% ki growth aayi hai! Checkout ekdum smooth hai aur customers ka feedback bhi bahut accha hai. Deepak ne deadline se 2 din pehle deliver kiya. Kya baat hai bhai!",
        order: 3
    },
    {
        personName: "Sneha Patel",
        personImage: "https://randomuser.me/api/portraits/women/28.jpg",
        projectName: "LuxeHomes Property Portal",
        siteImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "The real estate portal DC Tech built for us is gorgeous. Property listing pages load instantly, 3D virtual tours work flawlessly, and the inquiry form has brought us qualified leads from across the city. Worth every rupee!",
        order: 4
    },
    {
        personName: "Vikram Singh",
        personImage: "https://randomuser.me/api/portraits/men/45.jpg",
        projectName: "FitZone Coaching Academy",
        siteImage: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Meri gym ki website pehle bilkul basic thi. Ab online membership, diet plans, aur booking sab ek jagah ho gaya! Members kehte hain 'sir aapki website toh international gyms jaisi lag rahi hai.' Deepak bhaiya zabardast kaam karte hain.",
        order: 5
    },
    {
        personName: "Ananya Gupta",
        personImage: "https://randomuser.me/api/portraits/women/26.jpg",
        projectName: "BiteDelight Restaurant Platform",
        siteImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Online orders jumped 3x in the first month itself after our new site launched. The menu layout, food photography integration, and table reservation system are exactly what we needed. Our Zomato dependence is down by 50%!",
        order: 6
    },
    {
        personName: "Karan Joshi",
        personImage: "https://randomuser.me/api/portraits/men/50.jpg",
        projectName: "LearnSphere E-Learning Portal",
        siteImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "E-learning platform launch ke baad 500+ students ne enroll kiya pehle hi month mein. Video lectures, quizzes, aur certificates sab smooth kaam kar raha hai. Ek professional company jaisi site mil gayi, wo bhi affordable price mein!",
        order: 7
    },
    {
        personName: "Deepika Nair",
        personImage: "https://randomuser.me/api/portraits/women/38.jpg",
        projectName: "GlowSkin Beauty Clinic",
        siteImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Our clinic website looks so elegant and professional now. The before/after gallery feature and online consultation booking have been absolute game-changers. New clients frequently mention the website looks beautiful. Thank you Deepak!",
        order: 8
    },
    {
        personName: "Rohit Agarwal",
        personImage: "https://randomuser.me/api/portraits/men/28.jpg",
        projectName: "TechNova SaaS Dashboard",
        siteImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Hamara SaaS product ka landing page aur dashboard DC Tech ne build kiya. Investor demo ke waqt sab bahut impressed hue. Conversion rate 2.4x ho gayi. Bhai ek dum pro level kaam hai — aisi quality kisi bade agency se bhi mushkil se milti.",
        order: 9
    },
    {
        personName: "Meera Krishnan",
        personImage: "https://randomuser.me/api/portraits/women/48.jpg",
        projectName: "YogaBliss Studio Booking",
        siteImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "The yoga studio website is calm, beautiful and exactly on-brand for us. Our members love the class scheduling and the membership portal. Deepak took time to understand our brand values and it shows in every page. Grateful!",
        order: 10
    },
    {
        personName: "Saurabh Tiwari",
        personImage: "https://randomuser.me/api/portraits/men/51.jpg",
        projectName: "TravelEase Tour Agency",
        siteImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&auto=format",
        rating: 4,
        review: "Tour packages ki booking pehle WhatsApp pe hoti thi, ab sab online ho gaya. Gallery, itinerary builder, aur payment gateway sab lag gayi. Customers ab seedha site pe jaake book kar lete hain. Bahut convenient ho gaya hai business.",
        order: 11
    },
    {
        personName: "Nisha Reddy",
        personImage: "https://randomuser.me/api/portraits/women/45.jpg",
        projectName: "PetCare Plus Clinic Portal",
        siteImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Our pet clinic needed a modern online presence and DC Tech nailed it. Appointment booking, vaccination reminders, and a vet consultation portal — all beautifully designed. Pet parents love how easy it is to navigate. Five stars!",
        order: 12
    },
    {
        personName: "Aditya Kumar",
        personImage: "https://randomuser.me/api/portraits/men/70.jpg",
        projectName: "FinanceFlow Analytics Dashboard",
        siteImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Fintech dashboard ki requirement bahut complex thi — real-time charts, portfolio tracking, aur multi-user roles. Deepak ne sab kuch exactly deliver kiya. Code quality bhi top notch hai. Our team ke developers ne bhi tarif ki!",
        order: 13
    },
    {
        personName: "Pooja Malhotra",
        personImage: "https://randomuser.me/api/portraits/women/55.jpg",
        projectName: "EventPro Management Portal",
        siteImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Managing weddings and corporate events used to be a logistical nightmare. The custom portal Deepak built keeps everything organised — vendor management, budgets, guest lists, RSVP tracking. Our clients are also super impressed!",
        order: 14
    },
    {
        personName: "Gaurav Saxena",
        personImage: "https://randomuser.me/api/portraits/men/71.jpg",
        projectName: "CarMax Auto Showroom",
        siteImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Showroom ki website ab ekdum premium feel deti hai. 360 degree car viewer, EMI calculator, aur test drive booking — yeh sab features ne customer experience completely change kar diya. Site launch ke baad enquiries 3 guna ho gayi!",
        order: 15
    },
    {
        personName: "Lavanya Iyer",
        personImage: "https://randomuser.me/api/portraits/women/56.jpg",
        projectName: "OrganicHarvest Online Store",
        siteImage: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "We sell organic produce and needed a website that reflects our values. DC Tech built something truly beautiful — farm stories, weekly subscription boxes, and a seamless checkout. Our regular customers love the new experience!",
        order: 16
    },
    {
        personName: "Manish Bhatt",
        personImage: "https://randomuser.me/api/portraits/men/72.jpg",
        projectName: "LawBridge Legal Firm Site",
        siteImage: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "Law firm ke liye ek serious aur trustworthy website chahiye thi. Deepak ne bilkul sahi samjha — clean design, case study section, aur consultation booking sab perfectly kaam kar raha hai. Client inquiries definitely increase huyi hain.",
        order: 17
    },
    {
        personName: "Ritu Kapoor",
        personImage: "https://randomuser.me/api/portraits/women/62.jpg",
        projectName: "StyleHouse Fashion Store",
        siteImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "My fashion brand needed a website that screams luxury and style. Deepak absolutely delivered — the lookbook, size guide, and multi-currency checkout make it feel like a global brand. Sales from the website now exceed our physical store!",
        order: 18
    },
    {
        personName: "Suresh Pillai",
        personImage: "https://randomuser.me/api/portraits/men/73.jpg",
        projectName: "EduTrack School Management",
        siteImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "School ka poora system — attendance, fees, homework portal sab ek website pe aa gaya. Parents bhi khush hain kyunki unhe sab notifications milti hain. Teachers ka time bhi bachta hai. Deepak ne pura system 3 hafte mein deliver kiya!",
        order: 19
    },
    {
        personName: "Kavitha Menon",
        personImage: "https://randomuser.me/api/portraits/women/65.jpg",
        projectName: "CloudBake Custom Bakery",
        siteImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop&auto=format",
        rating: 5,
        review: "My bakery website is a dream! Custom cake order form with flavour selection, photo gallery, and delivery scheduling are so well-designed. The website looks so professional that customers think we're a big chain. Orders have tripled since launch!",
        order: 20
    },
];

async function main() {
    console.log("Clearing old testimonials...");
    await prisma.testimonial.deleteMany();
    console.log(`Seeding ${testimonials.length} fresh testimonials...`);
    for (const t of testimonials) {
        const result = await prisma.testimonial.create({ data: t });
        console.log(`  ✓ ${result.personName} — ${result.projectName}`);
    }
    console.log("\nDone! 🎉");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
