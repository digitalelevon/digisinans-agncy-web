"use client";

import React from 'react';

const GrowthGraph = () => (
    <div className="relative w-full h-32 flex items-end justify-between gap-1 px-1 group">
        {[25, 45, 30, 60, 40, 85, 70, 95, 80, 110, 130].map((height, i) => (
            <div
                key={i}
                className="flex-1 bg-indigo-500/20 rounded-t-lg transition-all duration-1000 ease-out relative group-hover:bg-indigo-600/80"
                style={{
                    height: `${height}%`,
                    transitionDelay: `${i * 40}ms`,
                    opacity: 0.3 + (i / 15)
                }}
            >
                {i === 10 && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full whitespace-nowrap animate-bounce shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                        +284% ROI
                    </div>
                )}
            </div>
        ))}
        <svg className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path
                d="M 0 80 Q 15 50, 30 70 T 60 40 T 100 10"
                fill="none"
                stroke="url(#hero-graph-glow-comp)"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
            />
            <defs>
                <linearGradient id="hero-graph-glow-comp" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);

export default React.memo(GrowthGraph);
