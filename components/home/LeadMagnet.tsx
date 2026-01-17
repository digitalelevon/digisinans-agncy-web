
"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

const LeadMagnet = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.currentTarget);
        const url = formData.get('url') as string;
        const email = formData.get('email') as string;

        try {
            const { error } = await supabase
                .from('inquiries')
                .insert([
                    {
                        name: 'Audit Request',
                        email: email,
                        service_type: 'Free Audit',
                        message: `Requested a free audit for website: ${url}`,
                        company: url // Storing URL in company for quick reference
                    }
                ]);

            if (!error) {
                setStatus('success');

                // Construct WhatsApp message
                const whatsappMessage = `New Audit Request from Website:%0A- Website: ${encodeURIComponent(url)}%0A- Email: ${encodeURIComponent(email)}`;
                const whatsappUrl = `https://wa.me/917510477475?text=${whatsappMessage}`;

                // Open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');

                // Track lead event if analytics available
                if (typeof window !== 'undefined') {
                    if ((window as any).gtag) {
                        (window as any).gtag('event', 'generate_lead', {
                            'service_type': 'Free Audit',
                            'website_url': url
                        });
                    }
                    if ((window as any).fbq) {
                        (window as any).fbq('track', 'Lead', {
                            content_category: 'Free Audit',
                            content_name: url
                        });
                    }
                }
            } else {
                console.error('Lead Error:', error);
                setStatus('error');
            }
        } catch (error) {
            console.error('Catch Error:', error);
            setStatus('error');
        }
    };

    return (
        <section className="py-24 md:py-48 bg-zinc-900 relative overflow-hidden">
            {/* Elite Background Architecture */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[160px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.03]" />

                {/* Floating Glass Shards (Decorative) */}
                <div className="absolute top-[20%] left-[5%] w-64 h-64 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 -rotate-12 animate-float-refined hidden xl:block" />
                <div className="absolute bottom-[10%] right-[10%] w-48 h-48 bg-indigo-500/5 backdrop-blur-2xl rounded-full border border-white/5 animate-bounce-refined hidden xl:block" />
            </div>

            <div className="container mx-auto px-5 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-7 reveal-on-scroll">
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-600/10 backdrop-blur-xl border border-indigo-500/20 rounded-full mb-12 shadow-2xl">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Tactical Engagement / Q1 Active</span>
                            </div>

                            <h2 className="text-4xl md:text-7xl lg:text-[90px] font-black leading-[0.9] tracking-tighter mb-10 text-white">
                                Unlock <span className="text-indigo-500 italic font-serif">Hidden</span> <br />
                                <span className="inline-block hover:translate-x-3 transition-transform duration-500 cursor-default">Growth Potential.</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed mb-16 max-w-2xl border-l-2 border-indigo-500/50 pl-8">
                                We&apos;ll conduct a <span className="text-white font-bold">24-point technical audit</span> of your website to expose exactly why your competitors are outranking you in the SERPs.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                                {[
                                    { text: "Competitor SEO Gap Analysis", color: "text-red-400" },
                                    { text: "Core Web Vitals Performance", color: "text-green-400" },
                                    { text: "Conversion Optimization Audit", color: "text-indigo-400" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-default">
                                        <div className={`w-6 h-6 rounded-lg ${item.color.replace('text', 'bg').replace('400', '500/20')} border ${item.color.replace('text', 'border').replace('400', '500/30')} flex items-center justify-center transition-all group-hover:scale-110`}>
                                            <CheckCircle2 size={14} className={item.color} />
                                        </div>
                                        <span className="text-zinc-300 font-bold text-sm tracking-tight group-hover:text-white transition-colors">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5 reveal-on-scroll delay-200">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[3.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

                                <div className="relative bg-zinc-900/80 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 border border-white/10 shadow-3xl">
                                    {status === 'success' ? (
                                        <div className="text-center py-16 space-y-8">
                                            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-2xl shadow-green-500/20">
                                                <CheckCircle2 size={48} />
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Mission Queued.</h3>
                                            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                                                Our performance architects are analyzing your data. Expect the blueprint in your inbox.
                                            </p>
                                            <button
                                                onClick={() => setStatus('idle')}
                                                className="px-8 py-3 bg-zinc-800 text-zinc-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-all"
                                            >
                                                Analyze Another Domain
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="mb-10 text-center">
                                                <h3 className="text-3xl font-black text-white mb-3 tracking-tighter italic">Initiate Audit.</h3>
                                                <p className="text-zinc-500 font-medium text-sm">Deployment time: 24-48 Hours</p>
                                            </div>

                                            <div className="space-y-2 group/field">
                                                <label htmlFor="audit-url" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4 mb-2 block group-focus-within/field:text-indigo-400 transition-colors">Site URL</label>
                                                <div className="relative">
                                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500">
                                                        <Search size={20} />
                                                    </div>
                                                    <input
                                                        id="audit-url"
                                                        name="url"
                                                        type="url"
                                                        required
                                                        placeholder="https://yourbrand.com"
                                                        className="w-full pl-16 pr-8 py-6 bg-zinc-800/50 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-zinc-800 outline-none transition-all font-bold text-white placeholder:text-zinc-600 shadow-inner"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 group/field">
                                                <label htmlFor="audit-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4 mb-2 block group-focus-within/field:text-indigo-400 transition-colors">Email Channel</label>
                                                <input
                                                    id="audit-email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="growth@yourbrand.com"
                                                    className="w-full px-8 py-6 bg-zinc-800/50 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-zinc-800 outline-none transition-all font-bold text-white placeholder:text-zinc-600 shadow-inner"
                                                />
                                            </div>

                                            {status === 'error' && (
                                                <p className="text-red-400 font-bold text-xs text-center">Transmission failed. Re-trying recommended.</p>
                                            )}

                                            <button
                                                disabled={status === 'sending'}
                                                className="w-full px-12 py-7 bg-indigo-600 text-white font-black rounded-[2rem] flex items-center justify-center gap-4 hover:bg-white hover:text-zinc-900 transition-all shadow-3xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 group/btn"
                                            >
                                                <span className="uppercase text-xs tracking-[0.2em]">
                                                    {status === 'sending' ? 'Scanning...' : 'Generate My Audit'}
                                                </span>
                                                <ArrowRight size={22} className={`transition-transform duration-500 ${status === 'sending' ? 'animate-pulse' : 'group-hover:translate-x-2'}`} />
                                            </button>

                                            <div className="flex items-center justify-center gap-3 pt-8 border-t border-white/5">
                                                <Shield size={14} className="text-zinc-600" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Enterprise Data Privacy Secured</span>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeadMagnet;
