
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-5 py-24">
            <div className="max-w-xl w-full text-center">
                <div className="text-[12rem] font-black leading-none text-zinc-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-0">
                    404
                </div>

                <div className="relative z-10">
                    <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-100">
                        <Search size={48} />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-zinc-900 leading-[0.95] tracking-tighter mb-8">
                        Digital <br />
                        Dead <span className="text-indigo-600 italic font-serif">End</span>.
                    </h1>

                    <p className="text-xl text-zinc-500 font-medium mb-12 leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been relocated to a higher performance environment.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/services"
                            className="w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                        >
                            Our Services <ArrowLeft size={18} className="rotate-180" />
                        </Link>
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-10 py-5 bg-white border border-zinc-200 text-zinc-900 font-black rounded-2xl flex items-center justify-center gap-3 hover:border-zinc-900 transition-all active:scale-95"
                        >
                            <Home size={18} /> Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
