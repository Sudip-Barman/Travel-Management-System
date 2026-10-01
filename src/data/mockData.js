// AuraVoyage Curated Luxury Hospitality & Bespoke Travel Mock Data Layer

export const DESTINATIONS = [
  {
    id: 'dest-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    subtitle: 'Ancient streets, quiet temples and unforgettable evenings.',
    tagline: 'Ancient shrine tranquility meets refined tea ceremonies and kaiseki artistry.',
    category: 'Cultural',
    rating: 4.98,
    reviewsCount: 189,
    startingPrice: 4850,
    priceFormatted: '$4,850',
    idealDays: '10-14 Days',
    bestSeason: 'March – May & Oct – Nov',
    featured: true,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'A journey through timeless Japan.',
    highlights: [
      'Private Ryokan with garden onsen',
      'First-Class Shinkansen Green Car',
      'Private 15th-generation tea ceremony',
      'Secret Gion lantern walk at dusk'
    ]
  },
  {
    id: 'dest-amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    subtitle: 'Sun-drenched cliffs, lemon groves and Mediterranean blue.',
    tagline: 'Cliffside sanctuaries, private Riva yacht cruises and cliffside Michelin gastronomy.',
    category: 'Coastal',
    rating: 4.96,
    reviewsCount: 142,
    startingPrice: 3450,
    priceFormatted: '$3,450',
    idealDays: '7-10 Days',
    bestSeason: 'May – October',
    featured: true,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'Where cliffs tumble into azure waters.',
    highlights: [
      'Positano cliffside plunge pool suite',
      'Private Riva yacht charter to Capri',
      'Ravello garden sunset chamber concert',
      'Centuries-old cellar wine flight'
    ]
  },
  {
    id: 'dest-kashmir',
    name: 'Kashmir Valley',
    country: 'India',
    subtitle: 'Snow-dusted peaks, mirror lakes and hand-carved cedar sanctuaries.',
    tagline: 'Poetic shikara glides, fragrant saffron meadows and pine-scented alpine air.',
    category: 'Mountain',
    rating: 4.97,
    reviewsCount: 156,
    startingPrice: 49999,
    priceFormatted: '₹49,999',
    idealDays: '6-8 Days',
    bestSeason: 'April – October & Dec – Feb',
    featured: true,
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'Paradise carved in cedar and snow.',
    highlights: [
      'Private luxury cedar houseboat on Dal Lake',
      'Sunset Shikara glide with hot Kehwa tea',
      'Phase II Gulmarg Gondola alpine vista',
      'Pahalgam pine forest horseback trail'
    ]
  },
  {
    id: 'dest-goa',
    name: 'Goa',
    country: 'India',
    subtitle: 'Golden sands, private Portuguese heritage villas and sunset catamarans.',
    tagline: 'Secluded palm groves, heritage susegad estates, and private skipper yachts.',
    category: 'Coastal',
    rating: 4.95,
    reviewsCount: 168,
    startingPrice: 38000,
    priceFormatted: '₹38,000',
    idealDays: '5-7 Days',
    bestSeason: 'October – April',
    featured: true,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'Where golden shores meet Portuguese heritage.',
    highlights: [
      'Private 4-bedroom heritage estate in Assagao',
      'Private sunset catamaran charter to Grand Island',
      'Private chef seafood & feni masterclass',
      'Quiet backwater kayaking in Aldona'
    ]
  },
  {
    id: 'dest-bali',
    name: 'Bali',
    country: 'Indonesia',
    subtitle: 'Lush tropical valleys, sacred springs and serene ocean sanctuaries.',
    tagline: 'Private pool river sanctuaries, holistic sound healing and coastal sunsets.',
    category: 'Tropical',
    rating: 4.92,
    reviewsCount: 215,
    startingPrice: 2650,
    priceFormatted: '$2,650',
    idealDays: '7-12 Days',
    bestSeason: 'April – October',
    featured: true,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'Quiet sanctuaries among emerald jungle terraces.',
    highlights: [
      'Private infinity pool villa in Ubud',
      'Tirta Empul private water blessing',
      'Private catamaran cruise to Nusa Penida',
      'Acoustic sound healing session'
    ]
  },
  {
    id: 'dest-swiss',
    name: 'Swiss Alps',
    country: 'Switzerland',
    subtitle: 'Snow-capped peaks, glacier express and pure alpine luxury.',
    tagline: 'Panoramic first-class rails, Matterhorn vista chalets and thermal mineral spas.',
    category: 'Mountain',
    rating: 4.94,
    reviewsCount: 96,
    startingPrice: 4200,
    priceFormatted: '$4,200',
    idealDays: '8-10 Days',
    bestSeason: 'Dec – Mar & Jun – Sep',
    featured: false,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'Timeless serenity atop European glaciers.',
    highlights: [
      'Matterhorn vista alpine chalet',
      'Glacier Express Excellence Class',
      'Vintage Swiss wine & artisanal cheese',
      'Private helicopter glacier flyover'
    ]
  },
  {
    id: 'dest-safari',
    name: 'Serengeti & Mara',
    country: 'Tanzania & Kenya',
    subtitle: 'Untamed horizons, sunrise balloons and private tented suites.',
    tagline: 'Exclusive Big Five expeditions with dedicated naturalists and champagne bush breakfasts.',
    category: 'Wildlife',
    rating: 4.99,
    reviewsCount: 82,
    startingPrice: 6900,
    priceFormatted: '$6,900',
    idealDays: '9-12 Days',
    bestSeason: 'July – October',
    featured: false,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'Nature’s most awe-inspiring canvas.',
    highlights: [
      'Private custom Land Cruiser & naturalist',
      'Sunrise hot air balloon champagne safari',
      'Luxury tented suite under equatorial stars',
      'Private migration riverbank access'
    ]
  },
  {
    id: 'dest-kerala',
    name: 'Kerala',
    country: 'India',
    subtitle: 'Tranquil emerald backwaters, rolling tea estates and Ayurvedic retreats.',
    tagline: 'Private luxury houseboats in Alleppey, mist-kissed tea hills in Munnar and coastal heritage in Fort Kochi.',
    category: 'Coastal',
    rating: 4.97,
    reviewsCount: 178,
    startingPrice: 34999,
    priceFormatted: '₹34,999',
    idealDays: '6-8 Days',
    bestSeason: 'September – March',
    featured: true,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'God’s Own Country carved in emerald backwaters and tea hills.',
    highlights: [
      'Private traditional kettuvallam luxury houseboat cruise in Alleppey',
      'Rolling tea garden mist walk & high-tea in Munnar',
      'Kathakali cultural performance & Fort Kochi art walk',
      'Authentic Ayurvedic rejuvenation therapy & organic spice estate trail'
    ]
  },
  {
    id: 'dest-rajasthan',
    name: 'Rajasthan',
    country: 'India',
    subtitle: 'Majestic lake palaces, golden desert forts and royal Rajput hospitality.',
    tagline: 'Lake Pichola sunset boat glides in Udaipur, amber forts in Jaipur and desert luxury havelis.',
    category: 'Cultural',
    rating: 4.98,
    reviewsCount: 224,
    startingPrice: 42000,
    priceFormatted: '₹42,000',
    idealDays: '7-10 Days',
    bestSeason: 'October – March',
    featured: true,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'Where royalty, golden sands, and regal havelis come alive.',
    highlights: [
      'Private vintage boat cruise on Lake Pichola at sunset',
      'Exclusive guided heritage tour of Amer Fort & City Palace',
      'Royal candlelit dinner at a heritage haveli courtyard',
      'Desert glamping with folk music & starlit dunes in Jaisalmer'
    ]
  },
  {
    id: 'dest-ladakh',
    name: 'Ladakh',
    country: 'India',
    subtitle: 'High Himalayan moonscapes, azure Pangong Lake and cliffside Buddhist monasteries.',
    tagline: 'Pangong Tso azure waters, Khardung La highest motorable pass and Nubra Valley dunes.',
    category: 'Mountain',
    rating: 4.96,
    reviewsCount: 135,
    startingPrice: 46500,
    priceFormatted: '₹46,500',
    idealDays: '7-9 Days',
    bestSeason: 'May – September',
    featured: true,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'The Land of High Passes and cobalt Himalayan reflections.',
    highlights: [
      'Sunrise over shimmering turquoise Pangong Lake',
      'Double-humped Bactrian camel ride across Hunder white sand dunes',
      'Thiksey & Hemis monastery morning prayer chant',
      'Crossing Khardung La pass at 17,982 ft'
    ]
  },
  {
    id: 'dest-varanasi',
    name: 'Varanasi',
    country: 'India',
    subtitle: 'Timeless sacred ghats, evening Ganga Aarti and living spiritual history.',
    tagline: 'Dawn wooden rowboat glide along ancient ghats, vibrant silk weaving bazaars and soul-stirring rituals.',
    category: 'Cultural',
    rating: 4.95,
    reviewsCount: 112,
    startingPrice: 22999,
    priceFormatted: '₹22,999',
    idealDays: '3-5 Days',
    bestSeason: 'October – March',
    featured: false,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'One of the oldest continuously inhabited cities on Earth.',
    highlights: [
      'Sunrise private wooden boat glide on the sacred Ganges',
      'Reserved front-row seats for evening Dashashwamedh Ganga Aarti',
      'Sarnath deer park pilgrimage & ancient Buddhist stupa',
      'Historic Old City heritage food & Banarasi silk loom tour'
    ]
  },
  {
    id: 'dest-andaman',
    name: 'Andaman Islands',
    country: 'India',
    subtitle: 'Pristine turquoise lagoons, coral reefs and secluded white sands.',
    tagline: 'Radhanagar Beach sunset views, bioluminescent night kayaking and scuba diving in crystal waters.',
    category: 'Coastal',
    rating: 4.97,
    reviewsCount: 148,
    startingPrice: 39500,
    priceFormatted: '₹39,500',
    idealDays: '5-7 Days',
    bestSeason: 'October – May',
    featured: false,
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1400&q=85',
    editorialQuote: 'Tropical island paradise amidst coral reefs and emerald seas.',
    highlights: [
      'Private boat charter to Elephant Beach coral reef',
      'Sunset at Radhanagar Beach (voted Asia’s best beach)',
      'Sea karting & scuba diving at Havelock Island',
      'Cellular Jail light & sound historical chronicle'
    ]
  }
];

