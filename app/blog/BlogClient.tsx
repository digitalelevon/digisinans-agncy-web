
"use client";

import React, { useEffect, useState } from 'react';
import {
    ArrowRight,
    Calendar,
    User,
    Mail,
    ArrowUpRight,
    Clock,
    Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

import { BlogPost } from '@/lib/types';

const BlogCard = ({ post, index }: { post: BlogPost, index: number }) => (
    <div className={`reveal-on-scroll group flex flex-col h-full bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.12)] hover:border-indigo-100/50 hover:-translate-y-3`} style={{ transitionDelay: `${index * 100}ms` }}>
        <div className="relative aspect-[16/10] overflow-hidden">
            {post.cover_image ? (
                <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2"
                />
            ) : (
                <div className="w-full h-full bg-zinc-50 flex items-center justify-center text-zinc-200">
                    <ImageIcon size={48} />
                </div>
            )}
            <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors duration-700" />
        </div>
        <div className="p-8 md:p-10 flex flex-col flex-grow relative">
            <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 rounded-full border border-zinc-100">
                    <Calendar size={12} className="text-indigo-600" />
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> 6 MIN</span>
            </div>
            <h3 className="text-2xl font-black text-zinc-900 mb-6 leading-tight group-hover:text-indigo-600 transition-colors duration-500">
                {post.title}
            </h3>
            {post.excerpt && (
                <p className="text-zinc-500 font-medium mb-10 line-clamp-2 leading-relaxed text-sm">
                    {post.excerpt}
                </p>
            )}
            <div className="mt-auto pt-8 border-t border-zinc-50 flex items-center justify-between">
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-zinc-900 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all group/link">
                    Explore Insight <ArrowUpRight size={16} className="text-indigo-600 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </div>
);

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
    useScrollReveal();

    const featuredPost = posts[0];
    const regularPosts = posts.slice(1);

    return (
        <div className="pt-24 md:pt-32">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 bg-[#fafafa] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]" />
                    {/* Decorative Elements */}
                    <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-white/50 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl rotate-12 flex flex-col items-center justify-center animate-float-refined hidden lg:flex">
                        <span className="text-3xl font-black text-indigo-600 underline">24+</span>
                        <span className="text-[8px] font-black uppercase tracking-tighter text-zinc-400">Monthly Insights</span>
                    </div>
                </div>
                <div className="container mx-auto px-5 md:px-6 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-full mb-10 shadow-sm reveal-on-scroll">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-indigo-900/70 font-sans">Verified Strategic Intelligence</span>
                        </div>

                        <h1 className="text-[2.2rem] xs:text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-black leading-[1.1] sm:leading-[0.95] md:leading-[0.9] tracking-tighter text-zinc-900 mb-10 reveal-on-scroll">
                            Engineering <br />
                            <span className="text-indigo-600 italic font-serif block mt-2 relative">
                                Digital Echoes.
                                <span className="absolute -bottom-4 left-0 w-full h-1 bg-indigo-600/20 blur-sm rounded-full" />
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto reveal-on-scroll delay-100">
                            Deep-dives into performance SEO, brand psychology, and elite digital architecture. Re-coding the way you scale.
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Filter - Hidden for now as categories were removed from schema */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y border-zinc-100 py-6 hidden">
                <div className="container mx-auto px-5 md:px-6">
                    <div className="flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar gap-4 md:gap-8">
                        <button className="whitespace-nowrap px-6 py-2 rounded-full text-sm font-black bg-zinc-900 text-white shadow-lg shadow-zinc-200">
                            All Insights
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {
                featuredPost && (
                    <section className="py-24 md:py-40 bg-white">
                        <div className="container mx-auto px-5 md:px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="reveal-on-scroll group relative bg-zinc-900 rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)]">
                                    <div className="absolute top-12 left-12 z-20">
                                        <div className="flex gap-3">
                                            <span className="px-5 py-2.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                                Flagship Insight
                                            </span>
                                            <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                                                9 MIN READ
                                            </span>
                                        </div>
                                    </div>

                                    <div className="lg:w-3/5 relative min-h-[500px] overflow-hidden">
                                        {featuredPost.cover_image ? (
                                            <Image
                                                src={featuredPost.cover_image}
                                                alt={featuredPost.title}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                                priority
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                                                <ImageIcon size={80} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent lg:hidden" />
                                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-900 to-transparent hidden lg:block" />
                                    </div>

                                    <div className="lg:w-2/5 p-12 md:p-16 xl:p-24 flex flex-col justify-center text-white relative z-10 bg-zinc-900">
                                        <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-10">
                                            <span className="flex items-center gap-2">
                                                <Calendar size={14} className="text-indigo-400" />
                                                {new Date(featuredPost.created_at).toLocaleDateString()}
                                            </span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            <span className="text-zinc-400 uppercase">Latest Strategy</span>
                                        </div>

                                        <h2 className="text-4xl md:text-5xl xl:text-7xl font-black mb-10 leading-[0.9] tracking-tighter group-hover:text-indigo-400 transition-colors duration-700">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-zinc-400 text-lg xl:text-xl font-medium mb-16 leading-relaxed line-clamp-4 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div>
                                            <Link href={`/blog/${featuredPost.slug}`} className="group/btn inline-flex items-center gap-4 px-12 py-7 bg-white text-zinc-900 font-black rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-3xl active:scale-95">
                                                Read Analysis <ArrowUpRight size={26} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Blog Grid */}
            <section className="py-24 bg-zinc-50">
                <div className="container mx-auto px-5 md:px-6">
                    <div className="max-w-7xl mx-auto">
                        {regularPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                                {regularPosts.map((post, idx) => (
                                    <BlogCard key={post.id} post={post} index={idx} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-40">
                                <p className="text-2xl font-black text-zinc-900 mb-4">No results found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA Section */}
            <section className="py-24 md:py-40 bg-white overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-zinc-100 rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-[1px] border-zinc-100 rounded-full pointer-events-none" />

                <div className="container mx-auto px-5 md:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
                        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-100">
                            <Mail size={36} />
                        </div>

                        <h2 className="text-4xl md:text-7xl font-black text-zinc-900 mb-8 leading-tight">
                            Get Insights Delivered <br /> To Your <span className="text-indigo-600 italic font-serif">Inbox</span>.
                        </h2>

                        <p className="text-xl md:text-2xl text-zinc-500 font-medium mb-16 max-w-2xl mx-auto">
                            Join 1,000+ brands staying ahead of the digital curve. No spam, only high-value strategy.
                        </p>

                        <form className="max-w-lg mx-auto flex flex-col md:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-8 py-6 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-zinc-900"
                                required
                            />
                            <button
                                type="submit"
                                className="px-10 py-6 bg-zinc-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl whitespace-nowrap"
                            >
                                Join Newsletter
                            </button>
                        </form>

                        <p className="mt-8 text-zinc-400 text-sm font-medium">
                            Want help implementing these strategies? <Link href="/contact" className="text-indigo-600 hover:underline">Talk to a strategist today.</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Final Site CTA */}
            <section className="py-20 md:py-32 bg-zinc-900">
                <div className="container mx-auto px-5 md:px-6">
                    <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">
                            Ready to Scale Your <br /> <span className="text-indigo-400 italic font-serif">Digital Authority?</span>
                        </h2>
                        <div className="flex justify-center mt-12">
                            <Link
                                href="/contact"
                                className="px-12 py-6 bg-indigo-600 text-white font-black rounded-2xl hover:bg-white hover:text-zinc-900 transition-all shadow-2xl active:scale-95 flex items-center gap-3"
                            >
                                Start Your Journey <ArrowUpRight size={22} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
}
