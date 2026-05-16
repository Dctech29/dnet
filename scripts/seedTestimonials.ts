// scripts/seedTestimonials.ts — Run with: npx ts-node scripts/seedTestimonials.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testimonials = [
    { personName: "Arjun Mehta", personImage: "https://i.pravatar.cc/150?img=11", projectName: "AstroVeda Platform", siteImage: "https://picsum.photos/seed/astroveda/600/400", rating: 5, review: "DC Tech delivered an absolutely stunning astrology platform. The UI is breathtaking and users love the seamless experience. Deepak's attention to detail is unmatched!", order: 1 },
    { personName: "Priya Sharma", personImage: "https://i.pravatar.cc/150?img=5", projectName: "MediBook Pro", siteImage: "https://picsum.photos/seed/medibook/600/400", rating: 5, review: "Our appointment booking system went live in just 3 weeks. The dashboard is intuitive and patients find it very easy to use. Highly recommended!", order: 2 },
    { personName: "Rahul Verma", personImage: "https://i.pravatar.cc/150?img=15", projectName: "ShopVibe Store", siteImage: "https://picsum.photos/seed/shopvibe/600/400", rating: 5, review: "Sales increased 40% after DC Tech redesigned our e-commerce site. The new checkout flow is lightning fast and the design is premium.", order: 3 },
    { personName: "Sneha Patel", personImage: "https://i.pravatar.cc/150?img=9", projectName: "LuxeHomes Portal", siteImage: "https://picsum.photos/seed/luxehomes/600/400", rating: 5, review: "The real estate portal DC Tech built for us is simply gorgeous. Property listings look incredible and inquiries have doubled since launch.", order: 4 },
    { personName: "Vikram Singh", personImage: "https://i.pravatar.cc/150?img=13", projectName: "FitZone Academy", siteImage: "https://picsum.photos/seed/fitzone/600/400", rating: 5, review: "Our fitness coaching platform looks world-class. Deepak understood our vision perfectly and delivered beyond expectations. Clients love it!", order: 5 },
    { personName: "Ananya Gupta", personImage: "https://i.pravatar.cc/150?img=1", projectName: "BiteDelight Restaurant", siteImage: "https://picsum.photos/seed/bitedelight/600/400", rating: 5, review: "Online orders jumped 60% after our new restaurant website launched. The food photography integration and ordering flow are perfect.", order: 6 },
    { personName: "Karan Joshi", personImage: "https://i.pravatar.cc/150?img=17", projectName: "LearnSphere Academy", siteImage: "https://picsum.photos/seed/learnsphere/600/400", rating: 4, review: "The e-learning platform is exactly what our students needed. Video streaming, quizzes, and certificates all work flawlessly. Great work!", order: 7 },
    { personName: "Deepika Nair", personImage: "https://i.pravatar.cc/150?img=27", projectName: "GlowSkin Clinic", siteImage: "https://picsum.photos/seed/glowskin/600/400", rating: 5, review: "Our beauty clinic website is absolutely elegant. Bookings increased significantly and clients always compliment how professional it looks.", order: 8 },
    { personName: "Rohit Agarwal", personImage: "https://i.pravatar.cc/150?img=33", projectName: "TechNova Startup", siteImage: "https://picsum.photos/seed/technova/600/400", rating: 5, review: "DC Tech built our SaaS landing page and it converts incredibly well. The animations and design feel like a Silicon Valley startup. Amazing!", order: 9 },
    { personName: "Meera Krishnan", personImage: "https://i.pravatar.cc/150?img=41", projectName: "YogaBliss Studio", siteImage: "https://picsum.photos/seed/yogabliss/600/400", rating: 5, review: "The yoga studio website has a calming, beautiful aesthetic that perfectly represents our brand. Class bookings are now fully automated.", order: 10 },
    { personName: "Saurabh Tiwari", personImage: "https://i.pravatar.cc/150?img=57", projectName: "TravelEase Agency", siteImage: "https://picsum.photos/seed/travelease/600/400", rating: 5, review: "Our travel agency website now rivals international competitors. The destination galleries and booking system are world-class. Thank you Deepak!", order: 11 },
    { personName: "Nisha Reddy", personImage: "https://i.pravatar.cc/150?img=25", projectName: "PetCare Plus", siteImage: "https://picsum.photos/seed/petcareplus/600/400", rating: 5, review: "The pet care platform is adorable and functional. Appointment scheduling, vet directory, and online consultation all work perfectly.", order: 12 },
    { personName: "Aditya Kumar", personImage: "https://i.pravatar.cc/150?img=7", projectName: "FinanceFlow Dashboard", siteImage: "https://picsum.photos/seed/financeflow/600/400", rating: 5, review: "The fintech dashboard is sleek, secure, and intuitive. Our users love the clean charts and real-time data. Professional work at every level.", order: 13 },
    { personName: "Pooja Malhotra", personImage: "https://i.pravatar.cc/150?img=47", projectName: "EventPro Manager", siteImage: "https://picsum.photos/seed/eventpro/600/400", rating: 4, review: "Managing events is now a breeze thanks to the platform DC Tech built. Client portals, ticketing, and vendor management all in one place.", order: 14 },
    { personName: "Gaurav Saxena", personImage: "https://i.pravatar.cc/150?img=65", projectName: "CarMax Showroom", siteImage: "https://picsum.photos/seed/carmax/600/400", rating: 5, review: "The automotive showroom website is stunning. 360-degree views, EMI calculator, and test drive booking have transformed our customer experience.", order: 15 },
    { personName: "Lavanya Iyer", personImage: "https://i.pravatar.cc/150?img=44", projectName: "OrganicHarvest Shop", siteImage: "https://picsum.photos/seed/organic/600/400", rating: 5, review: "Our organic produce store looks beautiful and sustainable. Subscription boxes, farm stories, and weekly delivery scheduling work seamlessly.", order: 16 },
    { personName: "Manish Bhatt", personImage: "https://i.pravatar.cc/150?img=53", projectName: "LawBridge Firm", siteImage: "https://picsum.photos/seed/lawbridge/600/400", rating: 5, review: "The law firm website projects exactly the trust and professionalism our clients expect. Case consultation booking has improved significantly.", order: 17 },
    { personName: "Ritu Kapoor", personImage: "https://i.pravatar.cc/150?img=32", projectName: "StyleHouse Fashion", siteImage: "https://picsum.photos/seed/stylehouse/600/400", rating: 5, review: "DC Tech transformed our fashion brand online. The lookbook, AR try-on, and checkout experience are exactly what modern fashion retail demands.", order: 18 },
    { personName: "Suresh Pillai", personImage: "https://i.pravatar.cc/150?img=69", projectName: "EduTrack School", siteImage: "https://picsum.photos/seed/edutrack/600/400", rating: 5, review: "The school management portal has completely digitized our operations. Parents love the attendance tracking and fee payment portal.", order: 19 },
    { personName: "Kavitha Menon", personImage: "https://i.pravatar.cc/150?img=38", projectName: "CloudBake Bakery", siteImage: "https://picsum.photos/seed/cloudbake/600/400", rating: 5, review: "Our online bakery is gorgeous! Custom cake orders, flavor galleries, and delivery scheduling all work perfectly. Orders have tripled!", order: 20 },
];

async function main() {
    console.log(`Seeding ${testimonials.length} testimonials...`);
    for (const t of testimonials) {
        const result = await prisma.testimonial.create({ data: t });
        console.log(`Created: ${result.personName} - ${result.projectName}`);
    }
    console.log('Done!');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