export const PACKAGES = [
  {
    id: 'pkg-kashmir-escape',
    destinationId: 'dest-kashmir',
    title: 'The Kashmir Escape',
    destination: 'Srinagar, Gulmarg & Pahalgam',
    days: 6,
    nights: 5,
    price: 49999,
    priceFormatted: '₹49,999',
    currency: '₹',
    pricePrefix: 'From',
    badge: 'Curated Heritage',
    rating: 4.97,
    reviews: 64,
    groupType: 'Private / Couple or Family',
    departureWindow: 'Daily Departures • Spring to Autumn',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'A poetic 6-day voyage through Dal Lake’s hand-carved heritage cedar houseboats, high-altitude alpine gondolas in Gulmarg, and serene pine valleys in Pahalgam.',
    editorialHighlight: 'Experience the crown of the Himalayas with dedicated private chauffeurs, cedar-paneled suites, and tranquil private Shikara glides.',
    highlights: [
      'Private transfers in luxury air-conditioned vehicle',
      'Luxury stay: 2 Nights Cedar Houseboat + 3 Nights 5-Star Boutique Resorts',
      'Curated sightseeing: Gulmarg Gondola Phase II tickets included',
      'Local experiences: Sunset Shikara ride, saffron farm & artisan shawl walk'
    ],
    inclusions: [
      '5 nights luxury accommodation (Premier Suite Cedar Houseboat + boutique mountain resorts)',
      'Private chauffeur-driven Innova Crysta for all transfers and excursions',
      'Daily gourmet Kashmiri breakfasts and traditional multi-course Wazwan dinners',
      'Complimentary 2-hour private Shikara tour with saffron Kahwa tea service',
      'Pre-booked priority passes for Gulmarg Gondola (Phase 1 & 2)',
      '24/7 dedicated local concierge and luggage handling'
    ],
    exclusions: ['Airfare to Srinagar (SXR)', 'Pony rides in Pahalgam', 'Personal shopping'],
    itinerarySummary: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Dal Lake Cedar Houseboat',
        desc: 'VIP greeting at Srinagar airport. Transfer to a hand-carved heritage houseboat on Dal Lake. Enjoy an evening Shikara glide as the sun paints the Pir Panjal mountains.'
      },
      {
        day: 2,
        title: 'Mughal Gardens & Old Srinagar Artisan Heritage',
        desc: 'Private guided tour of Shalimar and Nishat Bagh. Discover centuries-old copper artisans and cashmere weavers in the historic old quarters.'
      },
      {
        day: 3,
        title: 'Ascent to Gulmarg: Meadow of Flowers & Gondola',
        desc: 'Scenic drive to Gulmarg. Board the world-famous Gondola up to Apharwat Peak (13,780 ft) for breathtaking snow views. Stay at The Khyber or boutique pine lodge.'
      },
      {
        day: 4,
        title: 'Scenic Journey to Pahalgam (Valley of Shepherds)',
        desc: 'Meander through saffron fields in Pampore and apple orchards to Pahalgam. Evening riverside walk along the Lidder River.'
      },
      {
        day: 5,
        title: 'Betaab Valley & Aru Pine Trails',
        desc: 'Explore the unspoiled meadows of Betaab Valley and Aru. Special evening fireside dinner with traditional folk musicians.'
      },
      {
        day: 6,
        title: 'Return to Srinagar & Airport Farewell',
        desc: 'Private morning transfer to Srinagar Airport with a hand-selected saffron and walnut gift hamper.'
      }
    ]
  },
  {
    id: 'pkg-japan-zen',
    destinationId: 'dest-kyoto',
    title: 'Timeless Japan: Ryokan, Shinkansen & Heritage',
    destination: 'Tokyo, Hakone & Kyoto',
    days: 10,
    nights: 9,
    price: 4850,
    priceFormatted: '$4,850',
    currency: '$',
    pricePrefix: 'From',
    badge: 'Signature Tour',
    rating: 4.98,
    reviews: 114,
    groupType: 'Curated Private Journey',
    departureWindow: 'Year-Round Availability',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'A harmonious progression through modern Tokyo art, Mount Fuji private onsens, and centuries-old Kyoto bamboo groves.',
    editorialHighlight: 'Travel at your own rhythm with first-class bullet train passes and private master-led cultural ceremonies.',
    highlights: [
      'Private transfers & Green Car First Class Shinkansen passes',
      'Luxury stay: Palace Hotel Tokyo + Historic Gion Ryokan with private onsen',
      'Curated sightseeing: After-hours Fushimi Inari and teamLab Borderless VIP',
      'Local experiences: Private tea master ceremony and Tsukiji chef pairing'
    ],
    inclusions: [
      '5 nights luxury Tokyo hotel + 4 nights premier Kyoto Ryokan',
      'Unlimited JR 7-Day Shinkansen First Class passes',
      'Private tea ceremony with a 15th-generation Master',
      'Private after-hours tour of Fushimi Inari shrines',
      'Daily gourmet breakfasts & 3 traditional kaiseki course dinners',
      'Pocket Wi-Fi & 24/7 dedicated Tokyo/Kyoto local concierges'
    ],
    exclusions: ['International flights', 'Select lunches'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Tokyo & Palace Hotel Welcome', desc: 'VIP meet and greet at Haneda/Narita. Chauffeur to Palace Hotel Tokyo overlooking Imperial Gardens.' },
      { day: 2, title: 'Modern Tokyo Art & Ginza Gastronomy', desc: 'Private guided exploration of digital art, artisan knife crafters, and private omakase lunch.' },
      { day: 3, title: 'Old Edo Traditions & River Glide', desc: 'Asakusa Sensoji shrine, private Sumida river cruise, and sunset skyline cocktails.' },
      { day: 4, title: 'First-Class Shinkansen to Hakone & Mt. Fuji', desc: 'Thermal onsen retreat, open-air sculpture museum, and multi-course kaiseki.' },
      { day: 5, title: 'Bullet Train to Kyoto & Gion Evening Walk', desc: 'Arrive in ancient Kyoto. Lantern-lit twilight walk through preserved Gion teahouse alleys.' },
      { day: 6, title: 'Arashiyama Bamboo Groves & Tenryu-ji', desc: 'Early morning private access to bamboo pathways before crowds arrive.' },
      { day: 7, title: 'Fushimi Inari Shrines & Uji Matcha', desc: 'Guided peaceful ascent through red torii gates and artisan green tea harvest.' },
      { day: 8, title: 'Mindfulness Tea Ceremony & Zen Gardens', desc: 'Intimate tea preparation ceremony in a centuries-old sub-temple courtyard.' },
      { day: 9, title: 'Nara Deer Sanctuary & Heritage Bronze Buddha', desc: 'Tranquil day journey to ancient capital Nara and Todai-ji cedar pavilion.' },
      { day: 10, title: 'Kyoto Farewell & Airport Chauffeur', desc: 'Private transfer to Kansai / Tokyo airport with dedicated baggage escort.' }
    ]
  },
  {
    id: 'pkg-amalfi-luxury',
    destinationId: 'dest-amalfi',
    title: 'Amalfi Coastline & Cliffside Serenade',
    destination: 'Positano, Capri & Ravello',
    days: 7,
    nights: 6,
    price: 3450,
    priceFormatted: '$3,450',
    currency: '$',
    pricePrefix: 'From',
    badge: 'Best Seller',
    rating: 4.95,
    reviews: 78,
    groupType: 'Private Couple',
    departureWindow: 'Daily Departures • May to October',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'Sun-drenched cliffside terraces in Positano, full-day private Riva yacht charter to Capri, and candlelit dinners in Ravello gardens.',
    editorialHighlight: 'Indulge in Italian elegance where private skippers navigate azure coves and sommelier dinners overlook the sea.',
    highlights: [
      'Private transfers in Mercedes S-Class from Naples',
      'Luxury stay: 5-Star Boutique Cliffside Hotel with sea terrace',
      'Curated sightseeing: Full-day private Riva yacht charter to Capri',
      'Local experiences: Organic lemon grove walk & Michelin-starred cliffside dining'
    ],
    inclusions: [
      '6 nights in 5-star boutique cliffside hotel with private balcony',
      'Daily gourmet breakfast & 2 Michelin-starred dinners',
      'Full-day private Riva 38 yacht charter with English skipper & Prosecco',
      'Private Mercedes chauffeur for all transfers',
      'Exclusive lemon orchard & limoncello masterclass',
      '24/7 dedicated Mediterranean concierge'
    ],
    exclusions: ['International airfare', 'Personal insurance', 'Gratuities'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Naples & Chauffeur to Positano', desc: 'Private greeting at Naples airport. Scenic coastal transfer and welcome champagne.' },
      { day: 2, title: 'Private Riva Speedboat Charter to Capri', desc: 'Sail past Faraglioni rocks, swim in emerald coves, and stroll Capri piazzetta.' },
      { day: 3, title: 'Ravello Gardens & Historic Villa Rufolo', desc: 'Cliffside strolls through cascading rose gardens and an evening chamber concert.' },
      { day: 4, title: 'Culinary Masterclass & Ancient Wine Cellar', desc: 'Hands-on pasta masterclass with a coastal chef and sommelier wine flight.' },
      { day: 5, title: 'Path of the Gods Light Walk & Amalfi Duomo', desc: 'Panoramic walk high above the sea followed by espresso in Amalfi piazza.' },
      { day: 6, title: 'Day of Leisure & Sunset Terrace Farewell', desc: 'Couples spa treatment followed by a candlelit seaside terrace dinner.' },
      { day: 7, title: 'Private Chauffeur Return to Naples', desc: 'Scenic departure transfer with bespoke regional gift hamper.' }
    ]
  },
  {
    id: 'pkg-bali-sanctuary',
    destinationId: 'dest-bali',
    title: 'Bali Sanctuary: Private River Villa & Sacred Waters',
    destination: 'Ubud, Canggu & Uluwatu',
    days: 7,
    nights: 6,
    price: 2650,
    priceFormatted: '$2,650',
    currency: '$',
    pricePrefix: 'From',
    badge: 'Serene Sanctuary',
    rating: 4.93,
    reviews: 92,
    groupType: 'Couples / Wellness',
    departureWindow: 'Weekly Departures • Year-Round',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'Rejuvenate in secluded Ubud rainforest villas with private infinity pools, sacred water blessings, and cliffside sunsets in Uluwatu.',
    editorialHighlight: 'Immerse in holistic tranquility surrounded by emerald rice terraces, acoustic sound pyramids, and ocean breezes.',
    highlights: [
      'Private transfers with personal driver and luxury SUV',
      'Luxury stay: 4 Nights Ubud Rainforest Pool Villa + 2 Nights Cliffside Resort',
      'Curated sightseeing: Private speedboat to Nusa Penida viewpoints',
      'Local experiences: Sacred Tirta Empul purification & Pyramids of Chi sound bath'
    ],
    inclusions: [
      '4 nights Ubud luxury river pool villa + 2 nights oceanfront suite',
      'Daily organic farm-to-table breakfasts and afternoon artisan tea',
      '3-hour holistic flower bath and Ayurvedic body therapy',
      'Private holy spring water blessing ceremony at Tirta Empul',
      'Private chartered catamaran to secluded Nusa Penida beaches',
      '24/7 dedicated Bali island concierge'
    ],
    exclusions: ['International flights', 'Personal wellness extras'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Denpasar & Private Chauffeur to Ubud', desc: 'Private airport escort to your rainforest villa. Welcome herbal elixir and plunge pool relaxation.' },
      { day: 2, title: 'Tirta Empul Water Purification & Jungle Vistas', desc: 'Immerse in ancient spring water blessing guided by a Balinese cultural keeper.' },
      { day: 3, title: 'Tegallalang Terraces & Sunrise Yoga', desc: 'Morning meditation overlooking mist-veiled emerald rice paddies and organic lunch.' },
      { day: 4, title: 'Holistic Spa Day & Sound Healing', desc: 'Acoustic vibrational sound session at Pyramids of Chi followed by flower petal bath.' },
      { day: 5, title: 'Transfer to Uluwatu & Cliffside Sunset', desc: 'Check in to cliffside villa overlooking crashing Indian Ocean waves and twilight fire dance.' },
      { day: 6, title: 'Private Catamaran to Nusa Penida Coves', desc: 'Swim in crystal turquoise waters with gentle manta rays and savor beach picnic.' },
      { day: 7, title: 'Artisan Souvenirs & Airport Chauffeur', desc: 'Private escort to Denpasar airport with ceremonial woven keepsake.' }
    ]
  },
  {
    id: 'pkg-swiss-alps',
    destinationId: 'dest-swiss',
    title: 'Alpine Splendor: Glacier Rails & Zermatt Luxury',
    destination: 'Zurich, Zermatt & St. Moritz',
    days: 8,
    nights: 7,
    price: 4200,
    priceFormatted: '$4,200',
    currency: '$',
    pricePrefix: 'From',
    badge: 'Panoramic Deluxe',
    rating: 4.94,
    reviews: 58,
    groupType: 'Couples / Small Group',
    departureWindow: 'Winter & Summer Seasons',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'First-class panoramic train journeys, 5-star alpine chalets with Matterhorn views, and thermal mineral spa treatments.',
    editorialHighlight: 'Soar through alpine summits on the Glacier Express and car-free Zermatt with private mountain guides.',
    highlights: [
      'Private transfers & Swiss Travel Pass First Class rail passes',
      'Luxury stay: 5-Star alpine chalets with private mountain view balconies',
      'Curated sightseeing: Gornergrat cogwheel railway to Matterhorn observatory',
      'Local experiences: Swiss fondue tasting & private helicopter glacier tour'
    ],
    inclusions: [
      'Swiss Travel Pass First Class for all panoramic rails and lake boats',
      '7 nights in 5-star alpine hotels with mountain vista balconies',
      'Gornergrat cogwheel railway tickets to Matterhorn summit',
      'Daily hearty alpine breakfast & fondue tasting experience',
      'Luggage porter service from station to station',
      '24/7 Swiss concierge assistance'
    ],
    exclusions: ['Ski gear rental', 'International airfare'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Zurich & Lake Promenade', desc: 'Private airport meet. Check in to Baur au Lac and evening lake walk.' },
      { day: 2, title: 'Panoramic Rail to Interlaken & Eiger', desc: 'Ascend to the Top of Europe via futuristic Eiger Express cable car.' },
      { day: 3, title: 'Car-Free Zermatt & Alpine Chalet', desc: 'Arrive in quaint Zermatt. Check in to luxury chalet with direct Matterhorn views.' },
      { day: 4, title: 'Gornergrat Summit & Glacier Reflection', desc: 'Panoramic 360-degree views of 29 peaks over 4,000 meters.' },
      { day: 5, title: 'Glacier Express Excellence Class', desc: '8-hour panoramic rail across 291 stone bridges and through dramatic valleys.' },
      { day: 6, title: 'St. Moritz Glamour & Thermal Spa', desc: 'Relax in mineral springs and browse high-end boutiques.' },
      { day: 7, title: 'Bernina Express to Lake Lugano', desc: 'Dramatic descent from glistening snow down to palm trees.' },
      { day: 8, title: 'Return to Zurich & Homeward Flight', desc: 'First-class rail back to Zurich Airport.' }
    ]
  },
  {
    id: 'pkg-safari-migration',
    destinationId: 'dest-safari',
    title: 'The Great Migration: Serengeti & Masai Mara Safari',
    destination: 'Kenya & Tanzania',
    days: 9,
    nights: 8,
    price: 6900,
    priceFormatted: '$6,900',
    currency: '$',
    pricePrefix: 'From',
    badge: 'Bucket List Expedition',
    rating: 4.99,
    reviews: 58,
    groupType: 'Private Expedition',
    departureWindow: 'Year-Round (Peak: Jul - Oct)',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'Witness nature’s greatest wildlife spectacle from ultra-luxury tented camps with dedicated naturalists and a sunrise champagne balloon flight.',
    editorialHighlight: 'Immerse in untamed savanna luxury with private 4x4 Land Cruisers, butler service, and firelit dinners under African stars.',
    highlights: [
      'Private transfers in custom 4x4 Land Cruiser & bush flights',
      'Luxury stay: 8 nights in premier luxury tented suites with butler service',
      'Curated sightseeing: Sunrise hot air balloon flight with champagne bush breakfast',
      'Local experiences: Maasai elder cultural dialogue & private migration track'
    ],
    inclusions: [
      'Private 4x4 Land Cruiser with pop-up roof and expert naturalist',
      '8 nights in premier luxury tented camps with dedicated butler',
      'Sunrise hot air balloon flight with champagne bush breakfast',
      'All national park conservation fees included',
      'All gourmet meals, select wines and beverages throughout safari',
      'Bush flights between Nairobi, Mara and Serengeti'
    ],
    exclusions: ['International flights', 'Tanzania/Kenya visas'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Nairobi & Giraffe Manor Afternoon Tea', desc: 'Meet endangered Rothschild giraffes and stay at historic sanctuary.' },
      { day: 2, title: 'Scenic Bush Flight to Masai Mara Reserve', desc: 'First afternoon game drive tracking pride of lions and cheetahs.' },
      { day: 3, title: 'Sunrise Balloon Safari & Mara River Crossing', desc: 'Aerial views of vast herds followed by champagne bush breakfast.' },
      { day: 4, title: 'Full Day Game Drive & Bush Sundowner', desc: 'Cocktails on the ridge watching the crimson African sunset.' },
      { day: 5, title: 'Border Crossing to Northern Serengeti', desc: 'Scenic flight into the heart of predator territory.' },
      { day: 6, title: 'Serengeti Plains: The Big Five Safari', desc: 'Spot leopards in acacia trees and elephants at waterholes.' },
      { day: 7, title: 'Ngorongoro Crater Eden Descent', desc: 'Descend 600m into caldera teeming with rare black rhinos.' },
      { day: 8, title: 'Maasai Boma Cultural Experience & Starry Boma Dinner', desc: 'Traditional campfire gathering under the southern constellations.' },
      { day: 9, title: 'Flight to Kilimanjaro / Nairobi Departure', desc: 'Farewell bush lunch and transfer to international terminal.' }
    ]
  },
  {
    id: 'pkg-kerala-backwaters',
    destinationId: 'dest-kerala',
    title: 'Kerala Emerald Tranquility: Backwaters & Tea Hills',
    destination: 'Fort Kochi, Munnar & Alleppey',
    days: 6,
    nights: 5,
    price: 34999,
    priceFormatted: '₹34,999',
    currency: '₹',
    pricePrefix: 'From',
    badge: 'Popular Choice',
    rating: 4.97,
    reviews: 92,
    groupType: 'Couples / Families / Wellness',
    departureWindow: 'Daily Departures • Sep – Mar',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'Cruise on a private teak houseboat through mirror-still palm fringed canals, wake up to misty tea hill mornings in Munnar, and explore colonial Fort Kochi.',
    editorialHighlight: 'Experience God’s Own Country with authentic Ayurvedic wellness massages, spice plantation walks, and candlelit backwater houseboat dining.',
    highlights: [
      'Private 1-bedroom luxury Kettuvallam houseboat cruise in Alleppey',
      '2 Nights in heritage boutique tea plantation bungalow in Munnar',
      'Kathakali cultural dance drama & spice estate walk in Thekkady',
      'Private chauffeur transfers in air-conditioned Innova Crysta'
    ],
    inclusions: [
      '5 nights luxury accommodation (1 night Houseboat + 4 nights 5-Star Boutique Stays)',
      'All meals on houseboat (authentic traditional Kerala feast prepared by onboard chef)',
      'Daily gourmet breakfast & selected farm-to-table dinners',
      'Guided Fort Kochi art, Dutch Palace and Chinese Fishing Nets walk',
      'Complimentary 60-minute Ayurvedic rejuvenation massage per adult',
      'Private chauffeur vehicle for all sightseeing and intercity transfers'
    ],
    exclusions: ['Airfare to Kochi (COK)', 'Personal laundry', 'Optional speed boating'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Kochi & Fort Kochi Heritage Walk', desc: 'VIP meet at Kochi airport. Visit St. Francis Church, Jewish Synagogue, and Chinese fishing nets.' },
      { day: 2, title: 'Scenic Ascent to Misty Munnar Hills', desc: 'Drive through Cheeyappara waterfalls and cardamon hills. Check in to luxury tea estate resort.' },
      { day: 3, title: 'Tea Museum, Eravikulam & Echo Point', desc: 'Spot endangered Nilgiri Tahr at Eravikulam National Park and enjoy tea tasting masterclass.' },
      { day: 4, title: 'Spice Plantations of Thekkady', desc: 'Scenic journey to Periyar. Guided walking tour through aromatic cardamom, cinnamon and pepper estates.' },
      { day: 5, title: 'Alleppey Private Luxury Houseboat Cruise', desc: 'Board private kettuvallam. Glide along tranquil canals, observing village life, paddy fields and palm trees.' },
      { day: 6, title: 'Disembarkation & Departure from Kochi', desc: 'Traditional morning breakfast on the lake. Chauffeur transfer to Kochi Airport.' }
    ]
  },
  {
    id: 'pkg-rajasthan-royals',
    destinationId: 'dest-rajasthan',
    title: 'Royal Rajasthan: Palaces of Udaipur & Jaipur',
    destination: 'Jaipur, Jodhpur & Udaipur',
    days: 7,
    nights: 6,
    price: 42000,
    priceFormatted: '₹42,000',
    currency: '₹',
    pricePrefix: 'From',
    badge: 'Royal Heritage',
    rating: 4.98,
    reviews: 104,
    groupType: 'Heritage Enthusiasts / Luxury Travellers',
    departureWindow: 'Weekly Departures • Oct – Mar',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'A majestic 7-day royal escapade through the pink sandstone ramparts of Jaipur, Mehrangarh fort in Jodhpur, and shimmering Lake Pichola palace waters in Udaipur.',
    editorialHighlight: 'Live like royalty in converted palace hotels with vintage sunset boat rides, private historians, and decadent Rajasthani Thali banquets.',
    highlights: [
      'Sunset private boat charter on Lake Pichola passing Jag Mandir',
      'Exclusive skip-the-line access to Amer Fort and City Palace Jaipur',
      'Stay in authentic converted royal heritage havelis & luxury resorts',
      'Private chauffeur in luxury air-conditioned sedan throughout'
    ],
    inclusions: [
      '6 nights royal heritage palace accommodation with daily regal breakfasts',
      'Dedicated private historian guides in Jaipur, Jodhpur and Udaipur',
      'Lake Pichola private sunset cruise with refreshments',
      'Exclusive candlelit courtyard dinner with Kalbeliya folk dancers',
      'All monument entry tickets and palace toll passes included',
      'Chauffeur-driven luxury Innova Crysta for all interstate transfers'
    ],
    exclusions: ['Airfare to Jaipur / from Udaipur', 'Camera fees at monuments', 'Personal shopping'],
    itinerarySummary: [
      { day: 1, title: 'Royal Arrival Jaipur: The Pink City', desc: 'Traditional royal welcome at heritage hotel. Evening visit to Albert Hall and local bazaars.' },
      { day: 2, title: 'Amer Fort, Jal Mahal & Hawa Mahal', desc: 'Ascend to Amer Fort, capture mirror work at Sheesh Mahal, and view Hawa Mahal at sunset.' },
      { day: 3, title: 'City Palace & Jantar Mantar Observatory', desc: 'Explore royal armory, royal courtyards, and ancient astronomical instruments.' },
      { day: 4, title: 'Blue City Jodhpur & Mehrangarh Fort', desc: 'Journey to Jodhpur. Walk along the ramparts of Mehrangarh Fort overlooking indigo rooftops.' },
      { day: 5, title: 'Ranakpur Marble Temples to Romantic Udaipur', desc: 'Marvel at 1,444 uniquely carved marble pillars in Ranakpur. Arrive in the Venice of the East.' },
      { day: 6, title: 'Udaipur City Palace & Lake Pichola Cruise', desc: 'Private guided tour of Mewar treasures and sunset vintage boat ride on Lake Pichola.' },
      { day: 7, title: 'Saheliyon-ki-Bari & Udaipur Departure', desc: 'Morning visit to the Garden of the Maids. Transfer to Udaipur Maharana Pratap Airport.' }
    ]
  },
  {
    id: 'pkg-ladakh-odyssey',
    destinationId: 'dest-ladakh',
    title: 'The Great Ladakh Himalayan Odyssey',
    destination: 'Leh, Nubra Valley & Pangong Lake',
    days: 7,
    nights: 6,
    price: 46500,
    priceFormatted: '₹46,500',
    currency: '₹',
    pricePrefix: 'From',
    badge: 'Adventure Luxury',
    rating: 4.96,
    reviews: 78,
    groupType: 'Explorers / Photographers / Nature Lovers',
    departureWindow: 'Fixed Departures • May – Sep',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'Journey into the high Himalayas: cross the legendary Khardung La, ride double-humped camels along Nubra white dunes, and camp beside cobalt-blue Pangong Tso.',
    editorialHighlight: 'Experience raw Himalayan grandeur with heated luxury glamping tents, medical-grade oxygen backup, and private 4x4 mountain navigators.',
    highlights: [
      'Glamping overnight by the shores of the world’s highest saltwater lake (Pangong Tso)',
      'Cross Khardung La Pass (17,982 ft) with panoramic Karakoram views',
      'Double-humped Bactrian camel safari across Hunder sand dunes',
      'Morning prayer chants at 15th-century Thiksey Monastery'
    ],
    inclusions: [
      '6 nights premium accommodation (4 nights luxury Leh hotel + 2 nights heated glamping tents)',
      'All meals included (warm nutritious mountain meals, breakfasts & dinners)',
      'Private 4x4 Toyota Fortuner / Innova Crysta with seasoned mountain chauffeur',
      'All Ladakh Inner Line Permits and wildlife environmental fees',
      'Emergency oxygen cylinder on board at all times and 24/7 medical liaison',
      'Monastery entry passes and cultural guide in Leh'
    ],
    exclusions: ['Airfare to/from Leh (IXL)', 'Camel ride fees in Nubra', 'Personal travel insurance'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Leh & Acclimatization Day', desc: 'Scenic flight over Himalayas into Leh (11,500 ft). Complete rest with welcome butter tea.' },
      { day: 2, title: 'Shanti Stupa, Leh Palace & Hall of Fame', desc: 'Gentle walking tour of Leh bazaar, ancient palace ramparts, and panoramic Shanti Stupa sunset.' },
      { day: 3, title: 'Over Khardung La into Nubra Valley', desc: 'Ascend world’s highest motorable pass. Descend into Diskit with giant Buddha and Hunder dunes.' },
      { day: 4, title: 'Nubra to Cobalt Pangong Tso via Shyok', desc: 'Dramatic river route to Pangong Lake (14,270 ft). Watch the lake shift from cyan to deep cobalt.' },
      { day: 5, title: 'Pangong Sunrise & Return to Leh over Chang La', desc: 'Golden hour photography over crystal waters. Return over Chang La pass (17,590 ft).' },
      { day: 6, title: 'Thiksey, Shey Palace & Hemis Monastery', desc: 'Experience vibrant morning prayer horns at Thiksey, resembling Lhasa’s Potala Palace.' },
      { day: 7, title: 'Farewell Himalayas & Leh Departure', desc: 'Transfer to Kushok Bakula Rimpochee Airport with unforgettable mountain memories.' }
    ]
  },
  {
    id: 'pkg-goa-susegad',
    destinationId: 'dest-goa',
    title: 'Goa Susegad: Private Heritage Villa & Coastal Yacht',
    destination: 'Assagao, Morjim & Grand Island',
    days: 5,
    nights: 4,
    price: 38000,
    priceFormatted: '₹38,000',
    currency: '₹',
    pricePrefix: 'From',
    badge: 'Coastal Luxury',
    rating: 4.95,
    reviews: 86,
    groupType: 'Families & Private Groups',
    departureWindow: 'Year-Round • Peak: Oct – Apr',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'A slow-travel coastal escape featuring a private 4-bedroom restored Portuguese villa in leafy Assagao, private yacht charter to Grand Island, and curated chef dinners.',
    editorialHighlight: 'Discover the refined, tranquil side of Goa—secluded golden beaches, private skippers, and exquisite Indo-Portuguese gastronomy.',
    highlights: [
      'Private restored Indo-Portuguese villa with swimming pool & butler',
      'Private sunset catamaran cruise with dolphin spotting and refreshments',
      'Exclusive chef-curated seafood barbecue and feni cocktail tasting',
      'Kayaking through peaceful backwaters of Aldona and mangrove islands'
    ],
    inclusions: [
      '4 nights accommodation in luxury boutique heritage estate',
      'Daily gourmet breakfasts and one private poolside chef dinner',
      'Private 4-hour catamaran yacht charter to Grand Island',
      'Private chauffeur vehicle at disposal throughout your stay',
      'Chilled coconuts, welcome gift basket, and 24/7 villa manager'
    ],
    exclusions: ['Airfare to Goa (GOI/GOX)', 'Water sports equipment rental', 'Personal bar bills'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Goa & Susegad Villa Check-in', desc: 'Private airport transfer to your Assagao estate. Evening welcome cocktails by the pool.' },
      { day: 2, title: 'Old Goa Latin Quarter & Fontainhas Walk', desc: 'Stroll among pastel heritage homes in Panaji and visit historic Basilica of Bom Jesus.' },
      { day: 3, title: 'Private Catamaran Sail to Grand Island', desc: 'Board private yacht. Watch wild dolphins, snorkel in azure waters, and enjoy sunset drinks.' },
      { day: 4, title: 'Secluded Morjim Sands & Chef Barbecue', desc: 'Relax at tranquil Morjim beach club. Evening private grilled seafood feast at the villa.' },
      { day: 5, title: 'Morning Aldona Kayaking & Airport Transfer', desc: 'Gentle paddle through backwater mangroves before departing for Goa airport.' }
    ]
  },
  {
    id: 'pkg-andaman-paradise',
    destinationId: 'dest-andaman',
    title: 'Andaman Island Bliss: Havelock & Radhanagar',
    destination: 'Port Blair, Havelock & Neil Island',
    days: 6,
    nights: 5,
    price: 39500,
    priceFormatted: '₹39,500',
    currency: '₹',
    pricePrefix: 'From',
    badge: 'Island Haven',
    rating: 4.97,
    reviews: 69,
    groupType: 'Couples / Families / Divers',
    departureWindow: 'Daily Departures • Oct – May',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=85',
    shortDesc: 'Unwind on the world’s most pristine white-sand shores: explore vibrant coral reefs by boat, watch ethereal sunsets at Radhanagar Beach, and sail between emerald islands.',
    editorialHighlight: 'Experience India’s finest island retreat with luxury beachside villas, private catamaran ferries, and world-class scuba diving.',
    highlights: [
      'Stay in private beachfront pool villa at Havelock Island',
      'Premium Makruzz / Nautika private catamaran tickets between islands',
      'Private snorkeling excursion to Elephant Beach live coral reef',
      'Sunset cocktail experience at Radhanagar Beach'
    ],
    inclusions: [
      '5 nights luxury beachfront resort accommodation with daily gourmet breakfast',
      'All inter-island transfers via air-conditioned luxury catamaran (Royal Class)',
      'Complimentary snorkeling session with certified dive master',
      'Cellular Jail sound and light show tickets with historic guide',
      'Private air-conditioned vehicle for all road journeys in Port Blair & Havelock'
    ],
    exclusions: ['Airfare to Port Blair (IXZ)', 'Scuba diving certification', 'Personal camera fees'],
    itinerarySummary: [
      { day: 1, title: 'Arrival Port Blair & Historic Cellular Jail', desc: 'Airport welcome, check in to beachfront resort, and evening historic sound & light show.' },
      { day: 2, title: 'Catamaran to Havelock & Radhanagar Sunset', desc: 'Cruise to Havelock Island. Afternoon stroll on the powdery sands of Radhanagar Beach.' },
      { day: 3, title: 'Elephant Beach Coral Snorkel & Sea Karting', desc: 'Speedboat to Elephant Beach. Discover vibrant parrotfish, sea turtles and colorful coral reefs.' },
      { day: 4, title: 'Neil Island Natural Bridge & Laxmanpur Beach', desc: 'Ferry to peaceful Neil Island. Photograph the famous natural rock bridge and coral formations.' },
      { day: 5, title: 'Return to Port Blair & Chidiya Tapu Sunset', desc: 'Catamaran back to Port Blair. Scenic sunset drive through coastal forests to Chidiya Tapu.' },
      { day: 6, title: 'Souvenir Bazaars & Airport Farewell', desc: 'Browse handcrafted pearl jewelry and shell crafts before transfer to Port Blair Airport.' }
    ]
  }
];

