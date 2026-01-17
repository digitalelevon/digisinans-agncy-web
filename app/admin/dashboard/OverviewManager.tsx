
"use client";

import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    FileText,
    Briefcase,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    Zap,
    Clock,
    ChevronRight,
    Search,
    Bell,
    Bot
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Stats {
    leads: number;
    blogs: number;
    work: number;
    recentLeads: any[];
}

const OverviewManager = ({ onTabChange }: { onTabChange: (tab: 'overview' | 'leads' | 'chatbot' | 'blog' | 'work') => void }) => {
    const [stats, setStats] = useState<Stats>({
        leads: 0,
        blogs: 0,
        work: 0,
        recentLeads: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const [leadsRes, chatLeadsRes, blogsRes, workRes] = await Promise.all([
                    supabase.from('inquiries').select('id', { count: 'exact' }),
                    supabase.from('chatbot_leads').select('id', { count: 'exact' }),
                    supabase.from('blog_posts').select('id', { count: 'exact' }),
                    supabase.from('case_studies').select('id', { count: 'exact' })
                ]);

                const [{ data: recentInquiries }, { data: recentChatLeads }] = await Promise.all([
                    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5),
                    supabase.from('chatbot_leads').select('*').order('created_at', { ascending: false }).limit(5)
                ]);

                // Merge and sort all recent leads
                const unifiedLeads = [
                    ...(recentInquiries || []).map(l => ({ ...l, source: 'form' })),
                    ...(recentChatLeads || []).map(l => ({
                        ...l,
                        source: 'chatbot',
                        message: l.inquiry_summary // Map summary to message for uniform display
                    }))
                ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 6);

                setStats({
                    leads: (leadsRes.count || 0) + (chatLeadsRes.count || 0),
                    blogs: blogsRes.count || 0,
                    work: workRes.count || 0,
                    recentLeads: unifiedLeads
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
            setLoading(false);
        };

        fetchStats();
    }, []);

    const cards = [
        {
            label: 'Active Inquiries',
            count: stats.leads,
            icon: <MessageSquare size={22} />,
            trend: '+12%',
            trendUp: true,
            gradient: 'from-indigo-600 to-blue-600'
        },
        {
            label: 'Growth Insights',
            count: stats.blogs,
            icon: <FileText size={22} />,
            trend: '+2',
            trendUp: true,
            gradient: 'from-blue-600 to-cyan-500'
        },
        {
            label: 'Success Stories',
            count: stats.work,
            icon: <Briefcase size={22} />,
            trend: '+1',
            trendUp: true,
            gradient: 'from-violet-600 to-indigo-600'
        },
        {
            label: 'Market Reach',
            count: '94.2k',
            icon: <TrendingUp size={22} />,
            trend: '+8%',
            trendUp: true,
            gradient: 'from-emerald-600 to-teal-500'
        }
    ];

    if (loading) {
        return (
            <div className="space-y-10 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-44 bg-white rounded-[2.5rem] border border-zinc-100" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 h-96 bg-white rounded-[3rem]" />
                    <div className="h-96 bg-white rounded-[3rem]" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter uppercase">
                        Strategic <span className="italic font-serif text-indigo-600">Command</span> Center.
                    </h2>
                    <p className="text-xs md:text-sm font-medium text-zinc-500">Monitoring digital performance and strategic deployment.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-indigo-100 w-fit">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                        System Online
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {cards.map((card, idx) => (
                    <div key={idx} className="group bg-white p-8 rounded-[2.5rem] border border-zinc-200/60 hover:border-white transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-opacity duration-700`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-10">
                                <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform duration-500`}>
                                    {card.icon}
                                </div>
                                <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${card.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {card.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {card.trend}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-2">{card.label}</p>
                                <h3 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tighter italic font-serif group-hover:text-indigo-600 transition-colors">
                                    {card.count}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                {/* Recent Inbound Activity */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-zinc-200/60 shadow-sm overflow-hidden h-full flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16">
                            <div>
                                <h4 className="text-2xl font-black text-zinc-900 tracking-tighter uppercase italic">Strategic Feed</h4>
                                <p className="text-xs md:text-sm font-medium text-zinc-500">Latest inbound lead transmissions.</p>
                            </div>
                            <button
                                onClick={() => onTabChange('leads')}
                                className="px-6 py-3 bg-zinc-100 hover:bg-zinc-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                View All Intelligence Hub
                            </button>
                        </div>

                        <div className="space-y-6 flex-grow">
                            {stats.recentLeads.length > 0 ? stats.recentLeads.map((lead, idx) => {
                                const getTimeAgo = (date: string) => {
                                    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
                                    if (seconds < 60) return 'Just Now';
                                    const minutes = Math.floor(seconds / 60);
                                    if (minutes < 60) return `${minutes}m ago`;
                                    const hours = Math.floor(minutes / 60);
                                    if (hours < 24) return `${hours}h ago`;
                                    return new Date(date).toLocaleDateString();
                                };

                                return (
                                    <div
                                        key={lead.id}
                                        onClick={() => onTabChange(lead.source === 'chatbot' ? 'chatbot' : 'leads' as any)}
                                        className="flex items-center gap-6 p-6 rounded-[2.5rem] hover:bg-zinc-50 border border-transparent hover:border-zinc-100 transition-all group cursor-pointer relative overflow-hidden"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${lead.source === 'chatbot' ? 'bg-indigo-600 shadow-indigo-100' : 'bg-zinc-900 shadow-zinc-100'
                                            }`}>
                                            {lead.source === 'chatbot' ? <Bot size={20} /> : (lead.name?.[0]?.toUpperCase() || 'L')}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between mb-2 gap-4">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <h5 className="font-black text-zinc-900 text-sm md:text-lg truncate tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic font-serif ">{lead.name || 'Anonymous Strategist'}</h5>
                                                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] shrink-0 border transition-colors ${lead.source === 'chatbot' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-zinc-100 text-zinc-500 border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white'
                                                        }`}>
                                                        {lead.source}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-zinc-500 shrink-0 tabular-nums transition-colors">{getTimeAgo(lead.created_at)}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-medium text-zinc-400 leading-relaxed min-w-0">
                                                <span className="truncate text-zinc-500 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-zinc-300" />
                                                    {lead.email || lead.phone || 'Awaiting Contact Vector'}
                                                </span>
                                                {lead.service_type && (
                                                    <span className="px-3 py-1 bg-white border border-zinc-100 rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-600 shrink-0 shadow-sm w-fit">{lead.service_type}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 flex items-center justify-center bg-zinc-50 group-hover:bg-zinc-900 rounded-xl transition-all shrink-0">
                                            <ChevronRight className="text-zinc-300 group-hover:text-white transition-colors" size={20} />
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20 grayscale opacity-40">
                                    <MessageSquare size={64} className="text-zinc-200 mb-8" />
                                    <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-xs">Awaiting new transmissions.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Performance Highlights Sidebar */}
                <div className="space-y-6 md:space-y-8">
                    {/* Traffic Visualization (CSS Mockup) */}
                    <div className="bg-zinc-900 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/20 blur-[80px]" />
                        <h4 className="text-lg md:text-xl font-black uppercase tracking-widest mb-8 md:mb-10 italic">Reach Growth</h4>

                        <div className="flex items-end justify-between h-32 md:h-40 gap-2 md:gap-3 mb-8 md:mb-10">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <div key={i} className="flex-grow group/bar relative">
                                    <div
                                        className="w-full bg-white/10 rounded-t-lg md:rounded-t-xl group-hover/bar:bg-indigo-500 transition-all duration-500"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-zinc-900 p-2 rounded-lg text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {h}k
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-white/5">
                            <div>
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Impressions</p>
                                <p className="text-xl md:text-2xl font-black tracking-tighter">842,000</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">+14.2%</p>
                                <p className="text-[10px] md:text-sm font-medium text-zinc-500 italic">vs last month</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access Actions */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border border-zinc-200">
                        <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter italic mb-6 md:mb-8">Quick Tactics</h4>
                        <div className="space-y-3 md:space-y-4">
                            {[
                                { label: 'Publish Insight', icon: <FileText size={18} />, color: 'indigo', tab: 'blog' },
                                { label: 'Deploy Case Study', icon: <Briefcase size={18} />, color: 'emerald', tab: 'work' },
                                { label: 'Inbound Audit', icon: <Zap size={18} />, color: 'orange', tab: 'leads' }
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => onTabChange(action.tab as any)}
                                    className="w-full flex items-center justify-between p-4 md:p-5 bg-zinc-50 hover:bg-zinc-900 hover:text-white rounded-xl md:rounded-2xl transition-all group"
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className={`text-${action.color}-600 group-hover:text-white transition-colors`}>{action.icon}</div>
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{action.label}</span>
                                    </div>
                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-x-1" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewManager;
