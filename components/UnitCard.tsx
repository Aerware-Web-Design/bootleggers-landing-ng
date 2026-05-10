import Image from 'next/image';
import Link from 'next/link';
import { formatRateRange, type Unit } from '@/lib/units';

export function UnitCard({ unit }: { unit: Unit }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={unit.heroPhoto}
          alt={unit.photos[0]?.alt ?? unit.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {unit.pairableWithVilla && (
          <span className="absolute left-4 top-4 rounded-sm bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground">
            Pairs with the Villa
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-2xl text-primary">{unit.name}</h3>
        <p className="mt-1 text-sm italic text-muted-foreground">{unit.heroTagline}</p>

        <dl className="mt-5 grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
          <Spec label="Bedrooms" value={`${unit.bedrooms}`} />
          <Spec label="Bathrooms" value={`${unit.bathrooms}`} />
          <Spec label="Sleeps" value={`Up to ${unit.maxOccupancy}`} />
          <Spec label="Square feet" value={`~${unit.sqFt.toLocaleString()}`} />
        </dl>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {unit.shortDescription}
        </p>

        <div className="mt-auto pt-6">
          <div className="border-t border-border pt-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Nightly</p>
            <p className="mt-1 font-serif text-xl text-primary">{formatRateRange(unit)}</p>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/units/${unit.slug}`}
              className="flex min-h-11 flex-1 items-center justify-center rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium uppercase leading-tight tracking-wider text-primary-foreground transition hover:opacity-90"
            >
              View Details
            </Link>
            <a
              href={unit.airbnbUrl}
              target="_blank"
              rel="noopener"
              className="flex min-h-11 flex-1 items-center justify-center rounded-md border border-primary px-4 py-2.5 text-center text-sm font-medium uppercase leading-tight tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Book on Airbnb
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground/70">{label}</dt>
      <dd className="mt-0.5 text-sm text-primary">{value}</dd>
    </div>
  );
}
