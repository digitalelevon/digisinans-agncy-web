
import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/app/actions/blog'
import { getPublishedCaseStudies } from '@/app/actions/case-study'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://digisinans.in'

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Fetch dynamic content
    const [posts, caseStudies] = await Promise.all([
        getPublishedPosts(),
        getPublishedCaseStudies()
    ]);

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const workRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
        url: `${baseUrl}/work/${study.id}`,
        lastModified: new Date(study.created_at),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes, ...workRoutes];
}
