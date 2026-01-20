"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '@/app/actions/gemini';
import { supabase } from '@/lib/supabase';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export default function GeminiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [leadId, setLeadId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'unset';
            return;
        }

        const handleBodyScroll = () => {
            if (window.innerWidth < 640) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
        };

        handleBodyScroll();
        window.addEventListener('resize', handleBodyScroll);
        return () => {
            window.removeEventListener('resize', handleBodyScroll);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
        setMessages(newMessages);
        setLoading(true);

        const history = newMessages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const result = await getGeminiResponse(history);

        if (!result.success) {
            setMessages(prev => [...prev, { role: 'model', text: result.message || 'Connecting to strategic hub...' }]);
        } else if (result.text) {
            const botResponse = result.text;
            setMessages(prev => [...prev, { role: 'model', text: botResponse }]);

            const phoneMatch = userMessage.match(/(\+?\d[\d\s-]{8,}\d)/);
            const emailMatch = userMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
            const services = ['SEO', 'Branding', 'Performance Marketing', 'Social Media', 'Web Design', 'Ads', 'Marketing'];
            const foundService = services.find(s => userMessage.toLowerCase().includes(s.toLowerCase()));

            if (phoneMatch && !leadId) {
                const probableName = messages[messages.length - 2]?.role === 'user' ? messages[messages.length - 2].text : 'Web Lead';
                const originalInquiry = messages[0]?.role === 'user' ? messages[0].text : userMessage;

                const { data, error } = await supabase.from('chatbot_leads').insert([{
                    name: probableName.length < 50 ? probableName : 'Web Lead',
                    phone: phoneMatch[0],
                    inquiry_summary: originalInquiry,
                    created_at: new Date().toISOString(),
                    status: 'new'
                }]).select();

                if (!error && data?.[0]) {
                    setLeadId(data[0].id);
                }
            } else if (leadId) {
                const updates: any = {};
                if (emailMatch) updates.email = emailMatch[0];
                if (foundService) updates.service_type = foundService;

                if (Object.keys(updates).length > 0) {
                    await supabase.from('chatbot_leads').update(updates).eq('id', leadId);
                }
            }
        }

        setLoading(false);
    };

    return (
        <>
            {/* 1. Toggle Button - High-Tech Floating Orb */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-[10000] w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-90 transition-all duration-500 text-white group border border-white/20 origin-center"
                    aria-label="Open Chat"
                >
                    <div className="relative">
                        <Bot size={32} className="sm:w-10 sm:h-10 group-hover:rotate-[15deg] transition-transform duration-500" />
                        <div className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white shadow-sm"></span>
                        </div>
                    </div>
                </button>
            )}

            {/* 2. Modal Overlay & Container */}
            {isOpen && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* 3. Chat Modal Card - Centered Floating Card on All Devices */}
                    <div className="relative z-[10002] w-[92vw] h-[70dvh] sm:w-[420px] sm:h-[600px] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">

                        {/* Header */}
                        <header className="shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between text-white shadow-md relative overflow-hidden">
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="relative">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 absolute -top-0.5 -right-0.5 border-2 border-blue-600 animate-pulse shadow-sm" />
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
                                        <Bot size={22} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-[14px] font-bold tracking-wide leading-none mb-1">GROWTH STRATEGIST</h3>
                                    <p className="text-[10px] font-medium text-blue-100 uppercase tracking-widest opacity-90">DIGISINANS INTELLIGENCE HUB</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                            >
                                <X size={20} />
                            </button>
                        </header>

                        {/* Messages Body */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent bg-zinc-50/50">
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in-95 duration-500">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600 shadow-sm ring-4 ring-blue-50/50">
                                        <Bot size={32} />
                                    </div>
                                    <h4 className="text-zinc-900 font-bold text-lg mb-2">How can we accelerate your growth?</h4>
                                    <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-[240px] mx-auto">
                                        Ask about SEO, Branding, or Performance Marketing.
                                    </p>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                    {msg.role === 'model' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shrink-0 border border-blue-200 mt-0.5 shadow-sm">
                                            <Bot size={16} className="text-blue-600" />
                                        </div>
                                    )}

                                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-zinc-900 text-white rounded-br-none shadow-md'
                                        : 'bg-white text-zinc-700 border border-zinc-100 rounded-bl-none shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex gap-3 justify-start animate-pulse">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shrink-0 border border-blue-200 mt-0.5 shadow-sm">
                                        <Bot size={16} className="text-blue-600" />
                                    </div>
                                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-zinc-100 shadow-sm flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="shrink-0 p-4 bg-white border-t border-zinc-100">
                            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your strategic inquiry..."
                                    className="flex-grow px-5 py-3.5 bg-zinc-100 border-none rounded-full text-[14px] font-medium text-zinc-900 focus:bg-white focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-zinc-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || loading}
                                    className="w-11 h-11 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95 shadow-md flex items-center justify-center shrink-0"
                                >
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="translate-x-0.5" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
