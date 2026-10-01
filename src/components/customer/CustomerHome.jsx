import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerHome = () => {
  const {
    destinations,
    packages,
    experiences,
    inspirations,
    setCustomerTab,
    setPackageSearchQuery,
    setSelectedPackage
  } = useApp();

  // Concise Hero Carousel Data
  const heroSlides = [
    {
      id: 'kashmir',
      name: 'Kashmir Valley',
      country: 'India',
      subtitle: 'Snow-dusted peaks, mirror lakes & cedar sanctuaries.',
      duration: '6 Days',
      price: '₹49,999',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2200&q=85',
      destinationQuery: 'Kashmir'
    },
    {
      id: 'amalfi',
      name: 'Amalfi Coast',
      country: 'Italy',
      subtitle: 'Sun-drenched cliffs, lemon terraces & Mediterranean blue.',
      duration: '7 Days',
      price: '$3,450',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2200&q=85',
      destinationQuery: 'Amalfi'
    },
    {
      id: 'bali',
      name: 'Bali Sanctuary',
      country: 'Indonesia',
      subtitle: 'Tropical river valleys, sacred springs & clifftop temples.',
      duration: '7 Days',
      price: '$2,650',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=85',
      destinationQuery: 'Bali'
    },
    {
      id: 'kyoto',
      name: 'Kyoto',
      country: 'Japan',
      subtitle: 'Ancient shrines, private bamboo tea pavilions & kaiseki arts.',
      duration: '10 Days',
      price: '$4,850',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=85',
      destinationQuery: 'Kyoto'
    },
    {
      id: 'kerala',
      name: 'Kerala Backwaters',
      country: 'India',
      subtitle: 'Emerald lagoons, private teak houseboats & misty tea hills.',
      duration: '6 Days',
      price: '₹34,999',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2200&q=85',
      destinationQuery: 'Kerala'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance hero slides every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentHero = heroSlides[activeSlide];

  // Helper refs for horizontal scrolling
  const destScrollRef = useRef(null);
  const pkgScrollRef = useRef(null);
  const expScrollRef = useRef(null);
  const inspScrollRef = useRef(null);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleHeroClick = (slide) => {
    setPackageSearchQuery(slide.destinationQuery);
    setCustomerTab('packages');
  };

  const handleDestinationClick = (dest) => {
    setPackageSearchQuery(dest.name);
    setCustomerTab('destinations');
  };

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleExperienceClick = (exp) => {
    setPackageSearchQuery(exp.location.split(',')[0]);
    setCustomerTab('experiences');
  };

  const handleInspirationClick = (insp) => {
    const dest = insp.destination.split(',')[0];
    if (dest && dest !== 'Global') {
      setPackageSearchQuery(dest);
    }
    setCustomerTab('destinations');
  };

  // Top 5 popular destinations for the compact discovery feed
  const popularDestinations = [
    destinations.find((d) => d.id === 'dest-kashmir') || destinations[0],
    destinations.find((d) => d.id === 'dest-goa') || destinations[3],
    destinations.find((d) => d.id === 'dest-bali') || destinations[4],
    destinations.find((d) => d.id === 'dest-kyoto') || destinations[2],
    destinations.find((d) => d.id === 'dest-amalfi') || destinations[1]
  ].filter(Boolean);

  // 4 Featured packages
  const featuredPackages = packages.slice(0, 4);

  // 4 Popular experiences
  const popularExperiences = (experiences || []).slice(0, 4);

  // 4 Travel inspiration articles
  const featuredInspirations = (inspirations || []).slice(0, 4);

  return (
    <div className="w-full bg-[#fbfaf8] text-ink pb-12 sm:pb-16 overflow-x-hidden">
      
      {/* =========================================================================
          1. CONCISE IMMERSIVE HERO
          Responsive height, balanced text and controls across 320px–1440px+
          ========================================================================= */}
      <section className="relative w-full min-h-[440px] sm:min-h-[480px] lg:h-[520px] bg-[#0b0c0e] text-white overflow-hidden select-none flex flex-col justify-between">
        
        {/* Layered Crossfading Destination Images */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, idx) => {
            const isActive = activeSlide === idx;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={`${slide.name}, ${slide.country}`}
                  className="w-full h-full object-cover object-center brightness-[0.70] contrast-[1.08] transition-transform duration-[7000ms] ease-out scale-100"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
          {/* Subtle cinematic gradient overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0b0c0e]/95 via-black/40 to-black/55 pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-30 h-full w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-5 sm:py-7 flex-1">
          
          {/* Top Row: Mini Slide Indicator & Explorer Pills */}
          <div className="flex items-center justify-between gap-2 overflow-hidden">
            <div className="hidden xs:flex items-center gap-1.5 bg-black/45 backdrop-blur-md py-1 px-3 rounded-full border border-white/15 text-[10px] sm:text-[11px] font-mono text-champagne">
              <Sparkles size={11} className="text-champagne" />
              <span>Curated Journeys 2026</span>
            </div>

            {/* Quick slide dots / pill tabs */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/15 max-w-full overflow-x-auto scrollbar-none">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`py-0.5 px-2 xs:px-2.5 rounded-full text-[10px] xs:text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeSlide === idx
                      ? 'bg-white text-ink font-semibold shadow-xs'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={`View ${slide.name}`}
                >
                  {slide.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Center-Bottom: Concise Destination Headline & Single CTA */}
          <div className="max-w-[720px] my-auto pt-7 pb-5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-white/80 text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-2.5">
              <span className="inline-flex items-center gap-1 text-white font-medium whitespace-nowrap">
                <MapPin size={12} className="text-champagne flex-shrink-0" />
                <span>{currentHero.name}, {currentHero.country}</span>
              </span>
              <span className="text-white/40 hidden xs:inline">·</span>
              <span className="whitespace-nowrap">{currentHero.duration}</span>
              <span className="text-white/40 hidden xs:inline">·</span>
              <span className="text-champagne font-semibold whitespace-nowrap">From {currentHero.price}</span>
            </div>

            <h1 className="font-display text-white text-[clamp(1.75rem,5.5vw,4.2rem)] font-normal uppercase leading-[1.08] tracking-tight mb-2.5 sm:mb-3 drop-shadow-md text-balance">
              Discover <span className="italic font-light lowercase font-display text-white/95">{currentHero.name}</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-white/90 font-light max-w-[560px] mb-5 sm:mb-6 leading-relaxed drop-shadow-sm text-pretty">
              {currentHero.subtitle}
            </p>

            {/* Primary & Secondary Action CTAs (Stack on small screens, row on xs+) */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => handleHeroClick(currentHero)}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-5 sm:py-3 sm:px-6 rounded-full bg-white hover:bg-[#f2ece2] text-ink text-xs uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>Explore {currentHero.name}</span>
                <ArrowRight size={13} />
              </button>

              <button
                type="button"
                onClick={() => setCustomerTab('destinations')}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white border border-white/20 text-xs font-medium backdrop-blur-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>All Destinations</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Bottom subtle progress ticks */}
          <div className="flex items-center gap-1.5 pt-1">
            {heroSlides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? 'w-6 bg-champagne' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

        </div>

      </section>

      {/* =========================================================================
          MAIN DISCOVERY FEED: COMPACT HORIZONTAL ROWS
          Isolated overflow containers prevent body-level horizontal scrolling
          ========================================================================= */}
      <div className="w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 space-y-14 sm:space-y-18 lg:space-y-24">
        
        {/* =====================================================================
            SECTION 1: POPULAR DESTINATIONS (Horizontal Row)
            ===================================================================== */}
        <section aria-labelledby="heading-popular-destinations" className="relative w-full overflow-hidden">
          {/* Section Header */}
          <div className="flex items-end justify-between gap-3 mb-5 sm:mb-7">
            <div className="min-w-0">
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-champagne-dark font-semibold block mb-1">
                Iconic Sanctuaries
              </span>
              <h2 id="heading-popular-destinations" className="font-display text-xl xs:text-2xl sm:text-3xl font-normal uppercase text-ink tracking-tight text-balance leading-tight">
                Popular Destinations
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setCustomerTab('destinations')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer tracking-wide whitespace-nowrap"
              >
                <span className="hidden sm:inline">Explore all sanctuaries</span>
                <span className="sm:hidden">View all</span>
                <ArrowRight size={13} />
              </button>

              {/* Desktop Scroll Chevrons */}
              <div className="hidden md:flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={() => scrollContainer(destScrollRef, 'left')}
                  className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Scroll destinations left"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollContainer(destScrollRef, 'right')}
                  className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Scroll destinations right"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Isolated Horizontal Carousel */}
          <div className="w-full overflow-hidden">
            <div
              ref={destScrollRef}
              className="flex items-stretch gap-3.5 xs:gap-4 sm:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-1 -mx-3.5 px-3.5 xs:-mx-4 xs:px-4 sm:mx-0 sm:px-0"
            >
              {popularDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => handleDestinationClick(dest)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDestinationClick(dest)}
                  className="w-[205px] xs:w-[225px] sm:w-[250px] md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] flex-shrink-0 snap-start group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/[0.07] hover:border-black/20 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src={dest.image}
                      alt={`${dest.name}, ${dest.country}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    
                    {/* Country Badge */}
                    <span className="absolute top-2.5 left-2.5 py-0.5 px-2.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-white/90 border border-white/15 whitespace-nowrap">
                      {dest.country}
                    </span>

                    {/* Rating */}
                    <span className="absolute top-2.5 right-2.5 flex items-center gap-1 py-0.5 px-2 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-white border border-white/15 whitespace-nowrap">
                      <Star size={9} className="text-champagne fill-champagne" />
                      <span>{dest.rating || 4.9}</span>
                    </span>

                    {/* Starting Price Pill */}
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white/95 font-semibold bg-black/55 backdrop-blur-sm px-2.5 py-0.5 rounded-md whitespace-nowrap">
                      From {dest.priceFormatted}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-normal uppercase text-ink group-hover:text-champagne-dark transition-colors truncate">
                        {dest.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-ink-muted line-clamp-2 font-light mt-0.5 leading-relaxed text-pretty min-h-[2rem]">
                        {dest.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-black/[0.05] text-[10px] font-mono uppercase tracking-wider text-ink-muted group-hover:text-ink transition-colors">
                      <span className="truncate whitespace-nowrap">{dest.idealDays || '6–8 Days'}</span>
                      <span className="inline-flex items-center gap-0.5 font-semibold text-champagne-dark group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-1 whitespace-nowrap">
                        <span>Explore</span>
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: FEATURED TRIPS / PACKAGES (Horizontal Row)
            ===================================================================== */}
        <section aria-labelledby="heading-featured-packages" className="relative w-full overflow-hidden">
          {/* Section Header */}
          <div className="flex items-end justify-between gap-3 mb-5 sm:mb-7">
            <div className="min-w-0">
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-champagne-dark font-semibold block mb-1">
                Ready-To-Book Itineraries
              </span>
              <h2 id="heading-featured-packages" className="font-display text-xl xs:text-2xl sm:text-3xl font-normal uppercase text-ink tracking-tight text-balance leading-tight">
                Featured Packages
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setCustomerTab('packages')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer tracking-wide whitespace-nowrap"
              >
                <span className="hidden sm:inline">View all holiday packages</span>
                <span className="sm:hidden">View all</span>
                <ArrowRight size={13} />
              </button>

              {/* Desktop Scroll Chevrons */}
              <div className="hidden md:flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={() => scrollContainer(pkgScrollRef, 'left')}
                  className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Scroll packages left"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollContainer(pkgScrollRef, 'right')}
                  className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Scroll packages right"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Isolated Horizontal Carousel */}
          <div className="w-full overflow-hidden">
            <div
              ref={pkgScrollRef}
              className="flex items-stretch gap-3.5 xs:gap-4 sm:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-1 -mx-3.5 px-3.5 xs:-mx-4 xs:px-4 sm:mx-0 sm:px-0"
            >
              {featuredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageClick(pkg)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePackageClick(pkg)}
                  className="w-[260px] xs:w-[280px] sm:w-[310px] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex-shrink-0 snap-start group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/[0.07] hover:border-black/20 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    
                    {/* Duration Badge */}
                    <span className="absolute top-2.5 left-2.5 flex items-center gap-1 py-0.5 px-2.5 rounded-full bg-white/95 text-[9.5px] font-mono font-semibold text-ink shadow-xs whitespace-nowrap">
                      <Clock size={10} className="text-champagne-dark" />
                      <span>{pkg.days} Days</span>
                    </span>

                    {/* Destination */}
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white/90 truncate max-w-[85%] drop-shadow-sm whitespace-nowrap">
                      {pkg.destination}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-display text-base font-normal text-ink group-hover:text-champagne-dark transition-colors line-clamp-2 text-balance leading-snug min-h-[2.5rem] mb-1.5">
                        {pkg.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-ink-muted line-clamp-2 font-light leading-relaxed mb-3 text-pretty min-h-[2rem]">
                        {pkg.shortDesc}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.05]">
                      <div className="min-w-0 pr-1">
                        <span className="text-[9px] font-mono text-ink-muted block uppercase leading-none mb-0.5 whitespace-nowrap">From</span>
                        <strong className="text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">{pkg.priceFormatted}</strong>
                      </div>

                      <button
                        type="button"
                        className="py-1 px-3 rounded-full bg-sand/70 group-hover:bg-ink group-hover:text-white text-ink text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-colors whitespace-nowrap flex-shrink-0"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: POPULAR EXPERIENCES (Horizontal Row)
            ===================================================================== */}
        <section aria-labelledby="heading-popular-experiences" className="relative w-full overflow-hidden">
          {/* Section Header */}
          <div className="flex items-end justify-between gap-3 mb-5 sm:mb-7">
            <div className="min-w-0">
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-champagne-dark font-semibold block mb-1">
                Curated Moments
              </span>
              <h2 id="heading-popular-experiences" className="font-display text-xl xs:text-2xl sm:text-3xl font-normal uppercase text-ink tracking-tight text-balance leading-tight">
                Popular Experiences
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setCustomerTab('experiences')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer tracking-wide whitespace-nowrap"
              >
                <span className="hidden sm:inline">Explore all experiences</span>
                <span className="sm:hidden">View all</span>
                <ArrowRight size={13} />
              </button>

              {/* Desktop Scroll Chevrons */}
              <div className="hidden md:flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={() => scrollContainer(expScrollRef, 'left')}
                  className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Scroll experiences left"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollContainer(expScrollRef, 'right')}
                  className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Scroll experiences right"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Isolated Horizontal Carousel */}
          <div className="w-full overflow-hidden">
            <div
              ref={expScrollRef}
              className="flex items-stretch gap-3.5 xs:gap-4 sm:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-1 -mx-3.5 px-3.5 xs:-mx-4 xs:px-4 sm:mx-0 sm:px-0"
            >
              {popularExperiences.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => handleExperienceClick(exp)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleExperienceClick(exp)}
                  className="w-[205px] xs:w-[225px] sm:w-[250px] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] flex-shrink-0 snap-start group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/[0.07] hover:border-black/20 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category */}
                    <span className="absolute top-2.5 left-2.5 py-0.5 px-2 rounded-full bg-white/95 text-[9px] font-mono font-semibold text-ink shadow-xs whitespace-nowrap">
                      {exp.category}
                    </span>

                    {/* Duration */}
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white/95 flex items-center gap-1 whitespace-nowrap">
                      <Clock size={10} className="text-champagne" />
                      <span>{exp.duration}</span>
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="text-[9.5px] font-mono text-ink-muted uppercase block truncate">
                        {exp.location}
                      </span>
                      <h3 className="font-display text-base font-normal text-ink group-hover:text-champagne-dark transition-colors line-clamp-2 text-balance leading-snug min-h-[2.5rem] mt-0.5 mb-1.5">
                        {exp.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-black/[0.05] text-xs">
                      <span className="text-xs sm:text-sm font-semibold text-ink truncate whitespace-nowrap">{exp.price}</span>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-champagne-dark group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5 flex-shrink-0 ml-1 whitespace-nowrap">
                        <span>View</span>
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: AI TRIP PLANNER TEASER
            ===================================================================== */}
        <section aria-labelledby="heading-planner-teaser" className="w-full my-1 sm:my-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#17191d] via-[#101214] to-[#1c1e22] text-white p-6 xs:p-7 sm:p-9 md:p-11 border border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            {/* Background sparkle accents */}
            <div className="absolute -right-8 -top-8 w-52 h-52 rounded-full bg-champagne/10 blur-2xl pointer-events-none" />
            
            <div className="relative z-10 max-w-[560px]">
              <div className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-white/10 text-champagne text-[10px] font-mono tracking-widest uppercase font-semibold mb-2.5 border border-white/15 whitespace-nowrap">
                <Sparkles size={11} className="text-champagne" />
                <span>AI Bespoke Atelier</span>
              </div>
              <h2 id="heading-planner-teaser" className="font-display text-xl xs:text-2xl sm:text-3xl font-normal text-white uppercase tracking-tight mb-2 text-balance leading-tight">
                Planning a trip?
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed text-pretty">
                Tell us where you're going and our intelligent concierge will craft your personalized day-by-day luxury itinerary in seconds.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setCustomerTab('ai-planner')}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 sm:px-7 rounded-full bg-white hover:bg-sand text-ink text-xs uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer shadow-md group whitespace-nowrap"
              >
                <span>Plan my trip</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: TRAVEL INSPIRATION (Horizontal Row)
            ===================================================================== */}
        <section aria-labelledby="heading-travel-inspiration" className="relative w-full overflow-hidden">
          {/* Section Header */}
          <div className="flex items-end justify-between gap-3 mb-5 sm:mb-7">
            <div className="min-w-0">
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-champagne-dark font-semibold block mb-1">
                Editorial Field Guides
              </span>
              <h2 id="heading-travel-inspiration" className="font-display text-xl xs:text-2xl sm:text-3xl font-normal uppercase text-ink tracking-tight text-balance leading-tight">
                Travel Inspiration
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setCustomerTab('destinations')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer tracking-wide whitespace-nowrap"
              >
                <span className="hidden sm:inline">Read all articles</span>
                <span className="sm:hidden">View all</span>
                <ArrowRight size={13} />
              </button>

              {/* Desktop Scroll Chevrons */}
              <div className="hidden md:flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={() => scrollContainer(inspScrollRef, 'left')}
                  className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Scroll inspirations left"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollContainer(inspScrollRef, 'right')}
                  className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Scroll inspirations right"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Isolated Horizontal Carousel */}
          <div className="w-full overflow-hidden">
            <div
              ref={inspScrollRef}
              className="flex items-stretch gap-3.5 xs:gap-4 sm:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-1 -mx-3.5 px-3.5 xs:-mx-4 xs:px-4 sm:mx-0 sm:px-0"
            >
              {featuredInspirations.map((item) => (
                <article
                  key={item.id}
                  onClick={() => handleInspirationClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleInspirationClick(item)}
                  className="w-[260px] xs:w-[280px] sm:w-[310px] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex-shrink-0 snap-start group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/[0.07] hover:border-black/20 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Category */}
                    <span className="absolute top-2.5 left-2.5 py-0.5 px-2.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-white/90 border border-white/15 whitespace-nowrap">
                      {item.category}
                    </span>

                    {/* Read time */}
                    <span className="absolute bottom-2.5 right-2.5 text-[9.5px] font-mono text-white/90 whitespace-nowrap">
                      {item.readTime}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="text-[9.5px] font-mono text-champagne-dark font-semibold uppercase block truncate mb-1">
                        {item.destination}
                      </span>
                      <h3 className="font-display text-sm xs:text-base font-normal text-ink group-hover:text-champagne-dark transition-colors line-clamp-2 leading-snug min-h-[2.5rem] mb-1.5 text-balance">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-ink-muted font-light line-clamp-2 leading-relaxed text-pretty min-h-[2rem]">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-2.5 mt-3 border-t border-black/[0.05] flex items-center justify-between text-[11px] font-semibold text-ink whitespace-nowrap">
                      <span>Read route</span>
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};
