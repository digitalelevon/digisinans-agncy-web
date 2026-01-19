
import React from 'react';
import { Metadata } from 'next';
import WorkClient from './WorkClient';
import { getPublishedCaseStudies } from '@/app/actions/case-study';

export const metadata: Metadata = {
    title: "Case Studies | ROI-Driven Digital Marketing Results | DIGISINANS",
    description: "Explore how we generate massive ROI through SEO and performance marketing. Detailed case studies of digital transformations for elite global brands.",
    keywords: ["digital marketing case studies india", "seo results kerala", "branding success stories", "performance marketing portfolio"],
    alternates: {
        canonical: '/work',
    },
};

export default async function WorkPage() {
    const studies = await getPublishedCaseStudies();

    return <WorkClient studies={studies} />;
}
