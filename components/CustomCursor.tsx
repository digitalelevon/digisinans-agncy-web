"use client";

import { useEffect, useRef } from "react";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const followerPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const handleHover = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a, button, input, textarea, [data-cursor="hover"]');
            if (target) {
                cursorRef.current?.classList.add('scale-150', 'bg-indigo-600/20');
            } else {
                cursorRef.current?.classList.remove('scale-150', 'bg-indigo-600/20');
            }
        };

        let rafId: number;
        const updatePositions = () => {
            // Smoothly interpolate positions
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.4;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.4;

            followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15;
            followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
            }

            if (followerRef.current) {
                followerRef.current.style.transform = `translate3d(${followerPos.current.x - 10}px, ${followerPos.current.y - 10}px, 0)`;
            }

            rafId = requestAnimationFrame(updatePositions);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", handleHover);
        rafId = requestAnimationFrame(updatePositions);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", handleHover);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-indigo-600 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block will-change-transform"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-indigo-600/50 rounded-full pointer-events-none z-[99] hidden md:block will-change-transform"
            />
        </>
    );
};

export default CustomCursor;
