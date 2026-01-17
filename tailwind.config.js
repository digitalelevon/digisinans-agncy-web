/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
                serif: ['var(--font-serif)', 'serif'],
            },
            colors: {
                accent: '#4f46e5',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'bounce-subtle': 'bounce-subtle 3.5s ease-in-out infinite',
                'bounce-slow': 'bounce-slow 5s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(3deg)' },
                    '50%': { transform: 'translateY(-12px) rotate(4deg)' },
                },
                'bounce-subtle': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(6deg)' },
                    '50%': { transform: 'translateY(-15px) rotate(8deg)' },
                },
            },
        },
    },
    plugins: [],
};

