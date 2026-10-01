import React from 'react';
import { ArrowRight, Star, Clock, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  SearchFilter,
  FilterSelect,
  FilterEmptyState,
  useFilterState
} from '../common/filters';

export const PackageList = ({ isAgencyView = false }) => {
  const {
    packages,
    destinations,
    setSelectedPackage,
    setIsEnquiryModalOpen
  } = useApp();

  const getPackagePriceNumeric = (pkg) => {
    if (!pkg.price) return 40000;
    if (pkg.currency === '$' || (pkg.priceFormatted && pkg.priceFormatted.includes('$'))) {
      return pkg.price * 85;
    }
    return pkg.price;
  };

  const defaultFilters = {
    destination: 'All',
    travelStyle: 'All',
    duration: 'All',
    priceRange: 'All'
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'duration-asc', label: 'Duration: Short to Long' },
    { value: 'duration-desc', label: 'Duration: Long to Short' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Rating: High to Low' }
  ];

  const filterFn = (pkg, filters, search) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        pkg.title.toLowerCase().includes(q) ||
        pkg.destination.toLowerCase().includes(q) ||
        (pkg.shortDesc && pkg.shortDesc.toLowerCase().includes(q)) ||
        (pkg.editorialHighlight && pkg.editorialHighlight.toLowerCase().includes(q)) ||
        (pkg.badge && pkg.badge.toLowerCase().includes(q)) ||
        (pkg.highlights && pkg.highlights.some((h) => h.toLowerCase().includes(q)));

      if (!matchesSearch) return false;
    }

    // 2. Destination
    if (filters.destination !== 'All') {
      const dest = filters.destination.toLowerCase();
      const pkgDest = destinations?.find((d) => d.id === pkg.destinationId);
      const matches =
        pkg.destination.toLowerCase().includes(dest) ||
        pkg.title.toLowerCase().includes(dest) ||
        (pkgDest && (pkgDest.name.toLowerCase().includes(dest) || pkgDest.country.toLowerCase().includes(dest)));

      if (!matches) return false;
    }

    // 3. Travel Style
    if (filters.travelStyle !== 'All') {
      const style = filters.travelStyle.toLowerCase();
      const badge = (pkg.badge || '').toLowerCase();
      const groupType = (pkg.groupType || '').toLowerCase();
      const title = pkg.title.toLowerCase();

      if (style.includes('heritage') || style.includes('royal')) {
        if (!badge.includes('heritage') && !badge.includes('royal') && !title.includes('heritage') && !title.includes('palace')) return false;
      } else if (style.includes('signature') || style.includes('private')) {
        if (!badge.includes('signature') && !groupType.includes('private') && !badge.includes('private')) return false;
      } else if (style.includes('alpine') || style.includes('rail')) {
        if (!badge.includes('alpine') && !badge.includes('rail') && !badge.includes('pass')) return false;
      } else if (style.includes('coastal') || style.includes('yacht') || style.includes('water')) {
        if (!badge.includes('yacht') && !badge.includes('villa') && !badge.includes('ocean') && !badge.includes('backwater')) return false;
      }
    }

    // 4. Duration
    if (filters.duration !== 'All') {
      const days = pkg.days || 7;
      if (filters.duration === 'short') {
        if (days > 5) return false;
      } else if (filters.duration === 'classic') {
        if (days < 6 || days > 8) return false;
      } else if (filters.duration === 'grand') {
        if (days < 9) return false;
      }
    }

    // 5. Price Range
    if (filters.priceRange !== 'All') {
      const priceNum = getPackagePriceNumeric(pkg);
      if (filters.priceRange === 'under-40k') {
        if (priceNum > 40000) return false;
      } else if (filters.priceRange === '40k-60k') {
        if (priceNum < 40000 || priceNum > 65000) return false;
      } else if (filters.priceRange === 'above-60k') {
        if (priceNum <= 60000) return false;
      }
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'duration-asc':
        return (a.days || 0) - (b.days || 0);
      case 'duration-desc':
        return (b.days || 0) - (a.days || 0);
      case 'price-asc':
        return getPackagePriceNumeric(a) - getPackagePriceNumeric(b);
      case 'price-desc':
        return getPackagePriceNumeric(b) - getPackagePriceNumeric(a);
      case 'rating-desc':
        return (b.rating || 0) - (a.rating || 0);
      case 'featured':
      default:
        return (b.reviews || 0) - (a.reviews || 0);
    }
  };

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    resetFilters,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    activeFilterCount,
    filteredItems: filteredPackages
  } = useFilterState({
    items: packages || [],
    defaultFilters,
    defaultSort: 'featured',
    filterFn,
    sortFn
  });

  return (
    <section id="packages" className={isAgencyView ? "w-full py-2" : "pt-8 sm:pt-12 lg:pt-16 pb-14 sm:pb-20 lg:pb-32 bg-[#fbfaf8]"}>
      <div className="w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-7 sm:mb-9">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C8A96B] font-semibold block mb-1.5">
              Ready-To-Book Itineraries
            </span>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink leading-tight text-balance">
              Featured Holiday Packages
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-ink-muted max-w-[420px] leading-relaxed text-pretty">
            All-inclusive private journeys complete with boutique hotels, private chauffeur transfers, guided experiences, and 24/7 on-call concierges.
          </p>
        </div>

        {/* Reusable SearchFilter Component */}
        <SearchFilter
          search={searchQuery}
          setSearch={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          placeholder="Search packages by title, route, inclusions, styles..."
          activeCount={activeFilterCount}
          onClearAll={resetFilters}
          resultCount={filteredPackages.length}
          resultLabel="holiday packages"
        >
          <FilterSelect
            label="Destination"
            value={filters.destination}
            onChange={(val) => setFilter('destination', val)}
            options={[
              { value: 'All', label: 'All Destinations' },
              { value: 'Kashmir', label: 'Kashmir' },
              { value: 'Japan', label: 'Japan (Tokyo & Kyoto)' },
              { value: 'Amalfi', label: 'Amalfi Coast, Italy' },
              { value: 'Goa', label: 'Goa' },
              { value: 'Bali', label: 'Bali' },
              { value: 'Swiss', label: 'Swiss Alps' },
              { value: 'Kerala', label: 'Kerala Backwaters' },
              { value: 'Rajasthan', label: 'Rajasthan Heritage' },
              { value: 'Ladakh', label: 'Ladakh High Passes' }
            ]}
          />

          <FilterSelect
            label="Travel Style"
            value={filters.travelStyle}
            onChange={(val) => setFilter('travelStyle', val)}
            options={[
              { value: 'All', label: 'All Styles' },
              { value: 'Curated Heritage', label: 'Curated Heritage & Royal' },
              { value: 'Signature Tour', label: 'Signature Private Journey' },
              { value: 'Alpine Luxury', label: 'Alpine Luxury & Scenic Rail' },
              { value: 'Coastal & Yacht', label: 'Coastal Villas & Yachts' }
            ]}
          />

          <FilterSelect
            label="Duration"
            value={filters.duration}
            onChange={(val) => setFilter('duration', val)}
            options={[
              { value: 'All', label: 'Any Duration' },
              { value: 'short', label: '1–5 Days (Short Breaks)' },
              { value: 'classic', label: '6–8 Days (Classic Journey)' },
              { value: 'grand', label: '9+ Days (Grand Voyage)' }
            ]}
          />

          <FilterSelect
            label="Price Range"
            value={filters.priceRange}
            onChange={(val) => setFilter('priceRange', val)}
            options={[
              { value: 'All', label: 'Any Price' },
              { value: 'under-40k', label: 'Under ₹40,000 / $3,000' },
              { value: '40k-60k', label: '₹40,000 – ₹60,000 / $3k–$5k' },
              { value: 'above-60k', label: 'Above ₹60,000 / $5,000+' }
            ]}
          />

          <FilterSelect
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </SearchFilter>

        {/* Empty State */}
        {filteredPackages.length === 0 ? (
          <FilterEmptyState
            title="No Holiday Packages Matched"
            description="We couldn't find any packages matching your active filters. Try broadening your duration, budget, or destination criteria."
            onReset={resetFilters}
          />
        ) : (
          /* Holiday Packages Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {filteredPackages.map((pkg) => (
              <article
                key={pkg.id}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] shadow-subtle hover:shadow-deep transition-all duration-300 flex flex-col justify-between"
              >
                {/* Package Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-dark">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 xs:top-4 left-3 xs:left-4 flex flex-wrap items-center gap-1.5 max-w-[calc(100%-85px)]">
                    <span className="bg-white/95 backdrop-blur-md py-0.5 xs:py-1 px-2.5 xs:px-3 rounded-full text-[9px] xs:text-[10px] font-mono tracking-wider uppercase font-semibold text-ink shadow-sm whitespace-nowrap">
                      {pkg.badge || 'Curated Heritage'}
                    </span>
                    <span className="hidden xs:inline-block bg-black/60 backdrop-blur-md py-0.5 xs:py-1 px-2.5 xs:px-3 rounded-full text-[9px] xs:text-[10px] font-mono tracking-wider uppercase text-white/90 border border-white/20 whitespace-nowrap">
                      Private Journey
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 xs:top-4 right-3 xs:right-4 bg-black/60 backdrop-blur-md py-0.5 xs:py-1 px-2 xs:px-2.5 rounded-full text-[10px] xs:text-[11px] text-white flex items-center gap-1 border border-white/20 whitespace-nowrap">
                    <Star size={10} className="text-champagne fill-champagne" />
                    <span className="font-semibold">{pkg.rating || 4.9}</span>
                    <span className="text-white/60 text-[9px] xs:text-[10px]">({pkg.reviews || 64})</span>
                  </div>

                  {/* Duration & Route over Image */}
                  <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4 text-white">
                    <div className="flex items-center gap-1.5 xs:gap-2 text-[11px] xs:text-xs font-mono text-champagne mb-0.5 whitespace-nowrap">
                      <Clock size={12} className="flex-shrink-0" />
                      <span className="font-semibold uppercase tracking-wider">
                        {pkg.nights || pkg.days - 1}N / {pkg.days}D
                      </span>
                      <span>·</span>
                      <span className="text-white/90 font-sans tracking-wide truncate">
                        {pkg.destination}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Package Body Details */}
                <div className="p-4 xs:p-5 sm:p-7 flex flex-col flex-1 justify-between min-w-0">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-normal uppercase text-ink mb-1.5 sm:mb-2 leading-tight text-balance">
                      {pkg.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-muted font-light leading-relaxed mb-4 line-clamp-2 text-pretty">
                      {pkg.editorialHighlight || pkg.shortDesc}
                    </p>

                    {/* What's Included Pills */}
                    <div className="mb-5 sm:mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-2 font-semibold">
                        What's Included:
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 xs:py-1 xs:px-2.5 rounded-md bg-[#f6f2ea] text-ink-soft text-[10px] xs:text-[11px] font-medium whitespace-nowrap">
                          <Check size={12} className="text-status-emerald flex-shrink-0" />
                          <span>Boutique Stays & Houseboats</span>
                        </span>
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 xs:py-1 xs:px-2.5 rounded-md bg-[#f6f2ea] text-ink-soft text-[10px] xs:text-[11px] font-medium whitespace-nowrap">
                          <Check size={12} className="text-status-emerald flex-shrink-0" />
                          <span>Private Chauffeur Transfers</span>
                        </span>
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 xs:py-1 xs:px-2.5 rounded-md bg-[#f6f2ea] text-ink-soft text-[10px] xs:text-[11px] font-medium whitespace-nowrap">
                          <Check size={12} className="text-status-emerald flex-shrink-0" />
                          <span>Daily Breakfast & Dinners</span>
                        </span>
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 xs:py-1 xs:px-2.5 rounded-md bg-[#f6f2ea] text-ink-soft text-[10px] xs:text-[11px] font-medium whitespace-nowrap">
                          <Check size={12} className="text-status-emerald flex-shrink-0" />
                          <span>All Sightseeing & Entry Passes</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Booking CTA Bar */}
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-4 sm:pt-5 border-t border-black/[0.07]">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block leading-none mb-0.5 whitespace-nowrap">
                        Starting from
                      </span>
                      <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                        <strong className="font-display text-xl sm:text-2xl font-normal text-ink font-semibold">
                          {pkg.priceFormatted}
                        </strong>
                        <span className="text-[11px] xs:text-xs text-ink-muted font-sans">/ person</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full xs:w-auto flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className="flex-1 xs:flex-none inline-flex items-center justify-center gap-1.5 py-2.5 px-4 sm:py-3 sm:px-5 rounded-xl bg-ink hover:bg-ink-soft text-white text-[11px] xs:text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-sm group whitespace-nowrap"
                      >
                        <span>View Trip</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsEnquiryModalOpen(true)}
                        className="flex-1 xs:flex-none inline-flex items-center justify-center py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-xl border border-black/15 hover:border-black/30 text-ink text-[11px] xs:text-xs uppercase tracking-wider font-semibold hover:bg-sand/40 transition-all cursor-pointer whitespace-nowrap"
                      >
                        Customize
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
