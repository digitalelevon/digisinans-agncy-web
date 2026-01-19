
import React from 'react';
import ContactClient from './ContactClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact the Best Digital Marketing Agency in Kerala | DIGISINANS",
    description: "Ready to scale your brand? Contact DIGISINANS, the best digital marketing agency in Kerala, for a free consultation and personalized growth strategy.",
    keywords: ["contact digisinans", "digital marketing consultant kerala", "get a marketing quote kerala"],
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
