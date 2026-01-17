"use client";

import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/services/ServiceCard';
import IconMapper from '@/components/IconMapper';

const ExpertiseSection = ({ services = SERVICES }: { services?: any[] }) => {
    return (
        <section id="expertise" className="py-10 md:py-40 bg-[#fafafa] overflow-hidden relative content-lazy">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] md:[background-size:32px_32px] opacity-[0.2] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-32 items-end">
                        <div className="lg:col-span-8 reveal-on-scroll" suppressHydrationWarning>
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-indigo-100/50 text-indigo-600 rounded-full mb-8 shadow-sm">
                                <IconMapper name="Sparkles" size={16} className="animate-pulse" />
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Precision Arsenal</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter">
                                Built for <br />
                                <span className="text-indigo-600 italic font-serif">Pure Performance</span>.
                            </h2>
                            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Elite SEO & Performance Marketing Kerala</p>
                        </div>
                        <div className="lg:col-span-4 reveal-on-scroll delay-100" suppressHydrationWarning>
                            <p className="text-zinc-500 font-medium leading-relaxed text-lg md:text-xl border-l-[3px] border-indigo-600 pl-8 mb-4">
                                As the <span className="text-zinc-900 font-bold">best digital marketing agency in Kerala</span>, we deploy hyper-specialized tactics—from SEO to Meta Ads—engineered to secure your market dominance.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
                        {services.map((service, idx) => (
                            <ServiceCard key={service.id || idx} service={service} index={idx} />
                        ))}


                        {/* Call‑to‑Action Card */}
                        <div className="reveal-on-scroll group p-10 md:p-14 bg-zinc-900 rounded-[3rem] flex flex-col justify-between text-white relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-200/20 hover:-translate-y-3 optimize-gpu" suppressHydrationWarning>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-4">Ready to Transform Your Brand?</h3>
                                <p className="mb-6">From graphic design to SEO, SMM, SEM, and high-performance web development – we&apos;ve got you covered.</p>
                                <Link href="/contact" className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-full font-black">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertiseSection;
