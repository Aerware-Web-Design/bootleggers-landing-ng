import { z } from 'zod';
import { units } from './units';

const unitSlugs = units.map((u) => u.slug);

export const UNIT_OPTIONS = [
  ...units.map((u) => ({ value: u.slug, label: u.name })),
  { value: 'unsure', label: "Not sure — advise me" },
] as const;

export const inquirySchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(80),
  lastName: z.string().min(1, 'Last name is required').max(80),
  email: z.string().email('Enter a valid email'),
  phone: z
    .string()
    .max(40)
    .optional()
    .or(z.literal('')),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guestCount: z.coerce
    .number({ invalid_type_error: 'Enter a number' })
    .int()
    .min(1, 'At least one guest')
    .max(20, 'For groups larger than 20, contact us directly'),
  unit: z.enum([...unitSlugs, 'unsure'] as [string, ...string[]], {
    errorMap: () => ({ message: 'Choose a home' }),
  }),
  message: z
    .string()
    .max(2000, 'Keep it under 2,000 characters')
    .optional()
    .or(z.literal('')),
  // Honeypot — should always be empty. Real users don't fill it.
  website: z.string().max(0).optional().or(z.literal('')),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function unitLabelFromValue(value: string): string {
  if (value === 'unsure') return "Not sure yet — needs advice";
  return units.find((u) => u.slug === value)?.name ?? value;
}
