
"use client";

import Image from 'next/image';

interface LogoProps {
    className?: string;
    showAdmin?: boolean;
    dark?: boolean;
    whiteText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showAdmin = false, dark = false, whiteText = false }) => {
    return (
        <div className={`flex items-center gap-3 whitespace-nowrap select-none overflow-hidden ${className}`}>
            <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                    src="/logo.png"
                    alt="DIGISINANS Logo"
                    width={32}
                    height={32}
                    className="object-contain w-full h-full"
                    priority
                />
            </div>
            <span className={`font-black tracking-tighter transition-all duration-500 hover:tracking-normal ${className.includes('text-') ? '' : 'text-xl md:text-2xl'} ${whiteText ? 'text-white' : 'text-zinc-900'}`}>
                Digisinans
            </span>
            {showAdmin && (
                <span className={`text-[0.6em] opacity-50 font-bold tracking-tight border-l pl-3 ml-2 transition-colors duration-500 ${dark ? 'text-zinc-400 border-zinc-200' : 'text-zinc-500 border-white/10'}`}>
                    ADMIN
                </span>
            )}
        </div>
    );
};

export default Logo;
