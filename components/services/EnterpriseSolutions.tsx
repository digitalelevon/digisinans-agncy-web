"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const EnterpriseSolutions = () => {
    return (
        <section className="py-24 md:py-44 bg-white relative overflow-hidden">
            <div className="container mx-auto px-5 md:px-6">
                <div className="max-w-[1440px] mx-auto">
                    <div className="bg-zinc-900 rounded-[3rem] md:rounded-[5rem] p-8 md:p-36 text-white relative overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)]">
                        <div className="absolute inset-0 z-0 opacity-25">
                            <div className="absolute top-[-30%] right-[-10%] w-[80%] h-[80%] bg-indigo-600 rounded-full blur-[160px]" />
                            <div className="absolute bottom-[-30%] left-[-10%] w-[70%] h-[70%] bg-blue-600 rounded-full blur-[140px]" />
                        </div>

                        <div className="relative z-10 max-w-5xl mx-auto text-center">
                            <h2 className="text-5xl md:text-9xl font-black mb-12 leading-[0.85] tracking-tighter reveal-on-scroll" suppressHydrationWarning>
                                Scale with <span className="text-indigo-400 italic font-serif">Market Leaders.</span>
                            </h2>
                            <p className="text-xl md:text-3xl text-zinc-400 font-medium mb-18 max-w-2xl mx-auto leading-relaxed reveal-on-scroll" suppressHydrationWarning>
                                Stop settling for mid-tier results. Partner with Kerala&apos;s elite agency for extreme digital expansion.
                            </p>
                            <div className="reveal-on-scroll mt-12" suppressHydrationWarning>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-8 py-5 md:px-16 md:py-9 bg-white text-zinc-900 text-lg md:text-2xl font-black rounded-[2rem] md:rounded-[2.5rem] hover:bg-indigo-600 hover:text-white transition-all shadow-3xl active:scale-95 group"
                                >
                                    Deploy Framework <ArrowRight size={24} className="ml-3 md:ml-5 group-hover:translate-x-3 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnterpriseSolutions;
