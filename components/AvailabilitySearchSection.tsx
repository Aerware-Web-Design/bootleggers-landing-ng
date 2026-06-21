import { getAvailability } from '@/lib/availability';
import { AvailabilitySearch } from '@/components/AvailabilitySearch';
import { cn } from '@/lib/utils';

/**
 * Server wrapper: resolves availability for all four properties and hands the
 * parsed busy-date data to the client search. Reused on the homepage and the
 * dedicated /availability page. Feed URLs never leave the server.
 */
export async function AvailabilitySearchSection({
  id = 'availability',
  className,
}: {
  id?: string;
  className?: string;
}) {
  const properties = await getAvailability();

  return (
    <section id={id} className={cn('scroll-mt-20 px-6 py-24', className)}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">Plan your stay</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            Find an open home for your dates.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Pick your check-in and check-out dates to see which of our homes &mdash; and the Villa
            next door &mdash; are available for your stay.
          </p>
        </div>
        <AvailabilitySearch properties={properties} />
      </div>
    </section>
  );
}
