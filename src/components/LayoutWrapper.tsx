"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({
    children,
    header,
    footer
}: {
    children: React.ReactNode;
    header: React.ReactNode;
    footer: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

    return (
        <>
            {!isAdmin && header}
            {children}
            {!isAdmin && footer}
        </>
    );
}
