
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-5 py-24">
            <div className="max-w-xl w-full text-center">
                <div className="w-24 h-24 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-red-100">
                    <RefreshCcw size={48} className="animate-spin-slow" />
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-zinc-900 leading-[0.95] tracking-tighter mb-8">
                    Something <br />
                    Went <span className="text-indigo-600 italic font-serif">Quiet</span>.
                </h1>

                <p className="text-xl text-zinc-500 font-medium mb-12 leading-relaxed">
                    We encountered a technical glitch while engineering your digital experience. Our team has been notified.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => reset()}
                        className="w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                    >
                        Try Again <RefreshCcw size={18} />
                    </button>
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-10 py-5 bg-white border border-zinc-200 text-zinc-900 font-black rounded-2xl flex items-center justify-center gap-3 hover:border-zinc-900 transition-all active:scale-95"
                    >
                        <Home size={18} /> Back Home
                    </Link>
                </div>

                <p className="mt-12 text-zinc-400 text-sm font-bold uppercase tracking-widest">
                    Error Insight ID: {error.digest || 'Unknown'}
                </p>
            </div>
        </div>
    );
}
