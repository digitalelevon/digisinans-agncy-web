
"use client";

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Loader2,
    X,
    Building2,
    Zap,
    Target,
    BarChart3,
    Globe,
    Image as ImageIcon,
    ChevronRight
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
            onMessage?.('Case study successfully archived and deployed.', 'success');
            fetchStudies();
        } else {
            onMessage?.('Tactical error: ' + result.error, 'error');
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this case study?')) return;
        const result = await deleteCaseStudy(id);
        if (result.success) {
            onMessage?.('Mission data successfully purged.', 'success');
            fetchStudies();
        } else {
            onMessage?.('Purge sequence failed.', 'error');
        }
    };

    const filteredStudies = studies.filter(study =>
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.client?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter uppercase">
                        Elite <span className="italic font-serif text-indigo-600">Performance</span> Reports.
                    </h2>
                    <p className="text-xs md:text-sm font-medium text-zinc-500">Documenting blueprints for digital market dominance.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all shadow-xl shadow-indigo-100"
                >
                    <Plus size={20} /> Deploy New Report
                </button>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Scan Performance Reports (Client, Strategy, Result)..."
                        className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-transparent focus:border-indigo-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-black text-[11px] uppercase tracking-widest text-zinc-900 placeholder:text-zinc-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {loading ? (
                    [1, 2].map(i => (
                        <div key={i} className="aspect-video bg-white rounded-[4rem] border border-zinc-100 animate-pulse" />
                    ))
                ) : filteredStudies.length > 0 ? (
                    filteredStudies.map((study) => (
                        <div key={study.id} className="group bg-white rounded-[4rem] border border-zinc-200/60 overflow-hidden hover:border-white transition-all duration-700 flex flex-col shadow-sm hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.12)] relative">
                            <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                                {study.cover_image ? (
                                    <Image
                                        src={study.cover_image}
                                        alt={study.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                        <BarChart3 size={64} />
                                    </div>
                                )}

                                {/* Status Badge */}
                                <div className="absolute top-8 right-8 z-10">
                                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border ${study.status === 'published'
                                        ? 'bg-emerald-500 text-white border-transparent shadow-lg shadow-emerald-500/20'
                                        : 'bg-white/90 text-zinc-900 border-zinc-200/50'
                                        }`}>
                                        {study.status === 'published' ? 'Deployed' : 'Classified'}
                                    </span>
                                </div>

                                {/* Floating Metric Card */}
                                <div className="absolute bottom-8 left-8 z-10">
                                    <div className="bg-zinc-900 border border-zinc-800 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-6 group-hover:bg-white group-hover:text-zinc-900 transition-colors duration-500">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">Key Alpha</span>
                                            <span className="text-3xl font-black italic font-serif leading-none">{study.result_metric}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0">
                                            <Zap size={18} fill="currentColor" strokeWidth={0} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 md:p-14 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-[11px] font-black uppercase tracking-[0.35em] text-indigo-600 truncate">{study.service_category}</span>
                                    <span className="w-8 h-px bg-zinc-100" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.35em] text-zinc-300 truncate">{study.client}</span>
                                </div>

                                <h3 className="text-2xl md:text-4xl font-black text-zinc-900 mb-8 leading-[1.05] tracking-tighter uppercase italic font-serif group-hover:text-indigo-600 transition-colors">
                                    {study.title}
                                </h3>

                                <p className="text-zinc-500 text-sm md:text-base font-medium line-clamp-3 mb-10 leading-relaxed opacity-60">
                                    {study.challenge}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-10 border-t border-zinc-50">
                                    <button
                                        onClick={() => handleOpenModal(study)}
                                        className="inline-flex items-center gap-4 p-5 bg-zinc-50 hover:bg-zinc-900 hover:text-white rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-[0.3em] active:scale-95"
                                    >
                                        <Edit2 size={16} /> Refine Report
                                    </button>
                                    <button
                                        onClick={() => handleDelete(study.id)}
                                        className="p-5 text-zinc-200 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-40 text-center bg-zinc-50 rounded-[4rem] border border-zinc-100 border-dashed px-6 flex flex-col items-center justify-center gap-10 grayscale opacity-60">
                        <BarChart3 size={80} className="text-zinc-200" />
                        <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-[11px]">Neural Archives: No mission data found.</p>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
                    <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => !saving && setIsModalOpen(false)} />
                    <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
                        <header className="p-6 md:p-10 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/30 shrink-0">
                            <div className="min-w-0">
                                <h3 className="text-xl md:text-3xl font-black text-zinc-900 tracking-tighter uppercase italic font-serif truncate">
                                    {currentStudy?.id ? 'Refine Mission' : 'Initialize Mission'}
                                </h3>
                                <p className="hidden sm:block text-zinc-500 text-xs md:text-sm font-medium">Documenting the blueprint for digital market dominance.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 md:p-4 hover:bg-zinc-200 rounded-full transition-colors shrink-0"
                            >
                                <X size={20} />
                            </button>
                        </header>

                        <form onSubmit={handleSave} className="flex-grow overflow-y-auto p-10 md:p-16 space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Mission Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Dominating the Luxury Market..."
                                        className="w-full px-8 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:border-indigo-600 outline-none font-bold text-zinc-900 text-lg"
                                        value={currentStudy?.title || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Client Brand Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Skyline Ventures"
                                        className="w-full px-8 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:border-indigo-600 outline-none font-bold text-zinc-900 text-lg"
                                        value={currentStudy?.client || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, client: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Intelligence Stream (Category)</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Performance SEO"
                                        className="w-full px-8 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:border-indigo-600 outline-none font-bold text-zinc-900"
                                        value={currentStudy?.service_category || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, service_category: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Primary Growth Metric</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. +420% ROI"
                                        className="w-full px-8 py-5 bg-indigo-50 border border-indigo-100 rounded-3xl focus:border-indigo-600 outline-none font-black text-indigo-600 text-xl"
                                        value={currentStudy?.result_metric || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, result_metric: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">The Market Challenge</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Describe the initial friction and market limitations..."
                                    className="w-full px-8 py-6 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] focus:border-indigo-600 outline-none font-medium text-zinc-600 italic leading-relaxed text-lg"
                                    value={currentStudy?.challenge || ''}
                                    onChange={(e) => setCurrentStudy({ ...currentStudy, challenge: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Tactical Deployment (Solution)</label>
                                <textarea
                                    required
                                    rows={6}
                                    placeholder="Detail the elite performance framework utilized..."
                                    className="w-full px-8 py-6 bg-zinc-100 text-zinc-900 rounded-[2.5rem] focus:border-indigo-600 outline-none font-bold leading-relaxed text-lg border-2 border-transparent focus:bg-white"
                                    value={currentStudy?.solution || ''}
                                    onChange={(e) => setCurrentStudy({ ...currentStudy, solution: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Hero Asset URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full px-8 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:border-indigo-600 outline-none font-bold text-zinc-900"
                                        value={currentStudy?.cover_image || ''}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, cover_image: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Mission Status</label>
                                    <select
                                        className="w-full px-8 py-5 bg-zinc-900 text-white rounded-3xl focus:bg-indigo-600 outline-none font-black appearance-none uppercase tracking-[0.2em] text-xs"
                                        value={currentStudy?.status || 'draft'}
                                        onChange={(e) => setCurrentStudy({ ...currentStudy, status: e.target.value as any })}
                                    >
                                        <option value="draft">Classified (Draft)</option>
                                        <option value="published">Deploy Public Report</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-12 flex gap-6">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-grow bg-indigo-600 text-white py-7 rounded-3xl font-black uppercase tracking-[0.4em] hover:bg-zinc-900 transition-all shadow-2xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-4 text-sm"
                                >
                                    {saving ? <Loader2 className="animate-spin" /> : <Zap size={22} fill="currentColor" />}
                                    {currentStudy?.id ? 'Confirm Tactical Updates' : 'Initiate Public Deployment'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-12 py-7 border-2 border-zinc-100 rounded-3xl font-black uppercase tracking-widest text-zinc-400 hover:bg-zinc-50 hover:border-zinc-200 transition-all text-xs"
                                >
                                    Decline
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
