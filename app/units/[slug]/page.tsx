import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { units, getUnitBySlug, formatRateRange, type Unit } from '@/lib/units';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PhotoGallery } from '@/components/PhotoGallery';
import { InquiryForm } from '@/components/InquiryForm';
import { SchemaMarkup } from '@/components/SchemaMarkup';

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return units.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) return {};
  return {
    title: unit.name,
    description: unit.shortDescription,
    openGraph: {
      title: `${unit.name} · Bootleggers Landing`,
      description: unit.shortDescription,
      images: [{ url: unit.heroPhoto }],
    },
  };
}

export default async function UnitDetailPage(
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) notFound();

  return (
    <>
      <SchemaMarkup featuredSlug={unit.slug} />
      <SiteHeader inquireHref="#contact" />
      <main id="top">
        <UnitHero unit={unit} />
        <UnitOverview unit={unit} />
        <UnitNarrative unit={unit} />
        <UnitGallery unit={unit} />
        <UnitAmenities unit={unit} />
        <UnitInquireBlock unit={unit} />
        <OtherHomes currentSlug={unit.slug} />
      </main>
      <SiteFooter />
    </>
  );
}

function UnitHero({ unit }: { unit: Unit }) {
  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src={unit.heroPhoto}
        alt={unit.photos[0]?.alt ?? unit.name}
        fill
        priority
        className="object-cover"
      />
      {/* Light flat wash + stronger text-shadow keeps the photo legible
          without darkening it. The smaller kicker and italic tagline get the
          most help from the shadow — the H1 reads fine on its own. */}
      <div className="absolute inset-0 bg-primary/35" />
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-32 pb-12 text-center text-white"
        style={{ textShadow: '0 2px 18px rgba(0,0,0,0.75), 0 1px 4px rgba(0,0,0,0.45)' }}
      >
        {unit.pairableWithVilla && (
          <span
            className="mb-6 rounded-sm bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground animate-fade-in-up"
            style={{ textShadow: 'none' }}
          >
            Pairs with the Villa
          </span>
        )}
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white animate-fade-in-up">
          The Collection
        </p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl animate-fade-in-up animation-delay-200">
          {unit.name}
        </h1>
        <p className="mt-5 max-w-2xl text-base italic text-white md:text-lg animate-fade-in-up animation-delay-400">
          {unit.heroTagline}
        </p>
      </div>
    </section>
  );
}

function UnitOverview({ unit }: { unit: Unit }) {
  return (
    <section className="border-b border-border bg-background px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 text-center md:grid-cols-5">
        <Stat label="Bedrooms" value={`${unit.bedrooms}`} />
        <Stat label="Bathrooms" value={`${unit.bathrooms}`} />
        <Stat label="Sleeps" value={`Up to ${unit.maxOccupancy}`} />
        <Stat label="Square feet" value={`~${unit.sqFt.toLocaleString()}`} />
        <Stat label="Nightly" value={formatRateRange(unit)} highlight />
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
      <dd
        className={
          highlight
            ? 'mt-2 font-serif text-lg text-accent md:text-xl'
            : 'mt-2 font-serif text-lg text-primary md:text-xl'
        }
      >
        {value}
      </dd>
    </div>
  );
}

const VILLA_PHRASE = 'The Villa at Bootleggers Landing';

function linkifyVilla(text: string): React.ReactNode {
  if (!text.includes(VILLA_PHRASE)) return text;
  const parts = text.split(VILLA_PHRASE);
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a
            key={i}
            href="https://luxuryanchorage.rentals"
            target="_blank"
            rel="noopener"
            className="text-accent underline-offset-4 hover:underline"
          >
            {VILLA_PHRASE}
          </a>,
          part,
        ],
  );
}

function UnitNarrative({ unit }: { unit: Unit }) {
  const paragraphs = unit.longDescription.split('\n\n').filter(Boolean);
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
          About {unit.name}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-primary md:text-4xl">{unit.heroTagline}</h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{linkifyVilla(p)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function UnitGallery({ unit }: { unit: Unit }) {
  return (
    <section className="bg-secondary px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-accent">
          The Space
        </p>
        <h2 className="mt-3 text-center font-serif text-3xl text-primary md:text-4xl">
          A closer look.
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Click any photo to open the full gallery. Use the arrow keys or click anywhere
          outside the image to close.
        </p>
        <div className="mt-10">
          <PhotoGallery photos={unit.photos} />
        </div>
      </div>
    </section>
  );
}

function UnitAmenities({ unit }: { unit: Unit }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-accent">
          Amenities
        </p>
        <h2 className="mt-3 text-center font-serif text-3xl text-primary md:text-4xl">
          What&rsquo;s in the home.
        </h2>
        {/* Multi-column layout (not grid) — items flow top-down within each
            column and the browser balances height automatically, so 2-line
            bullets sit next to other 2-line bullets and short bullets pair
            with short. break-inside-avoid keeps each bullet whole. */}
        <ul className="mt-10 text-base text-muted-foreground sm:columns-2 sm:gap-x-10">
          {unit.amenities.map((amenity) => (
            <li
              key={amenity}
              className="mb-3 flex break-inside-avoid items-start gap-3"
            >
              <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{amenity}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function UnitInquireBlock({ unit }: { unit: Unit }) {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-primary px-6 py-20 text-primary-foreground"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">Reserve</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Inquire about {unit.name}.
          </h2>
          <p className="mt-4 text-base leading-relaxed opacity-85 md:text-lg">
            Send your dates and we&rsquo;ll be in touch shortly. Prefer to talk it through?
            Call{' '}
            <a href="tel:9072232344" className="text-accent underline-offset-4 hover:underline">
              (907) 223-2344
            </a>
            .
          </p>
        </div>
        <div className="mt-10">
          <InquiryForm defaultUnit={unit.slug} heading="" variant="dark" />
        </div>
        <p className="mt-8 text-center text-sm opacity-80">
          Or book directly on{' '}
          <a
            href={unit.airbnbUrl}
            target="_blank"
            rel="noopener"
            className="text-accent underline-offset-4 hover:underline"
          >
            Airbnb
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function OtherHomes({ currentSlug }: { currentSlug: string }) {
  const others = units.filter((u) => u.slug !== currentSlug);
  return (
    <section className="bg-secondary px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-accent">
          The Collection
        </p>
        <h2 className="mt-3 text-center font-serif text-3xl text-primary md:text-4xl">
          Other homes at Bootleggers Landing.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {others.map((unit) => (
            <Link
              key={unit.slug}
              href={`/units/${unit.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={unit.heroPhoto}
                  alt={unit.photos[0]?.alt ?? unit.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-primary">{unit.name}</h3>
                <p className="mt-2 text-sm italic text-muted-foreground">{unit.heroTagline}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-accent">
                  View details →
                </p>
              </div>
            </Link>
          ))}
          <a
            href="https://luxuryanchorage.rentals"
            target="_blank"
            rel="noopener"
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/Villa-Exterior-Aerial-View-Hero.jpg"
                alt="The Villa at Bootleggers Landing — aerial view of the 3,500 sq ft luxury home"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-sm bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground">
                The Flagship
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl text-primary">The Villa at Bootleggers Landing</h3>
              <p className="mt-2 text-sm italic text-muted-foreground">
                3,500 sq ft · Sleeps 10 · Rooftop hot tub · Featured on CBS Evening News.
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-accent">
                Visit the Villa site →
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
