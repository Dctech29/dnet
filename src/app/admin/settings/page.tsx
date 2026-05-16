import { getSiteSettings, updateSiteSettings } from "@/app/actions";
import { Save } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const { settings } = await getSiteSettings();

    // Default values if nothing is in the DB yet
    const defaults = {
        phone: "+91 89504 96925",
        email: "deepaksolutions29@gmail.com",
        whatsapp: "https://wa.me/918950496925",
        github: "https://github.com/Dctech29",
        linkedin: "https://www.linkedin.com/in/deepak-bishnoi/",
        address: "Mangali, Hisar 125001 Haryana, India"
    };

    const currentLinks = settings || defaults;

    return (
        <div>
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-2">Site Contact Settings</h2>
                <p className="text-gray-400">Manage the dynamic links, phone numbers, and addresses shown across the frontend website.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 max-w-3xl">
                <form action={async (formData) => {
                    "use server";
                    await updateSiteSettings(formData);
                }} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Phone Number */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-400">Primary Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            defaultValue={currentLinks.phone}
                            required
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={currentLinks.email}
                            required
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="whatsapp" className="text-sm font-medium text-gray-400">WhatsApp Link</label>
                        <input
                            type="url"
                            id="whatsapp"
                            name="whatsapp"
                            defaultValue={currentLinks.whatsapp}
                            required
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">Example: https://wa.me/918950496925</p>
                    </div>

                    {/* GitHub */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="github" className="text-sm font-medium text-gray-400">GitHub Profile URL</label>
                        <input
                            type="url"
                            id="github"
                            name="github"
                            defaultValue={currentLinks.github}
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="linkedin" className="text-sm font-medium text-gray-400">LinkedIn Profile URL</label>
                        <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            defaultValue={currentLinks.linkedin}
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* Physical Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="address" className="text-sm font-medium text-gray-400">Office Address</label>
                        <textarea
                            id="address"
                            name="address"
                            defaultValue={currentLinks.address}
                            required
                            rows={3}
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                    </div>

                    <div className="md:col-span-2 pt-4 border-t border-white/10 mt-2">
                        <button
                            type="submit"
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                        >
                            <Save className="w-5 h-5" /> Save Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
