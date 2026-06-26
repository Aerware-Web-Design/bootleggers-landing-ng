import { Star } from 'lucide-react';
import { collectionReviews, reviewsForSlug, type GuestReview } from '@/lib/reviews';

function StarRow({ rating = 5 }: { rating?: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={
            i < full ? 'h-4 w-4 fill-accent text-accent' : 'h-4 w-4 text-border'
          }
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GuestReview }) {
  return (
    <figure className="flex h-full flex-col rounded-md border border-border bg-background p-6 shadow-sm">
      <StarRow rating={review.rating} />
      <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-primary">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm text-muted-foreground">
        <span className="font-medium text-primary">{review.author}</span>
        {review.location ? <span> · {review.location}</span> : null}
      </figcaption>
    </figure>
  );
}

type Props = {
  /** Limit to one unit's reviews; omit for the collection homepage. */
  unitSlug?: string;
  /** Optional section heading override. */
  heading?: string;
  /** Extra classes on the <section> (e.g. background / border). */
  className?: string;
};

/**
 * Guest testimonials. Renders nothing until real reviews are added to
 * GUEST_REVIEWS in lib/reviews.ts — so it can be mounted now and stays
 * invisible until the slots are filled.
 */
export function Reviews({ unitSlug, heading, className = '' }: Props) {
  const reviews = unitSlug ? reviewsForSlug(unitSlug) : collectionReviews();
  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className={`scroll-mt-20 px-6 py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">Reviews</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            {heading ?? 'What our guests say.'}
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
