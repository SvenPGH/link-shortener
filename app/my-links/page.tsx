'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

import PremiumIcon from "@/app/components/Icons/PremiumIcon";

const CopyIcon = () => <span title="Copy">📄</span>;
const EditIcon = () => <span title="Edit">✏️</span>;
const DeleteIcon = () => <span title="Delete">🗑️</span>;
const StatsIcon = () => <span title="Stats">📊</span>;

interface ShortLink {
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: string;
    clicks: number;
    isCustom: boolean;
}
type TabType = 'custom' | 'standard';

const mockLinksData: ShortLink[] = [
    { id: '1', originalUrl: 'https://very-long-url-example.com/some/path/to/a/resource', shortUrl: 'svp.gl/my-event', createdAt: '2024-05-18', clicks: 102, isCustom: true },
    { id: '2', originalUrl: 'https://another-example-for-a-long-url.com/with/different/parameters', shortUrl: 'svp.gl/def2', createdAt: '2024-05-19', clicks: 78, isCustom: false },
    { id: '3', originalUrl: 'https://www.someotherdomain.org/article/important-topic', shortUrl: 'svp.gl/blog-post', createdAt: '2024-05-20', clicks: 250, isCustom: true },
];

const LinkTable = ({ links: propLinks, isCustomTable = false }: { links: ShortLink[], isCustomTable?: boolean }) => {
    const [displayLinks, setDisplayLinks] = useState<ShortLink[]>(propLinks);

    useEffect(() => {
        setDisplayLinks(propLinks);
    }, [propLinks]);

    const handleCopy = (shortUrl: string) => { console.log('Copy:', shortUrl); alert('Copied (mock)'); };
    const handleDelete = (linkId: string) => {
        if (window.confirm("Are you sure?")) {
            setDisplayLinks(prev => prev.filter(link => link.id !== linkId));
            console.log('Delete:', linkId);
        }
    };
    const handleEdit = (linkId: string) => { console.log('Edit:', linkId); alert('Edit (mock)'); };
    const handleViewStats = (linkId: string) => { console.log('Stats:', linkId); alert('Stats (mock)'); };

    if (displayLinks.length === 0) {
        return (
            <div className="mt-6 py-10 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    You have no {isCustomTable ? 'custom' : 'standard'} links in this category yet.
                    {isCustomTable && " Consider upgrading or creating one!"}
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white dark:bg-neutral-800">
                <thead className="bg-gray-50 dark:bg-neutral-700/50">
                <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Original URL</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Short Link</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Created</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Clicks</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {displayLinks.map((link) => (
                    <tr key={link.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/30">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-100 truncate max-w-xs sm:max-w-sm md:max-w-md" title={link.originalUrl}>
                                {link.originalUrl}
                            </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <div className="grid grid-flow-col auto-cols-max items-center gap-x-1">
                                <a href={`https://${link.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                    {link.shortUrl}
                                </a>
                                {link.isCustom && <PremiumIcon/>}
                            </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{link.createdAt}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{link.clicks}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-1 sm:space-x-2">
                            <button onClick={() => handleCopy(link.shortUrl)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 p-1"><CopyIcon /></button>
                            <button onClick={() => handleEdit(link.id)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 p-1"><EditIcon /></button>
                            <button onClick={() => handleViewStats(link.id)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 p-1"><StatsIcon /></button>
                            <button onClick={() => handleDelete(link.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 p-1"><DeleteIcon /></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default function MyLinksPage() {
    const [activeTab, setActiveTab] = useState<TabType>('custom');
    const allLinks = useMemo(() => mockLinksData, []);

    const customLinks = useMemo(() => allLinks.filter(link => link.isCustom), [allLinks]);
    const standardLinks = useMemo(() => allLinks.filter(link => !link.isCustom), [allLinks]);

    const renderLinks = () => {
        if (activeTab === 'custom') {
            return <LinkTable links={customLinks} isCustomTable={true} />;
        } else {
            return <LinkTable links={standardLinks} isCustomTable={false} />;
        }
    };

    const getTabClassName = (tabName: TabType) => {
        const baseClasses = "px-4 py-2 font-medium text-sm rounded-t-lg focus:outline-none " +
            "grid grid-flow-col auto-cols-max items-center gap-x-1.5 whitespace-nowrap";
        if (activeTab === tabName) {
            return `${baseClasses} text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 dark:border-indigo-400 bg-white dark:bg-neutral-800`;
        }
        return `${baseClasses} text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-neutral-600 border-b-2 border-transparent`;
    };

    if (allLinks.length === 0) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Links</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your standard and custom shortened links.</p>
                </div>
                <div className="text-center py-10 mt-6">
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">You haven&#39;t created any links yet.</p>
                    <Link href="/">
                        <span className="inline-block px-6 py-3 text-sm font-medium rounded-2xl bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300">
                            Shorten a New Link
                        </span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Links</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your standard and custom shortened links.</p>
            </div>
            <div className="mb-1 border-b border-gray-300 dark:border-neutral-700">
                <nav className="-mb-px grid grid-flow-col auto-cols-max gap-x-4 items-center" aria-label="Tabs">
                    <button onClick={() => setActiveTab('custom')} className={getTabClassName('custom')} aria-current={activeTab === 'custom' ? 'page' : undefined}>
                        <span>
                            Custom Links
                        </span>
                        <PremiumIcon />
                        <span>
                            ({customLinks.length})
                        </span>
                    </button>
                    <button onClick={() => setActiveTab('standard')} className={getTabClassName('standard')} aria-current={activeTab === 'standard' ? 'page' : undefined}>
                        <span>
                            Standard Links
                        </span>
                        <span>
                            ({standardLinks.length})
                        </span>
                    </button>
                </nav>
            </div>
            <div className="min-h-[20rem]">
                {renderLinks()}
            </div>
        </div>
    );
}