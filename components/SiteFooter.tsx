import Image from 'next/image';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="scroll-mt-20 bg-primary px-6 pb-8 pt-16 text-center text-primary-foreground"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <Image
          src="/images/Bootleggers-Landing-Logo.png"
          alt="Bootleggers Landing"
          width={200}
          height={120}
          className="h-20 w-auto brightness-0 invert"
        />
        <p className="mt-6 text-sm opacity-80">
          <a href="mailto:experience@bootleggerslanding.com" className="hover:underline">
            experience@bootleggerslanding.com
          </a>{' '}
          ·{' '}
          <a href="tel:9072232344" className="hover:underline">
            (907) 223-2344
          </a>
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] opacity-60">
          Anchorage, Alaska · Bootleggers&rsquo; Cove
        </p>
        <p className="mt-8 max-w-xl text-sm opacity-70">
          Looking for our flagship? Visit{' '}
          <a
            href="https://luxuryanchorage.rentals"
            target="_blank"
            rel="noopener"
            className="font-medium text-white underline-offset-4 transition hover:text-accent hover:underline"
          >
            The Villa at Bootleggers Landing
          </a>{' '}
          at{' '}
          <a
            href="https://luxuryanchorage.rentals"
            target="_blank"
            rel="noopener"
            className="font-medium text-white underline-offset-4 transition hover:text-accent hover:underline"
          >
            luxuryanchorage.rentals
          </a>
          .
        </p>
        <div className="mt-10 w-full border-t border-white/15 pt-6 text-xs opacity-60">
          © {year} Bootleggers Landing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
