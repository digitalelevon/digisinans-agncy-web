/** @type {import('next').NextConfig} */
// Force restart: 2026-01-07T15:20:00
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    compress: true,
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion', '@supabase/ssr', '@supabase/supabase-js'],
        scrollRestoration: true,
    },
    poweredByHeader: false,
    reactStrictMode: true,
};

export default nextConfig;
