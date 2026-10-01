import React, { useState } from 'react';
import { ArrowRight, Search, Star, Clock, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../common/EmptyState';

export const PackageList = () => {
  const {
    packages,
    destinations,
    setSelectedPackage,
    packageSearchQuery,
    setPackageSearchQuery,
    destinationFilter,
    setDestinationFilter,
    setIsEnquiryModalOpen
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(packageSearchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(packageSearchQuery.toLowerCase()) ||
      pkg.shortDesc.toLowerCase().includes(packageSearchQuery.toLowerCase());

    const matchesDuration =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Under 7 Days'
        ? pkg.days <= 7
        : activeFilter === 'Grand Journeys'
        ? pkg.days > 7
        : true;

    let matchesMood = true;
    if (destinationFilter && destinationFilter !== 'All') {
      const pkgDest = destinations?.find((d) => d.id === pkg.destinationId);
      matchesMood =
        (pkgDest && pkgDest.category?.toLowerCase() === destinationFilter.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(destinationFilter.toLowerCase()) ||
        pkg.title.toLowerCase().includes(destinationFilter.toLowerCase());
    }

    return matchesSearch && matchesDuration && matchesMood;
  });

  return (
    <section id="packages" className="pt-10 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 lg:pb-32 bg-canvas">
      <div className="w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 lg:mb-12">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-champagne-dark font-semibold block mb-1.5">
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

        {/* Filter Strip: Search + Duration Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-black/[0.08] mb-8 sm:mb-12">
          
          {/* Search Input */}
          <div className="flex items-center gap-2.5 w-full md:max-w-[380px] bg-white py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-full border border-black/[0.09] shadow-subtle focus-within:border-ink transition-colors">
            <Search size={16} className="text-ink-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Filter by city, hotel or experience..."
              value={packageSearchQuery}
              onChange={(e) => setPackageSearchQuery(e.target.value)}
              className="w-full text-xs text-ink bg-transparent border-none outline-none placeholder:text-ink-faint font-sans min-w-0"
            />
            {packageSearchQuery && (
              <button
                type="button"
                onClick={() => setPackageSearchQuery('')}
                className="text-[11px] text-ink-muted hover:text-ink cursor-pointer flex-shrink-0"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Active Mood Pill */}
            {destinationFilter && destinationFilter !== 'All' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-muted">Style:</span>
                <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#f3ede2] text-ink text-xs font-medium border border-black/[0.08] whitespace-nowrap">
                  <span className="truncate max-w-[120px]">{destinationFilter}</span>
                  <button
                    type="button"
                    onClick={() => setDestinationFilter('All')}
                    className="text-ink-faint hover:text-ink cursor-pointer text-xs"
                    aria-label="Clear style filter"
                  >
                    ✕
                  </button>
                </span>
              </div>
            )}

            {/* Duration Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs overflow-x-auto pb-1 scrollbar-none flex-nowrap -mx-1 px-1">
              {['All', 'Under 7 Days', 'Grand Journeys'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`py-1.5 px-3 sm:px-3.5 rounded-full transition-all cursor-pointer font-medium whitespace-nowrap flex-shrink-0 text-[11px] sm:text-xs ${
                    activeFilter === tab
                      ? 'bg-ink text-white font-semibold shadow-sm'
                      : 'bg-transparent text-ink-muted hover:text-ink hover:bg-sand/60'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 ? (
          <EmptyState
            title="No holiday packages matched your search"
            description="Our personal travel concierges can handcraft a private itinerary for any destination or duration you desire."
            actionLabel="Request Custom Journey"
            onAction={() => setIsEnquiryModalOpen(true)}
          />
        ) : (
          /* Real Holiday Packages Grid (Resembles Actual Travel Products) */
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
