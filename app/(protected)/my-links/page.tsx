'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import CreateLinkForm from '@/app/components/CreateLinkForm';
import PremiumIcon from "@/app/components/Icons/PremiumIcon";
import StatsIcon from '@/app/components/Icons/StatsIcon';
import DeleteIcon from '@/app/components/Icons/DeleteIcon';
import CopyIcon from "@/app/components/Icons/CopyIcon";

export interface ShortLink {
    id: string;
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    clicks: number;
    isCustom: boolean;
}
type TabType = 'custom' | 'standard';

const LinkTable = ({ links, onDelete }: { links: ShortLink[], onDelete: (linkId: string) => void }) => {
    const handleCopy = (shortCode: string) => {
        const url = `${window.location.origin}/${shortCode}`;
        navigator.clipboard.writeText(url);
        alert('Copied to clipboard!');
    };

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
                {links.map((link) => (
                    <tr key={link.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/30">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-100 truncate max-w-xs sm:max-w-sm md:max-w-md" title={link.originalUrl}>
                                {link.originalUrl}
                            </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <div className="grid grid-flow-col auto-cols-max items-center gap-x-1">
                                <a href={`/${link.shortCode}`} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                    {/* Assuming a placeholder domain for display */}
                                    {`svp.gl/${link.shortCode}`}
                                </a>
                                {link.isCustom && <PremiumIcon/>}
                            </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(link.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{link.clicks}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-1 sm:space-x-2">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <button title="Copy link" onClick={() => handleCopy(link.shortCode)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 p-1">
                                    <CopyIcon className="w-5 h-5" />
                                </button>
                                <Link title="View stats" href={`/my-links/${link.id}/stats`} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 p-1">
                                    <StatsIcon className="w-5 h-5" />
                                </Link>
                                <button title="Delete link" onClick={() => onDelete(link.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 p-1">
                                    <DeleteIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default function MyLinksPage() {
    const { status } = useSession();
    const [activeTab, setActiveTab] = useState<TabType>('standard');
    const [allLinks, setAllLinks] = useState<ShortLink[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoading(true);
            fetch('/api/user/links')
                .then(res => {
                    if (!res.ok) { throw new Error('Failed to fetch'); }
                    return res.json();
                })
                .then(data => {
                    setAllLinks(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch links:", err);
                    setIsLoading(false);
                });
        } else if (status === 'unauthenticated') {
            setAllLinks([]);
            setIsLoading(false);
        }
    }, [status]);

    const handleDelete = async (linkId: string) => {
        if (window.confirm('Are you sure you want to delete this link permanently?')) {
            const response = await fetch(`/api/user/links/${linkId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAllLinks(prevLinks => prevLinks.filter(link => link.id !== linkId));
            } else {
                const data = await response.json();
                alert(`Failed to delete link: ${data.error || 'Unknown error'}`);
            }
        }
    };

    const handleLinkCreated = (newLink: ShortLink) => {
        setAllLinks(prevLinks => [newLink, ...prevLinks]);
    };

    // const customLinks = useMemo(() => allLinks.filter(link => link.isCustom), [allLinks]);
    const standardLinks = useMemo(() => allLinks.filter(link => !link.isCustom), [allLinks]);
    const renderLinksContent = () => {
        // const linksToShow = activeTab === 'custom' ? customLinks : standardLinks;
        const linksToShow = standardLinks;
        if (linksToShow.length === 0) {
            return <div className="mt-6 py-10 text-center"><p>You have no links in this category yet.</p></div>;
        }
        return <LinkTable links={linksToShow} onDelete={handleDelete} />;
    };

    const getTabClassName = (tabName: TabType) => {
        const baseClasses = "px-4 py-2 font-medium text-sm rounded-t-lg focus:outline-none grid grid-flow-col auto-cols-max items-center gap-x-1.5 whitespace-nowrap";
        if (activeTab === tabName) return `${baseClasses} text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 dark:border-indigo-400 bg-white dark:bg-neutral-800`;
        return `${baseClasses} text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-neutral-600 border-b-2 border-transparent`;
    };

    if (isLoading || status === 'loading') {
        return <div className="text-center p-10">Loading your links...</div>;
    }

    if (status === 'unauthenticated') {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Links</h1>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 mb-4">Please log in to view your links.</p>
                <Link href="/auth/login">
                    <span className="inline-block px-6 py-3 text-sm font-medium rounded-2xl bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300">
                        Log In
                    </span>
                </Link>
            </div>
        );
    }

    if (allLinks.length === 0) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Links</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your standard and custom shortened links.</p>
                </div>
                <div className="text-center py-10 mt-6">
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">You haven&apos;t created any links yet.</p>
                    <div className="mt-4 flex justify-center">
                        <CreateLinkForm onLinkCreatedAction={handleLinkCreated} />
                    </div>
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
                    {/*<button onClick={() => setActiveTab('custom')} className={getTabClassName('custom')} aria-current={activeTab === 'custom' ? 'page' : undefined}>*/}
                    {/*    <span>Custom Links</span>*/}
                    {/*        <PremiumIcon />*/}
                    {/*    <span>({customLinks.length})</span>*/}
                    {/*</button>*/}
                    <button onClick={() => setActiveTab('standard')} className={getTabClassName('standard')} aria-current={activeTab === 'standard' ? 'page' : undefined}>
                        <span>Standard Links</span>
                        <span>({standardLinks.length})</span>
                    </button>
                </nav>
            </div>
            <div className="min-h-[20rem]">
                {renderLinksContent()}
            </div>
            <div className="mt-4 flex justify-center">
                <CreateLinkForm onLinkCreatedAction={handleLinkCreated} />
            </div>
        </div>
    );
}