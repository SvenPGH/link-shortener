import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { originalUrl } = body;

        // Basic validation
        if (!originalUrl) {
            return NextResponse.json({ error: 'Original URL is required' }, { status: 400 });
        }

        // More robust URL validation
        try {
            new URL(originalUrl);
        } catch (error) {
            return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
        }

        // TODO: Actual Linking Logic
        const shortCode = nanoid(7);

        // --- Logic for anonymous vs. registered users from our previous discussions would go here ---
        // For example, setting an 'expiresAt' for anonymous links:
        const linkData = {
            originalUrl: originalUrl,
            shortCode: shortCode,
            // TODO: after user implementation
            // userId: session?.user?.id, // If session exists
            // expiresAt: !session ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null // Expires in 30 days if no user
        };

        const newLink = await prisma.link.create({
            data: linkData
        });

        const base = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
        const shortUrl = `${ base }/${ newLink.shortCode }`;

        // Return the full link object plus the user-friendly full shortUrl
        return NextResponse.json({ ...newLink, shortUrl: shortUrl }, { status: 201 });

    } catch (error) {
        if (error instanceof Error && (error as any).code === 'P2002' && (error as any).meta?.target?.includes('shortCode')) {
            return NextResponse.json({ error: 'Failed to create a unique short link, please try again.' }, { status: 500 });
        }

        console.error("Error creating link:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}