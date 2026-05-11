'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export type FaqItem = {
  id: string;
  q: string;
  a: React.ReactNode;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'hotel-vs-rental',
    q: 'How is Bootleggers Landing different from a hotel?',
    a: "Each home is private and fully self-contained — your own gourmet kitchen, your own living spaces, your own thermostat. No shared corridors, no front desk, no breakfast room. Just the entire property to yourself, in one of Anchorage's most desirable neighborhoods.",
  },
  {
    id: 'location',
    q: 'Where exactly are the homes?',
    a: "All three sit on the same property in Bootleggers' Cove, on Anchorage's coastal edge. Each has its own address and its own private entrance.",
  },
  {
    id: 'multiple-units',
    q: 'Can I rent more than one at a time?',
    a: (
      <>
        Yes. Larger groups frequently book multiple homes for family reunions, milestone
        celebrations, or corporate retreats. Our Waterfront Hideaway can also be added to a stay
        at the adjacent{' '}
        <a
          href="https://luxuryanchorage.rentals"
          target="_blank"
          rel="noopener"
          className="text-accent underline-offset-4 hover:underline"
        >
          Villa at Bootleggers Landing
        </a>{' '}
        to accommodate up to fourteen guests in one connected experience. Contact us to coordinate.
      </>
    ),
  },
  {
    id: 'parking',
    q: "What's parking like?",
    a: 'Free street parking is available directly outside each home. Denali View Retreat and Urban Gem also have on-site parking spots. Anchorage parking enforcement is minimal in this neighborhood.',
  },
  {
    id: 'northern-lights',
    q: 'When can I see the Northern Lights?',
    a: "Aurora viewing in Anchorage runs from late August through April. Our location in Bootleggers' Cove offers minimal light pollution and unobstructed northern views — guests have spotted the lights from the Waterfront Hideaway's private patio and from the upper floors of Denali View Retreat.",
  },
  {
    id: 'pets',
    q: 'Are pets allowed?',
    a: 'Pets are not currently permitted at any Bootleggers Landing home. We work hard to maintain hypoallergenic interiors for the comfort of all guests.',
  },
  {
    id: 'check-in',
    q: 'How do I check in?',
    a: "All three homes offer keypad self-check-in. Check-in is at 4:00 PM and checkout is at 11:00 AM. If you need flexibility, we'll accommodate when we can — just ask when you book.",
  },
  {
    id: 'villa',
    q: 'Looking for the Villa with the rooftop hot tub?',
    a: (
      <>
        That&rsquo;s our flagship —{' '}
        <a
          href="https://luxuryanchorage.rentals"
          target="_blank"
          rel="noopener"
          className="text-accent underline-offset-4 hover:underline"
        >
          The Villa at Bootleggers Landing
        </a>
        , the 3,500 sq ft luxury home featured on CBS Evening News, sleeping up to 10 with a
        year-round rooftop hot tub, two fireplaces, and a 1,000 sq ft outdoor deck. Visit{' '}
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
    ),
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-secondary px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">FAQ</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            A few details, before you book.
          </h2>
        </div>
        <Accordion.Root
          type="single"
          collapsible
          className="mt-12 divide-y divide-border border-y border-border"
        >
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-lg text-primary transition hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <span>{item.q}</span>
                  <ChevronDown
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-5 pr-9 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
