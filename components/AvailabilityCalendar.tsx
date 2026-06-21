'use client';

import type { CSSProperties } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { toLocalDate } from '@/lib/availability-dates';

const RDP_STYLE = {
  '--rdp-accent-color': '#b8924c',
  '--rdp-today-color': '#b8924c',
} as CSSProperties;

/**
 * Combined per-unit "Book {unit}" section: a read-only availability calendar
 * (booked nights struck/greyed, past dates disabled) plus the single Book CTA.
 * Falls back to just the CTA if the unit's feed could not be loaded.
 */
export function AvailabilityCalendar({
  unitName,
  busyDates,
  bookHref,
  bookLabel,
  ok,
}: {
  unitName: string;
  busyDates: string[];
  bookHref: string;
  bookLabel: string;
  ok: boolean;
}) {
  const today = new Date();
  const booked = busyDates.map(toLocalDate);

  return (
    <section id="contact" className="scroll-mt-20 bg-primary px-6 py-20 text-primary-foreground">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">Reserve</p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">Book {unitName}.</h2>

        {ok ? (
          <p className="mt-4 text-base leading-relaxed opacity-85 md:text-lg">
            Greyed dates are already booked. Pick your window and reserve instantly on Airbnb.
          </p>
        ) : (
          <p className="mt-4 text-base leading-relaxed opacity-85 md:text-lg">
            Check current availability and reserve your dates directly on Airbnb.
          </p>
        )}

        <div className="mt-8 flex flex-col items-center">
          {ok && (
            <>
              <div className="rounded-lg border border-border bg-card p-4 text-foreground shadow-sm">
                <DayPicker
                  disabled={{ before: today }}
                  modifiers={{ booked }}
                  modifiersClassNames={{ booked: 'rdp-booked' }}
                  numberOfMonths={1}
                  style={RDP_STYLE}
                />
              </div>
              <p className="mt-4 flex items-center gap-5 text-xs opacity-80">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm border border-white/40 bg-transparent" /> Available
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-white/30" /> Booked
                </span>
              </p>
            </>
          )}
          <a
            href={bookHref}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-block rounded-md bg-accent px-8 py-3 text-sm font-medium uppercase tracking-wider text-accent-foreground transition hover:opacity-90"
          >
            {bookLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
