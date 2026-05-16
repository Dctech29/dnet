import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding default pages...");

    await prisma.page.upsert({
        where: { slug: 'privacy-policy' },
        update: {},
        create: {
            title: 'Privacy Policy',
            slug: 'privacy-policy',
            content: `We value your privacy. This policy outlines how DNet Studio collects and uses your data.

1. Information Collection
We collect information when you fill out our contact form. This includes your name, email address, and phone number.

2. Data Usage
The collected data is used exclusively to respond to your inquiries and improve our services.

3. Third-Party Disclosure
We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.`
        }
    });

    await prisma.page.upsert({
        where: { slug: 'terms-of-service' },
        update: {},
        create: {
            title: 'Terms of Service',
            slug: 'terms-of-service',
            content: `Welcome to DNet Studio. By using our website and services, you agree to these terms.

1. Services Provided
DNet Studio provides web development and design services as outlined in customized proposals.

2. Client Responsibilities
Clients agree to provide necessary assets and timely feedback to ensure project deadlines are met.

3. Limitation of Liability
DNet Studio is not liable for any indirect, incidental, or consequential damages arising from the use of our services.`
        }
    });

    console.log("Pages seeded successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
