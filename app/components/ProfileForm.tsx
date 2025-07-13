'use client';

import React, { useState } from 'react';
import { User } from 'next-auth'; // Import User type from next-auth
import UserIcon from "@/app/components/Icons/UserIcon";
import Image from 'next/image';

// This component receives the initial user data as props
export default function ProfileForm({ user }: { user: User }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = async () => {
        if (isEditing) {
            // Save logic
            setError('');
            setSuccess('');
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess('Profile updated successfully!');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update profile.');
            }
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="w-full max-w-md bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden">
            <div className="p-5">
                {isEditing ? (
                    <div className="space-y-3">
                        {/* Avatar remains the same */}
                        <div className="flex justify-center mb-4">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 shadow-lg">
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 dark:bg-gray-200">
                                    <UserIcon className="w-20 h-20 text-white dark:text-black" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:text-white" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:text-white" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 shadow-lg mb-3">
                            {user.image ? (
                                <Image src={user.image} alt="User Avatar" width={128} height={128} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-700 dark:bg-gray-200">
                                    <UserIcon className="w-20 h-20 text-white dark:text-black" />
                                </div>
                            )}
                        </div>
                        <div className="mt-3">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{formData.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{formData.email}</p>
                        </div>
                    </div>
                )}
                <div className="mt-5 flex justify-center">
                    <button onClick={handleEditToggle} className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-neutral-800 transition-colors duration-200">
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                    {isEditing && (
                        <button onClick={() => { setIsEditing(false); setFormData({ name: user.name || '', email: user.email || '' }); setError(''); setSuccess(''); }} className="ml-3 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-neutral-800 transition-colors duration-200">
                            Cancel
                        </button>
                    )}
                </div>
                {error && <p className="text-center text-sm text-red-500 mt-4">{error}</p>}
                {success && <p className="text-center text-sm text-green-500 mt-4">{success}</p>}
            </div>
        </div>
    );
}