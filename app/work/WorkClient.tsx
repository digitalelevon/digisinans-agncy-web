
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Zap, Briefcase, FileText, Globe, TrendingUp, Activity } from 'lucide-react';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';
import { CaseStudy } from '@/lib/types';

interface WorkClientProps {
    studies: CaseStudy[];
}

export default function WorkClient({ studies }: WorkClientProps) {
    useScrollReveal();

    return (
        <main className="min-h-screen bg-white text-zinc-900 pb-32">
            {/* Enhanced Hero Section */}
            {/* Enhanced Hero Section - Centered Modern UI */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#fafafa]">
                {/* Background Aesthetics */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[100%] bg-indigo-50/30 rounded-full blur-[150px] opacity-60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.4]" />
                </div>

                <div className="container mx-auto px-5 md:px-6 relative z-10 text-center">
                    <div className="max-w-5xl mx-auto flex flex-col items-center">

                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-indigo-100 rounded-full shadow-lg shadow-indigo-100/20 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                                Verified Performance Data
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-[3rem] xs:text-[3.5rem] sm:text-6xl md:text-7xl lg:text-9xl font-black leading-[0.95] tracking-tighter text-zinc-900 mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100">
                            Elite Digital <br className="hidden md:block" />
                            <span className="text-indigo-600 font-serif italic relative inline-block">
                                Transformations
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>.
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                            We don&apos;t just claim performance; we prove it. Explore a vetted archive of <span className="text-zinc-900 font-bold">market-defining campaigns</span> that generated massive ROI for global brands.
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl border-t border-zinc-200 pt-12 animate-in fade-in duration-1000 delay-300">
                            <div className="text-center group">
                                <p className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors">$12M<span className="text-indigo-600 text-3xl align-top">+</span></p>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Client Revenue</p>
                            </div>
                            <div className="text-center group">
                                <div className="flex items-center justify-center gap-1 text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors">
                                    <TrendingUp size={28} className="text-indigo-500" /> 420%
                                </div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Avg. Growth</p>
                            </div>
                            <div className="text-center group">
                                <p className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors">98.5%</p>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Retention Rate</p>
                            </div>
                            <div className="text-center group">
                                <p className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors">50<span className="text-indigo-600 text-3xl align-top">+</span></p>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Industries Dominated</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Layout Section */}
            <section className="container mx-auto px-5 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    {studies.length > 0 ? studies.map((study, idx) => (
                        <Link
                            key={study.id}
                            href={`/work/${study.id}`}
                            className="group block relative reveal-on-scroll"
                        >
                            <div className="relative aspect-[16/10] rounded-[3.5rem] overflow-hidden bg-zinc-100 border border-zinc-200/60 mb-10 transition-all duration-700 hover:shadow-[0_80px_120px_-40px_rgba(49,46,129,0.15)] group-hover:border-indigo-100 group-hover:-translate-y-3">
                                {study.cover_image ? (
                                    <Image
                                        src={study.cover_image}
                                        alt={study.title}
                                        fill
                                        className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                        priority={idx < 2}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                                        <Briefcase size={80} />
                                    </div>
                                )}

                                {/* Overlay for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="absolute top-10 left-10 scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-left">
                                    <span className="px-6 py-3 bg-white/90 backdrop-blur-md border border-white text-zinc-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                        {study.service_category}
                                    </span>
                                </div>

                                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                    <div className="flex items-center gap-2 text-white font-black uppercase text-sm tracking-widest bg-indigo-600 px-6 py-3 rounded-2xl shadow-xl translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                                        <Zap size={18} fill="currentColor" /> {study.result_metric}
                                    </div>
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-zinc-900 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500 delay-100 shadow-2xl border border-zinc-200">
                                        <ArrowUpRight size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 space-y-4">
                                <div className="flex items-center gap-3 text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                    <span className="w-2 h-2 rounded-full bg-indigo-600" /> {study.client}
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-zinc-900 leading-[0.9] tracking-tighter group-hover:text-indigo-600 transition-colors duration-500 italic font-serif uppercase">
                                    {study.title}
                                </h3>
                                <div className="pt-6 flex items-center gap-4 text-zinc-400 font-black uppercase text-[10px] tracking-[0.4em] group-hover:text-zinc-900 transition-colors">
                                    <span className="w-8 h-[1px] bg-zinc-300 group-hover:w-12 group-hover:bg-indigo-600 transition-all duration-500" />
                                    Explore Tactical Analysis
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-full py-60 text-center bg-zinc-50 border border-dashed border-zinc-200 rounded-[5rem] flex flex-col items-center justify-center gap-8 group hover:border-indigo-200 transition-colors">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-zinc-200 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-700 shadow-inner">
                                <FileText size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter italic font-serif">Strategic Silence</h3>
                                <p className="text-zinc-500 font-bold max-w-xs mx-auto text-lg leading-relaxed">
                                    Awaiting deployment of new reports. Our next market-defining study is currently under technical review.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
