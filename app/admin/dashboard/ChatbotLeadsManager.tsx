
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Trash2,
    Copy,
    Check,
    MessageSquare,
    Loader2,
    Calendar,
    Phone,
    User,
    Users,
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

        // Real-time neural sync
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
            onMessage?.('Lead Intelligence archived.', 'success');
            fetchLeads();
        } else {
            onMessage?.('System error during archive.', 'error');
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        onMessage?.('Phone number copied to clipboard.', 'success');
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
            onMessage?.('Status updated.', 'success');
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
        link.setAttribute("download", `digisinans_chatbot_leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter uppercase">
                        Neural <span className="italic font-serif text-indigo-600">Interception</span> Hub.
                    </h2>
                    <p className="text-xs md:text-sm font-medium text-zinc-500">Autonomous lead generation via Gemini AI.</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={exportToCSV}
                        className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
                    >
                        Export CSV
                    </button>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                        className="bg-white border border-zinc-100 p-4 rounded-2xl text-zinc-500 hover:text-indigo-600 transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-sm"
                    >
                        <ArrowUpDown size={16} /> {sortOrder}
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Filter by name, phone or inquiry content..."
                        className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-transparent focus:border-indigo-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-black text-[11px] uppercase tracking-widest text-zinc-900 placeholder:text-zinc-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table / Card View Area */}
            <div className="bg-white rounded-[3rem] border border-zinc-200/60 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="py-40 flex flex-col items-center justify-center text-zinc-200 gap-6">
                        <Loader2 className="animate-spin" size={40} />
                        <p className="font-black uppercase tracking-[0.3em] text-[10px]">Syncing Neural Data...</p>
                    </div>
                ) : filteredLeads.length > 0 ? (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden xl:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50/50 border-b border-zinc-100/50">
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Strategist Detail</th>
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Contact Vector</th>
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Digital Identity</th>
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Interception Brief</th>
                                        <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                                        <th className="px-10 py-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Tactical</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="group hover:bg-zinc-50/50 transition-all duration-300">
                                            <td className="px-10 py-10">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-sm shadow-sm group-hover:scale-110 transition-transform">
                                                        {lead.name ? lead.name[0]?.toUpperCase() : '?'}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-zinc-900 tracking-tight">{lead.name || 'Anonymous Strategist'}</span>
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter tabular-nums mt-1">
                                                            {new Date(lead.created_at).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-black text-zinc-600 tracking-widest">{lead.phone || 'N/A'}</span>
                                                    {lead.phone && (
                                                        <button
                                                            onClick={() => copyToClipboard(lead.phone, lead.id)}
                                                            className={`p-2.5 rounded-xl transition-all ${copiedId === lead.id ? 'bg-emerald-50 text-emerald-600 shadow-inner' : 'bg-zinc-50 text-zinc-300 hover:text-indigo-600 hover:bg-white'}`}
                                                        >
                                                            {copiedId === lead.id ? <Check size={14} /> : <Copy size={14} />}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-10 py-10 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                                {lead.email || 'Awaiting Capture'}
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit border border-indigo-100 shadow-sm">
                                                        {lead.service_type || 'General Intel'}
                                                    </span>
                                                    <p className="text-[11px] font-medium text-zinc-400 line-clamp-2 italic max-w-xs leading-relaxed">
                                                        &quot;{lead.inquiry_summary}&quot;
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <select
                                                    value={lead.status || 'new'}
                                                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                    className="bg-zinc-50 border border-zinc-100/50 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 outline-none focus:border-indigo-600 focus:bg-white transition-all cursor-pointer shadow-sm"
                                                >
                                                    <option value="new">New Protocol</option>
                                                    <option value="contacted">In Contact</option>
                                                    <option value="qualified">Qualified</option>
                                                    <option value="converted">Hub Master</option>
                                                    <option value="archived">Archived</option>
                                                </select>
                                            </td>
                                            <td className="px-10 py-10 text-center">
                                                <button
                                                    onClick={() => handleDelete(lead.id)}
                                                    className="p-3.5 text-zinc-200 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm hover:shadow-rose-100"
                                                    title="Archive Lead"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile/Small Screen Card View */}
                        <div className="xl:hidden p-6 space-y-6">
                            {filteredLeads.map((lead) => (
                                <div key={lead.id} className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] space-y-8 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                                    <div className="flex items-start justify-between relative z-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl shadow-xl shadow-zinc-200/50 border border-zinc-100">
                                                {lead.name ? lead.name[0]?.toUpperCase() : '?'}
                                            </div>
                                            <div>
                                                <h5 className="font-black text-zinc-900 tracking-tight text-lg">{lead.name || 'Anonymous'}</h5>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{new Date(lead.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(lead.id)}
                                            className="p-4 text-zinc-300 hover:text-rose-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-5 bg-white rounded-[1.5rem] border border-zinc-100/50 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Phone size={12} className="text-zinc-400" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Contact</span>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(lead.phone, lead.id)}
                                                    className="text-[10px] font-black text-zinc-900 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                                                >
                                                    {lead.phone || 'N/A'}
                                                </button>
                                            </div>
                                            <div className="p-5 bg-white rounded-[1.5rem] border border-zinc-100/50 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Users size={12} className="text-zinc-400" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Source</span>
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">{lead.service_type || 'General'}</span>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-white rounded-[2rem] border border-zinc-100/50 shadow-sm">
                                            <div className="flex items-center gap-2 mb-3">
                                                <MessageSquare size={12} className="text-zinc-400" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Insight Brief</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-zinc-500 leading-relaxed italic">&quot;{lead.inquiry_summary}&quot;</p>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <select
                                                value={lead.status || 'new'}
                                                onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                className="flex-grow bg-zinc-900 text-white rounded-[1.25rem] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] outline-none shadow-xl shadow-zinc-200"
                                            >
                                                <option value="new">New Protocol</option>
                                                <option value="contacted">In Contact</option>
                                                <option value="qualified">Qualified</option>
                                                <option value="converted">Hub Master</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="py-40 text-center flex flex-col items-center justify-center gap-8 grayscale brightness-110">
                        <div className="w-24 h-24 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 shadow-inner flex items-center justify-center text-zinc-200">
                            <MessageSquare size={40} />
                        </div>
                        <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px]">No chatbot transmissions detected.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatbotLeadsManager;
