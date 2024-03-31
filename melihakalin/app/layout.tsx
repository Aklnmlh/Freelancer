import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/Providers/SessionProvider';
import ReactQueryProvider from '@/Providers/ReactQueryProvider';
import { Toaster } from 'sonner';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Freelance Platform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <Toaster duration={2000} />
            {children}
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
