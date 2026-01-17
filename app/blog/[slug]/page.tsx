
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowLeft, Clock, User, Share2, ArrowUpRight } from 'lucide-react';
import { getPostBySlug } from '@/app/actions/blog';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | DIGISINANS',
        };
    }

    return {
        title: `${post.title} | DIGISINANS`,
        description: post.excerpt || `Read our latest insight about ${post.title}`,
        openGraph: {
            title: post.title,
            description: post.excerpt || '',
            images: post.cover_image ? [{ url: post.cover_image }] : [],
            type: 'article',
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "image": post.cover_image ? [post.cover_image] : [],
                        "datePublished": post.created_at,
                        "dateModified": post.created_at,
                        "author": [{
                            "@type": "Organization",
                            "name": "DIGISINANS Intel",
                            "url": "https://digisinans.in"
                        }],
                        "publisher": {
                            "@type": "Organization",
                            "name": "DIGISINANS",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://digisinans.in/logo.png"
                            }
                        },
                        "description": post.excerpt || ""
                    })
                }}
            />
            {/* Hero Section */}
            <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#fafafa] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-5 md:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-indigo-600 transition-colors mb-12 font-black uppercase text-[10px] tracking-widest group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Hub
                        </Link>

                        <div className="flex items-center gap-3 mb-8">
                            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                                Global Strategy
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-zinc-900 leading-[0.9] tracking-tighter mb-12">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between py-10 border-y border-zinc-100">
                            <div className="flex items-center gap-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white text-xs font-black">DS</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Published By</p>
                                        <p className="font-bold text-zinc-900">DIGISINANS Intel</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <span className="flex items-center gap-2"><Clock size={14} /> 8 Min Read</span>
                                </div>
                            </div>

                            <button className="p-4 bg-white border border-zinc-100 rounded-2xl text-zinc-400 hover:text-indigo-600 transition-all shadow-sm">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <div className="container mx-auto px-5 md:px-6 -mt-20 relative z-20">
                <div className="max-w-5xl mx-auto">
                    {post.cover_image && (
                        <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 bg-zinc-50 mb-20">
                            <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-zinc prose-2xl max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:font-medium prose-p:text-zinc-600 prose-p:leading-relaxed prose-strong:text-zinc-900 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-zinc-400 prose-blockquote:border-indigo-600 prose-img:rounded-[2rem]">
                            {post.content ? (
                                post.content.split('\n').map((paragraph, idx) => (
                                    paragraph.trim() ? <p key={idx} className="mb-8">{paragraph}</p> : <br key={idx} />
                                ))
                            ) : (
                                <p>No content available for this post.</p>
                            )}
                        </div>

                        {/* Final CTA */}
                        <div className="mt-32 p-12 md:p-20 bg-zinc-900 rounded-[4rem] text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] group-hover:bg-indigo-600/30 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to Implement This Strategy?</h3>
                                <p className="text-zinc-400 text-lg md:text-xl font-medium mb-12 max-w-sm mx-auto">Let our performance architects engineer your next growth phase.</p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-zinc-900 font-black rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl uppercase text-xs tracking-widest"
                                >
                                    Scale My Brand <ArrowUpRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
