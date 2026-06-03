import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import { ServiceWorkerRegister } from '../components/Base/ServiceWorkerRegister';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'My Chat App',
    },

    other: {
        'apple-mobile-web-app-capable': 'yes',
        'mobile-web-app-capable': 'yes',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <nav className="relative bg-gray-800/50 my-2">
                    <h3 className="p-2">AI chat</h3>
                </nav>
                <div id="root">
                    <Providers>{children}</Providers>
                    <ServiceWorkerRegister />
                </div>
            </body>
        </html>
    );
}