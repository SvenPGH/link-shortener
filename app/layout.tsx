import type { Metadata } from 'next';

import '@/app/globals.css';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import Providers from "@/app/providers";

import { Analytics } from "@vercel/analytics/next"

import { Jura } from 'next/font/google';
import {ThemeProvider} from "@/app/contexts/ThemeContext";

const jura = Jura({subsets: ['latin'], display: 'swap', variable: '--font-jura', weight: ['300', '400', '500', '600', '700']});

export const metadata: Metadata = {
    title: "SVP.GL - Free URL Shortener with Analytics",
    description: "Create short, memorable links instantly with SVP.GL. Free URL shortener with user accounts, detailed analytics. Track clicks, manage links, and boost your online presence.",
    keywords: [
        'url shortener',
        'link shortener',
        'free url shortener',
        'custom short links',
        'link analytics',
        'click tracking',
        'link management',
        'short url generator',
        'branded links',
        'link statistics',
        'bitly alternative',
        'tinyurl alternative',
        'svp.gl'
    ],
    openGraph: {
        title: "SVP.GL - Free URL Shortener with Analytics",
        description: "Create short, memorable links instantly. Free URL shortener with user accounts, detailed analytics, and custom domains.",
        url: "https://svp.gl",
        siteName: "SVP.GL",
        type: "website",
        images: [
            {
                url: "/svpicon_cropped_alpha.png",
                width: 1200,
                height: 630,
                alt: "SVP.GL - Free URL Shortener with Analytics"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        site: "@svpgl",
        creator: "@svpgl",
        title: "SVP.GL - Free URL Shortener with Analytics",
        description: "Create short, memorable links instantly. Free URL shortener with user accounts, detailed analytics, and custom domains.",
        images: ["/svpicon_cropped_alpha.png"]
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    other: {
        'application-name': 'SVP.GL',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'SVP.GL',
        'msapplication-TileColor': '#2563eb',
        'theme-color': '#2563eb'
    },
    alternates: {
        canonical: "https://svp.gl",
        languages: {
            'en-US': 'https://svp.gl',
            'x-default': 'https://svp.gl'
        }
    },
    category: 'Technology',
    creator: 'SVP.GL Team',
    publisher: 'SVP.GL',
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${jura.variable} antialiased`}>
                <Providers>
                    <ThemeProvider>
                        <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen bg-white dark:bg-black text-black dark:text-white font-[family-name:var(--font-jura)] transition-colors duration-500 ease-in-out">
                            <Header/>
                            <main className="grid place-items-center gap-8 row-start-2 w-full max-w-4xl mx-auto px-4 pt-20 sm:pt-24">
                                {children}
                            </main>
                            <Footer/>
                        </div>
                    </ThemeProvider>
                </Providers>
                <Analytics/>
            </body>
        </html>
    );
}
