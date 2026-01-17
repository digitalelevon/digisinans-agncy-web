
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
    Download,
    Search,
    Calendar,
    Mail,
    Globe,
    MessageSquare,
    Loader2,
    Trash2,
    CheckCircle2,
    ArrowUpDown,
    Filter,
    ChevronDown,
    ArrowRight,
    Phone,
    Users
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Inquiry {
    id: string;
    created_at: string;
    name: string;
    phone?: string;
    email: string;
    company: string | null;
    service_type: string | null;
    message: string | null;
    status: string;
}

const InquiryManager = ({ onMessage }: { onMessage?: (msg: string, type: 'success' | 'error') => void }) => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [filterService, setFilterService] = useState<string>('all');

    const fetchInquiries = useCallback(async () => {
        setLoading(true); // Always show loader on fetch
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: sortOrder === 'oldest' });

        if (!error && data) {
            setInquiries(data);
        }
        setLoading(false);
    }, [sortOrder]);

    useEffect(() => {
        fetchInquiries();

        // Real-time strategic interception
        const subscription = supabase
            .channel('inquiry_updates')
            .on('postgres_changes' as any, { event: '*', table: 'inquiries', schema: 'public' }, () => {
                fetchInquiries();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [fetchInquiries]);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('inquiries')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            onMessage?.('Communication status updated.', 'success');
            fetchInquiries();
        } else {
            onMessage?.('Status update failed.', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (!error) {
            onMessage?.('Lead transmission archived and removed.', 'success');
            fetchInquiries();
        } else {
            onMessage?.('Communication error during archive.', 'error');
        }
    };

    const exportToCSV = () => {
        const headers = ["Date", "Name", "Email", "Company/Website", "Service", "Message"];
        const rows = inquiries.map(iq => [
            new Date(iq.created_at).toLocaleDateString(),
            iq.name,
            iq.email,
            iq.company || '',
            iq.service_type || '',
            iq.message || ''
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `digisinans_leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredInquiries = inquiries.filter(iq => {
        const matchesSearch =
            iq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            iq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (iq.company && iq.company.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter = filterService === 'all' || iq.service_type === filterService;

        return matchesSearch && matchesFilter;
    });

    const serviceTypes = Array.from(new Set(inquiries.map(iq => iq.service_type).filter(Boolean)));

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter uppercase">
                        Market <span className="italic font-serif text-indigo-600">Dominance</span> Reports.
                    </h2>
                    <p className="text-xs md:text-sm font-medium text-zinc-500">Inbound tactical leads and strategic inquiries.</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
                >
                    <Download size={20} /> Export CSV
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm flex flex-col xl:flex-row gap-6 items-stretch">
                <div className="relative group flex-grow">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search Intelligence Hub (Name, Email, Website)..."
                        className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-transparent focus:border-indigo-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-black text-[11px] uppercase tracking-widest text-zinc-900 placeholder:text-zinc-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative group min-w-[200px]">
                        <select
                            className="w-full pl-6 pr-12 py-5 bg-zinc-50 border border-transparent rounded-[1.5rem] outline-none font-black text-[11px] uppercase tracking-[0.2em] text-zinc-500 appearance-none cursor-pointer focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                            value={filterService}
                            onChange={(e) => setFilterService(e.target.value)}
                        >
                            <option value="all">Deployment Channels</option>
                            {serviceTypes.map(type => (
                                <option key={type} value={type!}>{type}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" size={14} />
                    </div>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                        className="px-6 py-5 bg-zinc-50 border border-transparent hover:border-indigo-200 hover:bg-white rounded-[1.5rem] text-zinc-500 hover:text-indigo-600 transition-all flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-[0.2em] shadow-sm active:scale-95"
                    >
                        <ArrowUpDown size={16} />
                        <span>{sortOrder === 'newest' ? 'Latest Intel' : 'Legacy Data'}</span>
                    </button>
                </div>
            </div>

            {/* Leads Table/Grid */}
            <div className="bg-white rounded-[3.5rem] border border-zinc-200/60 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="py-40 flex flex-col items-center justify-center text-zinc-200 gap-6">
                        <Loader2 className="animate-spin" size={40} />
                        <p className="font-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Hub Data...</p>
                    </div>
                ) : filteredInquiries.length > 0 ? (
                    <>
                        <div className="hidden 2xl:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50/50 border-b border-zinc-100/50">
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Strategist Detail</th>
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Contact Vector</th>
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Deployment Type</th>
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                                        <th className="px-10 py-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Tactical</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {filteredInquiries.map((inquiry) => (
                                        <tr key={inquiry.id} className="group hover:bg-zinc-50/40 transition-all duration-300">
                                            <td className="px-10 py-10">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-lg group-hover:scale-110 transition-transform shadow-lg shadow-indigo-50">
                                                        {inquiry.name ? inquiry.name[0]?.toUpperCase() : '?'}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-base font-black text-zinc-900 tracking-tight">{inquiry.name}</span>
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest tabular-nums mt-1.5">
                                                            {new Date(inquiry.created_at).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className="flex flex-col gap-2.5">
                                                    <a href={`mailto:${inquiry.email}`} className="text-xs font-black text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-xl border border-transparent hover:border-indigo-100 transition-all w-fit uppercase tracking-widest flex items-center gap-2">
                                                        <Mail size={12} /> {inquiry.email}
                                                    </a>
                                                    {inquiry.phone && (
                                                        <a href={`tel:${inquiry.phone}`} className="text-[11px] font-bold text-zinc-500 px-3 py-1 hover:text-zinc-900 transition-colors flex items-center gap-2">
                                                            <Phone size={11} className="text-zinc-300" /> {inquiry.phone}
                                                        </a>
                                                    )}
                                                    {inquiry.company && (
                                                        <div className="flex items-center gap-2.5 mt-2 py-1.5 px-4 bg-zinc-50 rounded-lg w-fit border border-zinc-100 shadow-sm">
                                                            <Globe size={11} className="text-zinc-300" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{inquiry.company}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className="flex flex-col gap-3">
                                                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border w-fit shadow-sm ${inquiry.service_type?.includes('Audit')
                                                        ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                        : 'bg-indigo-600 text-white border-transparent'
                                                        }`}>
                                                        {inquiry.service_type || 'General Intelligence'}
                                                    </span>
                                                    <p className="text-[13px] font-medium text-zinc-500 line-clamp-2 leading-relaxed italic max-w-sm">
                                                        &quot;{inquiry.message || 'No mission brief provided.'}&quot;
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <select
                                                    value={inquiry.status || 'new'}
                                                    onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                                                    className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border outline-none transition-all cursor-pointer shadow-sm ${inquiry.status === 'responded'
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                        : 'bg-zinc-50 text-zinc-500 border-transparent focus:border-indigo-600 focus:bg-white'
                                                        }`}
                                                >
                                                    <option value="new">Unread Transmission</option>
                                                    <option value="responded">Neutralized (Contacted)</option>
                                                    <option value="archived">Archived Protocol</option>
                                                </select>
                                            </td>
                                            <td className="px-10 py-10 text-center">
                                                <button
                                                    onClick={() => handleDelete(inquiry.id)}
                                                    className="p-4 text-zinc-200 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm hover:shadow-rose-100"
                                                    title="Archive Intelligence"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile & Tablet Card List */}
                        <div className="2xl:hidden p-8 space-y-8">
                            {filteredInquiries.map((inquiry) => (
                                <div key={inquiry.id} className="p-8 bg-zinc-50 border border-zinc-200/50 rounded-[3rem] space-y-10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                    <div className="flex items-start justify-between relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 font-black text-2xl shadow-2xl shadow-zinc-200/80 border border-zinc-100">
                                                {inquiry.name ? inquiry.name[0]?.toUpperCase() : '?'}
                                            </div>
                                            <div>
                                                <h5 className="font-black text-zinc-900 tracking-tighter text-xl">{inquiry.name}</h5>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mt-2 italic tabular-nums">
                                                    {new Date(inquiry.created_at).toLocaleDateString()} at {new Date(inquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(inquiry.id)}
                                            className="p-5 text-zinc-300 hover:text-rose-600 transition-colors bg-white rounded-2xl shadow-sm border border-zinc-100"
                                        >
                                            <Trash2 size={22} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                        <Mail size={14} />
                                                    </div>
                                                    <a href={`mailto:${inquiry.email}`} className="text-xs font-black text-zinc-900 uppercase tracking-widest truncate">{inquiry.email}</a>
                                                </div>
                                                {inquiry.phone && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                            <Phone size={14} />
                                                        </div>
                                                        <a href={`tel:${inquiry.phone}`} className="text-xs font-bold text-zinc-600">{inquiry.phone}</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Target Segment</span>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                                </div>
                                                <p className="text-[11px] font-black uppercase tracking-widest text-indigo-600 leading-tight">
                                                    {inquiry.service_type || 'General Market Dominance'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-white/60 backdrop-blur rounded-[2.5rem] border border-white shadow-xl shadow-zinc-200/20 relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <MessageSquare size={14} className="text-indigo-600" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Mission Brief</span>
                                        </div>
                                        <p className="text-sm font-medium text-zinc-600 leading-[1.8] italic">
                                            &quot;{inquiry.message || 'Transmission contains no text parameters.'}&quot;
                                        </p>
                                    </div>

                                    <div className="relative z-10">
                                        <select
                                            value={inquiry.status || 'new'}
                                            onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                                            className="w-full bg-zinc-900 text-white rounded-[1.5rem] px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] outline-none shadow-2xl shadow-indigo-900/10 active:scale-[0.98] transition-all"
                                        >
                                            <option value="new">Unread Transmission</option>
                                            <option value="responded">Neutralized (Contacted)</option>
                                            <option value="archived">Archived Protocol</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="py-40 text-center flex flex-col items-center justify-center gap-8 grayscale brightness-110">
                        <div className="w-24 h-24 bg-zinc-50 rounded-[3rem] border border-zinc-100 shadow-inner flex items-center justify-center text-zinc-200">
                            <MessageSquare size={44} />
                        </div>
                        <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[11px]">No lead transmissions matching parameters.</p>
                    </div>
                )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Total Transmissions', value: inquiries.length, color: 'indigo', gradient: 'from-indigo-600 to-blue-600' },
                    { label: 'Conversion Performance', value: 'High', color: 'emerald', gradient: 'from-emerald-600 to-teal-500' },
                    { label: 'Mean Response Latency', value: '< 2h', color: 'amber', gradient: 'from-amber-600 to-orange-500' }
                ].map((stat, i) => (
                    <div key={i} className="p-10 bg-white rounded-[3.5rem] border border-zinc-200/60 shadow-sm relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-full blur-3xl transition-opacity duration-700`} />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-4">{stat.label}</p>
                        <p className="text-5xl font-black text-zinc-900 tracking-tighter italic font-serif group-hover:text-indigo-600 transition-colors">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InquiryManager;