// Agency Operational Mock Data (Aligned with Editorial Workspace prompt)
export const MOCK_AGENCY_STATS = {
  activeJourneys: 24,
  enquiriesAwaitingResponse: 8,
  tripsDepartingThisWeek: 5,
  monthlyRevenue: 384500,
  revenueFormatted: '$384,500',
  clientSatisfaction: '99.4%'
};

export const MOCK_TODAYS_ATTENTION = [
  {
    id: 'attn-1',
    type: 'enquiry',
    title: 'Customer enquiry',
    subtitle: 'Goa · 4 travellers',
    detail: 'Private heritage Portuguese villa with private chef & sunset yacht charter.',
    urgency: 'Requires response today',
    actionLabel: 'Review enquiry',
    targetTab: 'enquiries'
  },
  {
    id: 'attn-2',
    type: 'quotation',
    title: 'Quotation awaiting approval',
    subtitle: 'Amalfi Coast · Sarah Jenkins',
    detail: 'Bespoke 7-day quotation with Le Sirenuse and private Riva boat to Capri.',
    urgency: 'Sent 18 hours ago',
    actionLabel: 'View quotation',
    targetTab: 'quotations'
  },
  {
    id: 'attn-3',
    type: 'departure',
    title: 'Kashmir journey: Departure tomorrow',
    subtitle: 'Vikram & Radhika Singhania · 2 travellers',
    detail: 'Flight 6E-2415 arriving SXR 11:20 AM. Chauffeur Tariq assigned with luxury cedar houseboat.',
    urgency: 'Operational check complete',
    actionLabel: 'Inspect flight & voucher',
    targetTab: 'bookings'
  }
];

