"use client";

import React from 'react';

import { Zap, BarChart3, Target, Rocket } from 'lucide-react';

const WhySection = () => {
    return (
        <section className="py-24 md:py-40 bg-white content-lazy relative">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-zinc-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-5 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32 reveal-on-scroll" suppressHydrationWarning>
                    <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 inline-flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> Reasons for Excellence
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    </h2>
                    <h3 className="text-4xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter">
                        The Digisinans <br />
                        <span className="text-indigo-600 italic font-serif relative inline-block">
                            Advantage.
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {[
                        {
                            title: "Seamless Integration",
                            description: "Unlike agencies that focus only on design or only on marketing, we integrate both to create a cohesive powerhouse for your brand.",
                            icon: <Zap size={32} />
                        },
                        {
                            title: "Data-Driven Creative",
                            description: "Our creative identities aren't just pretty faces—they are backed by SEO frameworks and performance marketing data.",
                            icon: <BarChart3 size={32} />
                        },
                        {
                            title: "Design for Conversion",
                            description: "We don't design for awards; we design for sales. Every element is optimized to guide your potential customers toward action.",
                            icon: <Target size={32} />
                        },
                        {
                            title: "Measurable Growth",
                            description: "Our strategies are built for scale. We provide transparent reporting on metrics that actually impact your business growth.",
                            icon: <Rocket size={32} />
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="group p-10 md:p-14 bg-white rounded-[3.5rem] border border-zinc-100 hover:border-indigo-100/50 hover:bg-zinc-50/50 hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.1)] transition-all duration-700 reveal-on-scroll relative overflow-hidden" style={{ transitionDelay: `${idx * 100}ms` }} suppressHydrationWarning>
                            {/* Background Number */}
                            <div className="absolute -bottom-8 -right-8 text-[12rem] font-black text-zinc-50 group-hover:text-indigo-50/60 transition-colors duration-700 select-none pointer-events-none leading-none tracking-tighter z-0">
                                0{idx + 1}
                            </div>

                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-900 mb-10 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-zinc-100">
                                    {item.icon}
                                </div>

                                <h4 className="text-2xl md:text-3xl font-black text-zinc-900 mb-6 group-hover:text-indigo-600 transition-colors tracking-tighter leading-none">{item.title}</h4>
                                <p className="text-lg text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-600 transition-colors max-w-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhySection;
