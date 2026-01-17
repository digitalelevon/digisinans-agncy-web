
import React from 'react';
import DashboardClient from './DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Admin Dashboard | DIGISINANS",
    robots: {
        index: false,
        follow: false,
    }
};

export default function DashboardPage() {
    return <DashboardClient />;
}
