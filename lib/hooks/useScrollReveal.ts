import { useEffect } from 'react';

export const useScrollReveal = () => {
    useEffect(() => {
        // Mark document as ready for animations
        document.documentElement.classList.add('js-ready');

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const observeElements = () => {
            document.querySelectorAll('.reveal-on-scroll:not(.visible)').forEach(el => {
                revealObserver.observe(el);
            });
        };

        // Initial observation - deferred to ensure hydration is complete
        requestAnimationFrame(() => {
            observeElements();
        });

        let timeoutId: NodeJS.Timeout;

        // Watch for new elements being added to the DOM
        const mutationObserver = new MutationObserver((mutations) => {
            let shouldCheck = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    shouldCheck = true;
                    break;
                }
            }
            if (shouldCheck) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(observeElements, 150);
            }
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            revealObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, []);
};
