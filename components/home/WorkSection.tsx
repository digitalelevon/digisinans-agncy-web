
"use client";

import React from 'react';
import { ArrowUpRight, Zap, Target, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const WorkSection = ({ caseStudies = [] }: { caseStudies?: any[] }) => {
    return (
        <section id="work" className="py-16 md:py-40 bg-white overflow-hidden content-lazy relative">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/40 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/30 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Group */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-32">
                        <div className="max-w-3xl reveal-on-scroll">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-4 py-1.5 bg-zinc-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Proven Performance
                                </span>
                                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest border-l border-zinc-200 pl-3">
                                    v1.2 Hub
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter mb-8">
                                Market <span className="text-indigo-600 italic font-serif">Dominance</span> <br />
                                Reports.
                            </h2>
                            <p className="text-zinc-500 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl border-l-4 border-indigo-600 pl-8">
                                An archive of precision-engineered growth strategies and their results. We don&apos;t just execute; we transform market positions.
                            </p>
                        </div>
                        <div className="reveal-on-scroll delay-200 w-full md:w-auto">
                            <Link
                                href="/work"
                                className="inline-flex items-center justify-center w-full md:w-auto gap-4 px-10 py-5 bg-white border border-zinc-200 text-zinc-900 font-black rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all shadow-xl shadow-zinc-200/50 active:scale-95 group"
                            >
                                View All Intelligence <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Reports Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {caseStudies.length > 0 ? caseStudies.slice(0, 4).map((study, idx) => {
                            const link = `/work/${study.id || study.slug}`;
                            const image = study.cover_image || study.image;
                            const metric = study.result_metric || study.metric;
                            const category = study.service_category || study.category;

                            return (
                                <Link
                                    href={link}
                                    key={study.id || study.slug}
                                    className="reveal-on-scroll group block"
                                    style={{ transitionDelay: `${idx * 150}ms` }}
                                >
                                    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden mb-8 md:mb-10 bg-zinc-100 border border-zinc-200/60 transition-all duration-700 hover:shadow-[0_80px_120px_-40px_rgba(79,70,229,0.15)] group-hover:border-indigo-100 group-hover:-translate-y-3">
                                        {image ? (
                                            <Image
                                                src={image}
                                                alt={study.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover transition-all duration-[2000ms] group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                                                <BarChart3 size={80} />
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        {/* Result Tag */}
                                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 p-6 md:p-8 glass rounded-[2rem] md:rounded-[2.5rem] border border-white/20 backdrop-blur-md translate-y-10 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-2xl">
                                            <div className="flex items-center gap-3 text-indigo-600 mb-2">
                                                <Zap size={20} fill="currentColor" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Verified Outcome</span>
                                            </div>
                                            <p className="text-3xl md:text-6xl font-black text-zinc-900">{metric}</p>
                                        </div>

                                        <div className="absolute top-6 right-6 md:top-10 md:right-10">
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-zinc-900 shadow-2xl scale-0 group-hover:scale-100 transition-all duration-500 transform group-hover:rotate-12 border border-zinc-100">
                                                <ArrowUpRight size={24} className="md:w-7 md:h-7" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 md:px-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-widest">{category}</span>
                                            <span className="w-8 h-[1px] bg-zinc-200" />
                                            <span className="text-zinc-400 text-[9px] font-black uppercase tracking-widest">{study.client}</span>
                                        </div>
                                        <h4 className="text-3xl md:text-5xl font-black text-zinc-900 group-hover:text-indigo-600 transition-colors duration-500 leading-tight tracking-tighter uppercase">
                                            {study.title}
                                        </h4>
                                    </div>
                                </Link>
                            );
                        }) : (
                            <div className="col-span-full py-40 text-center border border-dashed border-zinc-200 rounded-[4rem]">
                                <p className="text-zinc-400 font-black uppercase tracking-widest">Awaiting deployment of new reports.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkSection;
