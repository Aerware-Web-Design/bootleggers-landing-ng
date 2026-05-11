import type { MetadataRoute } from 'next';
import { units } from '@/lib/units';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bootleggerslanding.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...units.map((unit) => ({
      url: `${SITE_URL}/units/${unit.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
