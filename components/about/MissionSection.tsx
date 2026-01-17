"use client";

import React from 'react';
import { Globe, Sparkles, Zap, TrendingUp } from 'lucide-react';

const MissionSection = () => {
    return (
        <section className="py-16 md:py-40 bg-zinc-900 text-white overflow-hidden relative content-lazy">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-indigo-600/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-16 md:mb-20 items-end">
                        <div className="lg:col-span-7 reveal-on-scroll" suppressHydrationWarning>
                            <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-6 flex items-center gap-2">
                                <span className="w-8 h-px bg-indigo-400/50"></span> Our Mission
                            </h2>
                            <h3 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                                From <span className="text-zinc-600 line-through decoration-2 decoration-indigo-500/50">Existent</span> <br />
                                To <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 italic font-serif relative">
                                    Exceptional
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent opacity-50 rounded-full"></span>
                                </span>.
                            </h3>
                        </div>
                        <div className="lg:col-span-5 reveal-on-scroll delay-100" suppressHydrationWarning>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <p className="text-zinc-300 text-lg md:text-xl font-medium leading-relaxed">
                                    Transforming businesses through the synergy of <span className="text-white font-bold">strong visual identity</span>, strategic thinking, and performance execution.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Visibility",
                                description: "We ensure you're seen by the right audience through precision targeting.",
                                icon: <Globe className="text-white" size={32} />
                            },
                            {
                                title: "Aesthetics",
                                description: "Crafting identities that command attention and build instant trust.",
                                icon: <Sparkles className="text-white" size={32} />
                            },
                            {
                                title: "Synergy",
                                description: "Seamless integration of design and marketing for maximum impact.",
                                icon: <Zap className="text-white" size={32} />
                            },
                            {
                                title: "Growth",
                                description: "Focusing purely on ROI, revenue, and bottom-line business impact.",
                                icon: <TrendingUp className="text-white" size={32} />
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group p-10 rounded-[3rem] bg-zinc-800/40 border border-white/5 hover:bg-zinc-800 hover:border-indigo-500/50 transition-all duration-700 reveal-on-scroll relative overflow-hidden hover:-translate-y-2"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                                suppressHydrationWarning
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[60px] group-hover:bg-indigo-600/20 transition-colors" />
                                <div className="w-20 h-20 rounded-2xl bg-zinc-700/50 border border-white/5 flex items-center justify-center mb-10 group-hover:bg-indigo-600 transition-all duration-500 shadow-xl group-hover:shadow-indigo-500/40 group-hover:rotate-[10deg] group-hover:scale-110">
                                    {item.icon}
                                </div>
                                <h4 className="text-2xl font-black mb-4 text-white group-hover:text-indigo-400 transition-colors tracking-tight">{item.title}</h4>
                                <p className="text-zinc-400 font-medium leading-relaxed text-base group-hover:text-zinc-200 transition-colors">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
