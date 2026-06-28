import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import Script from 'next/script';
import './globals.css';

// GA4 for THIS site only — a separate property from the villa (no cross-domain
// link to G-J2V0ZJC643). Set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel env +
// .env.local; until then GA renders nothing.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bootleggerslanding.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bootleggers Landing — Three Luxury Stays in Anchorage',
    template: '%s · Bootleggers Landing',
  },
  description:
    "A curated collection of three luxury vacation rentals in Anchorage's Bootleggers' Cove — walkable to downtown, steps from the Coastal Trail, with views of Cook Inlet and Denali.",
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Bootleggers Landing',
    title: 'Bootleggers Landing — Three Luxury Stays in Anchorage',
    description:
      "A curated collection of three luxury vacation rentals in Anchorage's Bootleggers' Cove.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // Search Console site verification (this site's own property). Optional —
  // set GOOGLE_SITE_VERIFICATION to the token from the GSC "HTML tag" method,
  // or just verify via the Google Analytics method once GA4 is live.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors closeButton />
        <Analytics />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
