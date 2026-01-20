
"use client";

import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    FileText,
    Briefcase,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    ChevronRight,
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
            label: 'Total Inquiries',
            count: stats.leads,
            icon: <MessageSquare size={20} />,
            trend: '+12%',
            trendUp: true,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50'
        },
        {
            label: 'Blog Posts',
            count: stats.blogs,
            icon: <FileText size={20} />,
            trend: '+2',
            trendUp: true,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            label: 'Case Studies',
            count: stats.work,
            icon: <Briefcase size={20} />,
            trend: '+1',
            trendUp: true,
            color: 'text-violet-600',
            bg: 'bg-violet-50'
        },
        {
            label: 'Total Views',
            count: '94.2k',
            icon: <TrendingUp size={20} />,
            trend: '+8%',
            trendUp: true,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        }
    ];

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-zinc-200" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-96 bg-white rounded-2xl border border-zinc-200" />
                    <div className="h-96 bg-white rounded-2xl border border-zinc-200" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Greeting */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Overview</h2>
                <p className="text-sm text-zinc-500 mt-1">Welcome back. Here&apos;s what&apos;s happening with your site today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center ${card.color}`}>
                                {card.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${card.trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                {card.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {card.trend}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{card.count}</h3>
                            <p className="text-sm font-medium text-zinc-500 mt-1">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                        <h4 className="font-semibold text-zinc-900">Recent Activity</h4>
                        <button
                            onClick={() => onTabChange('leads')}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                            View All
                        </button>
                    </div>

                    <div className="divide-y divide-zinc-50">
                        {stats.recentLeads.length > 0 ? stats.recentLeads.map((lead) => {
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
                                    className="p-4 hover:bg-zinc-50 transition-colors cursor-pointer flex items-center gap-4 group"
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${lead.source === 'chatbot' ? 'bg-indigo-100 text-indigo-700' : 'bg-zinc-100 text-zinc-700'
                                        }`}>
                                        {lead.source === 'chatbot' ? <Bot size={18} /> : (lead.name?.[0]?.toUpperCase() || 'U')}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h5 className="text-sm font-semibold text-zinc-900 truncate">{lead.name || 'Unknown User'}</h5>
                                            <span className="text-xs text-zinc-400">{getTimeAgo(lead.created_at)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider ${lead.source === 'chatbot' ? 'bg-indigo-50 text-indigo-600' : 'bg-zinc-100 text-zinc-600'
                                                }`}>
                                                {lead.source === 'chatbot' ? 'AI Lead' : 'Form Lead'}
                                            </span>
                                            {lead.service_type && (
                                                <>
                                                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                                                    <span>{lead.service_type}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-zinc-300 group-hover:text-zinc-400" />
                                </div>
                            );
                        }) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center gap-2">
                                <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
                                    <MessageSquare size={20} />
                                </div>
                                <p className="text-sm text-zinc-500 font-medium">No recent activity.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    {/* Analytics Widget */}
                    <div className="bg-zinc-900 p-6 rounded-2xl text-white shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Weekly Visits</h4>
                            <div className="flex items-end justify-between h-32 gap-2 mb-6">
                                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                    <div key={i} className="flex-grow relative group cursor-pointer">
                                        <div
                                            className="w-full bg-white/20 rounded-sm hover:bg-indigo-500 transition-colors duration-300"
                                            style={{ height: `${h}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-2xl font-bold tracking-tight">842k</p>
                                    <p className="text-xs text-zinc-500">Total impressions</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-emerald-400">+14.2%</p>
                                    <p className="text-xs text-zinc-500">vs last week</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                        <h4 className="font-semibold text-zinc-900 mb-4">Quick Actions</h4>
                        <div className="space-y-2">
                            {[
                                { label: 'Write Blog Post', icon: <FileText size={16} />, color: 'text-blue-600', bg: 'bg-blue-50', tab: 'blog' },
                                { label: 'Add Case Study', icon: <Briefcase size={16} />, color: 'text-violet-600', bg: 'bg-violet-50', tab: 'work' },
                                { label: 'Check Settings', icon: <Zap size={16} />, color: 'text-orange-600', bg: 'bg-orange-50', tab: 'overview' }
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => onTabChange(action.tab as any)}
                                    className="w-full flex items-center justify-between p-3 hover:bg-zinc-50 rounded-xl transition-colors group text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.bg} ${action.color}`}>
                                            {action.icon}
                                        </div>
                                        <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900">{action.label}</span>
                                    </div>
                                    <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-400" />
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
