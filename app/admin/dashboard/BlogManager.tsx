
"use client";

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    Globe,
    Lock,
    Loader2,
    X,
    Image as ImageIcon,
    CheckCircle,
    Calendar,
    ChevronRight,
    ArrowRight,
    Zap
} from 'lucide-react';
import { BlogPost } from '@/lib/types';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { createBlogPost, updateBlogPost, deleteBlogPost } from '@/app/actions/blog';

const BlogManager = ({ onMessage }: { onMessage?: (msg: string, type: 'success' | 'error') => void }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setPosts(data);
        }
        setLoading(false);
    };

    const handleOpenModal = (post: Partial<BlogPost> | null = null) => {
        setCurrentPost(post || {
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            status: 'draft',
            cover_image: '',
            meta_title: '',
            meta_description: '',
            keywords: ''
        });
        setIsPreviewOpen(false);
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData();
        formData.append('title', currentPost?.title || '');
        formData.append('slug', currentPost?.slug || '');
        formData.append('excerpt', currentPost?.excerpt || '');
        formData.append('content', currentPost?.content || '');
        formData.append('status', currentPost?.status || 'draft');
        formData.append('cover_image', currentPost?.cover_image || '');
        formData.append('meta_title', currentPost?.meta_title || '');
        formData.append('meta_description', currentPost?.meta_description || '');
        formData.append('keywords', currentPost?.keywords || '');

        let result;

        if (currentPost?.id) {
            result = await updateBlogPost(currentPost.id, formData);
        } else {
            result = await createBlogPost(formData);
        }

        if (result.success) {
            setIsModalOpen(false);
            onMessage?.('Strategic insight successfully deployed to the hub.', 'success');
            fetchPosts();
        } else {
            onMessage?.('Communication failure: ' + result.error, 'error');
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        const result = await deleteBlogPost(id);
        if (result.success) {
            onMessage?.('Insight successfully redacted from the archives.', 'success');
            fetchPosts();
        } else {
            onMessage?.('Redaction sequence failed.', 'error');
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter uppercase">
                        Strategic <span className="italic font-serif text-indigo-600">Insights</span>.
                    </h2>
                    <p className="text-xs md:text-sm font-medium text-zinc-500">Manage your brand&apos;s strategic narratives.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all shadow-xl shadow-indigo-100"
                >
                    <Plus size={20} /> New Insight
                </button>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search Strategy Archives (Title or Keywords)..."
                        className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-transparent focus:border-indigo-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-black text-[11px] uppercase tracking-widest text-zinc-900 placeholder:text-zinc-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="aspect-[4/5] bg-white rounded-[3rem] border border-zinc-100 animate-pulse" />
                    ))
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={post.id} className="group bg-white rounded-[3rem] border border-zinc-200/60 overflow-hidden hover:border-white transition-all duration-700 flex flex-col relative shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
                            <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                                {post.cover_image ? (
                                    <Image
                                        src={post.cover_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border ${post.status === 'published'
                                        ? 'bg-emerald-500/90 text-white border-transparent'
                                        : 'bg-white/90 text-zinc-900 border-zinc-200/50'
                                        }`}>
                                        {post.status === 'published' ? 'Active Intel' : 'Draft Protocol'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 flex flex-col flex-grow">
                                <div className="mb-4 flex items-center gap-3">
                                    <Calendar size={12} className="text-zinc-300" />
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest tabular-nums">
                                        {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-zinc-900 mb-4 line-clamp-2 leading-[1.1] tracking-tighter group-hover:text-indigo-600 transition-colors italic font-serif">
                                    {post.title}
                                </h3>
                                <p className="text-zinc-500 text-sm font-medium line-clamp-3 mb-8 leading-relaxed opacity-70">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-8 border-t border-zinc-50">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenModal(post)}
                                            className="p-4 text-zinc-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all shadow-sm hover:shadow-indigo-50 border border-transparent hover:border-indigo-100"
                                            title="Refine Insight"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-4 text-zinc-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all shadow-sm hover:shadow-rose-50 border border-transparent hover:border-rose-100"
                                            title="Redact Insight"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <a
                                        href={`/blog/${post.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 text-zinc-300 hover:text-zinc-900 hover:bg-zinc-50 rounded-2xl transition-all"
                                        title="View Live"
                                    >
                                        <Eye size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-40 text-center bg-zinc-50 rounded-[3rem] border border-zinc-100 border-dashed px-6 grayscale flex flex-col items-center justify-center gap-8">
                        <ImageIcon size={64} className="text-zinc-200" />
                        <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px]">No strategy archives match this transmission.</p>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
                    <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => !saving && setIsModalOpen(false)} />
                    <div className={`bg-white w-full ${isPreviewOpen ? 'max-w-7xl' : 'max-w-4xl'} max-h-[95vh] md:max-h-[90vh] rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 flex flex-col overflow-hidden transition-all duration-500 animate-in zoom-in-95`}>
                        <header className="p-6 md:p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50 shrink-0">
                            <div className="min-w-0">
                                <h3 className="text-lg md:text-2xl font-black text-zinc-900 tracking-tight truncate">
                                    {currentPost?.id ? 'Refine Strategy' : 'Draft New Insight'}
                                </h3>
                                <p className="hidden sm:block text-zinc-500 text-xs md:text-sm font-medium">Craft a narrative of digital dominance.</p>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 shrink-0">
                                <button
                                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                                    className={`hidden lg:flex px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] transition-all items-center gap-2 ${isPreviewOpen ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                                        }`}
                                >
                                    <Eye size={14} /> Intel
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 md:p-3 hover:bg-zinc-200 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </header>

                        <div className="flex flex-grow overflow-hidden">
                            <form onSubmit={handleSave} className={`flex-grow overflow-y-auto p-8 md:p-12 space-y-10 ${isPreviewOpen ? 'w-1/2 border-r border-zinc-100' : 'w-full'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Strategic Title</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Engineering Digital Echoes..."
                                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-bold text-zinc-900"
                                            value={currentPost?.title || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">URL Identifier (Slug)</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="engineering-digital-echoes"
                                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-bold text-zinc-900"
                                            value={currentPost?.slug || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Insight Hook (Excerpt)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Briefly capture the essence of this strategy..."
                                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-medium text-zinc-600 leading-relaxed"
                                        value={currentPost?.excerpt || ''}
                                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Full Narrative Analysis</label>
                                    <textarea
                                        required
                                        rows={10}
                                        placeholder="Deep dive into the performance metrics and strategic execution..."
                                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-medium text-zinc-600 leading-relaxed font-serif"
                                        value={currentPost?.content || ''}
                                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-6 pt-6 border-t border-zinc-100">
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 flex items-center gap-2">
                                        <Zap size={14} /> SEO Intelligence
                                    </h4>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Meta Title (SEO)</label>
                                        <input
                                            type="text"
                                            placeholder="Optimized Title Tag..."
                                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-bold text-zinc-800"
                                            value={currentPost?.meta_title || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, meta_title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Meta Description</label>
                                        <textarea
                                            rows={2}
                                            placeholder="Search engine summary (approx 160 chars)..."
                                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-medium text-zinc-600 leading-relaxed"
                                            value={currentPost?.meta_description || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, meta_description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Keywords (Comma Separated)</label>
                                        <input
                                            type="text"
                                            placeholder="brand, digital, marketing, strategy..."
                                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-bold text-zinc-800"
                                            value={currentPost?.keywords || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, keywords: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Visual Asset URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-bold text-zinc-900"
                                            value={currentPost?.cover_image || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, cover_image: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Publication Status</label>
                                        <select
                                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:border-indigo-600 outline-none font-black text-zinc-900 appearance-none uppercase tracking-widest text-xs"
                                            value={currentPost?.status || 'draft'}
                                            onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value as any })}
                                        >
                                            <option value="draft">Draft Protocol</option>
                                            <option value="published">Deploy to Public Hub</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-10 flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-grow bg-zinc-900 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {saving ? <Loader2 className="animate-spin" /> : <Globe size={20} />}
                                        {currentPost?.id ? 'Finalize Changes' : 'Deploy Insight'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-10 py-6 border border-zinc-200 rounded-2xl font-black uppercase tracking-widest text-zinc-400 hover:bg-zinc-50 transition-all text-xs"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                            {isPreviewOpen && (
                                <div className="w-1/2 bg-zinc-50 overflow-y-auto p-12 custom-scrollbar">
                                    <div className="max-w-prose mx-auto space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                                        {currentPost?.cover_image && (
                                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                                <Image src={currentPost.cover_image} alt="Preview" fill className="object-cover" />
                                            </div>
                                        )}
                                        <div className="space-y-6">
                                            <span className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600">Strategic Insight</span>
                                            <h1 className="text-4xl font-black text-zinc-900 leading-tight tracking-tighter italic font-serif">
                                                {currentPost?.title || 'System Untitled'}
                                            </h1>
                                            <p className="text-xl font-medium text-zinc-500 italic border-l-4 border-indigo-600 pl-6 leading-relaxed">
                                                {currentPost?.excerpt || 'Awaiting hooked introduction protocol...'}
                                            </p>
                                        </div>
                                        <div className="prose prose-zinc prose-lg max-w-none">
                                            <div className="text-zinc-600 leading-[1.8] whitespace-pre-wrap font-serif">
                                                {currentPost?.content || 'Scanning for narrative data streams...'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogManager;