export const MOCK_ENQUIRIES = [
  {
    id: 'ENQ-8495',
    customerName: 'Aarav & Meera Kapoor',
    email: 'aarav.kapoor@innovate.co',
    phone: '+91 98201 44552',
    destination: 'Goa',
    travelDates: 'Nov 14 – Nov 20, 2026',
    travelers: '4 Travellers (Family)',
    budget: '₹4,50,000 – ₹6,000,000',
    preferredStyle: 'Private Portuguese Heritage Villa & Yacht',
    status: 'New',
    createdAt: '45 mins ago',
    specialNotes: 'Looking for a private heritage villa in Assagao with private chef and a sunset catamaran charter to Grand Island.'
  },
  {
    id: 'ENQ-8491',
    customerName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-8901',
    destination: 'Amalfi Coast, Italy',
    travelDates: 'May 12 – May 20, 2026',
    travelers: '2 Adults (Honeymoon)',
    budget: '$8,000 – $10,000',
    preferredStyle: 'Luxury Boutique & Private Yacht',
    status: 'Quoted',
    createdAt: '2 hours ago',
    specialNotes: 'Looking for a private plunge pool room in Positano and a chartered boat to Capri with English skipper.'
  },
  {
    id: 'ENQ-8488',
    customerName: 'David & Emily Vance',
    email: 'dvance@travelventure.org',
    phone: '+44 20 7946 0912',
    destination: 'Japan (Tokyo & Kyoto)',
    travelDates: 'Oct 04 – Oct 16, 2026',
    travelers: '2 Adults, 1 Child (Age 11)',
    budget: '$12,000 – $15,000',
    preferredStyle: 'Cultural Immersion & High-Speed Rail',
    status: 'Quoted',
    createdAt: 'Yesterday',
    specialNotes: 'Interested in private onsen Ryokan in Kyoto and master tea ceremony.'
  },
  {
    id: 'ENQ-8472',
    customerName: 'Vikram & Radhika Singhania',
    email: 'v.singhania@apexholding.in',
    phone: '+91 98110 99882',
    destination: 'Kashmir Valley',
    travelDates: 'Tomorrow – 6 Days',
    travelers: '2 Adults (Anniversary)',
    budget: '₹1,20,000',
    preferredStyle: 'Cedar Houseboat & Gulmarg Ski Resort',
    status: 'Won',
    createdAt: '3 days ago',
    specialNotes: 'Anniversary celebration. VIP flowers on houseboat and warm Kahwa service.'
  }
];

