
"use client";

import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    LogOut,
    Menu,
    X,
    MessageSquare,
    TrendingUp,
    Users,
    Zap,
    Search,
    Bot,
    Globe
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';
import BlogManager from './BlogManager';
import StudyManager from './StudyManager';
import InquiryManager from './InquiryManager';
import OverviewManager from './OverviewManager';
import ChatbotLeadsManager from './ChatbotLeadsManager';

const DashboardClient = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'chatbot' | 'blog' | 'work'>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [authenticating, setAuthenticating] = useState(true);
    const router = useRouter();

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const checkUser = async () => {
            setAuthenticating(true);
            const isVerified = sessionStorage.getItem('admin_verified');
            const { data: { user } } = await supabase.auth.getUser();

            if (!user || !isVerified) {
                router.push('/admin/login');
            } else {
                setUser(user);
                setAuthenticating(false);
            }
        };
        checkUser();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        sessionStorage.removeItem('admin_verified');
        router.push('/admin/login');
    };

    if (authenticating) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans p-6 text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 border-2 border-indigo-600 rounded-3xl animate-ping opacity-20" />
                    <Zap className="text-indigo-600 animate-pulse" size={32} />
                </div>
                <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tighter mb-2 italic">Verifying Authorization...</h3>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Secure Access Protocol Initiated</p>
            </div>
        );
    }

    if (!user) return null;

    const tabs = [
        { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={20} /> },
        { id: 'leads', name: 'Inbound Leads', icon: <MessageSquare size={20} /> },
        { id: 'chatbot', name: 'Chatbot Leads', icon: <Bot size={20} /> },
        { id: 'blog', name: 'Insights (Blog)', icon: <FileText size={20} /> },
        { id: 'work', name: 'Case Studies', icon: <Briefcase size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 flex relative">
            {/* Sidebar Overlay for Mobile */}
            <div
                className={`fixed inset-0 bg-zinc-900/40 backdrop-blur-md z-40 lg:hidden transition-all duration-700 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                ${isSidebarOpen ? 'w-80' : 'lg:w-28'} 
                fixed lg:relative bg-zinc-900/95 lg:bg-zinc-900 backdrop-blur-3xl lg:backdrop-blur-none transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col z-50 h-screen shadow-[20px_0_60px_-15px_rgba(0,0,0,0.5)] border-r border-white/5
            `}>
                <div className="p-10 flex items-center justify-between">
                    {(isSidebarOpen || isMobile) ? (
                        <div className="animate-in fade-in zoom-in-95 duration-1000">
                            <Logo showAdmin={true} whiteText={true} className="!gap-5" />
                        </div>
                    ) : (
                        <div className="hidden lg:flex w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[1.5rem] items-center justify-center text-white font-black mx-auto shadow-2xl shadow-indigo-900/40 border border-white/10 text-xl font-serif italic">D</div>
                    )}
                </div>

                <nav className="flex-grow px-6 mt-16 space-y-4 overflow-y-auto custom-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id as any);
                                if (isMobile) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-6 px-6 py-5 rounded-[1.5rem] transition-all duration-500 group relative overflow-hidden ${activeTab === tab.id
                                ? 'bg-white text-zinc-900 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] scale-[1.02]'
                                : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className={`shrink-0 transition-all duration-700 ${activeTab === tab.id ? 'scale-110 text-indigo-600' : 'group-hover:scale-110 group-hover:text-indigo-400'}`}>{tab.icon}</span>
                            {(isSidebarOpen || isMobile) && (
                                <span className={`font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 ${activeTab === tab.id ? 'translate-x-2' : ''}`}>
                                    {tab.name}
                                </span>
                            )}
                            {activeTab === tab.id && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-600 rounded-l-full" />}
                        </button>
                    ))}

                    <div className="pt-8 mt-8 border-t border-white/5">
                        <a
                            href="/"
                            target="_blank"
                            className="w-full flex items-center gap-6 px-6 py-5 rounded-[1.5rem] text-zinc-500 hover:bg-white/5 hover:text-white transition-all group"
                        >
                            <span className="shrink-0 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"><Globe size={20} /></span>
                            {(isSidebarOpen || isMobile) && (
                                <span className="font-black text-[11px] uppercase tracking-[0.3em]">Live Site</span>
                            )}
                        </a>
                    </div>
                </nav>

                <div className="p-8 mt-auto">
                    <div className={`mb-8 p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 transition-all duration-700 ${(isSidebarOpen || isMobile) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">System Active</span>
                        </div>
                        <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase tracking-[0.2em] italic">
                            Protocol <span className="text-zinc-300">4.12.0</span><br />
                            Auth Verified
                        </p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-6 px-6 py-5 rounded-[1.5rem] text-zinc-500 hover:bg-rose-500/10 hover:text-rose-500 transition-all group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-2 transition-transform duration-500" />
                        {(isSidebarOpen || isMobile) && <span className="font-black text-[11px] uppercase tracking-[0.3em]">Terminate</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden bg-[#fafafa]">
                <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 flex items-center justify-between px-6 md:px-12 sticky top-0 z-20 shrink-0">
                    <div className="flex items-center gap-6 md:gap-10">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="w-12 h-12 flex items-center justify-center bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-indigo-200 rounded-2xl transition-all shadow-sm group"
                        >
                            {isSidebarOpen ? <X size={20} className="text-zinc-400 group-hover:text-indigo-600" /> : <Menu size={20} className="text-zinc-400 group-hover:text-indigo-600" />}
                        </button>

                        <div className="relative group hidden lg:block">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search Strategy Hub..."
                                className="pl-14 pr-6 py-4 bg-zinc-100/50 border border-transparent rounded-[1.25rem] text-[11px] font-black uppercase tracking-widest w-64 focus:w-96 focus:bg-white focus:border-indigo-600 focus:shadow-xl focus:shadow-indigo-100/50 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:flex flex-col">
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.25em] leading-none mb-2">Lead Strategist</span>
                                <span className="text-sm font-black text-zinc-900 tracking-tight truncate max-w-[180px]">{user.email?.split('@')[0]}</span>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black shadow-lg shadow-indigo-100/50 shrink-0 select-none">
                                {user.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'overview' && <OverviewManager onTabChange={(tab: any) => setActiveTab(tab)} />}
                        {activeTab === 'leads' && <InquiryManager onMessage={(msg, type) => showToast(msg, type)} />}
                        {activeTab === 'chatbot' && <ChatbotLeadsManager onMessage={(msg, type) => showToast(msg, type)} />}
                        {activeTab === 'blog' && <BlogManager onMessage={(msg, type) => showToast(msg, type)} />}
                        {activeTab === 'work' && <StudyManager onMessage={(msg, type) => showToast(msg, type)} />}
                    </div>

                    {/* Toast Notification */}
                    {toast && (
                        <div className="fixed bottom-10 right-10 z-[200] animate-in slide-in-from-right-10 duration-500">
                            <div className={`${toast.type === 'success' ? 'bg-zinc-900 border-indigo-500/50' : 'bg-rose-600 border-rose-400'
                                } border p-6 rounded-2xl shadow-2xl flex items-center gap-4 text-white min-w-[300px]`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${toast.type === 'success' ? 'bg-indigo-600' : 'bg-rose-500'
                                    }`}>
                                    {toast.type === 'success' ? <Zap size={16} fill="currentColor" /> : <X size={16} />}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                                        {toast.type === 'success' ? 'Transmission Successful' : 'System Error'}
                                    </p>
                                    <p className="font-bold text-sm tracking-tight">{toast.message}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardClient;
