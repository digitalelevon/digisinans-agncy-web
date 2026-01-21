
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from '@/components/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalFooter';
import ClientOnlyWrapper from "@/components/ClientOnlyWrapper";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

const playfairDisplay = Playfair_Display({
    variable: "--font-serif",
    subsets: ["latin"],
    style: ['italic', 'normal'],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://digisinans.in'),
    title: "Digisinans | Best AI Integrated Digital Marketing Agency in Malappuram, Kerala",
    description: "Digisinans is the Best AI Integrated Digital Marketing Agency in Malappuram, Kerala. We scale global brands with elite SEO, branding, and AI-driven performance marketing strategies.",
    keywords: [
        "Digital Marketing Agency Malappuram",
        "AI Integrated Marketing",
        "Best Digital Marketing Agency in Kerala",
        "Branding Agency Tirur",
        "SEO Expert Malappuram",
        "Digisinans"
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Digisinans | Best AI Integrated Digital Marketing Agency in Malappuram",
        description: "Scaling global brands with AI-driven precision and high-end design. The best digital partner in Kerala.",
        url: "https://digisinans.in",
        siteName: "Digisinans",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: 'summary_large_image',
        title: "Digisinans | Best AI Integrated Digital Marketing Agency in Malappuram",
        description: "Scaling global brands with AI-driven precision and high-end design. The best digital partner in Kerala.",
        images: ['/og-image.jpg'],
    },
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`scroll-smooth ${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
            <head>
                <link rel="preconnect" href="https://images.unsplash.com" />
                <link rel="dns-prefetch" href="https://images.unsplash.com" />
                {process.env.NEXT_PUBLIC_SUPABASE_URL && (() => {
                    try {
                        const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
                        return <link rel="preconnect" href={url.origin} />;
                    } catch (e) {
                        return null;
                    }
                })()}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfessionalService",
                            "name": "DIGISINANS",
                            "alternateName": "Best Digital Marketing Agency in Kerala",
                            "image": "https://digisinans.in/logo.png",
                            "@id": "https://digisinans.in",
                            "url": "https://digisinans.in",
                            "telephone": "+917510477475",
                            "priceRange": "$$",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Malappuram",
                                "addressLocality": "Malappuram",
                                "addressRegion": "KL",
                                "postalCode": "676505",
                                "addressCountry": "IN"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 11.0510,
                                "longitude": 76.0711
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday"
                                ],
                                "opens": "09:00",
                                "closes": "18:00"
                            },
                            "sameAs": [
                                "https://www.linkedin.com/company/digisinans",
                                "https://www.instagram.com/digisinans",
                                "https://www.facebook.com/digisinans"
                            ],
                            "description": "DIGISINANS is the best digital marketing agency in Kerala, specializing in SEO, Performance Marketing, Social Media Marketing, and Branding.",
                            "areaServed": {
                                "@type": "Country",
                                "name": "India"
                            },
                            "hasOfferCatalog": {
                                "@type": "OfferCatalog",
                                "name": "Digital Marketing Services",
                                "itemListElement": [
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "Search Engine Optimization (SEO)",
                                            "description": "Premium SEO services in Kerala to dominate search results globally."
                                        }
                                    },
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "Performance Marketing",
                                            "description": "Data-driven performance marketing for high-ROI digital campaigns."
                                        }
                                    },
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "Branding & Web Design",
                                            "description": "Elite branding and high-performance web design from Kerala."
                                        }
                                    }
                                ]
                            }
                        })
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://digisinans.in"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Services",
                                    "item": "https://digisinans.in/services"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Work",
                                    "item": "https://digisinans.in/work"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Blog",
                                    "item": "https://digisinans.in/blog"
                                }
                            ]
                        })
                    }}
                />
            </head>
            <body className={`${plusJakartaSans.variable} ${playfairDisplay.variable} antialiased font-sans`} suppressHydrationWarning>
                <ConditionalNavbar />
                {children}
                <ConditionalFooter />
                <ClientOnlyWrapper />

                {/* Google Analytics */}
                {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
                )}

                {/* Meta Pixel */}
                {process.env.NEXT_PUBLIC_FB_PIXEL_ID && process.env.NEXT_PUBLIC_FB_PIXEL_ID !== 'null' && (
                    <Script
                        id="fb-pixel"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                )}
            </body>
        </html>

    );
}
