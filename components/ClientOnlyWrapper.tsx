
"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const ClientEffects = dynamic(() => import("./ClientEffects"), { ssr: false });
const ChatbotWrapper = dynamic(() => import("./ChatbotWrapper"), { ssr: false });

export default function ClientOnlyWrapper() {
    return (
        <>
            <ClientEffects />
            <ChatbotWrapper />
        </>
    );
}
