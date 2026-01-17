
import React from 'react';
import ServicesClient from './ServicesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Performance Digital Marketing Services | SEO & Branding Kerala | DIGISINANS",
    description: "Scale your revenue with elite SEO, Google Ads, Meta Ads, and Branding services. The best digital marketing agency in Kerala engineering global growth.",
    keywords: [
        "seo services kerala",
        "performance marketing kerala",
        "branding agency malappuram",
        "ecommerce seo india",
        "google ads expert kerala",
        "meta ads agency india",
        "web design services malappuram",
        "digital marketing company in kerala"
    ],
};

export default function ServicesPage() {
    return <ServicesClient />;
}
