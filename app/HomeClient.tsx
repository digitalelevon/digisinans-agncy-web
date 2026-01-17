"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';
import Hero from '@/components/home/Hero';

// Dynamically import sections below the fold for better performance
const ExpertiseSection = dynamic(() => import('@/components/home/ExpertiseSection'), {
    loading: () => <div className="min-h-screen bg-[#fafafa]" />
});
const LocalFocus = dynamic(() => import('@/components/home/LocalFocus'), {
    loading: () => <div className="min-h-screen bg-[#0a0a0a]" />
});
const WorkSection = dynamic(() => import('@/components/home/WorkSection'), {
    loading: () => <div className="min-h-screen bg-white" />
});
const InsightsSection = dynamic(() => import('@/components/home/InsightsSection'), {
    loading: () => <div className="min-h-[50vh] bg-zinc-50" />
});
const LeadMagnet = dynamic(() => import('@/components/home/LeadMagnet'), {
    loading: () => <div className="min-h-[40vh] bg-indigo-600" />
});
const ContactSection = dynamic(() => import('@/components/home/ContactSection'), {
    loading: () => <div className="min-h-[50vh] bg-white" />
});

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
    loading: () => <div className="min-h-[50vh] bg-gray-50" />
});

export default function HomeClient({ services, caseStudies, blogs }: { services: any[], caseStudies: any[], blogs: any[] }) {
    useScrollReveal();

    return (
        <main>
            <Hero />
            <div className="content-lazy"><ExpertiseSection services={services} /></div>
            <div className="content-lazy"><LocalFocus /></div>
            <div className="content-lazy"><WorkSection caseStudies={caseStudies} /></div>
            <div className="content-lazy"><LeadMagnet /></div>
            <div className="content-lazy"><InsightsSection blogs={blogs} /></div>
            <div className="content-lazy"><TestimonialsSection /></div>
            <div className="content-lazy"><ContactSection /></div>
        </main>
    );
}