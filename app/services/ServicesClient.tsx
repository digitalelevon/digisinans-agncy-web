
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { SERVICES } from '@/lib/constants';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceCard from '@/components/services/ServiceCard';

// Dynamically import sections below the fold
const MethodologySection = dynamic(() => import('@/components/services/MethodologySection'), {
    loading: () => <div className="min-h-screen bg-zinc-900" />
});
const EnterpriseSolutions = dynamic(() => import('@/components/services/EnterpriseSolutions'), {
    loading: () => <div className="min-h-screen bg-white" />
});

export default function ServicesClient() {
    useScrollReveal();

    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-white">
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Digital Marketing Services",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "DIGISINANS",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Malappuram",
                                "addressRegion": "Kerala",
                                "addressCountry": "IN"
                            }
                        },
                        "areaServed": ["Kerala", "UAE", "Global"],
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Digital Marketing Frameworks",
                            "itemListElement": SERVICES.map((s, i) => ({
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": s.title,
                                    "description": s.description
                                }
                            }))
                        }
                    })
                }}
            />

            <ServicesHero />

            {/* Services Grid Section */}
            <section id="frameworks" className="py-20 md:py-32 relative bg-white overflow-hidden scroll-mt-20 content-lazy">
                <div className="container mx-auto px-5 md:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16 reveal-on-scroll">
                        <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-indigo-600 mb-6">Our Core Expertise</h2>
                        <h3 className="text-4xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-[0.9] tracking-tighter">
                            Advanced Digital <span className="text-indigo-600 font-serif italic">Frameworks</span> Applied to Your Vertical.
                        </h3>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
                            {SERVICES.map((service, idx) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    index={idx}
                                    variant="detailed"
                                    className="!rounded-[4.5rem] !bg-white !p-12 md:!p-16 !border-zinc-100"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <MethodologySection />
            <EnterpriseSolutions />
        </div>
    );
}
