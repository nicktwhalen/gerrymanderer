import type { Metadata } from 'next';
import './globals.css';
import { GameProvider } from '@/context/GameContext';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'The Gerrymanderer',
  description: 'A game that teaches and plays with the concept of gerrymandering.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <ErrorBoundary>
          <GameProvider>{children}</GameProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
