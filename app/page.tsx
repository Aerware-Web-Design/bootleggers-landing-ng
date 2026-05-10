import Image from 'next/image';
import { units } from '@/lib/units';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { UnitCard } from '@/components/UnitCard';

const HOMEPAGE_ORDER = ['denali-view-retreat', 'waterfront-hideaway', 'urban-gem'];

const orderedUnits = HOMEPAGE_ORDER.map(
  (slug) => units.find((u) => u.slug === slug)!,
);

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <AboutBuilding />
        <Stays />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
      <Image
        src="/images/Bootleggers-Exterior-Full-Building-View-1.jpg"
        alt="Bootleggers Landing — three luxury vacation homes on Anchorage's Cook Inlet"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/85" />
      <div className="absolute inset-0 bg-primary/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-32 pb-12 text-center text-white">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/80 animate-fade-in-up">
          Bootleggers Landing
        </p>
        <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight md:text-6xl animate-fade-in-up animation-delay-200">
          Three Luxury Stays. <br className="hidden md:block" /> One Coveted Cove.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/95 md:text-lg animate-fade-in-up animation-delay-400">
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
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">The Building</p>
        <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
          Where the city quiets and the inlet opens.
        </h2>
        <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-muted-foreground md:text-lg">
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

function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-secondary px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">FAQ</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            A few details, before you book.
          </h2>
        </div>
        <div className="mt-12 space-y-8">
          <FaqItem
            q="How is Bootleggers Landing different from a hotel?"
            a="Each home is private and fully self-contained — your own gourmet kitchen, your own living spaces, your own thermostat. No shared corridors, no front desk, no breakfast room. Just the entire property to yourself, in one of Anchorage's most desirable neighborhoods."
          />
          <FaqItem
            q="Where exactly are the homes?"
            a="All three sit on the same property in Bootleggers' Cove, on Anchorage's coastal edge. Each has its own address and its own private entrance."
          />
          <FaqItem
            q="Can I rent more than one at a time?"
            a={
              <>
                Yes. Larger groups frequently book multiple homes for family reunions, milestone
                celebrations, or corporate retreats. Our Waterfront Hideaway can also be added to
                a stay at the adjacent{' '}
                <a
                  href="https://luxuryanchorage.rentals"
                  target="_blank"
                  rel="noopener"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Villa at Bootleggers Landing
                </a>{' '}
                to accommodate up to fourteen guests in one connected experience. Contact us to
                coordinate.
              </>
            }
          />
          <FaqItem
            q="Looking for the Villa with the rooftop hot tub?"
            a={
              <>
                That&rsquo;s our flagship — The Villa at Bootleggers Landing, the 3,500 sq ft
                luxury home featured on CBS Evening News, sleeping up to 10 with a year-round
                rooftop hot tub, two fireplaces, and a 1,000 sq ft outdoor deck. Visit{' '}
                <a
                  href="https://luxuryanchorage.rentals"
                  target="_blank"
                  rel="noopener"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  luxuryanchorage.rentals
                </a>{' '}
                for details.
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-lg text-primary">{q}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</p>
    </div>
  );
}
