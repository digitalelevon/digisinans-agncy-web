
import React from 'react';
import BlogClient from './BlogClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Digital Marketing Blog & Strategy Insights | DIGISINANS",
    description: "Read the latest insights from the best digital marketing agency in Kerala. Expert advice on SEO, branding, and performance marketing strategies.",
    keywords: ["digital marketing blog kerala", "seo tips india", "branding strategies 2024", "marketing insights"],
    alternates: {
        canonical: '/blog',
    },
};

import { getPublishedPosts } from '@/app/actions/blog';

export default async function BlogPage() {
    const blogs = await getPublishedPosts();
    return <BlogClient posts={blogs} />;
}
