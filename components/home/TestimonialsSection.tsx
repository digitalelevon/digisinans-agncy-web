"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

const TESTIMONIALS = [
    {
        id: 1,
        quote: "We were looking for the best digital marketing agency in Malappuram to rebrand QLAND, and Digisinans exceeded expectations. Their high-end design and AI-driven insights gave us a global identity.",
        name: "Adnan Khader",
        role: "Founder, QLAND",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        companyLogo: "/logos/qland.png",
        bgColor: "bg-purple-500"
    },
    {
        id: 2,
        quote: "Their AI-integrated marketing strategies are lightyears ahead. Our lead generation doubled in just two months. Finally, a team in Kerala that truly understands performance marketing.",
        name: "Rahul Menon",
        role: "CEO, TechVibe",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        companyLogo: "/logos/techvibe.png",
        bgColor: "bg-blue-500"
    },
    {
        id: 3,
        quote: "From logo design to full-stack web development, the precision is unmatched. They engineered a digital ecosystem for us that actually converts visitors into customers.",
        name: "Fathima R.",
        role: "Marketing Head, AZA Fancies",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        companyLogo: "/logos/aza.png",
        bgColor: "bg-indigo-500"
    },
    {
        id: 4,
        quote: "I checked many agencies, but Digisinans stands out as the best branding agency in Tirur. The creative brilliance combined with data-driven SEO is a rare find.",
        name: "Arjun Das",
        role: "Director, Urban Builders",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        companyLogo: "/logos/urban.png",
        bgColor: "bg-emerald-500"
    },
    {
        id: 5,
        quote: "Our MF Perfume launch was a massive success thanks to their social media strategy. If you want results, this is the AI integrated agency to work with.",
        name: "Suhail P.",
        role: "Founder, MF Perfumes",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        companyLogo: "/logos/mf.png",
        bgColor: "bg-rose-500"
    }
];



const TestimonialsSection = () => {
    useScrollReveal();

    return (
        <section className="py-24 md:py-32 bg-[#020617] relative overflow-hidden text-white">
            {/* Background Gradient Spot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-5 md:px-6 relative z-10 mb-20">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-10 md:mb-20 reveal-on-scroll">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 rounded-full mb-6 md:mb-8 shadow-sm backdrop-blur-sm">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Customer Stories</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-2 md:mb-4">
                        Voices of Success
                    </h2>
                    <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-indigo-200">
                        and Satisfaction
                    </h3>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden fade-sides">

                    {/* Row 1: Left Scroll */}
                    <div className="flex gap-6 mb-6 animate-marquee-left hover:pause">
                        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                            <div
                                key={`row1-${idx}`}
                                className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] bg-[#0F0F16] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-white/5 hover:border-indigo-500/30 transition-colors duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex gap-1 text-zinc-500 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="#9ca3af" className="text-gray-400" />
                                        ))}
                                    </div>
                                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-medium">
                                        &quot;{t.quote}&quot;
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="relative flex items-center">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#0F0F16] relative z-10">
                                            <Image
                                                src={t.image}
                                                alt={t.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${t.bgColor} flex items-center justify-center -ml-4 md:-ml-5 border-2 border-[#0F0F16] relative z-0`}>
                                            <span className="font-black text-xs text-white opacity-80">{t.name.charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm md:text-base">{t.name}</h4>
                                        <p className="text-zinc-500 text-xs md:text-sm">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Right Scroll (Different Offset/Speed illusion by reversing or shifting) */}
                    <div className="flex gap-6 animate-marquee-right hover:pause">
                        {[...TESTIMONIALS.slice(2), ...TESTIMONIALS, ...TESTIMONIALS.slice(0, 2)].map((t, idx) => (
                            <div
                                key={`row2-${idx}`}
                                className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] bg-[#0F0F16] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-white/5 hover:border-indigo-500/30 transition-colors duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex gap-1 text-zinc-500 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="#9ca3af" className="text-gray-400" />
                                        ))}
                                    </div>
                                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-medium">
                                        &quot;{t.quote}&quot;
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="relative flex items-center">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#0F0F16] relative z-10">
                                            <Image
                                                src={t.image}
                                                alt={t.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${t.bgColor} flex items-center justify-center -ml-4 md:-ml-5 border-2 border-[#0F0F16] relative z-0`}>
                                            <span className="font-black text-xs text-white opacity-80">{t.name.charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm md:text-base">{t.name}</h4>
                                        <p className="text-zinc-500 text-xs md:text-sm">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Logos */}

            </div>

            <style jsx>{`
                .animate-marquee-left {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee-right {
                    animation: marquee-reverse 45s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
                .fade-sides {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

export default TestimonialsSection;
