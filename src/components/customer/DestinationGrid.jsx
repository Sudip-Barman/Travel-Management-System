import React, { useState } from 'react';
import { ArrowRight, Star, Clock, MapPin, Sparkles, Compass, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TRAVEL_EXPERIENCES, TRAVEL_INTENTS, TRAVEL_INSPIRATION } from '../../data/mockData';

export const DestinationGrid = () => {
  const {
    destinations,
    setCustomerTab,
    setPackageSearchQuery,
    setDestinationFilter,
    destinationFilter
  } = useApp();

  const [regionFilter, setRegionFilter] = useState('All');

  const handleExplore = (destName, mood) => {
    setPackageSearchQuery(destName);
    if (mood) setDestinationFilter(mood);
    setCustomerTab('packages');
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExperienceClick = (exp) => {
    setPackageSearchQuery(exp.destinationQuery || exp.location.split(',')[0]);
    setCustomerTab('packages');
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleIntentClick = (intent) => {
    if (intent.query) setPackageSearchQuery(intent.query);
    if (intent.mood) setDestinationFilter(intent.mood);
    setCustomerTab('packages');
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInspirationClick = (insp) => {
    const dest = insp.destination.split(',')[0];
    if (dest !== 'Global') {
      setPackageSearchQuery(dest);
    }
    setCustomerTab('packages');
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Specific custom pricing & descriptors for the editorial layout
  const enrichedDestinations = [
    {
      ...destinations.find(d => d.id === 'dest-kashmir') || destinations[0],
      descriptor: 'Mountains • Lakes • Snow Peaks',
      startingPrice: 'From ₹18,999',
      bestExperience: 'Sunset Shikara & Gulmarg Gondola Phase II',
      colSpan: 'lg:col-span-2',
      aspectRatio: 'aspect-[16/10] sm:aspect-[21/11]'
    },
    {
      ...destinations.find(d => d.id === 'dest-kerala') || {},
      id: 'dest-kerala',
      name: 'Kerala',
      country: 'India',
      category: 'Coastal',
      descriptor: 'Backwaters • Tea Hills • Ayurveda',
      startingPrice: 'From ₹34,999',
      bestExperience: 'Alleppey Teak Houseboat & Munnar Tea High-Tea',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85',
      rating: 4.97,
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-rajasthan') || {},
      id: 'dest-rajasthan',
      name: 'Rajasthan',
      country: 'India',
      category: 'Cultural',
      descriptor: 'Royal Palaces • Lake Pichola • Forts',
      startingPrice: 'From ₹42,000',
      bestExperience: 'Lake Pichola Sunset Boat & Amer Fort Heritage',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85',
      rating: 4.98,
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-ladakh') || {},
      id: 'dest-ladakh',
      name: 'Ladakh',
      country: 'India',
      category: 'Mountain',
      descriptor: 'High Passes • Pangong Tso • Monasteries',
      startingPrice: 'From ₹46,500',
      bestExperience: 'Pangong Cobalt Lake & Nubra Desert Camel Trail',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1400&q=85',
      rating: 4.96,
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-goa') || destinations[3],
      descriptor: 'Heritage Estates • Catamarans • Golden Sands',
      startingPrice: 'From ₹24,500',
      bestExperience: 'Assagao Portuguese Villa & Sunset Sail',
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-varanasi') || {},
      id: 'dest-varanasi',
      name: 'Varanasi',
      country: 'India',
      category: 'Cultural',
      descriptor: 'Sacred Ghats • Ganga Aarti • Silk Weavers',
      startingPrice: 'From ₹22,999',
      bestExperience: 'Sunrise Ganges Rowboat & Evening Ganga Aarti',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=85',
      rating: 4.95,
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-andaman') || {},
      id: 'dest-andaman',
      name: 'Andaman Islands',
      country: 'India',
      category: 'Coastal',
      descriptor: 'Turquoise Waters • Coral Reefs • White Sands',
      startingPrice: 'From ₹39,500',
      bestExperience: 'Radhanagar Sunset & Elephant Beach Snorkel',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1400&q=85',
      rating: 4.97,
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-bali') || destinations[4],
      descriptor: 'Beaches • Temples • Emerald Valleys',
      startingPrice: 'From ₹32,999',
      bestExperience: 'Ubud Pool Villa & Nusa Penida Cruise',
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-amalfi') || destinations[1],
      descriptor: 'Cliffs • Lemon Groves • Azure Waters',
      startingPrice: 'From $3,450',
      bestExperience: 'Capri Private Riva Yacht & Positano Suites',
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-kyoto') || destinations[2],
      descriptor: 'Ancient Shrines • Bamboo Groves • Geisha Alleys',
      startingPrice: 'From $4,850',
      bestExperience: 'Garden Ryokan Onsen & 15th-Gen Tea Master',
      colSpan: 'lg:col-span-1',
      aspectRatio: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]'
    },
    {
      ...destinations.find(d => d.id === 'dest-swiss') || destinations[5],
      descriptor: 'Glaciers • Matterhorn • Panoramic Rails',
      startingPrice: 'From $4,200',
      bestExperience: 'Glacier Express Excellence Class & Zermatt Chalet',
      colSpan: 'lg:col-span-2',
      aspectRatio: 'aspect-[16/10] sm:aspect-[21/11]'
    }
  ];

  const displayedDestinations = enrichedDestinations.filter((dest) => {
    if (regionFilter === 'India') return dest.country === 'India';
    if (regionFilter === 'International') return dest.country !== 'India';
    if (regionFilter === 'Mountain') return dest.category === 'Mountain';
    if (regionFilter === 'Coastal') return dest.category === 'Coastal';
    if (regionFilter === 'Cultural') return dest.category === 'Cultural';
    return true;
  });

  return (
    <div id="destinations" className="bg-canvas text-ink overflow-x-hidden">

      {/* =========================================================================
          SECTION 1: POPULAR DESTINATIONS ("Explore destinations")
          Varied image compositions • Real travel pricing • Real experiences
          ========================================================================= */}
      <section className="pt-14 sm:pt-20 pb-16 sm:pb-24 border-b border-black/[0.07]">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase text-champagne-dark font-semibold mb-2">
                <Compass size={14} className="text-champagne-dark" />
                <span>Popular Destinations</span>
              </div>
              <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-normal uppercase text-ink leading-[0.96] tracking-[-0.02em]">
                Explore destinations
              </h2>
            </div>

            <p className="text-sm md:text-base text-ink-muted font-light max-w-[420px] leading-relaxed">
              Hand-picked regions with vetted boutique stays, seamless transfers, and unforgettable local highlights.
            </p>
          </div>

          {/* Region & Style Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 border-b border-black/[0.07] scrollbar-none">
            {[
              { id: 'All', label: 'All Destinations' },
              { id: 'India', label: 'Incredible India 🇮🇳' },
              { id: 'International', label: 'International Escapes 🌍' },
              { id: 'Mountain', label: 'Mountains 🏔️' },
              { id: 'Coastal', label: 'Beaches & Waters 🏖️' },
              { id: 'Cultural', label: 'Heritage & Palaces 🏰' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRegionFilter(tab.id)}
                className={`py-2 px-4 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  regionFilter === tab.id
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-white hover:bg-sand/60 text-ink-muted hover:text-ink border border-black/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Varied Composition Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedDestinations.map((dest, idx) => (
              <div
                key={dest.id || idx}
                onClick={() => handleExplore(dest.name, dest.category)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleExplore(dest.name, dest.category)}
                className={`group cursor-pointer relative rounded-2xl sm:rounded-3xl overflow-hidden bg-dark shadow-float hover:shadow-deep transition-all duration-300 focus:outline-none flex flex-col justify-end p-6 sm:p-8 ${dest.colSpan || ''}`}
              >
                {/* Large Background Image */}
                <div className={`absolute inset-0 w-full h-full`}>
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/95 via-[#0b0c0e]/35 to-transparent via-55%" />
                </div>

                {/* Country Badge & Rating */}
                <div className="relative z-10 flex items-center justify-between mb-auto pb-8">
                  <div className="bg-black/50 backdrop-blur-md py-1 px-3 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase text-white/90 border border-white/15">
                    {dest.country}
                  </div>

                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md py-1 px-2.5 rounded-full text-[11px] text-white border border-white/15">
                    <Star size={11} className="text-champagne fill-champagne" />
                    <span className="font-semibold text-xs">{dest.rating || 4.9}</span>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 text-white">
                  <span className="text-[11px] font-mono text-champagne tracking-wider uppercase block mb-1">
                    {dest.descriptor}
                  </span>

                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-tight text-white mb-2 leading-none">
                    {dest.name}
                  </h3>

                  <div className="text-xs text-white/80 mb-4 flex items-center gap-2">
                    <span className="text-white/60">Top Experience:</span>
                    <span className="text-white font-medium truncate">{dest.bestExperience}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs font-sans">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-white/70 text-[11px]">Starts at</span>
                      <strong className="text-champagne font-semibold text-base font-display">{dest.startingPrice}</strong>
                      <span className="text-white/60 text-[10px]">/ person</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-white text-ink font-semibold tracking-wider uppercase text-[11px] group-hover:bg-sand group-hover:translate-x-1 transition-all shadow-sm">
                      <span>Explore trip</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRAVEL EXPERIENCES ("Make the trip yours")
          GetYourGuide & Viator inspired: Highly visual, image-first, action-ready
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-black/[0.07] bg-[#f8f5ee]">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-champagne-dark font-semibold block mb-1.5">
                Curated Things To Do
              </span>
              <h2 className="font-display text-[clamp(2.3rem,5.5vw,4.2rem)] font-normal uppercase text-ink leading-tight">
                Make the trip yours
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-ink-muted max-w-[420px] leading-relaxed">
              Every great journey is defined by unforgettable moments. Book these private activities independently or include them in your package.
            </p>
          </div>

          {/* 8 Experiential Cards (Image-first, short title, one-line context, duration & price) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {TRAVEL_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                onClick={() => handleExperienceClick(exp)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleExperienceClick(exp)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/[0.08] shadow-subtle hover:shadow-float transition-all duration-300 focus:outline-none flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-dark">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category & Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md py-0.5 px-2.5 rounded-full text-[9.5px] font-mono tracking-wider uppercase font-semibold text-ink shadow-sm">
                    {exp.category}
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md py-0.5 px-2 rounded-full text-[9.5px] font-mono text-champagne border border-white/20">
                    {exp.tag}
                  </div>

                  <div className="absolute bottom-2.5 left-3 text-white text-xs font-mono flex items-center gap-1.5">
                    <Clock size={12} className="text-champagne" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider block mb-1">
                      {exp.location}
                    </span>
                    <h3 className="font-display text-lg font-normal text-ink mb-1.5 leading-snug group-hover:text-champagne-dark transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-ink-muted font-light leading-relaxed line-clamp-2 mb-3">
                      {exp.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] text-xs">
                    <div>
                      <span className="text-ink-muted text-[10px]">From</span>{' '}
                      <strong className="text-ink font-semibold text-sm">{exp.price}</strong>
                    </div>

                    <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px] text-ink group-hover:translate-x-1 transition-transform">
                      <span>Book</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHAT KIND OF TRIP? (Travel Intent & Mood Discovery)
          "I want to escape", "I want adventure", "I want to slow down", etc.
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-black/[0.07]">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-[720px] mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-champagne-dark font-semibold block mb-2">
              Discover By Intent
            </span>
            <h2 className="font-display text-[clamp(2.3rem,5.5vw,4.2rem)] font-normal uppercase text-ink leading-tight mb-3">
              What kind of trip do you want?
            </h2>
            <p className="text-xs sm:text-base text-ink-muted font-light">
              Choose the feeling of your next getaway. We will match you with destinations and ready-to-book packages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TRAVEL_INTENTS.map((intent) => (
              <div
                key={intent.id}
                onClick={() => handleIntentClick(intent)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleIntentClick(intent)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] cursor-pointer shadow-float hover:shadow-deep transition-all duration-300 focus:outline-none"
              >
                <img
                  src={intent.image}
                  alt={intent.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Rich cinematic gradient overlay for perfect readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none" />

                {/* Mood Tag at top */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-champagne text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold shadow-sm">
                    <Sparkles size={11} className="text-champagne" />
                    <span>{intent.mood || 'Featured'}</span>
                  </span>
                </div>

                {/* Content Overlay with high-contrast, elegant typography */}
                <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end z-10">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide font-normal mb-1.5 !text-white text-white group-hover:!text-champagne-light transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    "{intent.title}"
                  </h3>
                  <p className="text-xs sm:text-sm text-[#ece5d8] font-light line-clamp-2 mb-3 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] leading-relaxed">
                    {intent.tagline}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs text-champagne font-mono tracking-widest uppercase font-semibold group-hover:text-white transition-colors">
                    <span className="border-b border-champagne/40 pb-0.5">Explore Trips</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: TRIP INSPIRATION (GetYourGuide Inspired Travel Magazine Guides)
          Photo-rich, concise, actionable travel routes & advice
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-black/[0.07] bg-[#fdfbf7]">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-champagne-dark font-semibold block mb-1.5">
                Editorial Field Guides
              </span>
              <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-normal uppercase text-ink leading-tight">
                Trip Inspiration
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-ink-muted max-w-[340px]">
              Insider routes and seasonal advice curated by our on-the-ground travel specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAVEL_INSPIRATION.map((item) => (
              <article
                key={item.id}
                onClick={() => handleInspirationClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleInspirationClick(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/[0.08] shadow-subtle hover:shadow-float transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-dark">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[9.5px] font-mono uppercase tracking-wider py-0.5 px-2.5 rounded-full border border-white/15">
                    {item.category}
                  </div>
                  <div className="absolute bottom-2.5 right-3 text-white/90 text-[10px] font-mono">
                    {item.readTime}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-champagne-dark font-semibold block mb-1">
                      {item.destination}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-normal text-ink leading-snug mb-2 group-hover:text-champagne-dark transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-muted font-light leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-ink">
                    <span>Read route</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
