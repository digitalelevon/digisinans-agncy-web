import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: 'googlebot-image',
                allow: '/',
            },
            {
                userAgent: 'googlebot-mobile',
                allow: '/',
            },
            {
                userAgent: 'MSNBot',
                allow: '/',
            },
            {
                userAgent: 'Slurp',
                allow: '/',
            },
            {
                userAgent: 'yahoo-mmcrawler',
                allow: '/',
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: '/cgi-bin/',
            },
        ],
        sitemap: 'https://digisinans.in/sitemap.xml',
    }
}
