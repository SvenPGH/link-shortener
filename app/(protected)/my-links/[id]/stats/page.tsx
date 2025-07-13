'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTheme } from '@/app/contexts/ThemeContext';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

interface AnalyticsData {
    link: {
        originalUrl: string;
        shortCode: string;
    };
    totalClicks: number;
    timeSeries: { date: string; clicks: number }[];
    topCountries: { country: string; clicks: number }[];
    topReferrers: { referrer: string; clicks: number }[];
}

const StatCard = ({ title, value }: { title: string, value: string | number }) => (
    <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
);

const EmptyState = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-[20rem] text-gray-500">
        <p>{message}</p>
    </div>
);

export default function StatsPage() {
    const params = useParams<{ id: string }>();
    const linkId = params.id;
    const { darkMode } = useTheme();

    const [stats, setStats] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!linkId) {
            setIsLoading(false);
            return;
        }
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/user/links/${linkId}/stats`);
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to fetch stats.');
                }
                const data = await response.json();
                setStats(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [linkId]);

    const nivoTheme = {
        textColor: darkMode ? '#e5e5e5' : '#333333',
        axis: {
            domain: { line: { stroke: darkMode ? '#555' : '#ccc' } },
            ticks: { text: { fill: darkMode ? '#a3a3a3' : '#666', fontSize: 12 } },
            legend: { text: { fill: darkMode ? '#a3a3a3' : '#333' } },
        },
        grid: { line: { stroke: darkMode ? '#404040' : '#f0f0f0', strokeDasharray: "3 3" } },
        tooltip: { container: { background: darkMode ? '#262626' : '#fff', color: 'inherit', border: '1px solid', borderColor: darkMode ? '#555' : '#ccc'} },
    };

    const timeSeriesDataForNivo = stats ? [{ id: 'Clicks', data: stats.timeSeries.map(d => ({ x: d.date, y: d.clicks })) }] : [];

    // Correct formatter function
    const formatInteger = (value: number) => (Number.isInteger(value) ? value : '');

    if (isLoading) return <div className="text-center p-10">Loading stats...</div>;
    if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
    if (!stats) return <div className="text-center p-10">No stats available for this link.</div>;

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Analytics for svp.gl/{stats.link.shortCode}</h1>
                <p className="text-gray-500 dark:text-gray-400 truncate">
                    <a href={stats.link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">{stats.link.originalUrl}</a>
                </p>
                <Link href="/my-links" className="text-sm text-indigo-500 hover:underline mt-2 inline-block">&larr; Back to My Links</Link>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Clicks" value={stats.totalClicks} />
                <StatCard title="Top Country" value={stats.topCountries[0]?.country || 'N/A'} />
                <StatCard title="Top Referrer" value={stats.topReferrers[0]?.referrer || 'N/A'} />
            </section>

            <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-lg border p-6 h-[24rem]">
                <h3 className="font-bold mb-4 text-lg">Clicks Over Time</h3>
                {timeSeriesDataForNivo[0].data.length > 0 ? (
                    <ResponsiveLine
                        data={timeSeriesDataForNivo}
                        margin={{ top: 20, right: 30, bottom: 80, left: 50 }}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
                        yFormat=" >-.0f"
                        axisBottom={{ tickRotation: -45, legendOffset: 60 }}
                        axisLeft={{ tickPadding: 10, format: formatInteger }}
                        pointSize={8}
                        useMesh={true}
                        theme={nivoTheme}
                        colors={['#4f46e5']}
                    />
                ) : <EmptyState message="No clicks recorded yet." />}
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-lg border p-6 h-[24rem]">
                    <h3 className="font-bold mb-4 text-lg">Top Countries</h3>
                    {stats.topCountries.length > 0 ? (
                        <ResponsiveBar
                            data={stats.topCountries}
                            keys={['clicks']}
                            indexBy="country"
                            margin={{ top: 10, right: 20, bottom: 50, left: 120 }}
                            padding={0.3}
                            layout="horizontal"
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'category10' }}
                            axisBottom={{ format: formatInteger, legend: 'Clicks', legendPosition: 'middle', legendOffset: 40 }}
                            axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                            enableLabel={false}
                            theme={nivoTheme}
                        />
                    ) : <EmptyState message="No location data available." />}
                </div>
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-lg border p-6 h-[24rem]">
                    <h3 className="font-bold mb-4 text-lg">Top Referrers</h3>
                    {stats.topReferrers.length > 0 ? (
                        <ResponsiveBar
                            data={stats.topReferrers}
                            keys={['clicks']}
                            indexBy="referrer"
                            margin={{ top: 10, right: 20, bottom: 50, left: 120 }}
                            padding={0.3}
                            layout="horizontal"
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}
                            axisBottom={{ format: formatInteger, legend: 'Clicks', legendPosition: 'middle', legendOffset: 40 }}
                            axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, format: (v: string) => v.length > 15 ? v.substring(0, 15) + '...' : v }}
                            enableLabel={false}
                            theme={nivoTheme}
                        />
                    ) : <EmptyState message="No referrer data available." />}
                </div>
            </section>
        </div>
    );
}