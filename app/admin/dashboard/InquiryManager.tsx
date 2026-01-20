
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
    Download,
    Search,
    Mail,
    Globe,
    MessageSquare,
    Loader2,
    Trash2,
    ArrowUpDown,
    ChevronDown,
    Phone
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
        setLoading(true);
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
            onMessage?.('Status updated successfully.', 'success');
            fetchInquiries();
        } else {
            onMessage?.('Status update failed.', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (!error) {
            onMessage?.('Lead removed successfully.', 'success');
            fetchInquiries();
        } else {
            onMessage?.('Error removing lead.', 'error');
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
        link.setAttribute("download", `inbound_leads_${new Date().toISOString().split('T')[0]}.csv`);
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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Inbound Leads</h2>
                    <p className="text-sm text-zinc-500">Manage and track your website inquiries.</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm"
                >
                    <Download size={16} /> Export CSV
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-2 shadow-sm flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads by name, email, or company..."
                        className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="h-px md:h-auto md:w-px bg-zinc-200 mx-2" />

                <div className="flex gap-2">
                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full pl-3 pr-10 py-2.5 bg-zinc-50 rounded-lg text-sm font-medium text-zinc-700 outline-none appearance-none cursor-pointer hover:bg-zinc-100 transition-colors"
                            value={filterService}
                            onChange={(e) => setFilterService(e.target.value)}
                        >
                            <option value="all">All Services</option>
                            {serviceTypes.map(type => (
                                <option key={type} value={type!}>{type}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
                    </div>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                        className="px-3 py-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-lg text-zinc-600 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                        <ArrowUpDown size={14} />
                        <span className="hidden sm:inline">{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                    </button>
                </div>
            </div>

            {/* Card Rows List */}
            <div className="space-y-3">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-zinc-400 gap-3">
                        <Loader2 className="animate-spin" size={24} />
                        <p className="text-sm">Loading leads...</p>
                    </div>
                ) : filteredInquiries.length > 0 ? (
                    filteredInquiries.map((inquiry) => (
                        <div
                            key={inquiry.id}
                            className="group bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 flex flex-col lg:flex-row lg:items-center gap-6"
                        >
                            {/* Main Info */}
                            <div className="flex items-center gap-4 min-w-[280px]">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-100 shrink-0">
                                    {inquiry.name ? inquiry.name[0]?.toUpperCase() : '?'}
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-zinc-900 leading-tight">{inquiry.name}</h3>
                                    <p className="text-xs text-zinc-500 mt-0.5">{new Date(inquiry.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-600">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-zinc-400" />
                                        <a href={`mailto:${inquiry.email}`} className="hover:text-indigo-600 transition-colors">{inquiry.email}</a>
                                    </div>
                                    {inquiry.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone size={14} className="text-zinc-400" />
                                            <a href={`tel:${inquiry.phone}`} className="hover:text-indigo-600 transition-colors">{inquiry.phone}</a>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    {inquiry.company && (
                                        <div className="flex items-center gap-2">
                                            <Globe size={14} className="text-zinc-400" />
                                            <span>{inquiry.company}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <span className="bg-zinc-100 text-zinc-600 py-0.5 px-2 rounded-full text-[10px] uppercase font-bold tracking-wider">
                                            {inquiry.service_type || 'General'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Message Preview (Truncated) */}
                            <div className="hidden xl:block w-64 text-sm text-zinc-500 italic truncate relative group/msg cursor-help">
                                &quot;{inquiry.message || 'No message provided'}&quot;
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-zinc-800 text-white text-xs p-3 rounded-lg opacity-0 group-hover/msg:opacity-100 pointer-events-none transition-opacity z-10 whitespace-normal shadow-xl">
                                    {inquiry.message || 'No message'}
                                </div>
                            </div>

                            {/* Actions & Status */}
                            <div className="flex items-center gap-4 lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 mt-2 lg:mt-0">
                                <div className="relative">
                                    <select
                                        value={inquiry.status || 'new'}
                                        onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                                        className={`
                                            appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-semibold cursor-pointer outline-none transition-all
                                            ${inquiry.status === 'responded' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : ''}
                                            ${inquiry.status === 'new' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : ''}
                                            ${inquiry.status === 'archived' ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200' : ''}
                                            ${!['responded', 'new', 'archived'].includes(inquiry.status) ? 'bg-zinc-100 text-zinc-600' : ''}
                                        `}
                                    >
                                        <option value="new">Unread</option>
                                        <option value="responded">Responded</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" size={12} fill="currentColor" />
                                </div>

                                <button
                                    onClick={() => handleDelete(inquiry.id)}
                                    className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                    title="Delete Lead"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center bg-white border border-zinc-200 rounded-3xl flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
                            <MessageSquare size={24} />
                        </div>
                        <p className="text-zinc-500 font-medium text-sm">No leads found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InquiryManager;
