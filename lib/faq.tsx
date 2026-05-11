import type { ReactNode } from 'react';

export type FaqItem = {
  id: string;
  q: string;
  // Rendered answer (may include links). If omitted, `text` is used as-is.
  a?: ReactNode;
  // Plain-text answer — used for FAQPage JSON-LD. Always present.
  text: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'hotel-vs-rental',
    q: 'How is Bootleggers Landing different from a hotel?',
    text: "Each home is private and fully self-contained — your own gourmet kitchen, your own living spaces, your own thermostat. No shared corridors, no front desk, no breakfast room. Just the entire property to yourself, in one of Anchorage's most desirable neighborhoods.",
  },
  {
    id: 'location',
    q: 'Where exactly are the homes?',
    text: "All three sit on the same property in Bootleggers' Cove, on Anchorage's coastal edge. Each has its own address and its own private entrance.",
  },
  {
    id: 'multiple-units',
    q: 'Can I rent more than one at a time?',
    text: 'Yes. Larger groups frequently book multiple homes for family reunions, milestone celebrations, or corporate retreats. Our Waterfront Hideaway can also be added to a stay at the adjacent Villa at Bootleggers Landing (luxuryanchorage.rentals) to accommodate up to fourteen guests in one connected experience. Contact us to coordinate.',
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
    text: 'Free street parking is available directly outside each home. Denali View Retreat and Urban Gem also have on-site parking spots.',
  },
  {
    id: 'northern-lights',
    q: 'When can I see the Northern Lights?',
    text: "Aurora viewing in Anchorage runs from late August through April. Our location in Bootleggers' Cove offers minimal light pollution and unobstructed northern views — guests have spotted the lights from the Waterfront Hideaway's private patio and from the upper floors of Denali View Retreat.",
  },
  {
    id: 'pets',
    q: 'Are pets allowed?',
    text: 'Pets are not currently permitted at any Bootleggers Landing home. We work hard to maintain hypoallergenic interiors for the comfort of all guests.',
  },
  {
    id: 'check-in',
    q: 'How do I check in?',
    text: "All three homes offer keypad self-check-in. Check-in is at 4:00 PM and checkout is at 11:00 AM. If you need flexibility, we'll accommodate when we can — just ask when you book.",
  },
  {
    id: 'villa',
    q: 'Looking for the Villa with the rooftop hot tub?',
    text: "That's our flagship — The Villa at Bootleggers Landing (luxuryanchorage.rentals), the 3,500 sq ft luxury home featured on CBS Evening News, sleeping up to 10 with a year-round rooftop hot tub, two fireplaces, and a 1,000 sq ft outdoor deck. Visit luxuryanchorage.rentals for details.",
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
