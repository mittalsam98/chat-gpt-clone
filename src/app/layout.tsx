import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Inter } from 'next/font/google';
import RecoilContextProvider from './RecoilContextProvider';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'ChatGPT Clone',
  description: 'ChatGPT clone with simple design'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <RecoilContextProvider>{children}</RecoilContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
