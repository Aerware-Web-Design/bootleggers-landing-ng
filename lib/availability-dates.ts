/**
 * Pure date/availability helpers and shared types.
 *
 * This module is intentionally free of any server-only code (no process.env, no
 * fetch) so it can be imported by BOTH server and client components. All dates
 * are plain 'YYYY-MM-DD' strings; JS Date objects only appear at the UI edge.
 */

import { addDay } from '@/lib/ical';

export type PropertyAvailability = {
  id: string;
  name: string;
  /** Merged busy nights across all of this property's feeds, sorted ascending. */
  busyDates: string[];
  bookHref: string;
  bookLabel: string;
  /** false if every feed for this property failed to load (availability unknown). */
  ok: boolean;
};

export type FreeSpan = { checkIn: string; checkOut: string };

/** Convert a 'YYYY-MM-DD' key into a local Date at noon (avoids DST midnight rollover). */
export function toLocalDate(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

/** Convert a local Date (e.g. from react-day-picker) into a 'YYYY-MM-DD' key. */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Enumerate the nights in [checkIn, checkOut) as 'YYYY-MM-DD' (checkout day excluded). */
export function eachNight(checkIn: string, checkOut: string): string[] {
  const nights: string[] = [];
  let cursor = checkIn;
  let guard = 0;
  while (cursor < checkOut && guard < 3660) {
    nights.push(cursor);
    cursor = addDay(cursor);
    guard++;
  }
  return nights;
}

/** A property is available for [checkIn, checkOut) iff none of its nights are busy. */
export function isRangeAvailable(busy: Set<string>, checkIn: string, checkOut: string): boolean {
  if (checkOut <= checkIn) return false;
  return eachNight(checkIn, checkOut).every((d) => !busy.has(d));
}

/**
 * Collapse the free nights within [windowStart, windowOut) into bookable
 * check-in → checkout spans. A span's checkout is the morning after its last
 * free night, so same-day turnover reads naturally.
 */
export function freeSpans(busy: Set<string>, windowStart: string, windowOut: string): FreeSpan[] {
  const spans: FreeSpan[] = [];
  let spanStart: string | null = null;
  let prev: string | null = null;

  for (const night of eachNight(windowStart, windowOut)) {
    if (busy.has(night)) {
      if (spanStart && prev) spans.push({ checkIn: spanStart, checkOut: addDay(prev) });
      spanStart = null;
      prev = null;
    } else {
      if (!spanStart) spanStart = night;
      prev = night;
    }
  }
  if (spanStart && prev) spans.push({ checkIn: spanStart, checkOut: addDay(prev) });
  return spans;
}
