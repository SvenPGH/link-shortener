import {Prisma} from "@prisma/client";
import {NextRequest, NextResponse} from 'next/server';
import {nanoid} from 'nanoid';
import {prisma} from '@/lib/prisma';
import {auth} from '@/auth';

export async function POST(request: NextRequest) {
    const session = await auth();

    try {
        const body = await request.json();
        let {originalUrl} = body;

        if (!originalUrl) {
            return NextResponse.json({ error: 'Original URL is required' }, { status: 400 });
        }

        if (!/^https?:\/\//i.test(originalUrl)) {
            originalUrl = `https://${originalUrl}`;
        }

        try {
            new URL(originalUrl);
        } catch (error) {
            return NextResponse.json({ error: `Invalid URL format: ${error}` }, { status: 400 });
        }


        /**
         * Shortcode Handling
         * Anonymous Links: 9 Characters | 30 Days Lifetime | Autodeleted after 30 Days.
         * Logged In Links: 7 Characters | Infinite Lifetime | Autodeleted after 30 Days of being Dormant.
         * Premium (TODO): Customizable | Infinite Lifetime | Never Autodeleted | Reverted to Logged In Link when Premium Period ends.
         */
        const maxRetries = 5;
        let shortCode: string;
        let isUnique = false;
        let retries = 0;

        do {
            const codeLength = session?.user?.id ? 7 : 9;
            shortCode = nanoid(codeLength);
            const existingLink = await prisma.link.findUnique({
                where: {shortCode: shortCode},
            });
            if (!existingLink) {
                isUnique = true;
            } else {
                retries++;
            }
        } while (!isUnique && retries < maxRetries);

        if (!isUnique) {
            // Rare Edge Case handling
            return NextResponse.json({ error: 'Failed to generate a unique short link after multiple attempts. Please try again.' }, { status: 500 });
        }

        const linkData = {
            originalUrl: originalUrl,
            shortCode: shortCode,
            userId: session?.user?.id,
            expiresAt: !session ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null // Expires in 30 days if no user
        };

        const newLink = await prisma.link.create({
            data: linkData
        });

        const base = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
        const shortUrl = `${base}/${newLink.shortCode}`;
        return NextResponse.json({...newLink, shortUrl: shortUrl}, {status: 201});

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const target = error.meta?.target as string[];
                if (target?.includes('shortCode')) {
                    return NextResponse.json({error: 'Failed to create a unique short link, please try again.'}, {status: 500});
                }
            }
        }

        console.error("Error creating link:", error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}