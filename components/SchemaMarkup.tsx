import { units, type Unit } from '@/lib/units';
import { FAQ_ITEMS } from '@/lib/faq';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bootleggerslanding.com';
const BUILDING_ID = `${SITE_URL}/#bootleggers-landing`;

// Building-level address: street name only, no number (per Aspen — the building
// spans three street numbers, so the building-level entity uses the street name).
const buildingAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'West 8th Avenue',
  addressLocality: 'Anchorage',
  addressRegion: 'AK',
  postalCode: '99501',
  addressCountry: 'US',
};

// Each nested VacationRental gets its own street number from unit.address.
// Expected format: "1475 W 8th Ave, Anchorage, AK 99501".
function unitPostalAddress(address: string) {
  const [street, locality, regionAndZip] = address.split(',').map((s) => s.trim());
  const [region, postalCode] = (regionAndZip ?? '').split(/\s+/);
  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: locality ?? 'Anchorage',
    addressRegion: region ?? 'AK',
    postalCode: postalCode ?? '99501',
    addressCountry: 'US',
  };
}

// Bootleggers' Cove, Anchorage (same neighborhood coords as the villa site).
const geo = {
  '@type': 'GeoCoordinates',
  latitude: '61.2181',
  longitude: '-149.9003',
};

function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

function unitId(slug: string): string {
  return `${SITE_URL}/units/${slug}#vacation-rental`;
}

function vacationRentalSchema(unit: Unit, isFeatured: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    '@id': unitId(unit.slug),
    name: unit.name,
    description: unit.shortDescription,
    url: `${SITE_URL}/units/${unit.slug}`,
    ...(isFeatured ? { mainEntityOfPage: `${SITE_URL}/units/${unit.slug}` } : {}),
    address: unitPostalAddress(unit.address),
    geo: { ...geo },
    telephone: '+1-907-223-2344',
    email: 'experience@bootleggerslanding.com',
    numberOfBedrooms: unit.bedrooms,
    // Bedrooms + bathrooms (rounded up) + kitchen + living room.
    numberOfRooms: unit.bedrooms + Math.ceil(unit.bathrooms) + 2,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: unit.maxOccupancy,
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: unit.sqFt,
      unitCode: 'FTK',
      unitText: 'sq ft',
    },
    petsAllowed: false,
    checkinTime: '16:00',
    checkoutTime: '11:00',
    priceRange: `$${unit.nightlyRateMin} - $${unit.nightlyRateMax} per night`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: String(unit.nightlyRateMin),
      highPrice: String(unit.nightlyRateMax),
      priceCurrency: 'USD',
      unitText: 'per night',
    },
    image: [unit.heroPhoto, ...unit.photos.slice(0, 5).map((p) => p.src)]
      .filter((src, i, arr) => arr.indexOf(src) === i)
      .map(absoluteUrl),
    amenityFeature: unit.amenities.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
    })),
    containedInPlace: {
      '@type': 'LodgingBusiness',
      '@id': BUILDING_ID,
      name: 'Bootleggers Landing',
    },
    ...(unit.pairableWithVilla
      ? {
          isRelatedTo: {
            '@type': 'VacationRental',
            name: 'The Villa at Bootleggers Landing',
            url: 'https://luxuryanchorage.rentals',
          },
        }
      : {}),
  };
}

function lodgingBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': BUILDING_ID,
    name: 'Bootleggers Landing',
    description:
      "A curated collection of three luxury vacation homes in Anchorage's Bootleggers' Cove — walkable to downtown, steps from the Tony Knowles Coastal Trail, with views of Cook Inlet and the Alaska Range.",
    url: SITE_URL,
    logo: absoluteUrl('/images/Bootleggers-Landing-Logo.png'),
    image: [
      absoluteUrl('/images/Bootleggers-Exterior-Full-Building-View-1.jpg'),
      absoluteUrl('/images/Bootleggers-Exterior-Full-Building-View-2.jpg'),
    ],
    address: { ...buildingAddress },
    geo: { ...geo },
    telephone: '+1-907-223-2344',
    email: 'experience@bootleggerslanding.com',
    priceRange: '$$$',
    petsAllowed: false,
    checkinTime: '16:00',
    checkoutTime: '11:00',
    numberOfRooms: units.reduce((sum, u) => sum + u.bedrooms, 0),
    containsPlace: units.map((u) => ({
      '@type': 'VacationRental',
      '@id': unitId(u.slug),
      name: u.name,
      url: `${SITE_URL}/units/${u.slug}`,
    })),
  };
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.text,
      },
    })),
  };
}

type Props = {
  // When set, that unit's VacationRental gets mainEntityOfPage emphasis.
  featuredSlug?: string;
  // FAQPage schema only belongs on pages that actually render the FAQ.
  includeFaq?: boolean;
};

export function SchemaMarkup({ featuredSlug, includeFaq = false }: Props) {
  const graph: object[] = [
    lodgingBusinessSchema(),
    ...units.map((u) => vacationRentalSchema(u, u.slug === featuredSlug)),
  ];
  if (includeFaq) graph.push(faqSchema());

  return (
    <>
      {graph.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
