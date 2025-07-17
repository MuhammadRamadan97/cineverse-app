// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import StoreProvider from './StoreProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CineVerse',
  description: 'A modern movie discovery web app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Toaster
            position='bottom-center'
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}