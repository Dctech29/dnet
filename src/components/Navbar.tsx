"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.01 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${isScrolled
        ? "bg-black/60 backdrop-blur-xl border-white/10 py-3 shadow-[0_1px_30px_rgba(0,0,0,0.4)]"
        : "bg-transparent border-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.4)] bg-black">
            <img src="/dnet-studio-logo.webp" alt="DNet Studio Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
            DNet Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-3 text-sm font-medium mr-2">
            <a href="tel:+918950496925" className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full hover:bg-blue-600/30 transition-colors border border-blue-500/20">
              <Phone className="w-4 h-4" /> +91 89504 96925
            </a>
            <a href="https://wa.me/918950496925" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-600/20 text-green-400 px-4 py-2 rounded-full hover:bg-green-600/30 transition-colors border border-green-500/20">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
          <Link href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Services</Link>
          <Link href="#stack" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Tech Stack</Link>
          <Link href="#projects" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Projects</Link>
          <Link href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About Us</Link>
          <a href="tel:+918950496925" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-950/98 backdrop-blur-xl border-t border-white/10 mt-3 px-5 py-5 flex flex-col gap-1 shadow-xl">

          {/* Quick contact buttons */}
          <div className="flex gap-2 mb-3">
            <a href="tel:+918950496925" className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 text-blue-400 px-3 py-2.5 rounded-xl border border-blue-500/20 text-sm">
              <Phone className="w-4 h-4" /> Call
            </a>
            <a href="https://wa.me/918950496925" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 text-green-400 px-3 py-2.5 rounded-xl border border-green-500/20 text-sm">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          {/* Main nav links */}
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-1 mt-1 mb-1">Navigation</p>
          <Link href="#services" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm">Services</Link>
          <Link href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm">Projects</Link>
          <Link href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm">Testimonials</Link>
          <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm">Contact Us</Link>

          <div className="border-t border-white/5 my-2" />

          <Link href="#stack" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm">Tech Stack</Link>
          <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm">About Us</Link>

          <div className="border-t border-white/5 my-2" />

          {/* Legal pages */}
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-1 mb-1">Legal</p>
          <Link href="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs">Privacy Policy</Link>
          <Link href="/terms-of-service" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs">Terms of Service</Link>

          {/* CTA */}
          <a href="tel:+918950496925" onClick={() => setIsMobileMenuOpen(false)} className="mt-3 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center gap-2 text-sm">
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>
      )}
    </motion.header>
  );
}
