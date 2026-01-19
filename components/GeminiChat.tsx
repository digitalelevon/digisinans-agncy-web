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
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-[10002] w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.3)] border-2 border-white/20 transition-all duration-500 active:scale-95 ${isOpen ? 'bg-zinc-900 rotate-180 opacity-0 pointer-events-none scale-0 sm:opacity-100 sm:pointer-events-auto sm:scale-100' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white group`}
                aria-label="Toggle Chat"
            >
                {isOpen ? <X size={28} className="sm:w-8 sm:h-8" /> : <Bot size={28} className="sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
                    </span>
                )}
            </button>

            {/* Chat Window Container */}
            <div className={`fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[10001] w-full sm:w-[400px] h-[100dvh] sm:h-[600px] bg-white sm:bg-white/95 sm:backdrop-blur-xl sm:border sm:border-zinc-200 sm:rounded-[2.5rem] sm:shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
                }`}>

                {/* Header - Fixed/Sticky at Top */}
                <header className="sticky top-0 z-50 shrink-0 px-6 sm:px-8 py-4 sm:py-6 bg-blue-600 text-white flex items-center justify-between pt-[max(1.25rem,env(safe-area-inset-top))] sm:pt-6 shadow-md shadow-blue-900/10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400 absolute -top-0.5 -right-0.5 border-2 border-blue-600 animate-pulse" />
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <Bot size={22} className="text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[13px] font-black uppercase tracking-widest leading-none mb-1">Growth Strategist</h3>
                            <p className="text-[9px] font-bold text-blue-100 uppercase tracking-tight opacity-80">Intelligence Hub</p>
                        </div>
                    </div>
                    {/* Explicit Close for Mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="sm:hidden p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all active:scale-90 flex items-center justify-center"
                        aria-label="Close Chat"
                    >
                        <X size={24} strokeWidth={3} />
                    </button>
                </header>

                {/* Messages Area - Scrollable Flex-1 */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 space-y-4 custom-scrollbar bg-zinc-50/50 relative">
                    {messages.length === 0 && (
                        <div className="text-center py-8 px-6 animate-in fade-in zoom-in-95 duration-500 mt-4">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-sm ring-4 ring-blue-50/50">
                                <Bot size={28} />
                            </div>
                            <h4 className="text-zinc-900 font-black text-sm uppercase tracking-tight mb-2">Tactical Bot Online</h4>
                            <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-[240px] mx-auto">
                                Our strategic AI is ready to analyze your market position. Ask about SEO, Performance, or Branding.
                            </p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                            {msg.role === 'model' && (
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 mt-0.5">
                                    <Bot size={14} className="text-blue-600" />
                                </div>
                            )}

                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] sm:text-sm font-medium leading-relaxed shadow-sm ${msg.role === 'user'
                                ? 'bg-zinc-900 text-white rounded-br-none shadow-md'
                                : 'bg-white text-zinc-600 border border-zinc-100 rounded-bl-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex gap-2.5 justify-start animate-pulse">
                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 mt-0.5">
                                <Bot size={14} className="text-blue-600" />
                            </div>
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-zinc-100 shadow-sm flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-[bounce_1s_infinite_0ms]" />
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-[bounce_1s_infinite_400ms]" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Sticky at Bottom */}
                <div className="sticky bottom-0 z-50 shrink-0 bg-white border-t border-zinc-100 pb-[max(0.5rem,env(safe-area-inset-bottom))] p-2 sm:p-4 sm:pb-6">
                    <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message strategist..."
                            className="flex-grow px-4 py-2.5 bg-zinc-100 border-none rounded-full text-[15px] font-medium text-zinc-900 focus:bg-white focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-zinc-500"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="bg-blue-600 text-white w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-90 shadow-md flex items-center justify-center shrink-0"
                        >
                            <Send size={18} className="translate-x-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
