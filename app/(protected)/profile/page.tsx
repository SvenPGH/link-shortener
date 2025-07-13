'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import UserIcon from "@/app/components/Icons/UserIcon";
// import PremiumIcon from "@/app/components/Icons/PremiumIcon";
import Image from 'next/image';

// The ProfileSection component is kept as requested for the layout.
const ProfileSection = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => {
    return (
        <div className={`bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden ${className}`}>
            <div className="p-3">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            </div>
            <div>
                <div className="p-4 pt-0 space-y-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Spinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-gray-100"></div>
);

// Mock data for features that are not yet implemented, to preserve the UI
// const mockSubscription = { isPremium: false };

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({ name: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // State for mock features
    // const [subscription, setSubscription] = useState(mockSubscription);
    const [preferences, setPreferences] = useState({
        darkMode: false, emailNotifications: false, linkAnalytics: false,
    });

    const [isNameUpdating, setIsNameUpdating] = useState(false);
    const [updatingPreferences, setUpdatingPreferences] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user?.name) {
            setFormData({ name: session.user.name });
            setPreferences({
                darkMode: session.user.darkMode ?? false,
                emailNotifications: session.user.emailNotifications ?? false,
                linkAnalytics: session.user.linkAnalytics ?? false,
            });
        }
    }, [session]);


    const handleEditToggle = async () => {
        if(isEditing) {
            setError('');
            setSuccess('');

            if(formData.name === session?.user?.name) {
                setIsEditing(false);
                return;
            }

            setIsNameUpdating(true);
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSuccess('Profile updated successfully!');
                await update({ name: formData.name });
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update profile.');
            }
            setIsNameUpdating(false);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePreferenceToggle = async (preference: keyof typeof preferences) => {
        if (updatingPreferences) return; // Disallow concurrent updates
        setUpdatingPreferences(preference);

        const currentValue = preferences[preference];
        const newValue = !currentValue;

        setPreferences(prev => ({ ...prev, [preference]: newValue }));
        const response = await fetch('/api/user/preferences', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [preference]: newValue }),
        });

        if (response.ok) {
            await update({ [preference]: newValue });
        } else {
            alert('Failed to update preference. Please try again.');
            setPreferences(prev => ({ ...prev, [preference]: currentValue }));
        }

        setUpdatingPreferences(null);
    };

    // Mock handlers for future features
    // const handleSubscriptionToggle = () => setSubscription(prev => ({ ...prev, isPremium: !prev.isPremium }));
    const handleRemoveAccount = () => {
        if(window.confirm("Are you sure you want to remove your account? This action cannot be undone.")) {
            alert("Account removal would be processed here (mock)");
        }
    };

    if (status === 'loading') {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Loading your profile...</p>
            </div>
        );
    }

    if (status === 'unauthenticated' || !session) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 mb-4">Please log in to view your profile.</p>
                <Link href="/auth/login" className="inline-block px-6 py-3 text-sm font-medium rounded-2xl bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300">
                    Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`md:row-span-2 bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden self-start transition-opacity duration-300 ${isNameUpdating ? 'opacity-70' : 'opacity-100'}`}>
                <div className="p-4">
                    {isEditing ? (
                        <div className="space-y-3">
                            <div className="flex justify-center mb-4">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 shadow-lg">
                                    {session.user.image ? (
                                        <Image src={session.user.image} alt={session.user.name || 'User Avatar'} width={96} height={96} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-700 dark:bg-gray-200">
                                            <UserIcon className="w-16 h-16 text-white dark:text-black" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:text-white"/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 shadow-lg mb-2">
                                {session.user.image ? (
                                    <Image src={session.user.image} alt={session.user.name || 'User Avatar'} width={96} height={96} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-700 dark:bg-gray-200">
                                        <UserIcon className="w-16 h-16 text-white dark:text-black" />
                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{session.user.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{session.user.email}</p>
                            </div>
                        </div>
                    )}
                    <div className="mt-4 flex justify-center">
                        <button onClick={handleEditToggle} className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-neutral-800 transition-colors duration-200">
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                        {isEditing && (
                            <button onClick={() => {setIsEditing(false); setFormData({ name: session.user.name || '' }); setError(''); setSuccess(''); }} className="ml-3 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-neutral-800 transition-colors duration-200">
                                Cancel
                            </button>
                        )}
                    </div>
                    {error && <p className="text-center text-sm text-red-500 mt-4">{error}</p>}
                    {success && <p className="text-center text-sm text-green-500 mt-4">{success}</p>}
                </div>
            </div>

            <div className="space-y-4">
                {/*<ProfileSection title="Subscription Type">*/}
                {/*    <div className="flex items-center justify-between">*/}
                {/*        <div className="flex items-center space-x-2">*/}
                {/*            {subscription.isPremium ? (*/}
                {/*                <>*/}
                {/*                    <PremiumIcon />*/}
                {/*                    <span className="text-gray-900 dark:text-white font-medium">Premium Subscription</span>*/}
                {/*                </>*/}
                {/*            ) : (*/}
                {/*                <span className="text-gray-900 dark:text-white font-medium">Free Plan</span>*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*        <button onClick={handleSubscriptionToggle} className={`px-3 py-1.5 my-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${subscription.isPremium ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' : 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500'}`}>*/}
                {/*            {subscription.isPremium ? 'Unsubscribe' : 'Subscribe'}*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</ProfileSection>*/}

                <ProfileSection title="Preferences">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-900 dark:text-white font-medium">Email Notifications</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Receive updates about your links and account</p>
                            </div>
                            {updatingPreferences === 'emailNotifications'
                                ? (
                                    <Spinner />
                                ) : (
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={preferences.emailNotifications} onChange={() => handlePreferenceToggle('emailNotifications')} className="sr-only peer"/>
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-900 dark:text-white font-medium">Dark Mode Default</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Use dark mode by default when you log in</p>
                            </div>
                            {updatingPreferences === 'darkMode'
                                ? (
                                    <Spinner />
                                ) : (
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={preferences.darkMode} onChange={() => handlePreferenceToggle('darkMode')} className="sr-only peer"/>
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                    </label>
                                )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-900 dark:text-white font-medium">Link Analytics</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Track clicks and other metrics for your links</p>
                            </div>
                            {updatingPreferences === 'linkAnalytics'
                                ? (
                                    <Spinner />
                                ) : (
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={preferences.linkAnalytics} onChange={() => handlePreferenceToggle('linkAnalytics')} className="sr-only peer"/>
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                    </label>
                                )}
                        </div>
                    </div>
                </ProfileSection>

                <ProfileSection title="Remove Account">
                    <div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                            Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button onClick={handleRemoveAccount} className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Remove Account
                        </button>
                    </div>
                </ProfileSection>
            </div>
        </div>
    );
}