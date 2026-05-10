import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bootleggerslanding.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bootleggers Landing — Three Luxury Residences in Anchorage',
    template: '%s · Bootleggers Landing',
  },
  description:
    "A curated collection of three luxury vacation rentals in Anchorage's Bootleggers' Cove — walkable to downtown, steps from the Coastal Trail, with views of Cook Inlet and Denali.",
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Bootleggers Landing',
    title: 'Bootleggers Landing — Three Luxury Residences in Anchorage',
    description:
      "A curated collection of three luxury vacation rentals in Anchorage's Bootleggers' Cove.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
