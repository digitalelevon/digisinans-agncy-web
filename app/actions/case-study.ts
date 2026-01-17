
'use server';

import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { createClient } from '@/lib/supabase-server';
import { CaseStudy } from '@/lib/types';
import { CASE_STUDIES } from '@/lib/case-studies';

export const getCaseStudies = unstable_cache(
    async () => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('case_studies')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching case studies:', error);
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
            })) as CaseStudy[];
        }

        return data as CaseStudy[];
    },
    ['all-case-studies'],
    { revalidate: 3600, tags: ['case_studies'] }
);

export async function createCaseStudy(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const client = formData.get('client') as string;
    const service_category = formData.get('service_category') as string;
    const result_metric = formData.get('result_metric') as string;
    const cover_image = formData.get('cover_image') as string;
    const challenge = formData.get('challenge') as string;
    const solution = formData.get('solution') as string;
    const status = (formData.get('status') as 'draft' | 'published') || 'draft';

    if (!title) {
        return { error: 'Title is required' };
    }

    const { data, error } = await supabase
        .from('case_studies')
        .insert([
            {
                title,
                client,
                service_category,
                result_metric,
                cover_image,
                challenge,
                solution,
                status,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error creating case study:', error);
        return { error: error.message };
    }

    revalidateTag('case_studies');
    revalidateTag('published_case_studies');
    revalidatePath('/admin/dashboard');
    revalidatePath('/work');

    return { success: true, caseStudy: data as CaseStudy };
}

export async function updateCaseStudy(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const client = formData.get('client') as string;
    const service_category = formData.get('service_category') as string;
    const result_metric = formData.get('result_metric') as string;
    const cover_image = formData.get('cover_image') as string;
    const challenge = formData.get('challenge') as string;
    const solution = formData.get('solution') as string;
    const status = (formData.get('status') as 'draft' | 'published') || 'draft';

    if (!title) {
        return { error: 'Title is required' };
    }

    const { data, error } = await supabase
        .from('case_studies')
        .update({
            title,
            client,
            service_category,
            result_metric,
            cover_image,
            challenge,
            solution,
            status,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating case study:', error);
        return { error: error.message };
    }

    revalidateTag('case_studies');
    revalidateTag('published_case_studies');
    revalidateTag(`case_study_${id}`);
    revalidatePath('/admin/dashboard');
    revalidatePath('/work');
    revalidatePath(`/work/${id}`);

    return { success: true, caseStudy: data as CaseStudy };
}

const getIndividualCaseStudyById = (id: string) => unstable_cache(
    async (i: string) => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('case_studies')
            .select('*')
            .eq('id', i)
            .single();

        if (error) {
            console.error('Error fetching case study by ID:', error);
            return null;
        }

        return data as CaseStudy;
    },
    ['case-study-by-id', id],
    { revalidate: 3600, tags: ['case_studies', `case_study_${id}`] }
)(id);

export const getCaseStudyById = async (id: string) => {
    return getIndividualCaseStudyById(id);
};

export const getPublishedCaseStudies = unstable_cache(
    async () => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('case_studies')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching published case studies:', error);
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
            })) as CaseStudy[];
        }

        return data as CaseStudy[];
    },
    ['published-case-studies'],
    { revalidate: 3600, tags: ['case_studies', 'published_case_studies'] }
);

export async function deleteCaseStudy(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting case study:', error);
        return { error: error.message };
    }

    revalidateTag('case_studies');
    revalidateTag('published_case_studies');
    revalidateTag(`case_study_${id}`);
    revalidatePath('/admin/dashboard');
    revalidatePath('/work');

    return { success: true };
}