export const MOCK_QUOTATIONS = [
  {
    id: 'QUO-2026-105',
    enquiryId: 'ENQ-8495',
    clientName: 'Aarav & Meera Kapoor',
    destination: 'Goa Heritage Villa & Private Catamaran',
    amount: 520000,
    amountFormatted: '₹5,20,000',
    currency: '₹',
    validUntil: 'Nov 01, 2026',
    status: 'Pending Review',
    items: [
      { name: 'Villa Amor 4-Bedroom Heritage Estate (6 Nights)', cost: 320000 },
      { name: 'Private Gourmet Chef & Seafood Sommelier Pairing', cost: 85000 },
      { name: 'Sunset Catamaran Yacht Cruise with Champagne & Watersports', cost: 65000 },
      { name: 'Luxury Mercedes Van Chauffeur & Airport Escort', cost: 50000 }
    ],
    agentName: 'Rohan Deshmukh',
    agentRole: 'India Private Journeys Director',
    agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    notes: 'Includes all villa taxes, dedicated estate butler, and airport VIP greeting.'
  },
  {
    id: 'QUO-2026-098',
    enquiryId: 'ENQ-8491',
    clientName: 'Sarah Jenkins',
    destination: 'Amalfi Coast Romantic Haven (7 Days)',
    amount: 7900,
    amountFormatted: '$7,900',
    currency: '$',
    validUntil: 'May 30, 2026',
    status: 'Awaiting Approval',
    items: [
      { name: 'Le Sirenuse Positano Deluxe Sea View (6 Nights)', cost: 4900 },
      { name: 'Private Riva 38 Yacht Charter to Capri with Skipper & Wine', cost: 1650 },
      { name: 'Private Chauffeur Mercedes Class E from Naples', cost: 650 },
      { name: 'Exclusive Vineyard & Michelin Dinner Reservation', cost: 700 }
    ],
    agentName: 'Elena Rostova',
    agentRole: 'Mediterranean Destination Specialist',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    notes: 'Quote prepared with Le Sirenuse cliffside sea view suite.'
  }
];

