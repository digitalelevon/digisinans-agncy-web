
"use client";

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Loader2,
    X,
    Zap,
    BarChart3,
    Globe
} from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { CaseStudy } from '@/lib/types';
import { createCaseStudy, updateCaseStudy, deleteCaseStudy } from '@/app/actions/case-study';

const StudyManager = ({ onMessage }: { onMessage?: (msg: string, type: 'success' | 'error') => void }) => {
    const [studies, setStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudy, setCurrentStudy] = useState<Partial<CaseStudy> | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchStudies();
    }, []);

    const fetchStudies = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('case_studies')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setStudies(data);
        }
        setLoading(false);
    };

    const handleOpenModal = (study: Partial<CaseStudy> | null = null) => {
        setCurrentStudy(study || {
            title: '',
            client: '',
            service_category: '',
            result_metric: '',
            challenge: '',
            solution: '',
            status: 'draft',
            cover_image: ''
        });
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData();
        formData.append('title', currentStudy?.title || '');
        formData.append('client', currentStudy?.client || '');
        formData.append('service_category', currentStudy?.service_category || '');
        formData.append('result_metric', currentStudy?.result_metric || '');
        formData.append('cover_image', currentStudy?.cover_image || '');
        formData.append('challenge', currentStudy?.challenge || '');
        formData.append('solution', currentStudy?.solution || '');
        formData.append('status', currentStudy?.status || 'draft');

        let result;

        if (currentStudy?.id) {
            result = await updateCaseStudy(currentStudy.id, formData);
        } else {
            result = await createCaseStudy(formData);
        }

        if (result.success) {
            setIsModalOpen(false);
            onMessage?.('Case study saved successfully.', 'success');
            fetchStudies();
        } else {
            onMessage?.('Failed to save case study: ' + result.error, 'error');
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this case study?')) return;
        const result = await deleteCaseStudy(id);
        if (result.success) {
            onMessage?.('Case study deleted successfully.', 'success');
            fetchStudies();
        } else {
            onMessage?.('Failed to delete case study.', 'error');
        }
    };

    const filteredStudies = studies.filter(study =>
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.client?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Case Studies</h2>
                    <p className="text-sm text-zinc-500">showcase your simplified success stories.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium shadow-sm"
                >
                    <Plus size={16} /> New Case Study
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-2 shadow-sm flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search case studies..."
                        className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    [1, 2].map(i => (
                        <div key={i} className="aspect-video bg-white rounded-2xl border border-zinc-200 animate-pulse" />
                    ))
                ) : filteredStudies.length > 0 ? (
                    filteredStudies.map((study) => (
                        <div key={study.id} className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col relative">
                            <div className="relative aspect-video bg-zinc-100 overflow-hidden border-b border-zinc-100">
                                {study.cover_image ? (
                                    <Image
                                        src={study.cover_image}
                                        alt={study.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                        <BarChart3 size={48} />
                                    </div>
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium border shadow-sm ${study.status === 'published'
                                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                        : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                                        }`}>
                                        {study.status === 'published' ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3 text-xs text-zinc-500">
                                    <Globe size={14} />
                                    <span className="font-medium text-zinc-700">{study.client}</span>
                                    <span className="text-zinc-300">•</span>
                                    <span>{study.service_category}</span>
                                </div>

                                <h3 className="text-lg font-bold text-zinc-900 mb-2 leading-tight">
                                    {study.title}
                                </h3>

                                <div className="mt-2 mb-4 p-3 bg-indigo-50 rounded-lg flex items-center gap-3 border border-indigo-100">
                                    <Zap size={16} className="text-indigo-600 shrink-0" fill="currentColor" />
                                    <span className="text-sm font-semibold text-indigo-900">{study.result_metric}</span>
                                </div>

                                <p className="text-zinc-500 text-sm line-clamp-2 mb-4 flex-grow">
                                    {study.challenge}
                                </p>

                                <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100 mt-auto">
                                    <button
                                        onClick={() => handleOpenModal(study)}
                                        className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(study.id)}
                                        className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-zinc-200 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
                            <BarChart3 size={24} />
                        </div>
                        <p className="text-zinc-500 font-medium text-sm">No case studies found.</p>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={() => !saving && setIsModalOpen(false)} />
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl relative z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                        <header className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-white shrink-0">
                            <h3 className="text-lg font-bold text-zinc-900">
                                {currentStudy?.id ? 'Edit Case Study' : 'New Case Study'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </header>

                        <form onSubmit={handleSave} className="flex-grow overflow-y-auto p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-1">Title</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                        value={currentStudy?.title || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-1">Client Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                        value={currentStudy?.client || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, client: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-1">Service Category</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. SEO, Web Design"
                                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                        value={currentStudy?.service_category || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, service_category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-1">Result Metric</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. +300% ROI"
                                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm font-semibold text-indigo-600"
                                        value={currentStudy?.result_metric || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, result_metric: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-700 mb-1">Challenge</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                    value={currentStudy?.challenge || ''}
                                    onChange={(e) => setCurrentStudy({ ...currentStudy, challenge: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-700 mb-1">Solution</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                    value={currentStudy?.solution || ''}
                                    onChange={(e) => setCurrentStudy({ ...currentStudy, solution: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-1">Cover Image URL</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                        value={currentStudy?.cover_image || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, cover_image: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-1">Status</label>
                                    <select
                                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all text-sm"
                                        value={currentStudy?.status || 'draft'}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, status: e.target.value as any })}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3 border-t border-zinc-100">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-grow bg-zinc-900 text-white py-2.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                                >
                                    {saving ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} fill="currentColor" />}
                                    {currentStudy?.id ? 'Save Changes' : 'Create Case Study'}
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyManager;
