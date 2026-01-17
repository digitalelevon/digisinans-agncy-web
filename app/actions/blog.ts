
'use server';

import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { createClient } from '@/lib/supabase-server';
import { BlogPost } from '@/lib/types';

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

export async function createBlogPost(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const cover_image = formData.get('cover_image') as string;
    const status = (formData.get('status') as 'draft' | 'published') || 'draft';
    const meta_title = formData.get('meta_title') as string;
    const meta_description = formData.get('meta_description') as string;
    const keywords = formData.get('keywords') as string;

    if (!title) {
        return { error: 'Title is required' };
    }

    const slug = generateSlug(title);

    const { data, error } = await supabase
        .from('blog_posts')
        .insert([
            {
                title,
                slug,
                excerpt,
                content,
                cover_image,
                status,
                meta_title,
                meta_description,
                keywords,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error creating blog post:', error);
        return { error: error.message };
    }

    revalidateTag('blogs');
    revalidateTag('published_blogs');
    revalidatePath('/admin/dashboard');
    revalidatePath('/blog');
    return { success: true, post: data as BlogPost };
}

export async function updateBlogPost(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const cover_image = formData.get('cover_image') as string;
    const status = (formData.get('status') as 'draft' | 'published') || 'draft';
    const slug = formData.get('slug') as string || generateSlug(title);
    const meta_title = formData.get('meta_title') as string;
    const meta_description = formData.get('meta_description') as string;
    const keywords = formData.get('keywords') as string;

    if (!title) {
        return { error: 'Title is required' };
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .update({
            title,
            slug,
            excerpt,
            content,
            cover_image,
            status,
            meta_title,
            meta_description,
            keywords,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating blog post:', error);
        return { error: error.message };
    }

    revalidateTag('blogs');
    revalidateTag('published_blogs');
    revalidateTag(`blog_post_${slug}`);
    revalidatePath('/admin/dashboard');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    return { success: true, post: data as BlogPost };
}

export const getBlogPosts = unstable_cache(
    async () => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }

        return data as BlogPost[];
    },
    ['all-blog-posts'],
    { revalidate: 3600, tags: ['blogs'] }
);

export const getPublishedPosts = unstable_cache(
    async () => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching published posts:', error);
            return [
                {
                    id: '1',
                    title: "The Future of Brand Identity in the AI Era",
                    slug: "future-of-brand-identity",
                    excerpt: "How artificial intelligence is reshaping how we think about brand consistency and customer connection.",
                    content: "Full content would go here.",
                    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=75&w=800",
                    status: 'published',
                    created_at: new Date().toISOString()
                },
                {
                    id: '2',
                    title: "Mastering Core Web Vitals for 2025 SEO",
                    slug: "mastering-core-web-vitals",
                    excerpt: "Stay ahead of the competition by optimizing your site for the latest search engine ranking factors.",
                    content: "Full content would go here.",
                    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=75&w=800",
                    status: 'published',
                    created_at: new Date().toISOString()
                }
            ] as BlogPost[];
        }

        return data as BlogPost[];
    },
    ['published-blog-posts'],
    { revalidate: 3600, tags: ['blogs', 'published_blogs'] }
);


// We need a separate function because unstable_cache handles its arguments in a specific way
// and we want to ensure the slug is part of the cache key and we have a specific tag.
const getIndividualPostBySlug = (slug: string) => unstable_cache(
    async (s: string) => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', s)
            .eq('status', 'published')
            .single();

        if (error) {
            console.error('Error fetching post by slug:', error);
            return null;
        }

        return data as BlogPost;
    },
    ['blog-post-by-slug', slug],
    { revalidate: 3600, tags: ['blogs', `blog_post_${slug}`] }
)(slug);

export const getPostBySlug = async (slug: string) => {
    return getIndividualPostBySlug(slug);
};

export async function deleteBlogPost(id: string) {
    const supabase = await createClient();

    // Get slug first for revalidation
    const { data: postData } = await supabase.from('blog_posts').select('slug').eq('id', id).single();

    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting blog post:', error);
        return { error: error.message };
    }

    revalidateTag('blogs');
    revalidateTag('published_blogs');
    if (postData?.slug) revalidateTag(`blog_post_${postData.slug}`);
    revalidatePath('/admin/dashboard');
    revalidatePath('/blog');
    return { success: true };
}
