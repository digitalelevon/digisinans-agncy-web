"use client";

import React from 'react';
import { Shield, Sparkles, Users, Target, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ValuesSection = () => {
    return (
        <section className="py-24 md:py-40 bg-zinc-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-5 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 md:mb-32 reveal-on-scroll" suppressHydrationWarning>
                        <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-6 flex items-center justify-center gap-3">
                            <span className="w-8 h-px bg-indigo-500/50"></span> Our Commitment <span className="w-8 h-px bg-indigo-500/50"></span>
                        </h2>
                        <h3 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                            Values That Define Our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 italic font-serif relative">
                                Partnerships
                                <span className="absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></span>
                            </span>.
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { title: "Transparency", icon: <Shield size={32} /> },
                            { title: "Quality over Quantity", icon: <Sparkles size={32} /> },
                            { title: "Long-term Partnership", icon: <Users size={32} /> },
                            { title: "Results that Matter", icon: <Target size={32} /> },
                            { title: "Continuous Improvement", icon: <TrendingUp size={32} /> }
                        ].map((value, idx) => (
                            <div
                                key={idx}
                                className="group p-8 py-12 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-700 flex flex-col items-center text-center reveal-on-scroll relative overflow-hidden hover:-translate-y-2"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                                suppressHydrationWarning
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 blur-[40px] group-hover:bg-indigo-500/30 transition-colors" />

                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shadow-2xl mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                                    {value.icon}
                                </div>
                                <h4 className="text-lg md:text-xl font-bold leading-tight group-hover:text-indigo-200 transition-colors tracking-tight relative z-10 px-2">{value.title}</h4>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTASection = () => {
    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-5 md:px-6">
                <div className="bg-zinc-900 rounded-[3rem] md:rounded-[5rem] p-10 md:p-32 text-white text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group">
                    {/* Animated Background */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/30 rounded-full blur-[120px] group-hover:bg-indigo-600/40 transition-colors duration-1000" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 text-indigo-300 rounded-full mb-12 reveal-on-scroll shadow-xl" suppressHydrationWarning>
                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white">Status: Ready for Transmission</span>
                        </div>

                        <h2 className="text-5xl md:text-8xl lg:text-[110px] font-black mb-12 leading-[0.85] tracking-tighter reveal-on-scroll delay-100 mix-blend-overlay opacity-90" suppressHydrationWarning>
                            Architect Your <br className="hidden md:block" />
                            <span className="text-white italic font-serif relative inline-block opacity-100 mix-blend-normal">
                                Digital Legacy.
                                <svg className="absolute w-full h-4 -bottom-2 left-0 text-indigo-500 -z-10 hidden md:block" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h2>

                        <p className="text-xl md:text-3xl text-zinc-400 font-medium mb-16 max-w-3xl mx-auto leading-relaxed reveal-on-scroll delay-200">
                            Partner with <span className="text-white font-bold">DIGISINANS</span> to transform your brand from existent to exceptional through high-performance strategy.
                        </p>

                        <div className="flex justify-center reveal-on-scroll delay-300" suppressHydrationWarning>
                            <Link
                                href="/contact"
                                className="group/btn relative px-16 py-8 bg-white text-zinc-900 text-2xl font-black rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.3)] active:scale-95 flex items-center gap-5 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-5">
                                    Begin Construction <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { ValuesSection, CTASection };
