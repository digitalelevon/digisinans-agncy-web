
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Trash2,
    Copy,
    Check,
    MessageSquare,
    Loader2,
    Phone,
    ArrowUpDown
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ChatbotLead {
    id: string;
    created_at: string;
    name: string;
    phone: string;
    email?: string;
    inquiry_summary: string;
    service_type?: string;
    status: string;
}

const ChatbotLeadsManager = ({ onMessage }: { onMessage?: (msg: string, type: 'success' | 'error') => void }) => {
    const [leads, setLeads] = useState<ChatbotLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('chatbot_leads')
            .select('*')
            .order('created_at', { ascending: sortOrder === 'oldest' });

        if (!error && data) {
            setLeads(data as any);
        }
        setLoading(false);
    }, [sortOrder]);

    useEffect(() => {
        fetchLeads();

        const subscription = supabase
            .channel('chatbot_lead_updates')
            .on('postgres_changes' as any, { event: '*', table: 'chatbot_leads', schema: 'public' }, () => {
                fetchLeads();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [fetchLeads]);

    const handleDelete = async (id: string) => {
        if (!confirm('Permanently delete this AI chatbot lead?')) return;
        const { error } = await supabase.from('chatbot_leads').delete().eq('id', id);
        if (!error) {
            onMessage?.('Lead removed successfully.', 'success');
            fetchLeads();
        } else {
            onMessage?.('Error removing lead.', 'error');
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        onMessage?.('Copied to clipboard.', 'success');
    };

    const filteredLeads = leads.filter(lead =>
        (lead.name && lead.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lead.phone && lead.phone.includes(searchQuery)) ||
        (lead.inquiry_summary && lead.inquiry_summary.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('chatbot_leads')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            onMessage?.('Status updated successfully.', 'success');
            fetchLeads();
        } else {
            onMessage?.('Failed to update status.', 'error');
        }
    };

    const exportToCSV = () => {
        const headers = ["Date", "Name", "Phone", "Email", "Service", "Summary"];
        const rows = leads.map(lead => [
            new Date(lead.created_at).toLocaleDateString(),
            lead.name,
            lead.phone,
            lead.email || '',
            lead.service_type || '',
            lead.inquiry_summary || ''
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `chatbot_leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Chatbot Leads</h2>
                    <p className="text-sm text-zinc-500">Autonomous leads captured via Gemini AI.</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={exportToCSV}
                        className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm"
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-2 shadow-sm flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, phone, or summary..."
                        className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="h-px md:h-auto md:w-px bg-zinc-200 mx-2" />

                <div className="flex gap-2">
                    <button
                        onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                        className="px-3 py-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-lg text-zinc-600 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                        <ArrowUpDown size={14} />
                        <span className="hidden sm:inline">{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                    </button>
                </div>
            </div>

            {/* Card Rows */}
            <div className="space-y-3">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-zinc-400 gap-3">
                        <Loader2 className="animate-spin" size={24} />
                        <p className="text-sm">Loading neural data...</p>
                    </div>
                ) : filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                        <div
                            key={lead.id}
                            className="group bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 flex flex-col lg:flex-row lg:items-center gap-6"
                        >
                            {/* Main Info */}
                            <div className="flex items-center gap-4 min-w-[280px]">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-100 shrink-0">
                                    {lead.name ? lead.name[0]?.toUpperCase() : '?'}
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-zinc-900 leading-tight">{lead.name || 'Anonymous'}</h3>
                                    <p className="text-xs text-zinc-500 mt-0.5">{new Date(lead.created_at).toLocaleDateString()} • {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>

                            {/* Contact & Service */}
                            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-600">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-zinc-400" />
                                        <span className="font-mono text-xs">{lead.phone || 'N/A'}</span>
                                        {lead.phone && (
                                            <button
                                                onClick={() => copyToClipboard(lead.phone, lead.id)}
                                                className="text-zinc-300 hover:text-indigo-600 transition-colors"
                                                title="Copy Phone"
                                            >
                                                {copiedId === lead.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                            </button>
                                        )}
                                    </div>
                                    {lead.email && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-zinc-500">{lead.email}</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <span className="bg-zinc-100 text-zinc-600 py-0.5 px-2 rounded-full text-[10px] uppercase font-bold tracking-wider inline-block">
                                        {lead.service_type || 'General'}
                                    </span>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="hidden xl:block w-72 text-sm text-zinc-500 italic truncate relative group/msg cursor-help">
                                &quot;{lead.inquiry_summary}&quot;
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-zinc-800 text-white text-xs p-3 rounded-lg opacity-0 group-hover/msg:opacity-100 pointer-events-none transition-opacity z-10 whitespace-normal shadow-xl leading-relaxed">
                                    {lead.inquiry_summary}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 mt-2 lg:mt-0">
                                <div className="relative">
                                    <select
                                        value={lead.status || 'new'}
                                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                                        className={`
                                            appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-semibold cursor-pointer outline-none transition-all
                                            ${lead.status === 'qualified' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : ''}
                                            ${lead.status === 'new' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : ''}
                                            ${lead.status === 'contacted' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : ''}
                                            ${lead.status === 'converted' ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : ''}
                                            ${lead.status === 'archived' ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200' : ''}
                                            ${!['qualified', 'new', 'contacted', 'converted', 'archived'].includes(lead.status) ? 'bg-zinc-100 text-zinc-600' : ''}
                                        `}
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="converted">Converted</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(lead.id)}
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
                        <p className="text-zinc-500 font-medium text-sm">No chatbot leads found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatbotLeadsManager;
