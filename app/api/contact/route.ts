
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const supabase = await createClient();

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert into Supabase
        const { error } = await supabase
            .from('inquiries')
            .insert([
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone || null,
                    service_type: data.service_type || 'General Inquiry',
                    message: data.message,
                    company: data.company || null
                }
            ]);

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
