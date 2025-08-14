import type { Metadata } from 'next';
import './globals.css';
// import '../styles/comic.css';
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
      <body>
        <ErrorBoundary>
          <GameProvider>{children}</GameProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
