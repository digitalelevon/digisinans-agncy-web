
import React from 'react';
import AboutClient from './AboutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About | Best Digital Marketing Agency in Tirur, Malappuram, Kerala | DIGISINANS",
    description: "Discover the journey of DIGISINANS, the best digital marketing agency in Tirur, Malappuram, Kerala. We engineer digital echoes through elite performance and branding.",
    keywords: [
        "best digital marketing agency in tirur",
        "best digital marketing agency in malappuram",
        "best digital marketing agency in kerala",
        "digital marketing experts malappuram",
        "digisinans story",
        "performance marketing agency kerala"
    ],
};

export default function AboutPage() {
    return <AboutClient />;
}
