import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (not your regular password)
    },
});

export async function sendLeadEmail({
    name,
    phone,
    email,
    body,
}: {
    name: string;
    phone: string;
    email?: string;
    body?: string;
}) {
    const toEmail = process.env.EMAIL_USER;
    if (!toEmail || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not set. Skipping email notification.");
        return;
    }

    await transporter.sendMail({
        from: `"DNet Studio Contact Form" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `📞 New Callback Request from ${name}`,
        html: `
            <div style="font-family:Arial,sans-serif;max-width:520px;background:#0f0f10;color:#e5e7eb;padding:32px;border-radius:12px;border:1px solid #1f2937;">
                <h2 style="color:#a78bfa;margin-top:0;">🚀 New Lead — DNet Studio</h2>
                <table style="width:100%;border-collapse:collapse;">
                    <tr>
                        <td style="padding:10px 0;color:#9ca3af;font-size:13px;width:120px;">Name</td>
                        <td style="padding:10px 0;font-weight:600;font-size:15px;">${name}</td>
                    </tr>
                    <tr style="border-top:1px solid #1f2937;">
                        <td style="padding:10px 0;color:#9ca3af;font-size:13px;">Mobile</td>
                        <td style="padding:10px 0;font-weight:600;font-size:15px;">
                            <a href="tel:${phone}" style="color:#60a5fa;text-decoration:none;">${phone}</a>
                        </td>
                    </tr>
                    ${email && email !== "notprovided@dnet.studio" ? `
                    <tr style="border-top:1px solid #1f2937;">
                        <td style="padding:10px 0;color:#9ca3af;font-size:13px;">Email</td>
                        <td style="padding:10px 0;font-size:14px;">
                            <a href="mailto:${email}" style="color:#60a5fa;text-decoration:none;">${email}</a>
                        </td>
                    </tr>` : ""}
                    ${body && body !== "(No message provided)" ? `
                    <tr style="border-top:1px solid #1f2937;">
                        <td style="padding:10px 0;color:#9ca3af;font-size:13px;vertical-align:top;">Message</td>
                        <td style="padding:10px 0;font-size:14px;line-height:1.6;">${body}</td>
                    </tr>` : ""}
                </table>
                <div style="margin-top:24px;padding:16px;background:#1f2937;border-radius:8px;font-size:13px;color:#9ca3af;">
                    Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                </div>
                <a href="tel:${phone}" style="display:inline-block;margin-top:20px;background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
                    📞 Call ${name} Now
                </a>
            </div>
        `,
    });
}
