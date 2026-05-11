'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { inquirySchema, UNIT_OPTIONS, type InquiryInput } from '@/lib/contact-schema';
import { cn } from '@/lib/utils';

type Props = {
  defaultUnit?: string;
  heading?: string;
  subheading?: string;
  // 'dark' renders on the navy primary background (detail-page reserve block).
  // 'light' renders on the secondary background (homepage).
  variant?: 'light' | 'dark';
};

export function InquiryForm({
  defaultUnit,
  heading = 'Inquire about your stay',
  subheading,
  variant = 'light',
}: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guestCount: 2,
      unit: (defaultUnit as InquiryInput['unit']) ?? 'unsure',
      message: '',
      website: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? 'Submission failed');
      }
      toast.success('Inquiry sent — we’ll be in touch shortly.');
      setSubmitted(true);
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(`We couldn’t send that. ${msg}.`);
    }
  });

  const isDark = variant === 'dark';

  if (submitted) {
    return (
      <div
        className={cn(
          'mx-auto max-w-xl rounded-lg border p-8 text-center',
          isDark ? 'border-white/20 bg-white/5 text-primary-foreground' : 'border-border bg-card',
        )}
      >
        <h3 className={cn('font-serif text-2xl', isDark ? 'text-white' : 'text-primary')}>
          Thank you.
        </h3>
        <p
          className={cn(
            'mt-3 text-sm leading-relaxed',
            isDark ? 'text-white/80' : 'text-muted-foreground',
          )}
        >
          Your inquiry is in. We&rsquo;ll be in touch within 24 hours — usually much sooner. In
          the meantime, feel free to reach us directly at{' '}
          <a
            href="tel:9072232344"
            className={cn(
              'underline-offset-4 hover:underline',
              isDark ? 'text-accent' : 'text-accent',
            )}
          >
            (907) 223-2344
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-xs uppercase tracking-wider text-accent hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        'mx-auto grid max-w-3xl gap-5 rounded-lg border p-6 shadow-sm sm:p-8',
        isDark ? 'border-white/15 bg-white/5' : 'border-border bg-card',
      )}
    >
      {heading && (
        <div>
          <h3 className={cn('font-serif text-2xl', isDark ? 'text-white' : 'text-primary')}>
            {heading}
          </h3>
          {subheading && (
            <p
              className={cn(
                'mt-2 text-sm',
                isDark ? 'text-white/80' : 'text-muted-foreground',
              )}
            >
              {subheading}
            </p>
          )}
        </div>
      )}

      {/* Honeypot — hidden from real users */}
      <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message} isDark={isDark}>
          <input
            type="text"
            autoComplete="given-name"
            {...register('firstName')}
            className={inputClass(isDark)}
          />
        </Field>
        <Field label="Last name" error={errors.lastName?.message} isDark={isDark}>
          <input
            type="text"
            autoComplete="family-name"
            {...register('lastName')}
            className={inputClass(isDark)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message} isDark={isDark}>
          <input
            type="email"
            autoComplete="email"
            {...register('email')}
            className={inputClass(isDark)}
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message} isDark={isDark}>
          <input
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className={inputClass(isDark)}
          />
        </Field>
      </div>

      <Field label="Which home?" error={errors.unit?.message} isDark={isDark}>
        <select {...register('unit')} className={inputClass(isDark)}>
          {UNIT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Check-in" error={errors.checkIn?.message} isDark={isDark}>
          <input type="date" {...register('checkIn')} className={inputClass(isDark)} />
        </Field>
        <Field label="Check-out" error={errors.checkOut?.message} isDark={isDark}>
          <input type="date" {...register('checkOut')} className={inputClass(isDark)} />
        </Field>
        <Field label="Guests" error={errors.guestCount?.message} isDark={isDark}>
          <input
            type="number"
            min={1}
            max={20}
            {...register('guestCount')}
            className={inputClass(isDark)}
          />
        </Field>
      </div>

      <Field label="Anything else? (optional)" error={errors.message?.message} isDark={isDark}>
        <textarea
          rows={4}
          {...register('message')}
          className={cn(inputClass(isDark), 'resize-y')}
        />
      </Field>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={cn(
            'text-xs leading-relaxed',
            isDark ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          By submitting, you&rsquo;ll receive a confirmation email. Prefer to talk? Call{' '}
          <a href="tel:9072232344" className="text-accent underline-offset-4 hover:underline">
            (907) 223-2344
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-7 py-3 text-sm font-medium uppercase tracking-wider text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : 'Send inquiry'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  isDark,
  children,
}: {
  label: string;
  error?: string;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className={cn(
          'text-xs uppercase tracking-wider',
          isDark ? 'text-white/70' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <span className={cn('mt-1 block text-xs', isDark ? 'text-accent' : 'text-destructive')}>
          {error}
        </span>
      )}
    </label>
  );
}

function inputClass(isDark: boolean) {
  return cn(
    'w-full rounded-md border px-3 py-2.5 text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-accent',
    isDark
      ? 'border-white/20 bg-primary/40 text-white placeholder:text-white/40'
      : 'border-border bg-background text-primary placeholder:text-muted-foreground/60',
  );
}
