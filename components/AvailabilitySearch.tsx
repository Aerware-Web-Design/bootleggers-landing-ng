'use client';

import { type CSSProperties, useMemo, useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import {
  type PropertyAvailability,
  freeSpans,
  isRangeAvailable,
  toDateKey,
  toLocalDate,
} from '@/lib/availability-dates';

const RDP_STYLE = {
  '--rdp-accent-color': '#b8924c',
  '--rdp-accent-background-color': '#f3ead9',
  '--rdp-today-color': '#b8924c',
} as CSSProperties;

function fmtKey(key: string): string {
  return toLocalDate(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

type Resolved = { property: PropertyAvailability; set: Set<string> };

export function AvailabilitySearch({ properties }: { properties: PropertyAvailability[] }) {
  const [range, setRange] = useState<DateRange | undefined>();
  const today = new Date();

  // Build each property's busy-set once; filtering is then instant in-browser.
  const resolved: Resolved[] = useMemo(
    () => properties.map((p) => ({ property: p, set: new Set(p.busyDates) })),
    [properties],
  );

  const checkIn = range?.from ? toDateKey(range.from) : null;
  const checkOut = range?.to ? toDateKey(range.to) : null;
  const hasRange = Boolean(checkIn && checkOut && checkOut! > checkIn!);

  return (
    <div className="mt-12 grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
      <div className="mx-auto rounded-lg border border-border bg-card p-4 shadow-sm">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          disabled={{ before: today }}
          numberOfMonths={1}
          style={RDP_STYLE}
        />
        {checkIn && checkOut && (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {fmtKey(checkIn)} &rarr; {fmtKey(checkOut)}
            <button
              type="button"
              onClick={() => setRange(undefined)}
              className="ml-3 text-accent underline-offset-4 hover:underline"
            >
              Clear
            </button>
          </p>
        )}
      </div>

      <div>
        {!hasRange ? (
          <p className="text-base text-muted-foreground">
            Select your check-in and check-out dates to see which homes are open for your stay.
          </p>
        ) : (
          <ul className="space-y-4">
            {resolved.map(({ property, set }) => (
              <ResultRow
                key={property.id}
                property={property}
                set={set}
                checkIn={checkIn!}
                checkOut={checkOut!}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ResultRow({
  property,
  set,
  checkIn,
  checkOut,
}: {
  property: PropertyAvailability;
  set: Set<string>;
  checkIn: string;
  checkOut: string;
}) {
  const errored = !property.ok;
  const available = !errored && isRangeAvailable(set, checkIn, checkOut);
  const spans = errored ? [] : freeSpans(set, checkIn, checkOut);

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-serif text-lg text-primary">{property.name}</p>
        {errored ? (
          <p className="mt-1 text-sm text-muted-foreground">Couldn&rsquo;t load live availability.</p>
        ) : available ? (
          <p className="mt-1 text-sm font-medium text-emerald-700">Available for your dates.</p>
        ) : spans.length > 0 ? (
          <p className="mt-1 text-sm text-muted-foreground">
            Open{' '}
            {spans.map((s) => `${fmtKey(s.checkIn)}–${fmtKey(s.checkOut)}`).join(' and ')}
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">Not available for these dates.</p>
        )}
      </div>
      <a
        href={property.bookHref}
        target="_blank"
        rel="noopener"
        className="shrink-0 self-start rounded-md bg-accent px-5 py-2.5 text-center text-sm font-medium uppercase tracking-wider text-accent-foreground transition hover:opacity-90 sm:self-auto"
      >
        {property.bookLabel}
      </a>
    </li>
  );
}
