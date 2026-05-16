"use client";

import { usePathname } from "next/navigation";
import { handleLogout } from "@/app/actions";
import {
    MessageSquare,
    FolderGit2,
    Settings,
    Cpu,
    Star,
    LogOut,
    ExternalLink,
    FileText
} from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Inbox", href: "/admin", icon: <MessageSquare className="w-5 h-5" /> },
        { name: "Projects", href: "/admin/projects", icon: <FolderGit2 className="w-5 h-5" /> },
        { name: "Testimonials", href: "/admin/testimonials", icon: <Star className="w-5 h-5" /> },
        { name: "Technologies", href: "/admin/technologies", icon: <Cpu className="w-5 h-5" /> },
        { name: "Site Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
        { name: "Pages", href: "/admin/pages", icon: <FileText className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-72 flex-shrink-0 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col relative z-20">
            <div className="p-8 border-b border-white/5">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
                    DNet Studio Admin
                </h1>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-semibold">Management Console</p>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                {navLinks.map((link) => {
                    const isActive = link.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(link.href);

                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? "bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {link.icon}
                            <span className="font-medium text-sm">{link.name}</span>
                        </a>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5 space-y-2">
                <a
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
                >
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-medium text-sm">View Live Site</span>
                </a>
                <form action={handleLogout}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Sign Out</span>
                    </button>
                </form>
            </div>
        </aside>
    );
}
