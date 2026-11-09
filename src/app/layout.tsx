import type { Metadata, Viewport } from 'next';
import { CosmicProvider } from '@/context/CosmicContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'MYSTIC SPACE — Навигационная система твоей судьбы',
  description:
    'Эксклюзивное мистическое пространство: Натальная карта, Матрица Судьбы (22 Аркана), интерактивное Таро, синастрия и лунные ритмы.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative selection:bg-amber-400/30">
        <CosmicProvider>{children}</CosmicProvider>
      </body>
    </html>
  );
}

