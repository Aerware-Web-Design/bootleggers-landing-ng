'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { UnitPhoto } from '@/lib/units';

type Props = {
  photos: UnitPhoto[];
};

export function PhotoGallery({ photos }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const openAt = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );

  // Keyboard handling — Esc closes, Arrow keys navigate, Tab loops within lightbox
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'Tab') {
        // Only the close button is focusable in the lightbox; keep focus there.
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openIndex, close, prev, next]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (openIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  // Restore focus to the originating thumbnail when the lightbox closes
  const lastIndexRef = useRef<number | null>(null);
  useEffect(() => {
    if (openIndex !== null) {
      lastIndexRef.current = openIndex;
    } else if (lastIndexRef.current !== null) {
      triggerRefs.current[lastIndexRef.current]?.focus();
    }
  }, [openIndex]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            onClick={() => openAt(i)}
            aria-label={`Open photo: ${photo.alt}`}
            className={`group relative aspect-[4/3] overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              i === 0 ? 'sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2' : ''
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${openIndex + 1} of ${photos.length}: ${photos[openIndex].alt}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          style={{ animation: 'lightbox-fade-in 150ms ease-out' }}
          onClick={close}
        >
          {/* Close button */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="h-7 w-7" aria-hidden />
            </button>
          )}

          {/* Image */}
          <figure
            className="relative h-full max-h-[88vh] w-full max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[openIndex].src}
              alt={photos[openIndex].alt}
              fill
              sizes="92vw"
              priority
              className="object-contain"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-6 py-4 text-sm text-white">
              <span className="max-w-xl text-left">{photos[openIndex].alt}</span>
              <span className="text-xs uppercase tracking-wider opacity-70">
                {openIndex + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>

          {/* Next */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="h-7 w-7" aria-hidden />
            </button>
          )}
        </div>
      )}
    </>
  );
}
