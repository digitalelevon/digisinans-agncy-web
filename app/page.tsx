
import React from 'react';
import HomeClient from './HomeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Best Digital Marketing Agency in Kerala | DIGISINANS",
    description: "DIGISINANS is the best digital marketing agency in Kerala, offering elite SEO, performance marketing, and branding services. Scale your brand with Kerala's top digital experts.",
    keywords: [
        "best digital marketing agency in kerala",
        "digital marketing agency in kerala",
        "digital marketing services kerala",
        "seo agency kerala",
        "performance marketing kerala",
        "branding agency in kerala",
        "best seo company in kerala",
        "digital marketing company malappuram"
    ],
    openGraph: {
        title: "Best Digital Marketing Agency in Kerala | DIGISINANS",
        description: "Scale your brand with Kerala's elite digital marketing agency. Elite SEO, branding, and performance marketing.",
        images: ['/og-image.jpg'],
    }
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

