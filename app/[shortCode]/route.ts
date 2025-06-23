import { NextRequest } from 'next/server';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Link } from '@prisma/client';

export async function GET(
    request: NextRequest,
    { params }: { params: { shortCode: string } }
) {
    const shortCode = params.shortCode;
    let link: Link | null = null;

    if(!shortCode) {
        console.error('No shortCode received as Parameter in Route.');
        notFound();
    }

    try {
        link = await prisma.link.findUnique({
            where: { shortCode },
        });
    } catch(error) {
        console.error(`Error redirecting to Link. ${ error }`);
        return notFound();
    }

    if(link) {
        prisma.link.update({
            where: { id: link.id },
            data: { clicks: { increment: 1 }, lastClickedAt: new Date() },
        }).catch(err => {
            console.error(`Failed to update analytics for shortCode ${shortCode}:`, err);
        });

        return redirect(link.originalUrl);
    } else {
        console.info('Redirect Link was not found.');
        return notFound();
    }
}