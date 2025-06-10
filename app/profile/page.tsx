'use client';

import React, { useState } from 'react';

import UserIcon from "@/app/components/Icons/UserIcon";
import PremiumIcon from "@/app/components/Icons/PremiumIcon";

/**
 * Interface for user profile data
 */
interface UserProfile {
    name: string;
    email: string;
    isPremium: boolean;
    preferences: {
        emailNotifications: boolean;
        darkModeDefault: boolean;
        linkAnalytics: boolean;
    }
}

/**
 * Mock user data for demonstration purposes
 */
const mockUserData: UserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    isPremium: false,
    preferences: {
        emailNotifications: true,
        darkModeDefault: false,
        linkAnalytics: true
    }
};

/**
 * Section component for profile page
 * @param title - The title of the section
 * @param children - The content of the section
 * @param className - Additional classes for the root element of the section
 * @returns A styled section component
 */
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

/**
 * Profile page component that displays user information and settings
 * * @returns The profile page component
 */
export default function ProfilePage() {
    const [userData, setUserData] = useState<UserProfile>(mockUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userData });

    /**
     * Handles toggling premium subscription status
     */
    const handleSubscriptionToggle = () => {
        setUserData(prev => ({
            ...prev,
            isPremium: !prev.isPremium
        }));
    };

    /**
     * Handles toggling edit mode for personal data
     */
    const handleEditToggle = () => {
        if (isEditing) {
            setUserData({ ...formData });
        }
        setIsEditing(!isEditing);
    };

    /**
     * Handles form input changes
     * * @param e - The change event
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Handles preference toggle changes
     * * @param prefName - The name of the preference to toggle
     */
    const handlePreferenceToggle = (prefName: keyof UserProfile['preferences']) => {
        setUserData(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [prefName]: !prev.preferences[prefName]
            }
        }));
    };

    /**
     * Handles account removal with confirmation
     */
    const handleRemoveAccount = () => {
        if(window.confirm("Are you sure you want to remove your account? This action cannot be undone.")) {
            alert("Account removal would be processed here (mock)");
            console.log("Account removal requested");
        }
    };

    return (
        // This is now the main grid container for all sections
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* 1. Profile Header Card - now a grid item */}
            <div className="md:row-span-2 bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden self-start">
                <div className="p-4">
                    {isEditing ? (
                        <div className="space-y-3">
                            <div className="flex justify-center mb-4">
                                {/* Reduced avatar size */}
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 shadow-lg">
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 dark:bg-gray-200">
                                        <UserIcon className="w-16 h-16 text-white dark:text-black" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:text-white"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:text-white"/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center">
                            {/* Reduced avatar size */}
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 shadow-lg mb-2">
                                <div className="w-full h-full flex items-center justify-center bg-gray-700 dark:bg-gray-200">
                                    <UserIcon className="w-16 h-16 text-white dark:text-black" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{userData.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{userData.email}</p>
                            </div>
                        </div>
                    )}
                    <div className="mt-4 flex justify-center">
                        <button onClick={handleEditToggle} className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-neutral-800 transition-colors duration-200">
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                        {isEditing && (
                            <button onClick={() => {setIsEditing(false);setFormData({ ...userData });}} className="ml-3 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-neutral-800 transition-colors duration-200">
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Container for the right column(s) */}
            <div className="space-y-4">
                <ProfileSection title="Subscription Type">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {userData.isPremium ? (
                                <>
                                    <PremiumIcon />
                                    <span className="text-gray-900 dark:text-white font-medium">Premium Subscription</span>
                                </>
                            ) : (
                                <span className="text-gray-900 dark:text-white font-medium">Free Plan</span>
                            )}
                        </div>
                        <button onClick={handleSubscriptionToggle} className={`px-3 py-1.5 my-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${userData.isPremium ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:focus:ring-offset-neutral-800' : 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 dark:focus:ring-offset-neutral-800'}`}>
                            {userData.isPremium ? 'Unsubscribe' : 'Subscribe'}
                        </button>
                    </div>
                    {!userData.isPremium && (
                        <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <p className="text-sm text-amber-800 dark:text-amber-200">
                                Upgrade to Premium for custom links, advanced analytics, and more features!
                            </p>
                        </div>
                    )}
                </ProfileSection>

                <ProfileSection title="Preferences">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-900 dark:text-white font-medium">Email Notifications</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Receive updates about your links and account</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={userData.preferences.emailNotifications} onChange={() => handlePreferenceToggle('emailNotifications')} className="sr-only peer"/>
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-900 dark:text-white font-medium">Dark Mode Default</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Use dark mode by default when you log in</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={userData.preferences.darkModeDefault} onChange={() => handlePreferenceToggle('darkModeDefault')} className="sr-only peer"/>
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-900 dark:text-white font-medium">Link Analytics</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Track clicks and other metrics for your links</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={userData.preferences.linkAnalytics} onChange={() => handlePreferenceToggle('linkAnalytics')} className="sr-only peer"/>
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </ProfileSection>

                <ProfileSection title="Remove Account">
                    <div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                            Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button onClick={handleRemoveAccount} className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-neutral-800 transition-colors duration-200">
                            Remove Account
                        </button>
                    </div>
                </ProfileSection>
            </div>
        </div>
    );
}