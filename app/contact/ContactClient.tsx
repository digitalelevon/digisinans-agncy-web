
"use client";

import React, { useEffect, useState } from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Send,
    CheckCircle2,
    Clock,
    Lock,
    ArrowRight,
    Sparkles,
    Target,
    Zap,
    TrendingUp,
    ArrowUpRight
} from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

export default function ContactClient() {
    useScrollReveal();
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('sending');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const { error } = await supabase
                .from('inquiries')
                .insert([
                    {
                        name: data.name,
                        email: data.email,
                        phone: data.phone || null,
                        service_type: data.service_type || 'General Inquiry',
                        message: data.message,
                        company: data.company || null
                    }
                ]);

            if (!error) {
                setFormStatus('success');

                // Construct WhatsApp message
                const whatsappMessage = `New Inquiry from Website:%0A- Name: ${encodeURIComponent(data.name as string)}%0A- Email: ${encodeURIComponent(data.email as string)}%0A- Message: ${encodeURIComponent(data.message as string)}`;
                const whatsappUrl = `https://wa.me/917510477475?text=${whatsappMessage}`;

                // Open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');

                // Track conversion
                if (typeof window !== 'undefined') {
                    // GA4 Lead Event
                    if ((window as any).gtag) {
                        (window as any).gtag('event', 'generate_lead', {
                            'service_type': data.service_type,
                            'company': data.company
                        });
                    }
                    // Meta Pixel Lead Event
                    if ((window as any).fbq) {
                        (window as any).fbq('track', 'Lead', {
                            content_category: data.service_type,
                            content_name: data.company
                        });
                    }
                }
            } else {
                console.error('Submission Error:', error);
                setFormStatus('error');
                alert("Failed to send message: " + error.message);
            }
        } catch (error: any) {
            console.error('Catch Error:', error);
            setFormStatus('error');
            alert("Connection error occurred.");
        }
    };

    return (
        <div className="pt-24 md:pt-32">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-indigo-50/50 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/30 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.1]" />
                </div>
                <div className="container mx-auto px-5 md:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600">Get In Touch</span>
                        </div>

                        <h1 className="text-[2.2rem] xs:text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-black text-zinc-900 leading-[0.9] tracking-tighter mb-8 reveal-on-scroll">
                            Let&apos;s Talk About <br />
                            Your <span className="text-indigo-600 italic font-serif">Growth</span>.
                        </h1>

                        <p className="text-lg md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto reveal-on-scroll delay-100">
                            We invite businesses, founders, and brands to discuss their digital goals. Whether you&apos;re scaling or starting, let&apos;s engineer your success together.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-24 md:py-40 bg-zinc-50">
                <div className="container mx-auto px-5 md:px-6">
                    <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] border border-zinc-100 overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            {/* Info Column */}
                            <div className="lg:w-2/5 bg-zinc-900 p-10 md:p-20 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                                <div className="relative z-10">
                                    <h2 className="text-3xl md:text-4xl font-black mb-10">Direct Contact</h2>
                                    <p className="text-zinc-400 font-medium text-lg mb-16 leading-relaxed">
                                        Prefer direct contact? We&apos;re available across multiple channels to help you move faster.
                                    </p>

                                    <div className="space-y-12">
                                        <div className="flex items-start gap-6 group">
                                            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                                                <Phone size={24} className="text-indigo-400 group-hover:text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-2">Call Us</p>
                                                <a href="tel:+917510477475" className="text-xl md:text-2xl font-bold hover:text-indigo-400 transition-colors tracking-tight">+91 7510477475</a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-6 group">
                                            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                                                <Mail size={24} className="text-indigo-400 group-hover:text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-2">Email Us</p>
                                                <a href="mailto:hello@digisinans.in" className="text-xl md:text-2xl font-bold hover:text-indigo-400 transition-colors tracking-tight">hello@digisinans.in</a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-6 group">
                                            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                                                <MapPin size={24} className="text-indigo-400 group-hover:text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-2">Location</p>
                                                <p className="text-xl md:text-2xl font-bold tracking-tight">Malappuram, Kerala, India</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-24 pt-12 border-t border-white/10 grid grid-cols-1 gap-6">
                                        <div className="flex items-center gap-3 text-zinc-400 font-bold">
                                            <Clock size={18} className="text-indigo-400" />
                                            <span>Response within 24 hours</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-zinc-400 font-bold">
                                            <Lock size={18} className="text-indigo-400" />
                                            <span>Your info stays private</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Column */}
                            <div className="lg:w-3/5 p-10 md:p-20 bg-white">
                                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-10">Send a Message</h2>

                                {formStatus === 'success' ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                                        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-3xl font-black text-zinc-900">Message Sent!</h3>
                                        <p className="text-zinc-500 font-medium text-lg max-w-sm">
                                            Thank you for reaching out. A DIGISINANS strategist will contact you within the next 24 business hours.
                                        </p>
                                        <button
                                            onClick={() => setFormStatus('idle')}
                                            className="text-indigo-600 font-black flex items-center gap-2 hover:gap-3 transition-all"
                                        >
                                            Back to form <ArrowRight size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                                                <input
                                                    name="name"
                                                    required
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-zinc-900"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                                                <input
                                                    name="email"
                                                    required
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-zinc-900"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Phone Number</label>
                                                <input
                                                    name="phone"
                                                    required
                                                    type="tel"
                                                    placeholder="+91 00000 00000"
                                                    className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-zinc-900"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Service Required</label>
                                                <div className="relative">
                                                    <select
                                                        name="service_type"
                                                        required
                                                        className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-zinc-900 appearance-none cursor-pointer"
                                                    >
                                                        <option value="SEO & Performance">SEO & Performance Marketing</option>
                                                        <option value="Branding & Identity">Branding & Identity</option>
                                                        <option value="Web Development">Web Development</option>
                                                        <option value="SMM & Content">Social Media Marketing</option>
                                                        <option value="Other">Other Strategic Inquiry</option>
                                                    </select>
                                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                                        <ArrowUpRight size={18} className="rotate-45" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Company Name (Optional)</label>
                                            <input
                                                name="company"
                                                type="text"
                                                placeholder="Brand Name"
                                                className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-zinc-900"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-black uppercase tracking-widest text-zinc-500">Your Message</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={5}
                                                placeholder="Tell us about your project or goals..."
                                                className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-zinc-900 resize-none"
                                            />
                                        </div>

                                        {formStatus === 'error' && (
                                            <p className="text-red-500 font-bold">Something went wrong. Please try again or call us directly.</p>
                                        )}

                                        <div className="pt-4">
                                            <button
                                                disabled={formStatus === 'sending'}
                                                className="w-full md:w-auto px-12 py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl active:scale-95 disabled:opacity-75"
                                            >
                                                {formStatus === 'sending' ? 'Sending...' : 'Start the Conversation'}
                                                <Send size={20} className={formStatus === 'sending' ? 'animate-pulse' : ''} />
                                            </button>
                                        </div>

                                        <p className="text-sm text-zinc-400 font-medium">
                                            By clicking send, you agree to our privacy policy. No spam, just a strategy-first conversation.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Work With DIGISINANS */}
            <section className="py-24 md:py-40 bg-white">
                <div className="container mx-auto px-5 md:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20 md:mb-32 reveal-on-scroll">
                            <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-6">Partner Benefits</h2>
                            <h3 className="text-4xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter">
                                Why Work With <span className="text-indigo-600 italic font-serif">DIGISINANS</span>.
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                { title: "Strategy-First", desc: "Every campaign is built on deep market research and data-backed insights.", icon: <Target className="text-indigo-600" /> },
                                { title: "Design & Marketing", desc: "Premium creative aesthetics meet high-performance marketing under one roof.", icon: <Sparkles className="text-indigo-600" /> },
                                { title: "Transparency", desc: "Real-time reporting and constant communication. We operate as your internal team.", icon: <Zap className="text-indigo-600" /> },
                                { title: "Result Focus", desc: "Vanity metrics don&apos;t matter. We focus on real business growth and revenue scale.", icon: <TrendingUp className="text-indigo-600" /> }
                            ].map((item, idx) => (
                                <div key={idx} className="reveal-on-scroll" style={{ transitionDelay: `${idx * 100}ms` }}>
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-8">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-2xl font-black text-zinc-900 mb-4">{item.title}</h4>
                                    <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 md:py-32 bg-zinc-900">
                <div className="container mx-auto px-5 md:px-6">
                    <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
                        <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                            Ready to Build Something <br /> <span className="text-indigo-400 italic font-serif">Exceptional?</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-12 max-w-2xl mx-auto">
                            Take the first step toward scalable digital growth. Let&apos;s discuss how we can position your brand for the long term.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="px-12 py-6 bg-indigo-600 text-white font-black rounded-2xl hover:bg-white hover:text-zinc-900 transition-all shadow-2xl active:scale-95 flex items-center gap-3"
                            >
                                Get Started Today <ArrowUpRight size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
