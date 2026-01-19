
import React from 'react';
import HomeClient from './HomeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Best AI Integrated Digital Marketing Agency in Malappuram, Kerala | DIGISINANS",
    description: "DIGISINANS is the best AI integrated digital marketing agency in Malappuram, Kerala. We scale global brands with elite SEO, performance marketing, and high-end branding.",
    keywords: [
        "Best AI Integrated Digital Marketing Agency in Malappuram, Kerala",
        "AI Integrated Marketing Malappuram",
        "Best Digital Marketing Agency in Kerala",
        "Branding Agency Tirur",
        "SEO Expert Malappuram",
        "Digital Marketing services Kerala",
        "Digisinans"
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Best AI Integrated Digital Marketing Agency in Malappuram, Kerala | DIGISINANS",
        description: "DIGISINANS is the best AI integrated digital marketing agency in Malappuram, Kerala. Scale your brand with elite SEO and performance marketing.",
        url: "https://digisinans.in",
        siteName: "Digisinans",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: 'summary_large_image',
        title: "Best AI Integrated Digital Marketing Agency in Malappuram, Kerala | DIGISINANS",
        description: "Scale your brand with the best AI integrated digital marketing agency in Malappuram, Kerala. Elite SEO and performance marketing.",
        images: ['/og-image.jpg'],
    },
};

import { getServices, getCaseStudies, getBlogs } from '@/lib/supabase-data';

export default async function HomePage() {
    const [services, caseStudies, blogs] = await Promise.all([
        getServices(),
        getCaseStudies(),
        getBlogs()
    ]);

    return <HomeClient services={services} caseStudies={caseStudies} blogs={blogs} />;
}

