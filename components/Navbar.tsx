
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isAdmin = pathname?.startsWith('/admin');

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 15);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (isAdmin) return null;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    };

    const navLinks = [
        { name: 'Home', path: '/#' },
        { name: 'Services', path: '/services' },
        { name: 'Work', path: '/work' },
        { name: 'About', path: '/about' },
        { name: 'Insights', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full transition-all duration-500 ${isOpen ? 'z-[10000]' : 'z-[60]'} ${scrolled || isOpen ? 'bg-white/80 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)] py-4' : 'bg-transparent py-6 md:py-8'}`}>
            <div className="container mx-auto px-6 md:px-10 lg:px-12 flex justify-between items-center">
                <Link href="/" onClick={closeMenu}>
                    <Logo className="!text-xl md:!text-2xl" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                    <div className="flex items-center gap-8 xl:gap-10">
                        {navLinks.map((item) => {
                            const isActive = pathname === item.path || (item.path !== '/' && item.path !== '/#' && pathname?.startsWith(item.path));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`text-[11px] xl:text-xs font-bold uppercase tracking-[0.2em] transition-all relative group ${isActive ? 'text-indigo-600' : 'text-zinc-600 hover:text-indigo-600'}`}
                                    title={`Go to ${item.name} page`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {item.name}
                                    <span className={`absolute -bottom-1 left-0 w-full h-[1.5px] bg-indigo-600 transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                </Link>
                            );
                        })}
                    </div>

                    <Link
                        href="/contact"
                        className="bg-zinc-900 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
                        title="Book a Digital Strategy Consultation"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className="lg:hidden p-2.5 rounded-xl bg-zinc-100 text-zinc-900 active:scale-95 transition-transform"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 w-full h-[100dvh] bg-white/95 backdrop-blur-[20px] z-[9999] flex flex-col overflow-hidden animate-in fade-in duration-300">
                    {/* Header bar in overlay to match Navbar height/spacing */}
                    <div className="container mx-auto px-6 md:px-10 py-6 flex justify-between items-center">
                        <Link href="/" onClick={closeMenu}>
                            <Logo className="!text-xl md:!text-2xl" />
                        </Link>
                        <button
                            onClick={closeMenu}
                            className="p-3 bg-zinc-900 text-white rounded-full active:scale-90 transition-all shadow-xl z-[10000]"
                            aria-label="Close Menu"
                        >
                            <X size={26} strokeWidth={2.5} />
                        </button>
                    </div>

                    <div className="container mx-auto flex flex-col px-8 md:px-10 pt-8 pb-12 flex-grow overflow-y-auto">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((item, idx) => {
                                const isActive = pathname === item.path || (item.path !== '/' && item.path !== '/#' && pathname?.startsWith(item.path));
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        onClick={closeMenu}
                                        className={`text-5xl sm:text-6xl font-black tracking-tighter transition-all duration-300 animate-in slide-in-from-bottom-8 fill-mode-both ${isActive ? 'text-indigo-600' : 'text-zinc-900 hover:text-indigo-600'}`}
                                        style={{ animationDelay: `${(idx + 1) * 80}ms` }}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-auto pt-12 space-y-8">
                            <Link
                                href="/contact"
                                onClick={closeMenu}
                                className="block bg-zinc-900 text-white text-center py-6 rounded-[2.5rem] font-black text-xl shadow-2xl active:scale-95 transition-all animate-in slide-in-from-bottom-12"
                                style={{ animationDelay: '500ms' }}
                            >
                                Book Consultation
                            </Link>

                            <div className="flex justify-center gap-12 text-zinc-400 animate-in fade-in duration-700 delay-700">
                                <a href="https://www.linkedin.com/company/digisinans" target="_blank" rel="noopener" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-indigo-600 transition-colors">LinkedIn</a>
                                <a href="https://www.instagram.com/digisinans" target="_blank" rel="noopener" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-indigo-600 transition-colors">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
