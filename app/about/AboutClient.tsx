"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';
import AboutHero from '@/components/about/AboutHero';

// Dynamically import sections below the fold
const StorySection = dynamic(() => import('@/components/about/StorySection'), {
    loading: () => <div className="min-h-screen bg-white" />
});
const MissionSection = dynamic(() => import('@/components/about/MissionSection'), {
    loading: () => <div className="min-h-screen bg-zinc-900" />
});
const WhySection = dynamic(() => import('@/components/about/WhySection'), {
    loading: () => <div className="min-h-[50vh] bg-white" />
});
const LeadershipSection = dynamic(() => import('@/components/about/LeadershipSection'), {
    loading: () => <div className="min-h-screen bg-zinc-50" />
});
const ValuesSection = dynamic(() => import('@/components/about/AboutExtra').then(mod => mod.ValuesSection), {
    loading: () => <div className="min-h-[30vh] bg-white" />
});
const CTASection = dynamic(() => import('@/components/about/AboutExtra').then(mod => mod.CTASection), {
    loading: () => <div className="min-h-[30vh] bg-white" />
});

export default function AboutClient() {
    useScrollReveal();

    return (
        <div className="pt-24 md:pt-32">
            <AboutHero />
            <StorySection />
            <MissionSection />
            <WhySection />
            <LeadershipSection />
            <ValuesSection />
            <CTASection />
        </div>
    );
}
