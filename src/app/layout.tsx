'use client';
import Logo from '@/components/Logo/Logo';
import { GameProvider } from '@/context/GameContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { usePathname } from 'next/navigation';

// global styles
import '@/styles/vars.css';
import '@/styles/layout.css';
import '@/styles/typography.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={slug}>
        <header>
          <Logo home={pathname === '/'} />
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
