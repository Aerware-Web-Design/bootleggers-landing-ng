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
 * Real aggregate ratings, keyed by unit slug. Source: sibling-content.md.
 * Urban Gem is the newest listing and has no reviews yet, so it is omitted.
 */
export const UNIT_RATINGS: Record<string, UnitRating> = {
  'denali-view-retreat': {
    rating: 5.0,
    reviewCount: 14,
    badges: ['Guest Favorite'],
  },
  'waterfront-hideaway': {
    rating: 4.85,
    reviewCount: 317,
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
export const GUEST_REVIEWS: GuestReview[] = [];

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