export const MOCK_BOOKINGS = [
  {
    id: 'BK-9950',
    bookingRef: 'AV-2026-9950',
    customerName: 'Vikram & Radhika Singhania',
    packageName: 'The Kashmir Escape',
    destination: 'Srinagar, Gulmarg & Pahalgam',
    dates: 'Tomorrow – 6 Days (Departing Tomorrow)',
    travelersCount: 2,
    totalPrice: 120000,
    priceFormatted: '₹1,20,000',
    currency: '₹',
    paidAmount: 120000,
    paymentStatus: 'Paid in Full',
    bookingStatus: 'Departing Tomorrow',
    hotelName: 'Sukoon Luxury Houseboat & The Khyber Resort',
    flightCode: '6E-2415 (Delhi -> Srinagar)',
    voucherAvailable: true,
    agentContact: 'Rohan Deshmukh (+91 98100 12345)',
    itineraryDays: [
      {
        day: 1,
        date: 'Day 1',
        title: 'Arrival in Srinagar & Dal Lake Cedar Houseboat',
        time: '11:20 AM',
        location: 'Srinagar Airport (SXR)',
        type: 'Transfer',
        description: 'Chauffeur Tariq will meet you at Terminal 1. Private transfer to Sukoon Luxury Houseboat on Dal Lake. Welcome Kashmiri Kehwa.',
        badge: 'Private Chauffeur'
      },
      {
        day: 2,
        date: 'Day 2',
        title: 'Mughal Gardens & Artisan Cashmere Weavers',
        time: '10:00 AM',
        location: 'Old Srinagar',
        type: 'Excursion',
        description: 'Exclusive visit to Shalimar Bagh followed by a private meeting with Master Shawl Artisan Ghulam.',
        badge: 'Cultural Master'
      },
      {
        day: 3,
        date: 'Day 3',
        title: 'Ascent to Gulmarg & Gondola High Peak',
        time: '09:00 AM',
        location: 'Gulmarg',
        type: 'Alpine',
        description: 'Scenic drive to Gulmarg. Pre-booked VIP Gondola ascent to Phase 2 (13,780 ft). Check in to The Khyber Resort.',
        badge: 'VIP Gondola'
      }
    ]
  },
  {
    id: 'BK-9942',
    bookingRef: 'AV-2026-9942',
    customerName: 'Sarah Jenkins',
    packageName: 'Amalfi Coastline & Cliffside Serenade',
    destination: 'Amalfi Coast, Italy',
    dates: 'May 12 – May 18, 2026',
    travelersCount: 2,
    totalPrice: 7900,
    priceFormatted: '$7,900',
    currency: '$',
    paidAmount: 2500,
    paymentStatus: 'Deposit Paid (Balance due in 30 days)',
    bookingStatus: 'Confirmed',
    hotelName: 'Villa Franca Luxury Suites, Positano',
    flightCode: 'LH-1428 (Frankfurt -> Naples)',
    voucherAvailable: true,
    agentContact: 'Elena Rostova (+39 089 875 110)',
    itineraryDays: [
      {
        day: 1,
        date: 'May 12',
        title: 'Arrival in Naples & Private Transfer to Positano',
        time: '14:30',
        location: 'Naples Capodichino Airport',
        type: 'Transfer',
        description: 'Driver Roberto will meet you at Terminal 1 with an AuraVoyage sign. Travel in Mercedes S-Class directly to Positano.',
        badge: 'Private Chauffeur'
      },
      {
        day: 2,
        date: 'May 13',
        title: 'Private Riva Speedboat Charter to Capri',
        time: '09:30',
        location: 'Positano Pier',
        type: 'Excursion',
        description: 'Board your private 38-foot Riva vessel with Skipper Marco. Visit the Faraglioni rocks, White Grotto, and enjoy chilled Prosecco on deck.',
        badge: 'VIP Yacht'
      }
    ]
  }
];

