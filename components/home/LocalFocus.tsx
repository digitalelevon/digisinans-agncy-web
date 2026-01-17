"use client";

import React from 'react';
import { Globe, Star } from 'lucide-react';
import Image from 'next/image';

const LocalFocus = () => {
    return (
        <section id="about" className="py-16 md:py-44 bg-[#0a0a0a] text-white overflow-hidden relative content-lazy">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <div className="container mx-auto px-5 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    <div className="lg:col-span-6 reveal-on-scroll order-2 lg:order-1" suppressHydrationWarning>
                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8" suppressHydrationWarning>
                            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Regional Powerhouse</span>
                        </div>

                        <h2 className="text-[2.2rem] xs:text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 md:mb-10 leading-[0.9] tracking-tighter text-white" suppressHydrationWarning>
                            Kerala&apos;s Leading <br />
                            <span className="text-indigo-400 block transition-transform hover:translate-x-2 duration-500 cursor-default italic font-serif mt-2" suppressHydrationWarning>Digital Authority.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed mb-12 max-w-xl">
                            Based in <span className="text-white font-bold">Tirur, Malappuram</span>, we are the <span className="text-white font-bold underline decoration-indigo-500 underline-offset-4">best digital marketing agency in Tirur</span> and Kerala, bridging the gap between local enterprise and global standards.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all group">
                                <div className="text-5xl font-black text-white mb-3 group-hover:text-indigo-400 transition-colors">98%</div>
                                <div className="p-px w-10 bg-indigo-600/50 mb-4" />
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">Local SEO Accuracy</p>
                            </div>
                            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all group">
                                <div className="text-5xl font-black text-white mb-3 group-hover:text-indigo-400 transition-colors">15+</div>
                                <div className="p-px w-10 bg-indigo-600/50 mb-4" />
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">Market Specialists</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative reveal-on-scroll delay-200 order-1 lg:order-2" suppressHydrationWarning>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-indigo-600/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="rounded-[3.5rem] overflow-hidden aspect-[4/5] shadow-2xl relative z-10 border border-white/10">
                                <Image
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=75&w=1200"
                                    alt="Team at DIGISINANS - Best Digital Marketing Agency in Kerala"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                <div className="absolute bottom-10 left-10 right-10 z-20">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                            <Globe size={24} />
                                        </div>
                                        <div className="h-px flex-grow bg-white/20" />
                                    </div>
                                    <h4 className="text-2xl font-black text-white leading-tight">
                                        Bridging Kerala&apos;s talent with <br /> <span className="text-indigo-400 italic font-serif">global demands</span>.
                                    </h4>
                                </div>
                            </div>

                            <div className="relative mt-8 xl:mt-0 xl:absolute xl:-bottom-10 xl:-right-6 p-8 bg-white text-zinc-900 rounded-[2.5rem] shadow-2xl w-full max-w-sm mx-auto xl:max-w-[280px] z-30 block xl:animate-bounce-refined">
                                <div className="flex gap-1 text-indigo-600 mb-4">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" stroke="none" />)}
                                </div>
                                <p className="font-extrabold italic leading-snug text-lg mb-4">
                                    &quot;DIGISINANS is truly the best digital marketing agency in Kerala.&quot;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Retail Partner</p>
                                        <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Growth Case Study</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocalFocus;
