import { GameProvider } from '@/context/GameContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';

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
