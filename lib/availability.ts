/**
 * Server-only availability layer.
 *
 * Reads the per-property iCal feed URLs from server-only env vars (the repo is
 * public, so feed URLs — which carry secret tokens — must NEVER be NEXT_PUBLIC_
 * or reach the client). Fetches + parses + merges each property's feeds, cached
 * hourly via Next's fetch data cache, and returns plain busy-date arrays. Only
 * this resolved data (never a feed URL) is passed to client components.
 *
 * Import this ONLY from server components. Pure date helpers + shared types live
 * in ./availability-dates so client components can use them safely.
 */

import { getUnitBySlug } from '@/lib/units';
import { parseBusyDates } from '@/lib/ical';
import type { PropertyAvailability } from '@/lib/availability-dates';

export type { PropertyAvailability } from '@/lib/availability-dates';

type AvailabilityPropertyConfig = {
  id: string;
  name: string;
  /** Env var names (NOT URLs) holding this property's iCal feeds. Multiple = merged. */
  feedEnvKeys: string[];
  bookHref: string;
  bookLabel: string;
};

const VILLA_BOOK_URL = 'https://luxuryanchorage.rentals';
const REVALIDATE_SECONDS = 3600;
const FEED_TIMEOUT_MS = 8000;

function unitBookHref(slug: string): string {
  return getUnitBySlug(slug)?.airbnbUrl ?? '#';
}

/**
 * The four searchable properties. Airbnb-only feeds for the three units (config
 * supports adding VRBO keys later with no code change); the Villa uses its public
 * Google Calendar feed and books via the villa marketing site.
 */
const AVAILABILITY_PROPERTIES: AvailabilityPropertyConfig[] = [
  {
    id: 'urban-gem',
    name: 'Urban Gem',
    feedEnvKeys: ['ICAL_URBAN_GEM_AIRBNB'],
    bookHref: unitBookHref('urban-gem'),
    bookLabel: 'Book on Airbnb',
  },
  {
    id: 'denali-view-retreat',
    name: 'Denali View Retreat',
    feedEnvKeys: ['ICAL_DENALI_AIRBNB'],
    bookHref: unitBookHref('denali-view-retreat'),
    bookLabel: 'Book on Airbnb',
  },
  {
    id: 'waterfront-hideaway',
    name: 'Waterfront Hideaway',
    feedEnvKeys: ['ICAL_WATERFRONT_AIRBNB'],
    bookHref: unitBookHref('waterfront-hideaway'),
    bookLabel: 'Book on Airbnb',
  },
  {
    id: 'villa',
    name: 'The Villa at Bootleggers Landing',
    feedEnvKeys: ['ICAL_VILLA_GCAL'],
    bookHref: VILLA_BOOK_URL,
    bookLabel: 'Inquire',
  },
];

/** Fetch + parse one feed. Returns null on any failure (never throws). */
async function fetchFeed(url: string): Promise<Set<string> | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return parseBusyDates(await res.text());
  } catch {
    return null;
  }
}

async function resolveProperty(
  config: AvailabilityPropertyConfig,
): Promise<PropertyAvailability> {
  const base = {
    id: config.id,
    name: config.name,
    bookHref: config.bookHref,
    bookLabel: config.bookLabel,
  };

  const urls = config.feedEnvKeys
    .map((key) => process.env[key])
    .filter((v): v is string => Boolean(v && v.trim()));

  // No feed configured yet => availability unknown (ok:false), never assumed open.
  if (urls.length === 0) return { ...base, busyDates: [], ok: false };

  const results = await Promise.all(urls.map(fetchFeed));
  const ok = results.some((r) => r !== null);
  const merged = new Set<string>();
  for (const set of results) {
    if (set) for (const d of set) merged.add(d);
  }

  return { ...base, busyDates: [...merged].sort(), ok };
}

/**
 * Resolve availability for all four properties. Each feed is independently
 * try/caught, so this never rejects — a bad feed degrades that one property.
 */
export async function getAvailability(): Promise<PropertyAvailability[]> {
  return Promise.all(AVAILABILITY_PROPERTIES.map(resolveProperty));
}
