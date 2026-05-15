import Image from 'next/image';
import { units } from '@/lib/units';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { UnitCard } from '@/components/UnitCard';
import { InquiryForm } from '@/components/InquiryForm';
import { FAQ } from '@/components/FAQ';
import { SchemaMarkup } from '@/components/SchemaMarkup';

const HOMEPAGE_ORDER = ['denali-view-retreat', 'waterfront-hideaway', 'urban-gem'];

const orderedUnits = HOMEPAGE_ORDER.map(
  (slug) => units.find((u) => u.slug === slug)!,
);

export default function HomePage() {
  return (
    <>
      <SchemaMarkup includeFaq />
      <SiteHeader />
      <main id="top">
        <Hero />
        <AboutBuilding />
        <Stays />
        <ViewFromHere />
        <FAQ />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-[75vh] min-h-[560px] max-h-[820px] w-full overflow-hidden">
      <Image
        src="/images/Bootleggers-View-Outside-Sleeping-Lady-Sunset.jpg"
        alt="Orange sunset over Cook Inlet with the Sleeping Lady (Mt. Susitna) silhouetted on the horizon"
        fill
        priority
        className="object-cover"
      />
      {/* Slightly stronger overlay than the daylight panoramic needed — the
          sunset photo is darker and warmer, so a darker wash keeps white text
          legible without flattening the orange in the sky. */}
      <div className="absolute inset-0 bg-primary/30" />
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-32 pb-12 text-center text-white"
        style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}
      >
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/90 animate-fade-in-up">
          Bootleggers Landing
        </p>
        <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight md:text-6xl animate-fade-in-up animation-delay-200">
          Three Luxury Stays. <br className="hidden md:block" /> One Coveted Cove.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white md:text-lg animate-fade-in-up animation-delay-400">
          A curated collection of vacation homes in Anchorage&rsquo;s most coveted neighborhood —
          Bootleggers&rsquo; Cove. Each is privately appointed, walkable to downtown, and steps
          from the Tony Knowles Coastal Trail.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row animate-fade-in-up animation-delay-600">
          <a
            href="#stays"
            className="rounded-md bg-accent px-7 py-3 text-sm font-medium uppercase tracking-wider text-accent-foreground transition hover:opacity-90"
          >
            Explore the Stays
          </a>
          <a
            href="https://luxuryanchorage.rentals"
            target="_blank"
            rel="noopener"
            className="rounded-md border border-white/60 px-7 py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-white/10"
          >
            View the Villa
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutBuilding() {
  return (
    <section id="about" className="scroll-mt-20 bg-secondary px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">The Building</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            Where the city quiets and the inlet opens.
          </h2>
        </div>

        {/* 3-photo exterior block. Top row: aerial + ground-level at 50/50,
            each at aspect 4:3 so the buildings read at meaningful size. Below:
            the panoramic Cook Inlet shot displayed full width at its native
            ~3:1 aspect — "the view from the building." Each photo gets enough
            real estate to actually show its subject (no thin banner strips). */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-sm">
            <Image
              src="/images/Bootleggers-Exterior-Full-Building-View-1.jpg"
              alt="Aerial view of the Bootleggers Landing row of black townhomes with Cook Inlet behind"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-sm">
            <Image
              src="/images/Bootleggers_Exterior_Building.jpg"
              alt="Street-level view of the Bootleggers Landing townhomes on West 8th Avenue, with house numbers visible"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            Bootleggers&rsquo; Cove sits at the quiet edge of Anchorage, where the city softens
            into Cook Inlet and the Alaska Range fills the western horizon. Our building is
            fifteen minutes on foot from downtown dining, five from the Tony Knowles Coastal
            Trail — yet tucked into a residential pocket where summer trains roll past on their
            way to Seward and Whittier, and the only sound after dark is the wind off the water.
          </p>
          <p>
            Each home is fully self-contained and curated to a single standard: gourmet kitchens,
            considered furnishings, room-darkening shades, professional cleaning between every
            stay. Bootleggers Landing is looked after by a small, deeply local concierge team —
            the same group that supports the Villa next door — with decades of combined Alaska
            tourism experience. Private chefs, helicopter glacier tours, bear viewing, fishing
            charters, bespoke itineraries: tell us what you&rsquo;re imagining and we&rsquo;ll
            arrange it.
          </p>
          <p>
            Looking for our flagship?{' '}
            <a
              href="https://luxuryanchorage.rentals"
              target="_blank"
              rel="noopener"
              className="text-accent underline-offset-4 hover:underline"
            >
              The Villa at Bootleggers Landing
            </a>
            , our 3,500 sq ft luxury home featured on CBS Evening News, sleeps up to ten just
            next door.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stays() {
  return (
    <section id="stays" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">The Collection</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            Three distinct homes, one coveted cove.
          </h2>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {orderedUnits.map((unit) => (
            <UnitCard key={unit.slug} unit={unit} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ViewFromHere() {
  return (
    <section id="view" className="scroll-mt-20 bg-secondary px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">The View</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            The view from here.
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            From every home — Cook Inlet at every tide, the Sleeping Lady at every dawn, and the
            Northern Lights from late August through April.
          </p>
        </div>

        {/* Panoramic Cook Inlet on top, full-width statement; Mt. Spurr +
            Northern Lights side-by-side below. Room for a 4th photo later
            if Aspen adds one. */}
        <div className="relative mt-12 aspect-[5/2] overflow-hidden rounded-md shadow-sm">
          <Image
            src="/images/Bootleggers-Exterior-Full-Building-View-Cropped_Water.jpg"
            alt="Panoramic view of Cook Inlet and the Sleeping Lady (Mt. Susitna) from Bootleggers Landing"
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-sm">
            <Image
              src="/images/Bootleggers-View-Outside-Mt-Spurr.jpg"
              alt="Dramatic clouds and sunset over Mt. Spurr from Bootleggers Landing"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-sm">
            <Image
              src="/images/Bootleggers-View-Outside-Northern-Lights-2.jpg"
              alt="Aurora borealis over Bootleggers Landing, Anchorage"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">Inquire</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            Tell us about your stay.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Send your dates and a few details and we&rsquo;ll be in touch shortly. Not sure
            which home is the right fit? We&rsquo;ll help you decide.
          </p>
        </div>
        <div className="mt-12">
          <InquiryForm heading="" />
        </div>
      </div>
    </section>
  );
}

