import AdminSidebar from "@/app/admin/AdminSidebar";
import { handleLogout } from "@/app/actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "DNet Studio - Administration Portal",
    description: "Secure management console for the DNet Studio agency platform",
    robots: "noindex, nofollow"
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-950 text-white font-sans overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
            </div>

            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative z-10 p-8 md:p-12">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
