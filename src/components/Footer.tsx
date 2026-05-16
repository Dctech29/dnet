"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {
    pages?: { slug: string; title: string }[];
}

export default function Footer({ pages = [] }: FooterProps) {
    return (
        <footer className="border-t border-white/10 bg-black pt-16 pb-8">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 cursor-pointer inline-flex group">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.4)] bg-black">
                                <Image
                                    src="/dnet-studio-logo.webp"
                                    alt="DNet Studio Logo"
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                                DNet Studio
                            </span>
                        </Link>
                        <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                            We engineer scalable, high-performance web applications with world-class user interfaces. Elevate your digital presence today.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/Dctech29" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Github className="w-5 h-5 text-gray-300" />
                            </a>
                            <a href="https://www.linkedin.com/in/deepak-bishnoi/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Linkedin className="w-5 h-5 text-gray-300" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact & Location</h4>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a href="mailto:deepaksolutions29@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors break-all">
                                    <Mail className="w-4 h-4 flex-shrink-0" /> deepaksolutions29@gmail.com
                                </a>
                            </li>
                            <li className="text-gray-400 text-sm mt-4 leading-relaxed">
                                <strong className="text-white block mb-1">DNet Studio Location</strong>
                                Mangali,<br />
                                Hisar 125001<br />
                                Haryana, India
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} DNet Studio. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        {pages.length > 0 ? (
                            pages.map(page => (
                                <Link key={page.slug} href={`/${page.slug}`} className="hover:text-white transition-colors">
                                    {page.title}
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
