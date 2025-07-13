import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const params = await context.params;
    const linkId = params.id;

    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!linkId) return NextResponse.json({ error: 'Link ID is required' }, { status: 400 });
    try {
        const link = await prisma.link.findFirst({
            where: {
                id: linkId,
                userId: session.user.id,
            },
            select: {
                originalUrl: true,
                shortCode: true,
            }
        });

        if (!link) return NextResponse.json({ error: 'Link not found or you do not have permission to view its stats.' }, { status: 404 });
        const clicks = await prisma.click.findMany({
            where: { linkId: linkId },
            orderBy: { createdAt: 'asc' },
        });

        const clicksByDay = clicks.reduce((acc, click) => {
            const date = click.createdAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const timeSeries = Object.entries(clicksByDay).map(([date, count]) => ({
            date,
            clicks: count,
        }));

        const countries = clicks.reduce((acc, click) => {
            const country = click.country || 'Unknown';
            acc[country] = (acc[country] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topCountries = Object.entries(countries)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 7) // Get top 7
            .map(([country, clicks]) => ({ country, clicks }));

        const referrers = clicks.reduce((acc, click) => {
            const referrer = click.referrer ? new URL(click.referrer).hostname : 'Direct';
            acc[referrer] = (acc[referrer] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topReferrers = Object.entries(referrers)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 7) // Get top 7
            .map(([referrer, clicks]) => ({ referrer, clicks }));


        return NextResponse.json({link, totalClicks: clicks.length, timeSeries, topCountries, topReferrers,});

    } catch (error) {
        console.error(`Error fetching stats for link ${linkId}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}