export const MOCK_CUSTOMERS = [
  {
    id: 'CUST-101',
    name: 'Vikram Singhania',
    email: 'v.singhania@apexholding.in',
    phone: '+91 98110 99882',
    city: 'Mumbai, India',
    tier: 'Private Member',
    totalTrips: 4,
    totalSpent: '₹14,50,000',
    lastTrip: 'The Kashmir Escape (Departing Tomorrow)'
  },
  {
    id: 'CUST-102',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-8901',
    city: 'San Francisco, USA',
    tier: 'Platinum Voyager',
    totalTrips: 3,
    totalSpent: '$21,500',
    lastTrip: 'Amalfi Coast (May 2026)'
  },
  {
    id: 'CUST-103',
    name: 'Aarav Kapoor',
    email: 'aarav.kapoor@innovate.co',
    phone: '+91 98201 44552',
    city: 'Delhi, India',
    tier: 'Gold Traveler',
    totalTrips: 2,
    totalSpent: '₹8,40,000',
    lastTrip: 'Goa Heritage Villa (Quoted)'
  }
];

export const MOCK_CHAT_MESSAGES = [
  {
    id: 1,
    sender: 'agent',
    agentName: 'Elena Rostova',
    text: 'Good morning Sarah! Welcome to AuraVoyage. I have received your enquiry for the Amalfi Coast honeymoon trip.',
    time: '09:15 AM'
  },
  {
    id: 2,
    sender: 'agent',
    agentName: 'Elena Rostova',
    text: 'I have secured exclusive availability at Villa Franca in Positano with a private cliffside terrace overlooking the bay. Have you reviewed the quotation?',
    time: '09:16 AM'
  },
  {
    id: 3,
    sender: 'customer',
    text: 'Hi Elena! Yes, the itinerary looks breathtaking! Could we make sure the private boat to Capri includes a stop at the Faraglioni rocks for a swim?',
    time: '09:22 AM'
  },
  {
    id: 4,
    sender: 'agent',
    agentName: 'Elena Rostova',
    text: 'Absolutely! Skipper Marco will anchor right between the Faraglioni rocks, with snorkeling masks and chilled Italian Prosecco ready for you.',
    time: '09:25 AM'
  }
];

export const TRAVEL_EXPERIENCES = [
  {
    id: 'exp-snow',
    category: 'Snow Adventures',
    title: 'Gulmarg Gondola & Powder Snow',
    location: 'Gulmarg, Kashmir',
    duration: 'Full Day',
    price: '₹4,500',
    tag: 'Must Do',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Kashmir',
    description: 'Ascend to Apharwat Peak at 13,780 ft aboard the world\'s highest cable car.'
  },
  {
    id: 'exp-island',
    category: 'Island Escapes',
    title: 'Nusa Penida Private Speedboat',
    location: 'Bali, Indonesia',
    duration: 'Full Day',
    price: '$180',
    tag: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Bali',
    description: 'Swim with manta rays at Manta Point and explore dramatic Kelingking cliffs.'
  },
  {
    id: 'exp-trek',
    category: 'Mountain Treks',
    title: 'Aru Valley & Lidder Pine Trails',
    location: 'Pahalgam, Kashmir',
    duration: '5 Hours',
    price: '₹3,200',
    tag: 'Nature',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Kashmir',
    description: 'Trek through virgin pine forests, crystal alpine streams, and shepherd meadows.'
  },
  {
    id: 'exp-food',
    category: 'Food & Culture',
    title: 'Gion Evening Lantern & Kaiseki Walk',
    location: 'Kyoto, Japan',
    duration: '4 Hours',
    price: '$240',
    tag: 'Cultural',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Kyoto',
    description: 'Explore quiet cobblestone alleys with a local food historian and multi-course dining.'
  },
  {
    id: 'exp-heritage',
    category: 'Heritage & History',
    title: 'Dal Lake Sunrise Shikara & Kehwa',
    location: 'Srinagar, Kashmir',
    duration: '3 Hours',
    price: '₹2,500',
    tag: 'Iconic',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Kashmir',
    description: 'Gliding past floating vegetable markets as morning mist reveals the Himalayas.'
  },
  {
    id: 'exp-beach',
    category: 'Beach Life',
    title: 'Sunset Catamaran to Grand Island',
    location: 'Assagao, Goa',
    duration: '4 Hours',
    price: '₹6,500',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Goa',
    description: 'Chartered catamaran sail with dolphins, coastal snorkeling, and chilled refreshments.'
  },
  {
    id: 'exp-safari',
    category: 'Wildlife',
    title: 'Serengeti Sunrise Balloon Safari',
    location: 'Serengeti, Tanzania',
    duration: '5 Hours',
    price: '$550',
    tag: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Serengeti',
    description: 'Float over herds of wildebeest at dawn followed by a champagne bush breakfast.'
  },
  {
    id: 'exp-romance',
    category: 'Romantic Escapes',
    title: 'Private Riva Charter to Capri Caves',
    location: 'Amalfi Coast, Italy',
    duration: 'Full Day',
    price: '$380',
    tag: 'Romantic',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Amalfi',
    description: 'Cruise along pastel cliffs, swim in azure coves, and dine on clifftop terraces.'
  },
  {
    id: 'exp-kerala-houseboat',
    category: 'Waterways & Wellness',
    title: 'Alleppey Teak Houseboat Sunset Cruise',
    location: 'Alleppey, Kerala',
    duration: '4 Hours',
    price: '₹5,500',
    tag: 'Must Do',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Kerala',
    description: 'Glide along coconut-lined lagoons with onboard tea, warm banana fritters, and village vistas.'
  },
  {
    id: 'exp-udaipur-boat',
    category: 'Royal Heritage',
    title: 'Lake Pichola Royal Vintage Boat Ride',
    location: 'Udaipur, Rajasthan',
    duration: '2 Hours',
    price: '₹3,800',
    tag: 'Iconic',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Rajasthan',
    description: 'Chartered wooden boat passing City Palace and Jag Mandir island palace bathed in amber dusk.'
  },
  {
    id: 'exp-pangong-camp',
    category: 'Himalayan Expeditions',
    title: 'Pangong Tso Cobalt Sunrise & Stargazing',
    location: 'Pangong Lake, Ladakh',
    duration: 'Overnight',
    price: '₹8,500',
    tag: 'Bucket List',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=85',
    destinationQuery: 'Ladakh',
    description: 'Breathtaking golden-hour reflections at 14,270 ft with bonfire and unpolluted Milky Way skies.'
  }
];

