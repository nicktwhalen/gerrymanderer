import Logo from '@/components/Logo/Logo';
import { GameProvider } from '@/context/GameContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// global styles
import '@/styles/reset.css';
import '@/styles/vars.css';
import '@/styles/layout.css';
import '@/styles/typography.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body>
        <header>
          <Logo />
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
