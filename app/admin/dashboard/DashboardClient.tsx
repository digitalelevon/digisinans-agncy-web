
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
    Bot,
    Loader2,
    CheckCircle2
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
                <Loader2 className="animate-spin text-zinc-300 mb-4" size={24} />
                <p className="text-zinc-500 font-medium text-sm">Authenticating...</p>
            </div>
        );
    }

    if (!user) return null;

    const tabs = [
        { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={18} /> },
        { id: 'leads', name: 'Inbound Leads', icon: <MessageSquare size={18} /> },
        { id: 'chatbot', name: 'Chatbot Leads', icon: <Bot size={18} /> },
        { id: 'blog', name: 'Blog', icon: <FileText size={18} /> },
        { id: 'work', name: 'Case Studies', icon: <Briefcase size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-white flex relative font-sans text-zinc-900 selection:bg-indigo-100 selection:text-indigo-700">
            {/* Sidebar Overlay for Mobile */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                ${isSidebarOpen ? 'w-64' : 'lg:w-[70px]'} 
                fixed lg:relative bg-zinc-50 border-r border-zinc-200 lg:bg-zinc-50 transition-all duration-300 ease-in-out flex flex-col z-50 h-screen
            `}>
                <div className="h-16 flex items-center px-6 border-b border-zinc-200/50">
                    {(isSidebarOpen || isMobile) ? (
                        <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                            <div className="w-6 h-6 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-xs font-serif italic">D</div>
                            <span>Digisinans</span>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-xs font-serif italic mx-auto">D</div>
                    )}
                </div>

                <nav className="flex-grow px-3 py-6 space-y-1 overflow-y-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id as any);
                                if (isMobile) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative ${activeTab === tab.id
                                ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200'
                                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                                }`}
                        >
                            <span className={`shrink-0 ${activeTab === tab.id ? 'text-indigo-600' : 'text-zinc-400 group-hover:text-zinc-600'}`}>{tab.icon}</span>
                            {(isSidebarOpen || isMobile) && (
                                <span className="text-sm font-medium">{tab.name}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-200/50">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 transition-all group"
                    >
                        <LogOut size={18} />
                        {(isSidebarOpen || isMobile) && <span className="text-sm font-medium">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden bg-white">
                <header className="h-16 bg-white border-b border-zinc-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 -ml-2 hover:bg-zinc-50 rounded-lg text-zinc-400 hover:text-zinc-600 transition-colors"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        <div className="flex items-center text-sm breadcrumbs text-zinc-400">
                            <span className="hidden sm:inline">Dashboard</span>
                            <span className="mx-2">/</span>
                            <span className="font-medium text-zinc-900">{tabs.find(t => t.id === activeTab)?.name}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-zinc-600 hidden sm:block">{user.email}</span>
                            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 text-xs font-bold border border-zinc-200">
                                {user.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto bg-zinc-50/50">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                        {activeTab === 'overview' && <OverviewManager onTabChange={(tab: any) => setActiveTab(tab)} />}
                        {activeTab === 'leads' && <InquiryManager onMessage={(msg, type) => showToast(msg, type)} />}
                        {activeTab === 'chatbot' && <ChatbotLeadsManager onMessage={(msg, type) => showToast(msg, type)} />}
                        {activeTab === 'blog' && <BlogManager onMessage={(msg, type) => showToast(msg, type)} />}
                        {activeTab === 'work' && <StudyManager onMessage={(msg, type) => showToast(msg, type)} />}
                    </div>
                </div>

                {/* Toast Notification */}
                {toast && (
                    <div className="fixed bottom-6 right-6 z-[200] animate-in slide-in-from-right-10 duration-300">
                        <div className={`
                            px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 text-sm font-medium
                            ${toast.type === 'success' ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-rose-50 border-rose-100 text-rose-700'}
                        `}>
                            {toast.type === 'success' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <X size={16} />}
                            {toast.message}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DashboardClient;
