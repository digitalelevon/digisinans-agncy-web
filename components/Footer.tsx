
"use client";

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Instagram, Linkedin, Facebook, Twitter, Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        services: [
            { name: "Branding & Identity", path: "/services#branding" },
            { name: "Web Design & Development", path: "/services#web-design" },
            { name: "Digital Marketing & Growth", path: "/services#marketing" },
            { name: "Social Media Marketing", path: "/services#smm" },
            { name: "SEO & Content Strategy", path: "/services#content" },
            { name: "Graphic Design", path: "/services#graphic-design" }
        ],
        company: [
            { name: "Our Work", path: "/work" },
            { name: "About Agency", path: "/about" },
            { name: "Insights & Blog", path: "/blog" },
            { name: "Contact Us", path: "/contact" },
            { name: "Careers", path: "/contact" }
        ]
    };

    return (
        <footer className="bg-white border-t border-zinc-100 relative overflow-hidden font-sans">
            {/* Subtle Texture Pattern - Reduced Opacity */}
            <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="container mx-auto px-6 md:px-10 lg:px-12 relative z-10 pt-20 pb-12">

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column (SEO focused description) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="inline-block" onClick={scrollToTop}>
                            <Logo className="!text-3xl" />
                        </Link>
                        <p className="text-zinc-500 leading-relaxed text-sm md:text-base max-w-sm">
                            <strong>Digisinans</strong> is the <strong>best AI integrated digital marketing agency in Malappuram, Kerala</strong>, building high-performance web ecosystems for global brand dominance.
                        </p>

                        <div className="flex gap-3">
                            {[
                                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/digisinans", label: "Digisinans LinkedIn" },
                                { icon: <Instagram size={18} />, href: "https://www.instagram.com/digisinans?igsh=N3g0Z3ltN21qaDkw", label: "Digisinans Instagram" },
                                { icon: <Facebook size={18} />, href: "https://www.facebook.com/share/1JtQcekX9J/", label: "Digisinans Facebook" },
                                { icon: <Twitter size={18} />, href: "https://x.com/DIGISINANS", label: "Digisinans X" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Column (Keyword Rich) */}
                    <div className="lg:col-span-3 space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Core Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.path}
                                        className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors flex items-center group"
                                        title={`Expert ${link.name} Services`}
                                    >
                                        <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-indigo-500" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.path}
                                        className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Locations (Local SEO) */}
                    <div className="lg:col-span-3 space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Global Operations</h4>

                        <div className="space-y-6">
                            <div className="group">
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Growth Hotline</p>
                                <a href="tel:+917510477475" className="text-base font-bold text-zinc-900 hover:text-indigo-600 transition-colors flex items-center gap-2">
                                    <Phone size={16} className="text-indigo-600" /> +91 7510 477 475
                                </a>
                            </div>

                            <div className="group">
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Business Enquiries</p>
                                <a href="mailto:ops@digisinans.in" className="text-base font-bold text-zinc-900 hover:text-indigo-600 transition-colors flex items-center gap-2">
                                    <Mail size={16} className="text-indigo-600" /> ops@digisinans.in
                                </a>
                            </div>

                            <div className="pt-4 border-t border-zinc-100">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                                        <MapPin size={14} className="text-zinc-400" />
                                        <span>Malappuram, <strong>Kerala</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                                        <Globe size={14} className="text-zinc-400" />
                                        <span>Corporate Zone, <strong>Dubai</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-500 font-medium">
                    <p>&copy; {currentYear} Digisinans Agency. All Rights Reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
                        <div className="hidden md:block w-px h-3 bg-zinc-200" />
                        <span className="flex items-center gap-2 text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Systems Active
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
