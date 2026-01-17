"use client";

import React from 'react';
import IconMapper from '@/components/IconMapper';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
    service: {
        id: string;
        title: string;
        description: string;
        iconName?: string;
        icon_name?: string;
        items?: string[];
    };
    index: number;
    className?: string;
    variant?: 'minimal' | 'detailed';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, className = "", variant = 'minimal' }) => {
    const iconName = service.iconName || (service as any).icon_name || 'Zap';

    return (
        <div
            className={`reveal-on-scroll group relative p-10 md:p-14 bg-white/80 backdrop-blur-sm rounded-[3rem] border border-zinc-200/60 transition-all duration-700 hover:shadow-[0_60px_100px_-30px_rgba(79,70,229,0.15)] hover:border-indigo-200 hover:-translate-y-3 overflow-hidden flex flex-col h-full ${className}`}
            style={{ transitionDelay: `${index * 100}ms` }}
            suppressHydrationWarning
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-100 group-hover:bg-indigo-600 transition-colors duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <span className="absolute top-10 right-10 text-7xl font-black text-zinc-100/30 font-serif italic group-hover:text-indigo-600/10 transition-colors pointer-events-none">
                0{index + 1}
            </span>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1">
                    {/* Updated Icon Container: Match circular design */}
                    <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6 transition-all duration-500 shadow-2xl shadow-zinc-200 group-hover:shadow-indigo-100 group-hover:rotate-[10deg]">
                        <IconMapper name={iconName} size={32} />
                    </div>

                    <h3 className="text-3xl font-black text-zinc-900 mb-6 tracking-tight group-hover:text-indigo-600 transition-colors min-h-[4.5rem] flex items-end">
                        {service.title}
                    </h3>

                    <p className="text-zinc-500 font-medium leading-relaxed mb-8 text-lg lg:text-xl opacity-90 min-h-[5.25rem]">
                        {service.description}
                    </p>

                    {service.items && variant === 'minimal' && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {service.items.map((item, i) => (
                                <span key={i} className="px-3 py-1.5 bg-zinc-100/50 border border-zinc-200 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:bg-white group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}

                    {variant === 'detailed' && (
                        <ul className="space-y-5 mb-16 min-h-[10rem]">
                            {(service.items || ['Data-Driven Architecture', 'Performance Analytics', 'Market Domination']).map((feature, fidx) => (
                                <li key={fidx} className="flex items-center gap-5 text-zinc-600">
                                    <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100/50">
                                        <CheckCircle2 size={14} className="text-indigo-600" />
                                    </div>
                                    <span className="text-[12px] font-black uppercase tracking-[0.2em]">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                    <Link
                        href="/contact"
                        className="text-[12px] font-black uppercase tracking-[0.5em] text-zinc-400 group-hover:text-indigo-600 transition-all flex items-center gap-3"
                    >
                        Consult <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
