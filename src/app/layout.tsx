import type { Metadata } from 'next';
import { GameProvider } from '@/context/GameContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';

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
        <header>
          <h1>
            <a href="/">
              <span className="the">The</span>
              <span className="gerrymanderer">Gerrymanderer</span>
            </a>
          </h1>
        </header>
        <main>
          <ErrorBoundary>
            <GameProvider>{children}</GameProvider>
          </ErrorBoundary>
        </main>
      </body>
    </html>
  );
}
