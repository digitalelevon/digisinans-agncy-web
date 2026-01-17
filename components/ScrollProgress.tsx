"use client";

import { useEffect, useRef } from "react";

const ScrollProgress = () => {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ticking = false;

        const updateProgress = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;

            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${scroll})`;
            }

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
            <div
                ref={progressRef}
                className="h-full bg-indigo-600 ease-out origin-left will-change-transform"
                style={{ transform: 'scaleX(0)', transition: 'transform 150ms ease-out' }}
            />
        </div>
    );
};

export default ScrollProgress;
