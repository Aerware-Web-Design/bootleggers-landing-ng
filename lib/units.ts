/**
 * Single source of truth for the three sibling residences.
 * Imported by the homepage, /units/[slug] pages, schema, and sitemap.
 *
 * Fields marked PLACEHOLDER use stand-in values so layouts preview correctly.
 * Replace with real numbers when Aspen pulls them from Sky / Airbnb.
 */

export type UnitPhoto = {
  src: string;
  alt: string;
};

export type Unit = {
  slug: string;
  name: string;
  airbnbTitle: string;
  airbnbUrl: string;
  bedrooms: number;
  bathrooms: number;
  beds: string;
  maxOccupancy: number;
  sqFt: number; // PLACEHOLDER — confirm with Aspen
  nightlyRateMin: number; // PLACEHOLDER — confirm with Aspen
  nightlyRateMax: number; // PLACEHOLDER — confirm with Aspen
  heroTagline: string;
  shortDescription: string;
  longDescription: string;
  amenities: string[];
  heroPhoto: string;
  photos: UnitPhoto[];
  seoKeywords: string[];
  pairableWithVilla?: boolean;
};

export const units: Unit[] = [
  {
    slug: 'urban-gem',
    name: 'Urban Gem',
    airbnbTitle: 'Urban Gem with Water View!',
    airbnbUrl: 'https://www.airbnb.com/rooms/1531401268012581398',
    bedrooms: 2,
    bathrooms: 2.5,
    beds: '2 beds',
    maxOccupancy: 4,
    sqFt: 1400, // PLACEHOLDER
    nightlyRateMin: 295, // PLACEHOLDER
    nightlyRateMax: 395, // PLACEHOLDER
    heroTagline: 'Stylish, walkable, and quietly extraordinary.',
    shortDescription:
      "A two-bedroom retreat in Bootleggers' Cove with sweeping views of Cook Inlet and the Sleeping Lady. Walkable to downtown Anchorage, minutes from the train and airport.",
    longDescription:
      "Urban Gem is the most centrally located residence in our collection — a beautifully designed two-bedroom home that puts you within walking distance of Anchorage's best restaurants, galleries, and the Tony Knowles Coastal Trail, while keeping you firmly inside the quiet exclusivity of Bootleggers' Cove.\n\nStep inside and the language is contemporary luxury: clean lines, natural light, considered furnishings. Both bedrooms are configured with their own private bathrooms, and a half-bath off the main living area means hosting feels effortless. The kitchen is fully equipped for everything from a quick breakfast to a multi-course dinner with views of the Sleeping Lady (Mt. Susitna) as your backdrop.\n\nWhat sets Urban Gem apart is the location-to-luxury ratio. You're five minutes from the Alaska Railroad station — the gateway to Seward, Whittier, and Denali day trips. Ten minutes from Ted Stevens International. Fifteen on foot to downtown dining. And from the moment you close the front door behind you, you're back in a residential pocket where Cook Inlet glints through the trees and the only sound is the wind off the water.\n\nIdeal for couples traveling together, business travelers needing space and connectivity, or families who want both the city and the cove.",
    amenities: [
      'Two bedrooms, each with en-suite bath',
      'Half bath off the main living area',
      'Fully equipped gourmet kitchen',
      'High-speed Wi-Fi throughout',
      'Dedicated TV with streaming',
      'In-unit washer and dryer',
      'Free on-site parking',
      'Five-minute walk to the Tony Knowles Coastal Trail',
      'Self-check-in via keypad',
    ],
    heroPhoto: '/images/Bootleggers-Urban-Gem-Master-View.png',
    photos: [
      {
        src: '/images/Bootleggers-Urban-Gem-Main.png',
        alt: 'Urban Gem at Bootleggers Landing — modern two-bedroom retreat with Cook Inlet views',
      },
      {
        src: '/images/Bootleggers-Urban-Gem-Living.png',
        alt: 'Sunlit living area with contemporary furnishings inside Urban Gem',
      },
      {
        src: '/images/Bootleggers-Urban-Gem-Kitchen.png',
        alt: 'Fully equipped gourmet kitchen at Urban Gem, Anchorage',
      },
      {
        src: '/images/Bootleggers-Urban-Gem-Master.png',
        alt: 'Primary bedroom at Urban Gem with en-suite bathroom',
      },
      {
        src: '/images/Bootleggers-Urban-Gem-Master-View.png',
        alt: 'Cook Inlet and Sleeping Lady view from the Urban Gem primary suite',
      },
      {
        src: '/images/Bootleggers-Urban-Gem-Bedroom-2.png',
        alt: 'Second bedroom at Urban Gem with private bathroom',
      },
    ],
    seoKeywords: [
      'Anchorage vacation rental',
      'downtown Anchorage rental',
      'Bootleggers Cove',
      'Cook Inlet view',
      'Sleeping Lady view',
      'walkable Anchorage Airbnb',
      'two bedroom Anchorage rental',
    ],
  },
  {
    slug: 'denali-view-retreat',
    name: 'Denali View Retreat',
    airbnbTitle: 'Denali View Retreat • Modern Stay Near Downtown',
    airbnbUrl: 'https://www.airbnb.com/rooms/1403981533564184496',
    bedrooms: 2,
    bathrooms: 2.5,
    beds: '1 king, 1 queen',
    maxOccupancy: 4,
    sqFt: 1800, // PLACEHOLDER (3 floors)
    nightlyRateMin: 345, // PLACEHOLDER
    nightlyRateMax: 465, // PLACEHOLDER
    heroTagline: 'Wake up to Denali. Stay for the morning light.',
    shortDescription:
      'A modern three-story townhome with panoramic views of Denali and Cook Inlet. Two king-and-queen bedrooms, dedicated workspace, and unmatched morning light.',
    longDescription:
      "Denali View Retreat is the design-forward home in our collection — a three-story modern townhome built around the view that gives it its name. From the upper floor, you wake to Denali on the horizon and Cook Inlet stretched out below, and the light moves across the Alaska Range through the day.\n\nThe layout rewards a longer stay. The lower floor entry — accessed by your own keypad just across from the garage — opens to a quiet arrival space. The main floor holds the kitchen, dining, and living areas with a half-bath. The top floor is the private retreat: a king-bedded primary suite with full bath, a queen-bedded second suite with its own bath, and a tucked-away laundry area. Room-darkening shades, extra bedding, and considered furnishings throughout.\n\nBuilt for the kind of Alaska traveler who wants more than a place to sleep. Couples lingering over an anniversary trip. Small groups who want room to spread out. Solo travelers chasing the view. Anyone who's ever wished their hotel felt like an actual home — a real kitchen, a quiet floor for sleeping, a mountain on the horizon — will find their answer here.\n\nFive-star ratings across the board on cleanliness, accuracy, check-in, communication, location, and value.",
    amenities: [
      'Two private bedroom suites — one king, one queen — each with full en-suite bath',
      'Room-darkening shades and premium bedding throughout',
      'Three-story layout with private keypad entry',
      'Modern designer kitchen with full appliance suite',
      'Dedicated workspace with high-speed Wi-Fi',
      'Half bath on the main living level',
      'In-unit washer and dryer on the bedroom level',
      'Beach access nearby',
      'Free parking on premises',
      'Self-check-in via keypad',
    ],
    heroPhoto: '/images/Bootleggers-View-of-Denali-Kitchen-View.jpg',
    photos: [
      {
        src: '/images/Bootleggers-View-of-Denali-Master-Bedroom-View.jpg',
        alt: 'Primary bedroom at Denali View Retreat with Denali and Cook Inlet view',
      },
      {
        src: '/images/Bootleggers-View-of-Denali-Kitchen.jpg',
        alt: 'Modern kitchen at Denali View Retreat with views of Cook Inlet',
      },
      {
        src: '/images/Bootleggers-View-of-Denali-Kitchen-View.jpg',
        alt: 'Cook Inlet and Alaska Range visible from the Denali View Retreat kitchen',
      },
      {
        src: '/images/Bootleggers-View-of-Denali-Living-Fireplace.jpg',
        alt: 'Living area with fireplace at Denali View Retreat, Anchorage',
      },
      {
        src: '/images/Bootleggers-View-of-Denali-Master-Bath.jpg',
        alt: 'Primary en-suite bathroom at Denali View Retreat',
      },
      {
        src: '/images/Bootleggers-View-of-Denali-Second-Bedroom.jpg',
        alt: 'Second bedroom suite at Denali View Retreat with queen bed',
      },
    ],
    seoKeywords: [
      'Denali view rental Anchorage',
      'modern Anchorage townhome',
      'Anchorage rental with workspace',
      'Cook Inlet view rental',
      'two bedroom Bootleggers Cove',
      'Anchorage business traveler rental',
    ],
  },
  {
    slug: 'waterfront-hideaway',
    name: 'Waterfront Hideaway',
    airbnbTitle: 'Waterfront View of Denali, Alaska Range and Ocean.',
    airbnbUrl: 'https://www.airbnb.com/rooms/46053900',
    bedrooms: 1,
    bathrooms: 1,
    beds: '1 queen, 1 sofa bed',
    maxOccupancy: 4,
    sqFt: 900, // PLACEHOLDER
    nightlyRateMin: 245, // PLACEHOLDER
    nightlyRateMax: 365, // PLACEHOLDER
    heroTagline: "A private hideaway on Bootleggers' edge.",
    shortDescription:
      'A one-bedroom suite with private entrance, sunset patio, and views of Cook Inlet, the Alaska Range, and the summer trains rolling past. Add to a Villa stay or book standalone.',
    longDescription:
      "Waterfront Hideaway is the most lived-in residence in our collection — and it shows in the reviews. With over 300 five-star stays in six years, this one-bedroom retreat has quietly become one of the highest-rated luxury rentals in Anchorage.\n\nThe suite occupies a private corner of Bootleggers Villa, with its own keypad entrance, a low-threshold accessible door, and a soundproofed ceiling that ensures a hideaway feels like one. Inside: radiant floor heat underfoot, a gas fireplace for the long winter evenings, a queen bed in the bedroom and a sofa bed in the living area for guests, a full bath, and a kitchen outfitted for everything short of a multi-course dinner — all the cookware, drinkware, and conveniences a thoughtful host would stock for someone they wanted to come back.\n\nThe patio is the secret. Sunset-facing, private, with views of Cook Inlet and the Alaska Range, and close enough to the railroad that you can wave at the summer passenger trains as they roll past on their way to Seward and Whittier. It's a small luxury that ends up being the thing guests mention most.\n\nBooking with a larger group? Waterfront Hideaway can be paired with The Villa at Bootleggers Landing next door for stays of up to 14 guests across the connected properties — a rare option for groups who want both private suites and shared communal space. Contact us to coordinate a paired booking.",
    amenities: [
      'Private keypad entrance with low-threshold accessibility',
      'Queen bedroom plus living-room sofa bed (sleeps up to 4)',
      'Full bath with radiant floor heat',
      'Gas fireplace',
      'Fully equipped kitchen with convection toaster oven and full cookware',
      'Sunset-facing private patio with view of Cook Inlet and the Alaska Range',
      'Wi-Fi-enabled smart TV',
      'In-unit washer and dryer',
      'Soundproofing in the ceiling for true privacy',
      'Self-check-in via keypad',
      'Pairable with The Villa at Bootleggers Landing for stays up to 14 guests',
    ],
    heroPhoto: '/images/Bootleggers-Waterfront-Hideaway-Living-Outdoor-Access.jpg',
    // Curated set — original gallery had ~5 near-duplicate living-room/kitchen
    // angles; kept the highest-resolution representative of each distinct space.
    photos: [
      {
        src: '/images/Bootleggers-Waterfront-Hideaway-Living-Inlet-View.jpg',
        alt: 'Living area at Waterfront Hideaway overlooking Cook Inlet',
      },
      {
        src: '/images/Bootleggers-Waterfront-Hideaway-Living-Fireplace.jpg',
        alt: "Gas fireplace and seating at Waterfront Hideaway, Bootleggers' Cove",
      },
      {
        src: '/images/Bootleggers-Waterfront-Hideaway-Living-Open-Plan.jpg',
        alt: 'Open-plan living layout at Waterfront Hideaway',
      },
      {
        src: '/images/Bootleggers-Waterfront-Hideaway-Living-Entry-View.jpg',
        alt: 'Entry and living area at Waterfront Hideaway',
      },
      {
        src: '/images/Bootleggers-Waterfront-Hideaway-Kitchen.jpg',
        alt: 'Fully equipped kitchen at Waterfront Hideaway',
      },
      {
        src: '/images/Bootleggers-Waterfront-Hideaway-Bedroom.jpg',
        alt: 'Queen bedroom at Waterfront Hideaway',
      },
      {
        src: '/images/Bootleggers-Waterfront-Hideaway-Dining-Bedroom.jpg',
        alt: 'Dining area adjacent to the bedroom at Waterfront Hideaway',
      },
      {
        src: '/images/Bootleggers-Waterfront-Hideaway-Living-Patio-View.jpg',
        alt: 'Sunset patio view from Waterfront Hideaway with Alaska Range vista',
      },
    ],
    seoKeywords: [
      'Anchorage Airbnb with private entrance',
      'waterfront Anchorage rental',
      'Bootleggers Cove suite',
      'Anchorage one bedroom luxury rental',
      'accessible Anchorage vacation rental',
      'Cook Inlet view suite',
    ],
    pairableWithVilla: true,
  },
];

export function getUnitBySlug(slug: string): Unit | undefined {
  return units.find((u) => u.slug === slug);
}

export function formatRateRange(unit: Unit): string {
  return `$${unit.nightlyRateMin.toLocaleString()}–$${unit.nightlyRateMax.toLocaleString()} / night`;
}
