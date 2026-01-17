"use client";

import React from 'react';
import Image from 'next/image';

const StorySection = () => {
    return (
        <section className="py-16 md:py-40 bg-zinc-50 content-lazy relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto">
                    <div className="reveal-on-scroll order-2 lg:order-1" suppressHydrationWarning>
                        <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-indigo-200"></span> Our Story
                        </h2>
                        <h3 className="text-4xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter mb-10">
                            The Bridge Between <br />
                            <span className="text-indigo-600 italic font-serif relative inline-block">
                                Aesthetics
                                <svg className="absolute w-full h-2 -bottom-1 left-0 text-indigo-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span> & <span className="text-indigo-600 italic font-serif">Performance</span>.
                        </h3>
                        <div className="space-y-8 text-xl text-zinc-500 font-medium leading-relaxed">
                            <p>
                                <span className="text-zinc-900 font-black">Digisinans</span> was born from a simple realization: in today&apos;s hyper-saturated digital space, brands aren&apos;t just competing for attention—they are competing for survival.
                            </p>
                            <p>
                                As the <span className="text-zinc-900 font-black border-b-2 border-indigo-600">best digital marketing agency in Tirur, Malappuram, Kerala</span>, we have bridged the gap between elite creative excellence and data-driven performance. We don&apos;t just deploy campaigns; we engineer digital echoes that amplify brand authority globally.
                            </p>
                            <div className="p-10 bg-zinc-900 rounded-[3rem] relative overflow-hidden group/quote shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-[60px]" />
                                <div className="relative z-10">
                                    <p className="italic text-indigo-100 text-lg md:text-2xl font-medium leading-relaxed mb-6">
                                        &quot;Our mission is to prove that world-class performance marketing isn&apos;t reserved for Silicon Valley. We build global legacies right here from Malappuram.&quot;
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-px bg-indigo-500"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Sinan MC, Founder</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative reveal-on-scroll delay-200 order-1 lg:order-2 px-4 md:px-0" suppressHydrationWarning>
                        <div className="aspect-[4/5] md:aspect-square bg-zinc-900 rounded-[3rem] overflow-hidden relative group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-white/5 p-8 md:p-12 flex flex-col justify-between">
                            {/* Matrix Grid Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(rgba(79,70,229,0.15)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />

                            <div className="relative z-10">
                                <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-8 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                    Performance Architecture v4.0
                                </h4>

                                <div className="space-y-6">
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden w-full relative">
                                        <div className="absolute inset-y-0 left-0 bg-indigo-500 w-[85%] animate-in slide-in-from-left duration-1000" />
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter italic font-serif">
                                            +412% <br /><span className="text-indigo-400 text-sm md:text-xl not-italic font-sans uppercase tracking-[0.2em]">Efficiency</span>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                            <div className="text-indigo-300 text-[10px] font-black uppercase mb-1">Status</div>
                                            <div className="text-white text-xs font-bold">Optimizing...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Animated Graph Area */}
                            <div className="relative h-48 md:h-64 mt-12 mb-12">
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    {/* Area Fill */}
                                    <path
                                        d="M 0 200 L 0 150 Q 100 130, 150 160 T 300 100 T 400 40 L 400 200 Z"
                                        fill="url(#story-graph-fill)"
                                        className="opacity-20"
                                    />
                                    {/* Main Line */}
                                    <path
                                        d="M 0 150 Q 100 130, 150 160 T 300 100 T 400 40"
                                        fill="none"
                                        stroke="#6366f1"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        className="drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                                    />

                                    {/* Data Points */}
                                    <circle cx="150" cy="160" r="6" fill="#fff" className="animate-pulse" />
                                    <circle cx="300" cy="100" r="6" fill="#fff" className="animate-pulse" />
                                    <circle cx="400" cy="40" r="8" fill="#6366f1" />

                                    <defs>
                                        <linearGradient id="story-graph-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Floating Tags */}
                                <div className="absolute top-0 right-0 p-3 bg-indigo-600 rounded-xl text-white text-[10px] font-black animate-bounce shadow-2xl">
                                    PEAK PERFORMANCE
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex justify-between items-center relative z-10">
                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-8 h-1 bg-white/20 rounded-full" />
                                    ))}
                                </div>
                                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                                    Real-time Analytics
                                </span>
                            </div>

                            {/* Floating Quote Card - Replaced with a Metric Card for this theme */}
                            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 p-6 md:p-8 bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl max-w-[200px] md:max-w-[240px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                                <div className="text-indigo-400 text-3xl font-black mb-2 leading-none">99.9%</div>
                                <p className="text-white text-xs md:text-sm font-bold uppercase tracking-widest leading-tight">
                                    Campaign uptime & execution accuracy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
