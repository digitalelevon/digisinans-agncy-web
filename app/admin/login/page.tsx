
"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPinStep, setShowPinStep] = useState(false);
    const [pin, setPin] = useState('');
    const router = useRouter();

    React.useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setShowPinStep(true);
            }
        };
        checkSession();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            setShowPinStep(true);
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Secure Intel PIN for elite access
        if (pin === '2026') {
            sessionStorage.setItem('admin_verified', 'true');
            router.push('/admin/dashboard');
            router.refresh();
        } else {
            setError('Invalid Intelligence PIN');
            setPin('');
        }
    };

    return (
        <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Soft Background Accents */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="space-y-8 mb-12 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                        <span className="font-black text-3xl tracking-tighter text-indigo-600">DIGISINANS.</span>
                        <span className="font-bold text-2xl tracking-tight text-zinc-400">Admin</span>
                    </div>
                </div>

                <div className="bg-white border border-zinc-100 p-8 md:p-12 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]">
                    {!showPinStep ? (
                        <>
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
                                    <Lock className="text-white" size={28} />
                                </div>
                                <h1 className="text-3xl font-black text-zinc-900 mb-2 tracking-tight uppercase">Secure Portal</h1>
                                <p className="text-zinc-500 font-medium">Identify yourself to manage the intelligence hub.</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Credential: Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-50 rounded-[2rem] focus:border-indigo-600 focus:bg-white outline-none transition-all text-zinc-900 font-bold"
                                            placeholder="ops@digisinans.in"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Access Keyword</label>
                                    <div className="relative">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-50 rounded-[2rem] focus:border-indigo-600 focus:bg-white outline-none transition-all text-zinc-900 font-bold"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[11px] font-black uppercase tracking-widest text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-5 bg-zinc-900 hover:bg-indigo-600 text-white font-black rounded-[2rem] transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-zinc-900/10 active:scale-95 disabled:opacity-50 uppercase text-xs tracking-widest"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            Establish Link <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="animate-in fade-in zoom-in-95 duration-500">
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
                                    <Lock className="text-white" size={28} />
                                </div>
                                <h1 className="text-3xl font-black text-zinc-900 mb-2 tracking-tight uppercase">Security PIN</h1>
                                <p className="text-zinc-500 font-medium">Verify your strategic authorization.</p>
                            </div>

                            <form onSubmit={handlePinSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">4-Digit Access PIN</label>
                                    <input
                                        type="password"
                                        maxLength={4}
                                        autoFocus
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        required
                                        className="w-full py-5 bg-zinc-50 border border-zinc-50 rounded-[2rem] focus:border-indigo-600 focus:bg-white outline-none transition-all text-zinc-900 font-black text-3xl tracking-[1em] text-center"
                                        placeholder="••••"
                                    />
                                </div>

                                {error && (
                                    <div className="p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[11px] font-black uppercase tracking-widest text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-zinc-900 hover:bg-indigo-600 text-white font-black rounded-[2rem] transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-zinc-900/10 active:scale-95 uppercase text-xs tracking-widest"
                                >
                                    Verify Intelligence <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowPinStep(false)}
                                    className="w-full text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    Back to Credentials
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                        &copy; 2026 DIGISINANS. PERFORMANCE ARCHITECTURE.
                    </p>
                </div>
            </div>
        </main>
    );
}
