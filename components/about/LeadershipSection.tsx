"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Linkedin, Instagram, Mail } from 'lucide-react';

const LeadershipSection = () => {
    return (
        <section className="py-24 md:py-48 bg-zinc-50 relative overflow-hidden content-lazy">
            {/* Background Enhancement: Dot Grid & Gradient Orb */}
            <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-5 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto mb-20 md:mb-40 reveal-on-scroll" suppressHydrationWarning>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-900/5 text-zinc-900 rounded-full mb-10 border border-zinc-900/5">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">The Visionaries</span>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter">
                                Architects of <br />
                                <span className="font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                    Brand Growth
                                </span>.
                            </h3>
                        </div>
                        <div className="max-w-lg pb-2">
                            <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
                                Uniting creative brilliance with data-driven precision to build the next generation of digital dominance.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
                    {[
                        {
                            name: "Sinan MC",
                            role: "Founder & Creative Director",
                            image: "/sinan_mc.png",
                            bio: "The creative force combining refined design aesthetics with high-performance marketing frameworks."
                        },
                        {
                            name: "Sinan VK",
                            role: "Co-Founder",
                            image: "/sinan_vk.png",
                            bio: "The operational architect ensuring engineering-level precision in every campaign delivery."
                        }
                    ].map((member, idx) => (
                        <div key={idx} className="group relative reveal-on-scroll" suppressHydrationWarning style={{ transitionDelay: `${idx * 200}ms` }}>
                            {/* Card Wrapper: Desktop has the stylized overlay card, Mobile is a clean vertical stack */}
                            <div className="flex flex-col md:block relative md:aspect-[4/5] md:overflow-hidden md:rounded-[3.5rem] md:bg-zinc-900 md:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] md:transition-all md:duration-700 md:hover:-translate-y-4 md:border md:border-zinc-200/20">

                                {/* Image Container */}
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] md:rounded-none md:absolute md:inset-0">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover object-top transition-transform duration-[2.5s] md:group-hover:scale-110 opacity-100 md:opacity-90 md:group-hover:opacity-100"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    {/* Desktop-only Polish Overlays */}
                                    <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                                    <div className="hidden md:block absolute inset-0 bg-indigo-900/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Desktop-only Visual Indicator */}
                                    <div className="hidden md:flex absolute top-8 right-8 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white items-center justify-center opacity-100 group-hover:scale-0 transition-all duration-500">
                                        <ArrowUpRight size={32} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="pt-8 md:pt-0 md:absolute md:inset-0 md:p-14 md:flex md:flex-col md:justify-end">
                                    <div className="md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                        {/* Role Badge */}
                                        <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-indigo-50 md:bg-white/10 md:backdrop-blur-md rounded-full border border-indigo-100 md:border-white/10 text-indigo-600 md:text-indigo-300 font-black text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 w-fit">
                                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-indigo-500 md:bg-indigo-400 animate-pulse"></span>
                                            {member.role}
                                        </div>

                                        {/* Name */}
                                        <h4 className="text-4xl md:text-6xl font-black text-zinc-900 md:text-white leading-[0.9] tracking-tighter mb-4 md:mb-8 italic font-serif transition-colors duration-500">
                                            {member.name}
                                        </h4>

                                        {/* Bio */}
                                        <p className="text-zinc-600 md:text-zinc-300 font-medium text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-sm md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 delay-100 md:translate-y-4 md:group-hover:translate-y-0">
                                            {member.bio}
                                        </p>

                                        {/* Social Actions (CTA) */}
                                        <div className="flex items-center gap-3 md:gap-4 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 delay-200 md:translate-y-4 md:group-hover:translate-y-0">
                                            {[Linkedin, Instagram, Mail].map((Icon, i) => (
                                                <button key={i} className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-zinc-900 md:bg-white text-white md:text-zinc-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-xl hover:shadow-indigo-500/50 hover:scale-110">
                                                    <Icon size={18} strokeWidth={2.5} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipSection;
