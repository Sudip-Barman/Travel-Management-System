import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, Search, Calendar, Users, MapPin, Compass, Sparkles, Luggage, Hotel, Mountain, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection = () => {
  const { setCustomerTab, setPackageSearchQuery, setDestinationFilter } = useApp();
  
  // Service category tabs inspired by MakeMyTrip & Booking.com
  const [activeService, setActiveService] = useState('Holiday Packages');
  const serviceTabs = [
    { id: 'packages', label: 'Holiday Packages', icon: Luggage },
    { id: 'tours', label: 'Tours & Activities', icon: Compass },
    { id: 'hotels', label: 'Stays & Resorts', icon: Hotel },
    { id: 'weekend', label: 'Weekend Trips', icon: Mountain }
  ];

  // Featured destinations for the hero carousel (including iconic Indian places)
  const heroDestinations = [
    {
      id: 'kashmir',
      name: 'Kashmir',
      country: 'India',
      subtitle: 'Mountains, mirror lakes & unforgettable escapes',
      duration: '7 Days',
      price: '₹24,999',
      bestTime: 'Oct – Mar',
      highlights: 'Private Cedar Houseboat · Gulmarg Gondola · Pahalgam Pines',
      query: 'Kashmir',
      mood: 'Mountain',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2560&q=90'
    },
    {
      id: 'kerala',
      name: 'Kerala',
      country: 'India',
      subtitle: 'Emerald backwaters, private houseboats & misty Munnar hills',
      duration: '6 Days',
      price: '₹34,999',
      bestTime: 'Sep – Mar',
      highlights: 'Alleppey Teak Houseboat · Munnar Tea High-Tea · Fort Kochi Art',
      query: 'Kerala',
      mood: 'Coastal',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2560&q=90'
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      country: 'India',
      subtitle: 'Royal lake palaces, golden desert forts & regal havelis',
      duration: '7 Days',
      price: '₹42,000',
      bestTime: 'Oct – Mar',
      highlights: 'Lake Pichola Sunset Boat · Amer Fort Sunset · Haveli Banquets',
      query: 'Rajasthan',
      mood: 'Cultural',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2560&q=90'
    },
    {
      id: 'ladakh',
      name: 'Ladakh',
      country: 'India',
      subtitle: 'Cobalt Pangong lake, highest passes & cliffside monasteries',
      duration: '7 Days',
      price: '₹46,500',
      bestTime: 'May – Sep',
      highlights: 'Pangong Tso Sunrise · Khardung La 17,982 ft · Nubra Sand Dunes',
      query: 'Ladakh',
      mood: 'Mountain',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2560&q=90'
    },
    {
      id: 'bali',
      name: 'Bali',
      country: 'Indonesia',
      subtitle: 'Tropical beaches, clifftop temples & emerald valleys',
      duration: '8 Days',
      price: '$2,650',
      bestTime: 'Apr – Oct',
      highlights: 'Ubud Private Pool Villa · Nusa Penida Cruise · Uluwatu Sunset',
      query: 'Bali',
      mood: 'Tropical',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2560&q=90'
    },
    {
      id: 'amalfi',
      name: 'Amalfi Coast',
      country: 'Italy',
      subtitle: 'Sun-drenched cliffs, pastel villages & Mediterranean blue',
      duration: '7 Days',
      price: '$3,450',
      bestTime: 'May – Oct',
      highlights: 'Positano Plunge Suite · Capri Yacht Charter · Ravello',
      query: 'Amalfi',
      mood: 'Coastal',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2560&q=90'
    },
    {
      id: 'swiss',
      name: 'Swiss Alps',
      country: 'Switzerland',
      subtitle: 'Glacier peaks, scenic alpine trains & cozy mountain chalets',
      duration: '8 Days',
      price: '$4,200',
      bestTime: 'Dec – Mar',
      highlights: 'Glacier Express Excellence Class · Zermatt Matterhorn Chalet',
      query: 'Swiss',
      mood: 'Mountain',
      image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=2560&q=90'
    }
  ];

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const SLIDE_DURATION = 5000; // Continuous loop: 5s per destination

  const currentHero = heroDestinations[activeHeroIdx];

  const handleNext = useCallback(() => {
    setActiveHeroIdx((prev) => (prev + 1) % heroDestinations.length);
  }, [heroDestinations.length]);

  const handlePrev = useCallback(() => {
    setActiveHeroIdx((prev) => (prev - 1 + heroDestinations.length) % heroDestinations.length);
  }, [heroDestinations.length]);

  // Automated continuous swipe in loop
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [handleNext]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mobile / Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext(); // Swiped left -> next
    } else if (diff < -50) {
      handlePrev(); // Swiped right -> prev
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Search Bar State
  const [destinationInput, setDestinationInput] = useState('');
  const [selectedDates, setSelectedDates] = useState('Next 3 Months');
  const [selectedGuests, setSelectedGuests] = useState('2 Travellers');
  const [selectedType, setSelectedType] = useState('All Styles');

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (destinationInput.trim()) {
      setPackageSearchQuery(destinationInput.trim());
    }
    if (selectedType !== 'All Styles') {
      setDestinationFilter(selectedType);
    }
    setCustomerTab('packages');
    // Smooth scroll down to packages
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreHero = (hero) => {
    setPackageSearchQuery(hero.query);
    if (hero.mood) setDestinationFilter(hero.mood);
    setCustomerTab('packages');
  };

  return (
    <section className="relative w-full bg-[#0b0c0e] text-white overflow-hidden select-none">
      
      {/* =========================================================================
          HERO BACKGROUND PHOTOGRAPHY & AUTO-SWIPING SLIDER (CONTINUOUS LOOP)
          ========================================================================= */}
      <div 
        className="relative w-full min-h-[580px] lg:min-h-[640px] max-h-[820px] flex flex-col justify-between pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Layered Photography for Smooth Cinematic Crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroDestinations.map((hero, idx) => {
            const isActive = activeHeroIdx === idx;
            return (
              <div
                key={hero.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive
                    ? 'opacity-100 scale-100 pointer-events-auto z-[1]'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                <img
                  src={hero.image}
                  alt={`${hero.name}, ${hero.country}`}
                  className="w-full h-full object-cover object-center brightness-[0.70] contrast-[1.08] transition-transform duration-[6000ms] ease-out"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
          {/* Subtle cinematic gradient vignette */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0b0c0e] via-black/35 to-black/55 pointer-events-none" />
        </div>

        {/* Floating Left and Right Arrow Navigation Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous destination slide"
          title="Previous destination"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-black/40 hover:bg-white text-white hover:text-ink border border-white/20 hover:border-white shadow-float backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-80 group-hover:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next destination slide"
          title="Next destination"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-black/40 hover:bg-white text-white hover:text-ink border border-white/20 hover:border-white shadow-float backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-80 group-hover:opacity-100"
        >
          <ChevronRight size={20} />
        </button>

        {/* Top Controls: Service Tabs & Destination Switcher */}
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Destination Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 pl-2 pr-1 hidden sm:inline">
              Explore:
            </span>
            {heroDestinations.map((hero, idx) => {
              const isActive = activeHeroIdx === idx;
              return (
                <button
                  key={hero.id}
                  type="button"
                  onClick={() => setActiveHeroIdx(idx)}
                  className={`relative overflow-hidden py-1 px-3 rounded-full text-[11px] font-medium tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-ink font-semibold shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10">{hero.name}</span>
                  {isActive && (
                    <span
                      key={`prog-${idx}-${activeHeroIdx}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-champagne-dark hero-slide-progress"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Practical Trip Indicator Pill with Slide Counter */}
          <div className="hidden md:flex items-center gap-2.5 py-1 px-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-mono text-champagne">
            <span className="text-white/60 font-medium">0{activeHeroIdx + 1} / 0{heroDestinations.length}</span>
            <span className="text-white/30">|</span>
            <MapPin size={12} className="text-champagne-light" />
            <span className="font-semibold text-white">{currentHero.name}, {currentHero.country}</span>
            <span className="text-white/30">|</span>
            <span>{currentHero.duration}</span>
            <span className="text-white/30">|</span>
            <span>From {currentHero.price}</span>
            <span className="text-white/30">|</span>
            <span className="text-white/80">Best: {currentHero.bestTime}</span>
          </div>
        </div>

        {/* Hero Travel Headline & Trip Facts with Animated Content on Slide Change */}
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 md:px-8 my-auto pt-6 pb-4">
          <div key={currentHero.id} className="max-w-[820px] hero-content-animate">
            
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-champagne text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
              <Sparkles size={12} className="text-champagne" />
              <span>Curated Journey · 2026 Edition</span>
            </div>

            <h1 className="font-display text-white text-[clamp(2.5rem,7vw,5.5rem)] font-normal uppercase leading-[0.96] tracking-[-0.02em] mb-2 sm:mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              Discover <br />
              <span className="italic font-light lowercase font-display text-white/95">{currentHero.name}</span>
            </h1>

            <p className="font-sans text-sm sm:text-lg text-white/90 font-light tracking-wide max-w-[560px] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] leading-relaxed">
              {currentHero.subtitle}. {currentHero.highlights}.
            </p>

            {/* Practical Quick Facts Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-sans mb-6 text-white/80">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <Calendar size={14} className="text-champagne" />
                <span>{currentHero.duration}</span>
              </span>
              <span>·</span>
              <span className="text-white font-semibold text-champagne">
                From {currentHero.price} / person
              </span>
              <span>·</span>
              <span className="text-white/70">
                Best season: {currentHero.bestTime}
              </span>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleExploreHero(currentHero)}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white hover:bg-sand text-ink text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-float group/btn"
              >
                <span>Explore {currentHero.name} Trips</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setCustomerTab('ai-planner');
                  const el = document.getElementById('ai-planner');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/25 text-xs uppercase tracking-widest font-medium backdrop-blur-md transition-all cursor-pointer"
              >
                <span>Plan My Custom Trip</span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Swipe Indicators & Slide Dots */}
        <div className="md:hidden relative z-10 flex items-center justify-center gap-2 pt-2">
          {heroDestinations.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveHeroIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeHeroIdx === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Empty space for bottom clearance */}
        <div className="relative z-10" />
      </div>

      {/* =========================================================================
          REAL TRAVEL SEARCH / DISCOVERY BAR (MakeMyTrip / Booking / GetYourGuide inspired)
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1360px] mx-auto px-4 md:px-8 -mt-8 sm:-mt-12 mb-10 sm:mb-14">
        
        {/* Outer Card with Service Category Tabs */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-deep border border-black/[0.08] p-3 sm:p-5 text-ink">
          
          {/* Service Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 border-b border-black/[0.06] scrollbar-none">
            {serviceTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeService === tab.label;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveService(tab.label)}
                  className={`flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-ink text-white shadow-sm'
                      : 'text-ink-muted hover:text-ink hover:bg-sand/60'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-champagne' : 'text-ink-muted'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Practical Search Input Grid */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 items-center">
            
            {/* 1. Destination Field */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f5ee] hover:bg-[#f1ecd9] border border-black/[0.06] transition-colors">
              <MapPin size={18} className="text-champagne-dark flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted font-semibold leading-none mb-1">
                  Where to?
                </span>
                <input
                  type="text"
                  placeholder="Kashmir, Bali, Amalfi, Goa..."
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  className="w-full text-xs sm:text-sm text-ink bg-transparent border-none outline-none placeholder:text-ink-faint font-sans font-medium truncate"
                />
              </div>
            </div>

            {/* 2. When / Dates */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f5ee] hover:bg-[#f1ecd9] border border-black/[0.06] transition-colors">
              <Calendar size={18} className="text-champagne-dark flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted font-semibold leading-none mb-1">
                  Departure Window
                </span>
                <select
                  value={selectedDates}
                  onChange={(e) => setSelectedDates(e.target.value)}
                  className="w-full text-xs sm:text-sm text-ink bg-transparent border-none outline-none cursor-pointer font-sans font-medium truncate"
                >
                  <option value="Next 3 Months">Next 3 Months (Immediate)</option>
                  <option value="Autumn 2026">Autumn 2026 (Oct – Nov)</option>
                  <option value="Winter 2026">Winter Alpine (Dec – Feb)</option>
                  <option value="Spring 2027">Spring Blossoms (Mar – May)</option>
                  <option value="Flexible">Flexible Dates</option>
                </select>
              </div>
            </div>

            {/* 3. Travelers */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f5ee] hover:bg-[#f1ecd9] border border-black/[0.06] transition-colors">
              <Users size={18} className="text-champagne-dark flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted font-semibold leading-none mb-1">
                  Travelers
                </span>
                <select
                  value={selectedGuests}
                  onChange={(e) => setSelectedGuests(e.target.value)}
                  className="w-full text-xs sm:text-sm text-ink bg-transparent border-none outline-none cursor-pointer font-sans font-medium truncate"
                >
                  <option value="1 Guest">1 Solo Explorer</option>
                  <option value="2 Travellers">2 Travellers (Couple / Friends)</option>
                  <option value="Small Group">3–5 Small Group / Family</option>
                  <option value="Private Villa">6+ Private Group Charter</option>
                </select>
              </div>
            </div>

            {/* 4. Search Trips Action Button */}
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-ink hover:bg-ink-soft text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm group flex items-center justify-center gap-2"
              >
                <Search size={15} className="text-champagne" />
                <span>Search Trips</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>

          {/* Quick Popular Suggestions */}
          <div className="flex items-center flex-wrap gap-2 pt-3 mt-3 border-t border-black/[0.06] text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">Quick filters:</span>
            {[
              { label: '🏔️ Kashmir Snow & Lakes', query: 'Kashmir', mood: 'Mountain' },
              { label: '🌴 Kerala Backwaters', query: 'Kerala', mood: 'Coastal' },
              { label: '🏰 Rajasthan Palaces', query: 'Rajasthan', mood: 'Cultural' },
              { label: '❄️ Ladakh High Passes', query: 'Ladakh', mood: 'Mountain' },
              { label: '🏖️ Goa Private Villas', query: 'Goa', mood: 'Coastal' },
              { label: '🌊 Andaman Coral Islands', query: 'Andaman', mood: 'Coastal' },
              { label: '⛩️ Kyoto Culture', query: 'Kyoto', mood: 'Cultural' },
              { label: '⛷️ Swiss Alps', query: 'Swiss', mood: 'Mountain' }
            ].map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => {
                  setPackageSearchQuery(pill.query);
                  if (pill.mood) setDestinationFilter(pill.mood);
                  setCustomerTab('packages');
                }}
                className="py-1 px-2.5 rounded-full bg-[#f2ece2] hover:bg-[#e6dece] text-ink-soft text-xs font-medium transition-colors cursor-pointer"
              >
                {pill.label}
              </button>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
