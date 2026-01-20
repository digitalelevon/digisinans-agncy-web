"use client";

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const GeminiChat = dynamic(() => import("./GeminiChat"), { ssr: false });

export default function ChatbotWrapper() {
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return <GeminiChat />;
}
