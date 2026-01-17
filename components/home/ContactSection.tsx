"use client";

import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ContactSection = () => {
    return (
        <section id="contact" className="pt-12 md:pt-16 pb-12 md:pb-20 bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.2] pointer-events-none" />

            <div className="container mx-auto px-5 md:px-6 relative z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-zinc-900 rounded-[3rem] md:rounded-[5rem] p-6 md:p-12 lg:p-32 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                        {/* Animated mesh gradient background */}
                        <div className="absolute inset-0 z-0 opacity-40">
                            <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600 rounded-full blur-[120px] animate-pulse" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative z-10 max-w-5xl mx-auto text-center">
                            <h2 className="text-4xl md:text-7xl lg:text-[100px] font-black mb-10 leading-[0.9] tracking-tighter reveal-on-scroll" suppressHydrationWarning>
                                Let&apos;s Build <br />
                                Something That <span className="text-indigo-400 italic font-serif" suppressHydrationWarning>Lasts.</span>
                            </h2>

                            <p className="text-lg md:text-2xl text-zinc-400 font-medium mb-14 max-w-2xl mx-auto leading-relaxed reveal-on-scroll delay-100" suppressHydrationWarning>
                                Invite brands, businesses, and founders to partner with <span className="text-white font-bold" suppressHydrationWarning>Digisinans</span> for meaningful digital growth. We engineer ecosystems for longevity and dominance.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center reveal-on-scroll delay-200" suppressHydrationWarning>
                                <Link href="/contact" className="w-full sm:w-auto px-12 py-7 bg-white text-zinc-900 text-xl font-black rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 group">
                                    Work With Us <ArrowRight className="ml-3 inline-block group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <a href="tel:+917510477475" className="w-full sm:w-auto px-12 py-7 border-2 border-white/20 text-white text-xl font-black rounded-3xl hover:bg-white/10 transition-all flex items-center justify-center active:scale-95 backdrop-blur-sm">
                                    <Phone className="mr-3" size={24} /> Direct Call
                                </a>
                            </div>

                            <div className="mt-16 flex items-center justify-center gap-8 opacity-40 reveal-on-scroll delay-300">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Accepting Partners Q1</span>
                                </div>
                                <div className="h-px w-8 bg-white/20" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Global Reach</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
