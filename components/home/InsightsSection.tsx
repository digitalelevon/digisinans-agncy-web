
"use client";

import React from 'react';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const InsightsSection = ({ blogs = [] }: { blogs?: any[] }) => {
    // Take latest 3 blogs
    const latestBlogs = blogs.slice(0, 3).map((blog, idx) => ({
        id: blog.id || idx,
        title: blog.title || "Elite Digital Insight",
        category: blog.category || "Strategy",
        image: blog.image || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=75&w=800`,
        time: blog.time || "8 MIN READ",
        slug: blog.slug
    }));

    // Fallback if no blogs
    const displayBlogs = latestBlogs.length > 0 ? latestBlogs : [
        {
            id: 1,
            title: "The Future of Brand Identity in the AI Era",
            category: "Branding",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=75&w=800",
            time: "9 MIN READ",
            slug: "#"
        },
        {
            id: 2,
            title: "Mastering Core Web Vitals for 2025 SEO",
            category: "SEO & Growth",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=75&w=800",
            time: "12 MIN READ",
            slug: "#"
        },
        {
            id: 3,
            title: "UX Psychology: Why Minimalist Design Converts",
            category: "Design & UX",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=75&w=800",
            time: "7 MIN READ",
            slug: "#"
        }
    ];

    return (
        <section className="py-16 md:py-48 bg-[#fafafa] overflow-hidden content-lazy relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.2] -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-16 md:mb-32 text-center md:text-left">
                        <div className="max-w-2xl reveal-on-scroll w-full md:w-auto flex flex-col items-center md:items-start">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-indigo-100 text-indigo-600 rounded-full mb-8 shadow-sm">
                                <Sparkles size={14} className="animate-pulse" />
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Knowledge Base</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter">
                                Verified Strategic <br />
                                <span className="text-indigo-600 font-sans">Intelligence</span>.
                            </h2>
                        </div>
                        <Link href="/blog" className="reveal-on-scroll delay-200 group flex items-center gap-4 px-8 py-4 bg-zinc-900 text-white rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-zinc-200 w-auto max-w-xs mx-auto md:mx-0">
                            Explore Full Library <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
                        {displayBlogs.map((post, idx) => (
                            <Link key={post.id} href={post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`} className="reveal-on-scroll group block" style={{ transitionDelay: `${idx * 150}ms` }}>
                                <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden mb-10 shadow-2xl transition-all duration-700 hover:-translate-y-4 border border-zinc-200/50">
                                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[2.5s] group-hover:scale-110 group-hover:rotate-2" loading="lazy" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

                                    <div className="absolute top-6 left-6 md:top-10 md:left-10">
                                        <span className="px-4 py-2 md:px-5 md:py-2.5 bg-white/90 backdrop-blur-md border border-white rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-900 shadow-xl">
                                            {post.category}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col items-start translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                        <div className="flex items-center gap-3 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                            <Clock size={16} />
                                            {post.time}
                                        </div>
                                        <h4 className="text-xl md:text-3xl font-black text-white leading-tight tracking-tighter uppercase group-hover:text-indigo-100 transition-colors">
                                            {post.title}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InsightsSection;
