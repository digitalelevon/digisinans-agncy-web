
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Target, Zap, Building2, CheckCircle2, ChevronRight, Share2 } from 'lucide-react';
import { getCaseStudyById } from '@/app/actions/case-study';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const study = await getCaseStudyById(id);

    if (!study) return { title: 'Report Not Found | DIGISINANS' };

    return {
        title: `${study.title} | Case Study | DIGISINANS`,
        description: `Tactical report for ${study.client}: ${study.result_metric} growth in ${study.service_category}.`,
        alternates: {
            canonical: `/work/${id}`,
        },
        openGraph: {
            title: study.title,
            description: `Tactical report for ${study.client}: ${study.result_metric} growth in ${study.service_category}.`,
            images: study.cover_image ? [{ url: study.cover_image }] : [],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: study.title,
            description: `Tactical report for ${study.client}: ${study.result_metric} growth in ${study.service_category}.`,
            images: study.cover_image ? [study.cover_image] : [],
        },
    };
}

export default async function CaseStudyDetailPage({ params }: Props) {
    const { id } = await params;
    const study = await getCaseStudyById(id);

    if (!study) notFound();

    return (
        <article className="min-h-screen bg-white text-zinc-900 pb-32 pt-24 md:pt-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": study.title,
                        "description": `Case study of ${study.client}: ${study.result_metric} growth in ${study.service_category}.`,
                        "image": study.cover_image ? [study.cover_image] : [],
                        "datePublished": study.created_at,
                        "author": [{
                            "@type": "Organization",
                            "name": "DIGISINANS",
                            "url": "https://digisinans.in"
                        }],
                        "publisher": {
                            "@type": "Organization",
                            "name": "DIGISINANS",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://digisinans.in/logo.png"
                            }
                        }
                    })
                }}
            />
            {/* Mission Brief Header */}
            <header className="py-20 md:py-32 bg-[#fafafa] border-b border-zinc-100 overflow-hidden relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-5 md:px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-indigo-600 transition-colors mb-16 font-black uppercase text-[10px] tracking-widest group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Archive
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-10">
                                    <span className="px-5 py-2.5 bg-zinc-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-zinc-200">
                                        Mission Completed
                                    </span>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">v1.2 Hub / CS-{study.id.slice(0, 5).toUpperCase()}</span>
                                    </div>
                                </div>

                                <h1 className="text-5xl md:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter mb-12 uppercase italic font-serif">
                                    {study.title}
                                </h1>

                                <div className="flex items-center gap-6 py-8 border-y border-zinc-100 mb-12">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                            <Building2 size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Client</p>
                                            <p className="font-bold text-lg text-zinc-900">{study.client}</p>
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-zinc-100 mx-4 hidden md:block" />
                                    <div className="hidden md:block">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Intelligence Stream</p>
                                        <p className="font-bold text-lg text-zinc-900">{study.service_category}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="p-12 md:p-16 bg-zinc-900 rounded-[4rem] text-white shadow-3xl shadow-indigo-600/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px]" />
                                    <div className="relative z-10 text-center">
                                        <p className="text-indigo-400 text-[11px] font-black uppercase tracking-[0.3em] mb-6">Primary Growth Metric</p>
                                        <div className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 group-hover:scale-105 transition-transform duration-700">
                                            {study.result_metric}
                                        </div>
                                        <p className="text-zinc-500 font-medium text-lg italic">Verification: Confirmed by Analytics</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tactical Narrative */}
            <section className="container mx-auto px-5 md:px-6 -mt-16 md:-mt-24 relative z-20">
                <div className="max-w-6xl mx-auto">
                    {study.cover_image && (
                        <div className="relative aspect-[21/9] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 mb-24 md:mb-32">
                            <Image src={study.cover_image} alt={study.title} fill className="object-cover" priority />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                        {/* Summary Sidebar */}
                        <div className="lg:col-span-4 space-y-12">
                            <div className="p-10 bg-zinc-50 border border-zinc-100 rounded-[3rem] space-y-8 sticky top-32">
                                <h3 className="text-xl font-black uppercase tracking-tighter italic">Tactical Summary</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Client Focus', value: study.client },
                                        { label: 'Growth Vector', value: study.service_category },
                                        { label: 'Live Status', value: 'Complete' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="pb-6 border-b border-zinc-100 last:border-0">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{item.label}</p>
                                            <p className="font-bold text-zinc-900">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors">
                                    <Share2 size={16} /> Export Intel
                                </button>
                            </div>
                        </div>

                        {/* Analysis Content */}
                        <div className="lg:col-span-8 space-y-24">
                            <div className="space-y-10 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                                        <Zap size={24} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">The Challenge</h2>
                                </div>
                                <div className="p-12 bg-zinc-50 rounded-[3rem] border border-zinc-100 text-2xl font-medium text-zinc-600 leading-relaxed italic border-l-8 border-red-500">
                                    &quot;{study.challenge}&quot;
                                </div>
                            </div>

                            <div className="space-y-10 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">The Solution</h2>
                                </div>
                                <div className="prose prose-zinc prose-2xl max-w-none prose-p:font-medium prose-p:text-zinc-600 prose-p:leading-relaxed prose-strong:text-zinc-900">
                                    <p className="p-12 bg-indigo-600 text-white rounded-[3rem] text-2xl font-medium leading-relaxed shadow-2xl shadow-indigo-600/20">
                                        {study.solution}
                                    </p>
                                </div>
                            </div>

                            {/* Final Conversion CTA */}
                            <div className="mt-24 p-12 md:p-20 bg-zinc-900 rounded-[4rem] text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px]" />
                                <div className="relative z-10">
                                    <Target className="text-indigo-600 mx-auto mb-8" size={64} />
                                    <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter italic">Duplicate this success.</h3>
                                    <p className="text-zinc-400 text-lg md:text-xl font-medium mb-12 max-w-sm mx-auto">Let our performance architects engineer your next growth phase using these same tactical principles.</p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-3 px-12 py-6 bg-white text-zinc-900 font-black rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl uppercase text-xs tracking-widest active:scale-95"
                                    >
                                        Initiate Deployment <ChevronRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
