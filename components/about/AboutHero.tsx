"use client";

import React from 'react';

const AboutHero = () => {
    return (
        <section className="relative py-16 md:py-32 bg-[#fafafa] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[350px] md:w-[800px] h-[350px] md:h-[800px] bg-indigo-50/70 rounded-full blur-[80px] md:blur-[140px] translate-x-1/4 -translate-y-1/4 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-50/50 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-indigo-100 rounded-full mb-10 shadow-lg shadow-indigo-100/10">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Elite Performance Hub</span>
                    </div>

                    <h1 className="text-[2.5rem] xs:text-[3.2rem] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[110px] font-black leading-[0.9] tracking-tighter text-zinc-900 mb-12 reveal-on-scroll">
                        Built to Make <br />
                        Brands <span className="text-indigo-600 italic font-serif relative inline-block">
                            Heard
                            <svg className="absolute w-full h-4 -bottom-2 left-0 text-indigo-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>.
                    </h1>

                    <div className="relative max-w-2xl mx-auto mb-12">
                        <p className="text-lg md:text-2xl text-zinc-500 font-medium leading-relaxed reveal-on-scroll delay-100">
                            Recognized as the <span className="text-zinc-900 font-bold">best digital marketing agency in Tirur, Malappuram, Kerala</span>, DIGISINANS exists to help brands stand out and scale through elite creative excellence and data-backed performance strategy.
                        </p>

                        {/* Floating Performance Indicator */}
                        <div className="hidden lg:block absolute -right-32 top-0 p-6 bg-white rounded-3xl border border-zinc-100 shadow-2xl rotate-6 animate-bounce-slow">
                            <div className="text-3xl font-black text-indigo-600 tabular-nums tracking-tighter">98.5%</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Growth Score</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
