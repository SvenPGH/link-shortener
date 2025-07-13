import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const links = await prisma.link.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(links);
    } catch (error) {
        console.error("Error fetching user links:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}