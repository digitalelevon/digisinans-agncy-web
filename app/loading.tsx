
import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
            <div className="relative w-24 h-24">
                {/* Outer spin */}
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />

                {/* Inner pulse */}
                <div className="absolute inset-4 bg-zinc-900 rounded-2xl animate-pulse flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-2">DIGISINANS</p>
                <h2 className="text-xl font-black text-zinc-900 tracking-tighter italic">Initialising Framework...</h2>
            </div>

            {/* Background decorative elements to match the theme */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-indigo-50/50 rounded-full blur-[120px] -z-10" />
        </div>
    );
}
