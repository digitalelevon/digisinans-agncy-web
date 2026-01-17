"use client";

import React from 'react';
import { ArrowRight, Star, TrendingUp, Sparkles, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import GrowthGraph from './GrowthGraph';

const Hero = () => {
    return (
        <header className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-28 md:pb-20 bg-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-100/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 rounded-full mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-1000">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-indigo-900/70 font-sans">Verified Performance Powerhouse</span>
                            </div>

                            <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl xl:text-[100px] font-black leading-tight md:leading-[0.9] tracking-tighter text-zinc-900 mb-6 md:mb-10 animate-in fade-in slide-in-from-left-8 duration-1000" suppressHydrationWarning>
                                Engineering <br />
                                <span className="text-indigo-600 block transition-transform hover:translate-x-2 duration-500 cursor-default italic font-serif" suppressHydrationWarning>Digital Echoes.</span>
                            </h1>

                            <p className="text-base md:text-2xl text-zinc-500 font-medium leading-relaxed mb-10 md:mb-12 max-w-2xl animate-in fade-in slide-in-from-left-12 duration-1000 delay-200" suppressHydrationWarning>
                                We are the <span className="text-zinc-900 font-black border-b-2 border-indigo-100">Best AI Integrated Digital Marketing Agency in Malappuram, Kerala</span>, scaling global brands through elite performance frameworks and high-end design.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-5 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto px-6 py-3 md:px-12 md:py-6 bg-zinc-900 text-white font-black rounded-2xl flex items-center justify-center group hover:bg-indigo-600 active:scale-95 transition-all shadow-xl"
                                    title="Get a high-performance marketing proposal from DIGISINANS"
                                >
                                    Scale My Project
                                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <Link
                                    href="/#expertise"
                                    className="w-full sm:w-auto px-6 py-3 md:px-12 md:py-6 bg-white border border-zinc-200 text-zinc-900 font-black rounded-2xl hover:border-zinc-900 transition-all text-center group active:scale-95"
                                    title="View our digital marketing methodology and services"
                                >
                                    Our Method <span className="inline-block transition-transform group-hover:translate-y-1 ml-1 text-indigo-600">↓</span>
                                </Link>
                            </div>

                            <div className="flex flex-row items-center gap-6 md:gap-8 animate-in fade-in duration-1000 delay-500">
                                <div className="flex -space-x-3 md:-space-x-4">
                                    {[
                                        { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100", name: "Growth Specialist" },
                                        { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100", name: "SEO Expert" },
                                        { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", name: "Performance Marketer" },
                                        { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100", name: "Brand Strategist" }
                                    ].map((partner, i) => (
                                        <div key={partner.url} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-white overflow-hidden shadow-lg relative bg-zinc-100 flex-shrink-0">
                                            <Image
                                                src={partner.url}
                                                alt={`${partner.name} - DIGISINANS Digital Marketing Kerala`}
                                                width={48}
                                                height={48}
                                                className="object-cover w-full h-full"
                                                priority={i < 2}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-1 text-indigo-600 mb-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="md:w-[14px] md:h-[14px]" fill="currentColor" stroke="none" />)}
                                    </div>
                                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Trusted by 150+ Global Founders</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative">
                            {/* Performance Card */}
                            <div className="relative z-10 animate-in fade-in zoom-in duration-1000 delay-200">
                                <div className="p-8 md:p-12 bg-white border border-indigo-50 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors" />

                                    <div className="flex justify-between items-start mb-12">
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2">Live Performance</h4>
                                            <p className="text-3xl font-black text-zinc-900">Conversion Lift</p>
                                        </div>
                                        <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 overflow-hidden relative">
                                            <TrendingUp size={28} />
                                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                        </div>
                                    </div>

                                    <GrowthGraph />

                                    <div className="grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-zinc-50">
                                        <div className="group/stat">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2 group-hover/stat:text-indigo-600 transition-colors">CPA Efficiency</p>
                                            <p className="text-3xl font-black text-zinc-900">-42.8%</p>
                                        </div>
                                        <div className="group/stat">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2 group-hover/stat:text-indigo-600 transition-colors">Organic Reach</p>
                                            <p className="text-3xl font-black text-indigo-600">+210%</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Micro Cards */}
                                <div className="absolute -top-10 -right-8 p-6 glass border border-white/50 rounded-2xl shadow-2xl z-20 animate-float-refined hidden xl:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                                            <Sparkles size={16} />
                                        </div>
                                        <p className="text-xs font-black text-zinc-900 whitespace-nowrap">Meta Ads Active</p>
                                    </div>
                                </div>

                                <div className="absolute -bottom-12 -left-8 p-6 glass border border-white/50 rounded-2xl shadow-2xl z-20 animate-bounce-refined hidden xl:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                            <Globe size={16} />
                                        </div>
                                        <p className="text-xs font-black text-zinc-900 whitespace-nowrap">Rank #1 Results Delivered</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Orbs */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
