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
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[3.5rem] bg-zinc-900 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] transition-all duration-700 hover:-translate-y-4 border border-zinc-200/20">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                                <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
                                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-indigo-300 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                                            {member.role}
                                        </div>

                                        <h4 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic font-serif group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-700">
                                            {member.name}
                                        </h4>

                                        <p className="text-zinc-300 font-medium text-base md:text-lg leading-relaxed mb-10 max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-4 group-hover:translate-y-0">
                                            {member.bio}
                                        </p>

                                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 translate-y-4 group-hover:translate-y-0">
                                            {[Linkedin, Instagram, Mail].map((Icon, i) => (
                                                <button key={i} className="w-12 h-12 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 hover:scale-110">
                                                    <Icon size={18} strokeWidth={2.5} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-100 group-hover:scale-0 transition-all duration-500">
                                    <ArrowUpRight size={32} strokeWidth={1.5} />
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
