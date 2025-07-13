'use client';

import { useState } from 'react';
import CreateLinkForm from "@/app/components/CreateLinkForm";

export default function Home() {
    const [latestLink, setLatestLink] = useState<any>(null);
    const handleLinkCreated = (newLink: any) => {
        setLatestLink(newLink);
        if(newLink.shortUrl) {
            navigator.clipboard.writeText(newLink.shortUrl);
            alert(`Copied ${newLink.shortUrl} to clipboard!`);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-black dark:text-white">SVP.GL</h1>
            <CreateLinkForm onLinkCreatedAction={handleLinkCreated} />
            {latestLink && (
                <div className="mt-4 text-center p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg">
                    <p>Your short link is ready:</p>
                    <a href={latestLink.shortUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        {latestLink.shortUrl}
                    </a>
                </div>
            )}
        </>
    );
}