import Image from 'next/image';

type Props = {
  homeHref?: string;
  inquireHref?: string;
};

export function SiteHeader({ homeHref = '/#top', inquireHref = '/#contact' }: Props) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-primary/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href={homeHref} className="flex items-center" aria-label="Bootleggers Landing — home">
          <Image
            src="/images/Bootleggers-Landing-Logo.png"
            alt="Bootleggers Landing"
            width={140}
            height={84}
            priority
            className="h-12 w-auto brightness-0 invert"
          />
        </a>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] text-white/80 md:flex">
          <a href="/#stays" className="transition hover:text-accent">
            The Collection
          </a>
          <a href="/#about" className="transition hover:text-accent">
            About
          </a>
          <a href="/#faq" className="transition hover:text-accent">
            FAQ
          </a>
          <a
            href="https://luxuryanchorage.rentals"
            target="_blank"
            rel="noopener"
            className="transition hover:text-accent"
          >
            The Villa
          </a>
        </nav>
        <a
          href={inquireHref}
          className="rounded-md bg-accent px-4 py-2 text-xs font-medium uppercase tracking-wider text-accent-foreground transition hover:opacity-90"
        >
          Inquire
        </a>
      </div>
    </header>
  );
}