export const TRAVEL_INTENTS = [
  {
    id: 'escape',
    title: 'I want to escape',
    tagline: 'Beach escapes & private island villas',
    mood: 'Coastal',
    query: 'Goa',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'adventure',
    title: 'I want adventure',
    tagline: 'Mountain trails, snow peaks & gondolas',
    mood: 'Mountain',
    query: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'slow',
    title: 'I want to slow down',
    tagline: 'Peaceful lakeside stays, cedar woods & wellness',
    mood: 'Mountain',
    query: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'explore',
    title: 'I want to explore',
    tagline: 'Ancient temple alleys, vibrant bazaars & culture',
    mood: 'Cultural',
    query: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'romance',
    title: 'I want a romantic trip',
    tagline: 'Sunset cliff terraces, candlelit dinners & suites',
    mood: 'Coastal',
    query: 'Amalfi',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'budget',
    title: 'I want a budget trip',
    tagline: 'Affordable scenic escapes under ₹30,000',
    mood: 'Coastal',
    query: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85'
  }
];

export const TRAVEL_INSPIRATION = [
  {
    id: 'insp-1',
    title: 'A perfect 5-day Kashmir escape: The complete route',
    category: 'Itinerary Guide',
    readTime: '5 min read',
    destination: 'Kashmir, India',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=85',
    summary: 'How to combine morning Dal Lake houseboats, Gulmarg Gondola Phase II, and secluded pine meadows in Pahalgam.'
  },
  {
    id: 'insp-2',
    title: '7 coastal spots in Goa away from the crowds',
    category: 'Hidden Gems',
    readTime: '4 min read',
    destination: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=85',
    summary: 'Beyond the crowded shores: Assagao heritage Portuguese estates, quiet mangrove kayaking, and secret coves.'
  },
  {
    id: 'insp-3',
    title: 'Where to travel this winter: Snow peaks vs warm shores',
    category: 'Seasonal Guide',
    readTime: '6 min read',
    destination: 'Global',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=85',
    summary: 'Comparing Gulmarg ski lodges and Swiss chalets with sunny Bali pool villas and Amalfi autumn cliffs.'
  },
  {
    id: 'insp-4',
    title: '10 cultural experiences in Kyoto worth travelling for',
    category: 'Experience Guide',
    readTime: '5 min read',
    destination: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=85',
    summary: 'From private matcha ceremonies with 15th-generation masters to twilight lantern walks along the Shirakawa canal.'
  }
];

export const HOTELS = [
  {
    id: 'hotel-khyber',
    name: 'The Khyber Himalayan Resort & Spa',
    destination: 'Gulmarg, Kashmir',
    country: 'India',
    category: 'Alpine Resort',
    rating: 4.96,
    reviewsCount: 218,
    pricePerNight: 28500,
    priceFormatted: '₹28,500',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85',
    tag: 'Mountain Luxury',
    amenities: ['Heated Glass Pool', 'L’Occitane Spa', 'Ski-in Ski-out', 'Pine Forest Views'],
    description: 'Perched 8,825 feet above sea level amidst 7 acres of coniferous forest, offering sweeping Pir Panjal mountain vistas.'
  },
  {
    id: 'hotel-sukoon',
    name: 'Sukoon Luxury Cedar Houseboat',
    destination: 'Dal Lake, Srinagar',
    country: 'India',
    category: 'Heritage Houseboat',
    rating: 4.98,
    reviewsCount: 164,
    pricePerNight: 21000,
    priceFormatted: '₹21,000',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
    tag: 'Dal Lake Sanctuary',
    amenities: ['Hand-Carved Cedar', 'Rooftop Sundeck', 'Private Butler', 'Gourmet Kashmiri Wazwan'],
    description: 'Eco-conscious bespoke houseboat moored at quiet Dal Lake shores, offering serene sunrise tea and shikara transfers.'
  },
  {
    id: 'hotel-udaivilas',
    name: 'The Oberoi Udaivilas',
    destination: 'Udaipur, Rajasthan',
    country: 'India',
    category: 'Heritage Palace',
    rating: 4.99,
    reviewsCount: 342,
    pricePerNight: 55000,
    priceFormatted: '₹55,000',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85',
    tag: 'Royal Heritage',
    amenities: ['Semi-Private Moat Pools', 'Private Shikara Arrival', 'Ayurvedic Spa', 'Lake Pichola Vistas'],
    description: 'Built on 50 acres of 200-year-old hunting grounds with decorative domes, hand-painted frescoes and majestic pavilions.'
  },
  {
    id: 'hotel-ahilya',
    name: 'Ahilya by the Sea',
    destination: 'Dolphin Bay, Goa',
    country: 'India',
    category: 'Boutique Coastal',
    rating: 4.94,
    reviewsCount: 130,
    pricePerNight: 26000,
    priceFormatted: '₹26,000',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
    tag: 'Secluded Haven',
    amenities: ['Sunrise Ocean Plunge', 'Tropical Frangipani Gardens', 'Bespoke Seafood', 'Private Catamaran'],
    description: 'Tucked away in a peaceful corner of Dolphin Bay, offering an intimate susegad villa experience with crashing surf.'
  },
  {
    id: 'hotel-kumarakom',
    name: 'Kumarakom Lake Resort',
    destination: 'Vembanad Lake, Kerala',
    country: 'India',
    category: 'Waterfront Sanctuary',
    rating: 4.95,
    reviewsCount: 189,
    pricePerNight: 24500,
    priceFormatted: '₹24,500',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    tag: 'Ayurvedic Haven',
    amenities: ['Meandering Pool Suites', 'Heritage Kerala Homesteads', 'Ayurmana Spa', 'Backwater Sunset Cruise'],
    description: 'Centuries-old restored traditional heritage villas along the banks of emerald Vembanad Lake.'
  },
  {
    id: 'hotel-fourseasons-bali',
    name: 'Four Seasons Resort Bali at Sayan',
    destination: 'Ubud, Bali',
    country: 'Indonesia',
    category: 'River Valley Sanctuary',
    rating: 4.97,
    reviewsCount: 275,
    pricePerNight: 680,
    priceFormatted: '$680',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
    tag: 'Iconic Architecture',
    amenities: ['Suspension Bridge Entry', 'Ayung River Plunge Pools', 'Sacred River Spa', 'Chakra Ceremonies'],
    description: 'Architectural masterpiece immersed in lush jungle canopy overlooking sacred Ayung River ravines.'
  },
  {
    id: 'hotel-sirenuse',
    name: 'Le Sirenuse',
    destination: 'Positano, Amalfi Coast',
    country: 'Italy',
    category: 'Cliffside Luxury',
    rating: 4.98,
    reviewsCount: 310,
    pricePerNight: 1250,
    priceFormatted: '$1,250',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
    tag: 'Positano Icon',
    amenities: ['Champagne & Oyster Bar', 'Riva Yacht Charters', 'Cliffside Lemon Terraces', 'Bespoke Fragrances'],
    description: 'Historic family-run 18th-century Palazzo overlooking the pastel cascade and cobalt waters of Positano bay.'
  },
  {
    id: 'hotel-hoshinoya-kyoto',
    name: 'Hoshinoya Kyoto',
    destination: 'Arashiyama, Kyoto',
    country: 'Japan',
    category: 'Riverside Ryokan',
    rating: 4.99,
    reviewsCount: 195,
    pricePerNight: 890,
    priceFormatted: '$890',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
    tag: 'Zen Haven',
    amenities: ['Private Riverboat Arrival', 'Tatami Garden Pavilions', 'Michelin Kaiseki', 'Tea Master Salon'],
    description: 'Secluded 17th-century riverside pavilion accessed only by private wooden boat along the Oi River gorge.'
  },
  {
    id: 'hotel-chedi',
    name: 'The Chedi Andermatt',
    destination: 'Andermatt, Swiss Alps',
    country: 'Switzerland',
    category: 'Alpine Retreat',
    rating: 4.97,
    reviewsCount: 154,
    pricePerNight: 950,
    priceFormatted: '$950',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85',
    tag: 'Alpine Sanctuary',
    amenities: ['35m Indoor Heated Pool', 'Wine & Cigar Lounges', 'Ski Butler Service', 'Tibetan Herbal Spa'],
    description: 'Jean-Michel Gathy designed contemporary alpine masterpiece combining Swiss chalet comfort with Asian serenity.'
  }
];

