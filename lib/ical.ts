/**
 * Minimal iCal (RFC 5545) parser for all-day VEVENT availability blocks.
 *
 * Booking platforms (Airbnb, VRBO, Google/Vacasa) export availability as simple
 * all-day events: DTSTART;VALUE=DATE and DTEND;VALUE=DATE, where DTEND is
 * EXCLUSIVE — the checkout day is NOT a booked night. There is no RRULE, no
 * timed events, no recurrence. We deliberately avoid a heavyweight dependency
 * and keep all date math in UTC string space to dodge timezone off-by-one bugs.
 */

const DATE_RE = /^(\d{4})(\d{2})(\d{2})$/;
const MAX_SPAN_DAYS = 3660; // ~10yr guard against malformed feeds

/** Add one day to a 'YYYY-MM-DD' string, computed in UTC (DST-safe). */
export function addDay(date: string): string {
  const [y, mo, d] = date.split('-').map(Number);
  return toUtcKey(new Date(Date.UTC(y, mo - 1, d + 1)));
}

function toUtcKey(d: Date): string {
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
  const da = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${mo}-${da}`;
}

/** Unfold RFC 5545 continuation lines (a line starting with space/tab joins the prior line). */
function unfold(ics: string): string[] {
  const normalized = ics.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const out: string[] = [];
  for (const line of normalized.split('\n')) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && out.length > 0) {
      out[out.length - 1] += line.slice(1);
    } else {
      out.push(line);
    }
  }
  return out;
}

/** Parse an iCal date value ('YYYYMMDD', optionally with a trailing time) into 'YYYY-MM-DD'. */
function parseIcsDate(value: string): string | null {
  const m = DATE_RE.exec(value.trim().slice(0, 8));
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

/**
 * Parse an iCal feed string into the set of busy nights ('YYYY-MM-DD').
 * DTEND is treated as exclusive; malformed events are skipped.
 */
export function parseBusyDates(ics: string): Set<string> {
  const busy = new Set<string>();
  let inEvent = false;
  let start: string | null = null;
  let end: string | null = null;

  for (const line of unfold(ics)) {
    const upper = line.toUpperCase();

    if (upper === 'BEGIN:VEVENT') {
      inEvent = true;
      start = null;
      end = null;
      continue;
    }
    if (upper === 'END:VEVENT') {
      if (start) {
        const stop = end ?? addDay(start); // missing DTEND => single-night booking
        let cursor = start;
        let guard = 0;
        while (cursor < stop && guard < MAX_SPAN_DAYS) {
          busy.add(cursor);
          cursor = addDay(cursor);
          guard++;
        }
      }
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const name = upper.slice(0, colon); // property name incl. params, e.g. DTSTART;VALUE=DATE
    const value = line.slice(colon + 1);
    if (name.startsWith('DTSTART')) start = parseIcsDate(value);
    else if (name.startsWith('DTEND')) end = parseIcsDate(value);
  }

  return busy;
}
