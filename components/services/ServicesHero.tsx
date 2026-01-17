"use client";

import React from 'react';
import { TrendingUp, Search, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FloatingCard = ({ icon, label, value, delay, className }: { icon: React.ReactNode, label: string, value: string, delay: string, className: string }) => (
    <div className={`absolute p-5 glass border border-white/50 rounded-2xl shadow-2xl z-20 animate-float-refined hidden xl:block ${className}`} style={{ animationDelay: delay }}>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</p>
                <p className="text-sm font-black text-zinc-900">{value}</p>
            </div>
        </div>
    </div>
);

const ServicesHero = () => {
    return (
        <section className="relative pt-24 pb-12 md:pt-36 md:pb-24 bg-white overflow-hidden">
            {/* Visual Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-[-10%] w-[70%] h-[70%] bg-indigo-100/40 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-100/30 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(#4f46e515_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                <FloatingCard
                    icon={<TrendingUp size={20} />}
                    label="Avg ROI Lift"
                    value="+214%"
                    delay="0.1s"
                    className="left-[8%] top-[20%]"
                />
                <FloatingCard
                    icon={<Search size={20} />}
                    label="SEO Visibility"
                    value="Top 3%"
                    delay="1.2s"
                    className="right-[8%] top-[25%]"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 rounded-full mb-8 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-indigo-900/70">Elite Performance Engineering</span>
                    </div>

                    <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl xl:text-[100px] font-black leading-tight md:leading-[0.9] tracking-tighter text-zinc-900 mb-8 translate-z-0">
                        High-Impact <br />
                        <span className="text-indigo-600 italic font-serif block mt-4 relative inline-block">
                            Growth Services.
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-indigo-600/30 blur-md rounded-full" />
                        </span>
                    </h1>

                    <p className="text-base md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-3xl mx-auto mb-12">
                        We deploy hyper-specialized <span className="text-zinc-900 font-bold">SEO, Branding, and Performance Marketing</span> engines for Kerala&apos;s leading brands.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-3 md:px-14 md:py-8 bg-zinc-900 text-white font-black rounded-3xl flex items-center justify-center group hover:bg-indigo-600 active:scale-95 transition-all shadow-2xl"
                        >
                            Scale My Project
                            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link
                            href="#frameworks"
                            className="w-full sm:w-auto px-8 py-3 md:px-14 md:py-8 bg-white border border-zinc-200 text-zinc-900 font-black rounded-3xl hover:border-zinc-900 transition-all text-center group active:scale-95"
                        >
                            Our Methodology
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesHero;
