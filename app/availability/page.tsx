import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { AvailabilitySearchSection } from '@/components/AvailabilitySearchSection';

export const metadata: Metadata = {
  title: 'Availability',
  description:
    'Check open dates across all Bootleggers Landing homes and the Villa next door, and find an available stay for your travel dates.',
};

export default function AvailabilityPage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="pt-20">
        <AvailabilitySearchSection />
      </main>
      <SiteFooter />
    </>
  );
}
