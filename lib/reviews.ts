/**
 * Guest reviews + per-unit aggregate ratings.
 *
 * Two separate things live here:
 *
 *  1. UNIT_RATINGS — the aggregate star rating + review count + badges shown on
 *     each listing. These are REAL numbers pulled from the approved content
 *     source (sibling-content.md / Airbnb). Update them when the listings move.
 *
 *  2. GUEST_REVIEWS — the individual testimonial quotes rendered by
 *     <Reviews />. This array is intentionally EMPTY: these are the "slots".
 *     Drop real guest quotes in here (see the template below) and they appear
 *     automatically on the site + in JSON-LD. NEVER invent a review.
 *
 * IMPORTANT: aggregateRating JSON-LD is only emitted for a unit once at least
 * one visible GUEST_REVIEW exists for it (see SchemaMarkup). That keeps the
 * structured data backed by on-page reviews and avoids review-snippet spam.
 */

export type UnitRating = {
  /** Average star rating out of 5, e.g. 4.85. */
  rating: number;
  /** Total number of reviews behind the average. */
  reviewCount: number;
  /** Listing badges to surface, e.g. "Guest Favorite". */
  badges?: string[];
};

export type GuestReview = {
  /** Stable id for React keys + schema. */
  id: string;
  /** The review text, verbatim from the guest. Keep it real — never invent. */
  quote: string;
  /** Guest's display name, e.g. "Sarah" or "Sarah M.". */
  author: string;
  /** Optional: where they traveled from, e.g. "Seattle, WA". */
  location?: string;
  /** Optional ISO date ("2026-03" or "2026-03-14"); feeds schema datePublished. */
  date?: string;
  /** Optional individual rating 1–5; defaults to 5 in schema when omitted. */
  rating?: number;
  /** Which unit the review is for (a units.ts slug). Omit for collection-wide. */
  unitSlug?: string;
};

/**
 * Real aggregate ratings, keyed by unit slug. Source: the live Airbnb listings.
 */
export const UNIT_RATINGS: Record<string, UnitRating> = {
  'urban-gem': {
    rating: 4.9,
    reviewCount: 10,
    badges: ['Guest Favorite'],
  },
  'denali-view-retreat': {
    rating: 5.0,
    reviewCount: 16,
    badges: ['Guest Favorite'],
  },
  'waterfront-hideaway': {
    rating: 4.85,
    reviewCount: 329,
    badges: ['Guest Favorite', 'Top 10% of Anchorage homes'],
  },
};

/**
 * Guest testimonial slots. EMPTY by design — fill with real quotes.
 *
 * Template (copy, uncomment, replace with a real review):
 *
 *   {
 *     id: 'waterfront-2026-03-sarah',
 *     quote: 'The view at sunrise was unreal — we never wanted to leave.',
 *     author: 'Sarah M.',
 *     location: 'Seattle, WA',
 *     date: '2026-03',
 *     rating: 5,
 *     unitSlug: 'waterfront-hideaway',
 *   },
 */
export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'denali-2026-06-jacob',
    quote:
      "Sky's home was great! Awesome location with great views. The train tracks are nearby but you don't hear the train at all … Very walkable to downtown and also to nearby paths. Cleanliness is important to me and the home was very clean. Having garage access was not a major point in selecting the place but it was extremely helpful!",
    author: 'Jacob',
    location: 'Washington, DC',
    date: '2026-06',
    rating: 5,
    unitSlug: 'denali-view-retreat',
  },
  {
    id: 'denali-2026-06-grada',
    quote:
      'We loved our stay! Fabulous location and gorgeous views. Walkable to great restaurants and Sky provided wonderful recommendations. This is a very clean and comfortable townhome in a quiet and private location, and in a great neighborhood. Loved the kitchen with a spacious island … Breathtaking views in the primary bedroom and living room. I highly recommend a stay here.',
    author: 'Grada',
    location: 'Tucson, AZ',
    date: '2026-06',
    rating: 5,
    unitSlug: 'denali-view-retreat',
  },
  {
    id: 'waterfront-2026-06-sonia',
    quote:
      "Sky's place was very modern, clean, comfortable and in a great location. We loved seeing the train go by just outside the patio door. The yard was well groomed and a bonus bench to sit on the grassy knoll to take in the view. I would recommend this place to everyone and will definitely be coming back.",
    author: 'Sonia',
    date: '2026-06',
    rating: 5,
    unitSlug: 'waterfront-hideaway',
  },
  {
    id: 'waterfront-2026-05-sara',
    quote:
      'The place was quiet, comfortable and very clean. It was exactly what we needed for a getaway. I loved the area and the view of Sleeping Lady Mountain from the outdoor patio.',
    author: 'Sara',
    date: '2026-05',
    rating: 5,
    unitSlug: 'waterfront-hideaway',
  },
  {
    id: 'waterfront-2026-05-tikki',
    quote:
      "Best rental in Anchorage! The place is cozy and spacious at the same time, beautiful views, easy to walk to downtown Anchorage. It was great, I'd stay here again if (when) I come back!",
    author: 'Tikki',
    location: 'Minneapolis, MN',
    date: '2026-05',
    rating: 5,
    unitSlug: 'waterfront-hideaway',
  },
  {
    id: 'urban-gem-2026-06-marge',
    quote:
      "We were so happy to stay at this apartment. We had a last-minute change of plans and needed a room for just one night and I really wish we could've stayed longer. The kitchen was well appointed and spacious. The beds were so comfortable and the linens were top notch. The view of the water was wonderful.",
    author: 'Marge',
    location: 'Chicago, IL',
    date: '2026-06',
    rating: 5,
    unitSlug: 'urban-gem',
  },
];

/** Aggregate rating for a unit, or undefined if it has none. */
export function ratingForSlug(slug: string): UnitRating | undefined {
  return UNIT_RATINGS[slug];
}

/** Visible guest reviews for a unit (by slug). */
export function reviewsForSlug(slug: string): GuestReview[] {
  return GUEST_REVIEWS.filter((r) => r.unitSlug === slug);
}

/**
 * Reviews to show on the collection homepage: everything not tied to a single
 * unit, plus any explicitly flagged collection-wide (unitSlug undefined).
 * Today this returns all reviews; swap the predicate if you later want to hold
 * some back from the homepage.
 */
export function collectionReviews(): GuestReview[] {
  return GUEST_REVIEWS;
}
