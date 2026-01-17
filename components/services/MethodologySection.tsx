"use client";

import React from 'react';
import { Search, Layers, Rocket, BarChart } from 'lucide-react';

const MethodologySection = () => {
    return (
        <section className="py-24 md:py-40 bg-zinc-900 text-white overflow-hidden relative content-lazy">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-5 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-16 reveal-on-scroll">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">The DIGISINANS Method</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                                Engineering Global <br />
                                <span className="text-indigo-400 italic font-serif">Market Dominance.</span>
                            </h2>
                        </div>
                        <p className="text-zinc-400 text-2xl font-medium max-w-md border-l-4 border-indigo-600 pl-10 py-4 opacity-80 italic">
                            We transform brands in Kerala into global leaders through performance engineering.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { title: "Granular Audit", desc: "Discovering untapped market share and technical gaps.", icon: <Search size={32} /> },
                            { title: "Blueprint", desc: "Forging roadmaps for high-velocity conversion.", icon: <Layers size={32} /> },
                            { title: "Precision", desc: "Deployment of performance-first creative assets.", icon: <Rocket size={32} /> },
                            { title: "Scale Engine", desc: "Automating growth loops to relentlessly expand your lead.", icon: <BarChart size={32} /> }
                        ].map((step, idx) => (
                            <div key={idx} className="p-14 bg-white/5 border border-white/10 rounded-[3.5rem] hover:bg-white/[0.08] transition-all group reveal-on-scroll" style={{ transitionDelay: `${idx * 100}ms` }} suppressHydrationWarning>
                                <div className="text-indigo-400 mb-12 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 inline-block">
                                    {step.icon}
                                </div>
                                <h4 className="text-3xl font-black mb-8 tracking-tight group-hover:text-indigo-300 transition-colors uppercase text-[1.4rem]">{step.title}</h4>
                                <p className="text-zinc-400 text-xl font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MethodologySection;
