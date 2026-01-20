
"use client";

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    Loader2,
    X,
    Image as ImageIcon,
    CheckCircle,
    Calendar,
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
            onMessage?.('Blog post saved successfully.', 'success');
            fetchPosts();
        } else {
            onMessage?.('Failed to save post: ' + result.error, 'error');
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        const result = await deleteBlogPost(id);
        if (result.success) {
            onMessage?.('Post deleted successfully.', 'success');
            fetchPosts();
        } else {
            onMessage?.('Failed to delete post.', 'error');
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Blog Posts</h2>
                    <p className="text-sm text-zinc-500">Manage your blog content and publications.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium shadow-sm"
                >
                    <Plus size={16} /> New Post
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-2 shadow-sm flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="aspect-[4/3] bg-white rounded-2xl border border-zinc-200 animate-pulse" />
                    ))
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={post.id} className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
                            <div className="relative aspect-video bg-zinc-100 overflow-hidden border-b border-zinc-100">
                                {post.cover_image ? (
                                    <Image
                                        src={post.cover_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium border shadow-sm ${post.status === 'published'
                                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                        : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                                        }`}>
                                        {post.status === 'published' ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
                                    <Calendar size={14} />
                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-900 mb-2 line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-zinc-500 text-sm line-clamp-2 mb-4 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenModal(post)}
                                            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <a
                                        href={`/blog/${post.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="View Live"
                                    >
                                        <Eye size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-zinc-200 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
                            <ImageIcon size={24} />
                        </div>
                        <p className="text-zinc-500 font-medium text-sm">No blog posts found.</p>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={() => !saving && setIsModalOpen(false)} />
                    <div className={`bg-white w-full ${isPreviewOpen ? 'max-w-6xl' : 'max-w-3xl'} max-h-[90vh] rounded-2xl shadow-xl relative z-10 flex flex-col overflow-hidden transition-all duration-300 animate-in zoom-in-95`}>
                        <header className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-white shrink-0">
                            <h3 className="text-lg font-bold text-zinc-900">
                                {currentPost?.id ? 'Edit Post' : 'New Post'}
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                                    className={`hidden md:flex px-3 py-1.5 rounded-lg text-xs font-medium transition-colors items-center gap-2 ${isPreviewOpen ? 'bg-indigo-50 text-indigo-600' : 'text-zinc-600 hover:bg-zinc-100'
                                        }`}
                                >
                                    <Eye size={14} /> Preview
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </header>

                        <div className="flex flex-grow overflow-hidden">
                            <form onSubmit={handleSave} className={`flex-grow overflow-y-auto p-6 space-y-6 ${isPreviewOpen ? 'w-1/2 border-r border-zinc-100' : 'w-full'}`}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Title</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                            value={currentPost?.title || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Slug</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm font-mono text-zinc-600"
                                            value={currentPost?.slug || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-1">Excerpt</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                        value={currentPost?.excerpt || ''}
                                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-1">Content (Markdown/HTML)</label>
                                    <textarea
                                        required
                                        rows={12}
                                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm font-mono leading-relaxed"
                                        value={currentPost?.content || ''}
                                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-zinc-100">
                                    <h4 className="text-xs font-semibold text-zinc-900 flex items-center gap-2">
                                        <Zap size={14} className="text-amber-500" /> SEO Settings
                                    </h4>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Meta Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                            value={currentPost?.meta_title || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, meta_title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Meta Description</label>
                                        <textarea
                                            rows={2}
                                            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                            value={currentPost?.meta_description || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, meta_description: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Keywords</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                            value={currentPost?.keywords || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, keywords: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Cover Image URL</label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                            value={currentPost?.cover_image || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, cover_image: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Status</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                            value={currentPost?.status || 'draft'}
                                            onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value as any })}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-grow bg-zinc-900 text-white py-2.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                                    >
                                        {saving ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                                        {currentPost?.id ? 'Save Changes' : 'Create Post'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 border border-zinc-200 rounded-xl font-medium text-zinc-700 hover:bg-zinc-50 transition-colors text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                            {isPreviewOpen && (
                                <div className="w-1/2 bg-zinc-50 overflow-y-auto p-8 border-l border-zinc-100">
                                    <div className="prose prose-sm max-w-none">
                                        {currentPost?.cover_image && (
                                            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                                                <Image src={currentPost.cover_image} alt="Preview" fill className="object-cover" />
                                            </div>
                                        )}
                                        <h1>{currentPost?.title || 'Untitled Post'}</h1>
                                        <p className="lead">{currentPost?.excerpt}</p>
                                        <div className="whitespace-pre-wrap">{currentPost?.content}</div>
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
