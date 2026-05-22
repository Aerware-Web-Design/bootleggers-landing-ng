# Bootleggers Landing — Project Context

Marketing site for **Bootleggers Landing**, a curated collection of three luxury vacation rentals in Anchorage's Bootleggers' Cove. Sibling to the Villa at Bootleggers Landing (luxuryanchorage.rentals); same building, same family, same standard.

**Operator:** Aspen (solo). Aeryn is not involved in this project.

---

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (with `tw-animate-css`)
- Radix UI (Accordion, Dialog, Label, Select, Toast)
- react-hook-form + zod (`@hookform/resolvers`)
- nodemailer (Google Workspace SMTP) for the contact API
- Vercel Web Analytics (`@vercel/analytics`, `<Analytics />` in `app/layout.tsx`)
- Sonner for toasts
- Package manager: **pnpm**

## Brand

- Primary navy `#1a1a2e` (shared with villa)
- Accent warm gold `#b8924c` (sibling-specific — distinct from villa's teal)
- Fonts: Inter (sans) + Playfair Display (serif), via `next/font/google`
- Logo: `public/images/Bootleggers-Landing-Logo.png` (white, cropped — no "Villa" in it). Rendered as-is, no `brightness/invert` filter.

## Hosting & repo

- **Repo:** `github.com/Aerware-Web-Design/bootleggers-landing-ng` (currently **public** — see note below)
- **Vercel preview:** `bootleggers-landing-ng.vercel.app`
- **Vercel scope:** Aspen's personal **Hobby** account (NOT the `aerwaretech` team, which is what hosts the villa)
- **Production domain (when launched):** `bootleggerslanding.com` (DNS at GoDaddy)
- DNS cutover to the production domain is gated on Sky's explicit approval — do not wire a custom domain until then

### Why the repo is public

Vercel Hobby cannot deploy a *private* repo owned by a GitHub *organization*. The new repo was created private under `Aerware-Web-Design`, hit the "upgrade Aerware Technologies to Pro" wall at import, and was flipped to public to unblock. Nothing sensitive in the repo (`.env*` gitignored, only empty slots in `.env.example`). To make it private later: either upgrade `aerwaretech` to Vercel Pro, or transfer the repo to Aspen's personal GitHub account.

## DNS — DO NOT TOUCH

When modifying DNS at GoDaddy, only change A and CNAME records. **Never** modify or delete:
- MX records (Google Workspace email routing for `experience@bootleggerslanding.com` alias)
- TXT records (SPF/DKIM/DMARC — already verified passing as of May 11, 2026)

## Contact API

`app/api/contact/route.ts` sends a guest auto-confirmation + an internal notification via nodemailer/SMTP.

Required env vars (set in Vercel + local `.env.local`):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<underlying Workspace account, not the alias>
SMTP_PASSWORD=<Google App Password>
SMTP_FROM="Bootleggers Landing <experience@bootleggerslanding.com>"
CONTACT_EMAIL=experience@bootleggerslanding.com
```

**Dev fallback:** when SMTP env is unset, the route logs the inquiry to the server console and returns `{ok: true}` so the form is testable. Real sends activate the moment the env vars are present.

The guest confirmation copy says "we'll be in touch within 24 hours — usually much sooner" (sibling voice). This differs from the villa rule of "respond shortly with no time commitment" — sibling is intentional.

## Data layer — single source of truth

- **`lib/units.ts`** — typed `Unit[]` array. Imported by the homepage, `/units/[slug]` pages, schema, and sitemap. Adding a 4th unit later = one entry here.
- `sqFt`, `nightlyRateMin/Max`, and the per-unit `address` field carry Sky's confirmed real values (landed May 12, 2026). No more placeholders. The `Unit` type's `address` is plain `string` formatted `"<number> <street>, Anchorage, AK 99501"`; `SchemaMarkup.unitPostalAddress()` parses it for the nested `VacationRental` entities.
- `lib/faq.tsx` — `FAQ_ITEMS` and the `FaqItem` type. Lives outside `components/FAQ.tsx` (which is `'use client'`) so the server-side `SchemaMarkup` can import it without crossing the client boundary (the import otherwise comes through as a module-reference proxy).
- `lib/contact-schema.ts` — shared zod schema used by the form and the API route.

## Marketing copy & voice rules

- **Source:** `~/Documents/Claude/Projects/Aerware Bootleggers Landing/sibling-content.md` is the Aspen-approved source for ALL marketing copy (hero, about, unit descriptions, amenities, FAQ, email templates). **Do not improvise.** If a gap exists, surface it to Aspen.
- **Never** call the units "residences" — they are **vacation rentals / homes / stays**. See `~/.claude/projects/-Users-aspen-Code/memory/feedback_bootleggers_voice.md`.
- Homepage hero is locked: **"Three Luxury Stays. One Coveted Cove."**
- Marketing names (locked): **Urban Gem, Denali View Retreat, Waterfront Hideaway**. Slugs: `urban-gem`, `denali-view-retreat`, `waterfront-hideaway`.
- **Waterfront Hideaway** is the MIL suite (`pairableWithVilla: true`), pairs with the Villa for stays up to 14. (The brief's §1 table calls "View of Denali" the MIL — that's stale; the top-of-brief "Current status" section + `sibling-content.md` are authoritative.)
- `linkifyVilla()` helper in `app/units/[slug]/page.tsx` auto-links the phrase "The Villa at Bootleggers Landing" to `luxuryanchorage.rentals` wherever it appears in a unit's long description.

## Page architecture

- Homepage (`app/page.tsx`) — sections in order: `Hero` (Sleeping Lady Sunset background, 75vh, primary/30 wash, text-shadowed centered text), `AboutBuilding` (2-photo grid of aerial + ground-level shots above the body copy + Villa cross-link), `Stays` (three `UnitCard`s ordered Denali → Waterfront → Urban Gem via `HOMEPAGE_ORDER`), `ViewFromHere` (panoramic Cook Inlet at aspect-[5/2] on top, Mt. Spurr + Northern Lights side-by-side below, with the "view from every home" caption from `sibling-content.md` — room for a 4th photo when Aspen adds one), `FAQ` accordion (8 Qs), `Contact` inquiry form, then `SiteFooter` with reverse cross-link to luxuryanchorage.rentals.
- `/units/[slug]` — dynamic route with `generateStaticParams` (prerendered at build) + per-unit `generateMetadata`. Renders hero (light `primary/35` wash + layered text-shadow — was a heavy stacked gradient until May 12), stat bar, narrative, `PhotoGallery` (lightbox), amenities (CSS multi-column layout via `sm:columns-2 break-inside-avoid` so 2-line bullets pair with other 2-line bullets — was a strict 2-col grid until May 12), inquiry block (dark variant, unit pre-selected), "other homes" footer.
- `<SchemaMarkup>` mounts on every page: `LodgingBusiness` (building-level, address = "West 8th Avenue" with no street number) + 3 nested `VacationRental` entities (each using its own unit's full street address via `unitPostalAddress()`) + `FAQPage` (homepage only).
- `app/sitemap.ts` + `app/robots.ts` derive from `lib/units.ts`.

## People & contact

- **Sky** — owner
- **Janine** — concierge, 30+ years Alaska tourism. Phone `(907) 223-2344` (used as a `tel:` link).
- Inquiry routing: `experience@bootleggerslanding.com` (Workspace alias) → existing villa Workspace inbox. Single inbox, no per-unit routing logic.

## External integrations & feeds

- Three units listed on **Airbnb** (deep links in `lib/units.ts`):
  - Urban Gem — `airbnb.com/rooms/1531401268012581398`
  - Denali View Retreat — `airbnb.com/rooms/1403981533564184496`
  - Waterfront Hideaway — `airbnb.com/rooms/46053900`
- `bootleggersbooking.pythonanywhere.com` exists (Sky's other agent) — **do NOT depend on it.** Black-box, free-tier, unclear maintenance.

## Architectural choices (intentional, not bugs)

- Repo is public — see "Why the repo is public" above.
- `lib/faq.tsx` is a `.tsx` plain module (not under `components/`) so the server-side `SchemaMarkup` can import `FAQ_ITEMS` directly without the `'use client'` proxy issue.
- `next.config.mjs` is clean — no `ignoreBuildErrors`, no aggressive no-cache headers (villa has both; sibling deliberately doesn't).
- Photo gallery uses a custom keyboard-accessible lightbox (`components/PhotoGallery.tsx`), not a third-party lib.
- Speed Insights is NOT enabled (matches the villa's deliberate-off stance).

## Operating rules

- **Aspen reviews before pushes.** Commit locally → tell Aspen what changed → wait for her OK → push. Don't auto-push.
- **Pause and confirm before starting each new step or batch.** Don't chain through a pre-approved plan without re-checking.
- Surface blockers (missing data, ambiguous instructions) rather than improvising. Especially: don't invent marketing copy — pull from `sibling-content.md`.
- No custom-domain wiring on Vercel until Sky's explicit approval (planned May 27–28, 2026).

## Running locally (PATH gotcha)

`pnpm` and `node` are not on the harness's default `PATH`. Aspen uses nvm. Before any `pnpm dev` / `pnpm build` / `pnpm exec tsc`:

```bash
export PATH="/Users/aspen/.nvm/versions/node/v24.12.0/bin:$PATH"
```

Then `pnpm dev` from `/Users/aspen/Code/bootleggers-landing-ng` brings up `http://localhost:3000`. Run it via the Bash `run_in_background` flag.

## Pending Aspen-side inputs (none blocking the preview)

- **3 Google Calendar IDs** — for the `AvailabilityCalendar` component (one calendar per unit, each subscribed to its Airbnb iCal feed). Aspen creates the calendars + subscribes the feeds; agent then builds `components/AvailabilityCalendar.tsx` (iframe wrapper, `calendarId` prop, fallback message), adds a `calendarId` field per unit in `lib/units.ts`, and wires a "Check Availability" section into each detail page above the inquiry CTA.
- **Urban Gem bed photo** (`Bootleggers-Urban-Gem-Master-View.png`) — Sky wanted a pillow added to the dark bed shot. Aspen is photoshopping/reshooting. Until the new file lands, Urban Gem's `heroPhoto` is `/images/Bootleggers-Urban-Gem-Master.png` (the alternate); swap back to `Master-View.png` when Aspen drops the new file.
- **Optional 4th "View From Here" photo** — `ViewFromHere` section is laid out with room for another atmospheric shot. Drop it in when/if Aspen adds one.
- **GA4 measurement ID** (`G-XXXXXXX`) for the new sibling property — wire gtag in `app/layout.tsx` with cross-domain measurement to the villa property `G-J2V0ZJC643`.
- **SMTP App Password** for `experience@bootleggerslanding.com` — drop into Vercel env (and local `.env.local`) to switch the API route from console-log to real send.

## Out of scope for this sprint

- Booking engine / payment processing (Stripe)
- PMS integration (Hostfully, Guesty, OwnerRez)
- P2 unified cross-unit availability search — deferred to v1.1 (per-unit calendars cover the basic need)
- Per-unit Google Business Profile listings — post-launch backlog
- Villa-side P3 edits (uncomment FAQ cross-link, fix villa schema bedroom count `3→2`, add header cross-link) — Track A, separate repo

## Reference docs

- **Operative brief (sequencing source of truth):** `~/Documents/Claude/Projects/Aerware Bootleggers Landing/Claude-Code-Handoff-Brief.md`
- **Marketing copy source of truth:** `~/Documents/Claude/Projects/Aerware Bootleggers Landing/sibling-content.md`
- **Photo source folder:** `~/Desktop/Bootleggers/Landing/`
- **Villa repo (read-only reference):** `~/Code/villa-at-bootleggers-landing-ng/` — and its own `CLAUDE.md`
