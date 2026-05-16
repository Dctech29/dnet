import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("session")?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith("/login");
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

    try {
        // Attempt to verify the session
        const parsedSession = sessionCookie ? await decrypt(sessionCookie) : null;

        if (isAdminRoute && !parsedSession) {
            // Redirect unauthenticated users trying to access /admin to /login
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (isAuthPage && parsedSession) {
            // Redirect authenticated users trying to access /login back to /admin
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // If decryption fails (e.g., token expired or tampered), clear it and redirect
        if (isAdminRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
