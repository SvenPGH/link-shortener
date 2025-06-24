'use client';

import { useState, FormEvent } from 'react';
import SendIcon from "@/app/components/Icons/SendIcon";

interface CreateLinkFormProps {
    onLinkCreatedAction: (newLink: any) => void;
}

export default function CreateLinkForm({ onLinkCreatedAction }: CreateLinkFormProps) {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/links', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ originalUrl: url }),
        });

        const data = await response.json();
        if(response.ok) {
            onLinkCreatedAction(data);
            setUrl('');
        } else {
            setError(data.error || 'Failed to create short link.');
        }

        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="relative grid items-center w-full">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-3 pr-12 border border-gray-800 dark:border-gray-600 rounded-2xl placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500 focus:border-transparent shadow-sm hover:shadow-md transition-colors transition-shadow duration-300 ease-in-out col-start-1 row-start-1 z-0"
                    placeholder="Shorten Link here..."
                    required
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    aria-label="Shorten URL"
                    className="col-start-1 row-start-1 justify-self-end self-center mr-2 z-10 grid place-items-center w-9 h-9 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 border border-gray-700 dark:border-gray-300 rounded-full hover:bg-gray-700 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:focus:ring-offset-white transition-colors duration-300 ease-in-out disabled:opacity-50"
                    disabled={isLoading}
                >
                    <SendIcon/>
                </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
}