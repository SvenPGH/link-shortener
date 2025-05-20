import type { Metadata } from 'next';
import { Jura } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import {ThemeProvider} from "@/app/contexts/ThemeContext";
import {AuthProvider} from "@/app/contexts/AuthContext";

const jura = Jura({subsets: ['latin'], display: 'swap', variable: '--font-jura', weight: ['300', '400', '500', '600', '700']});
export const metadata: Metadata = {
  title: "svp.gl",
  description: "'Link Shortener Service' - Sven Puite Go Link (svp.gl)",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" role={"main"}>
            <body className={`${jura.variable} antialiased`}>
                <AuthProvider>
                    <ThemeProvider>
                        <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen bg-white dark:bg-black text-black dark:text-white font-[family-name:var(--font-jura)] transition-colors duration-500 ease-in-out">
                            <Header/>
                            <main className="grid place-items-center gap-8 row-start-2 w-full max-w-4xl mx-auto px-4 pt-20 sm:pt-24">
                                {children}
                            </main>
                            <Footer/>
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
