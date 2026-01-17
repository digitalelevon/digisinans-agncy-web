
import { createClient } from './supabase-server';
import { SERVICES } from './constants';
import { CASE_STUDIES } from './case-studies';
import { unstable_cache } from 'next/cache';

const supabase = createClient();

export const getServices = unstable_cache(
    async () => {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('display_order', { ascending: true });

            if (error || !data || data.length === 0) {
                return SERVICES;
            }

            return data.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                iconName: item.icon_name || 'Zap',
                items: item.tags || []
            }));
        } catch (e) {
            return SERVICES;
        }
    },
    ['services-list'],
    { revalidate: 3600, tags: ['services'] }
);

export const getCaseStudies = unstable_cache(
    async () => {
        try {
            const { data, error } = await supabase
                .from('case_studies')
                .select('*')
                .order('created_at', { ascending: false });

            if (error || !data || data.length === 0) {
                // Fallback to static case studies if DB is empty, 
                // but ensure they follow the CaseStudy interface
                return CASE_STUDIES.map((study: any) => ({
                    id: study.id || study.slug,
                    title: study.title,
                    client: study.client || "Partner",
                    service_category: study.service_category || study.category || "Digital Strategy",
                    result_metric: study.result_metric || study.metric || "Growth",
                    cover_image: study.cover_image || study.image,
                    challenge: study.challenge || study.problem,
                    solution: study.solution || study.strategy,
                    status: 'published' as const,
                    created_at: new Date().toISOString()
                }));
            }

            return data.map(item => ({
                id: item.id,
                title: item.title,
                client: item.client,
                service_category: item.service_category,
                result_metric: item.result_metric,
                cover_image: item.cover_image,
                challenge: item.challenge,
                solution: item.solution,
                status: item.status as 'draft' | 'published',
                created_at: item.created_at
            }));
        } catch (e) {
            return [];
        }
    },
    ['case-studies-list'],
    { revalidate: 3600, tags: ['case_studies'] }
);

export const getBlogs = unstable_cache(
    async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false });

            if (error || !data) {
                return [];
            }

            return data.map(post => ({
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                category: 'Strategy',
                date: new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                image: post.cover_image,
                featured: post.status === 'published'
            }));
        } catch (e) {
            return [];
        }
    },
    ['blogs-list'],
    { revalidate: 3600, tags: ['blogs'] }
);
