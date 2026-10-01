import React, { useState } from 'react';
import {
  Search,
  Star,
  Compass,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DestinationsPage = () => {
  const {
    destinations,
    setCustomerTab,
    setPackageSearchQuery,
    setDestinationFilter,
    destinationFilter,
    setIsEnquiryModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(destinationFilter || 'All');
  const [selectedDestinationModal, setSelectedDestinationModal] = useState(null);

  const categories = [
    { id: 'All', label: 'All Destinations' },
    { id: 'India', label: 'Incredible India 🇮🇳' },
    { id: 'International', label: 'International Escapes 🌍' },
    { id: 'Mountain', label: 'Mountain & Snow 🏔️' },
    { id: 'Coastal', label: 'Coastal & Islands 🏖️' },
    { id: 'Cultural', label: 'Heritage & Culture ⛩️' }
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dest.subtitle && dest.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (dest.tagline && dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeCategory === 'All'
        ? true
        : activeCategory === 'India'
        ? dest.country === 'India'
        : activeCategory === 'International'
        ? dest.country !== 'India'
        : dest.category?.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleExplorePackages = (dest) => {
    setPackageSearchQuery(dest.name);
    setDestinationFilter(dest.category || 'All');
    setCustomerTab('packages');
  };

  return (
    <div className="w-full bg-[#fbfaf8] text-ink min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-[780px] mb-7 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-sand text-champagne-dark text-[10px] xs:text-[11px] font-mono tracking-widest uppercase font-semibold mb-2">
            <Compass size={13} className="text-champagne-dark" />
            <span>Destination Discovery</span>
          </div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink tracking-tight mb-2 sm:mb-3 text-balance leading-tight">
            Hand-Picked Sanctuaries
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-ink-muted font-light leading-relaxed text-pretty">
            From the cedar houseboats of Dal Lake to the clifftop villas of Positano, explore iconic regions vetted for unmatched hospitality, beauty, and authenticity.
          </p>
        </div>

        {/* Filter Strip: Search & Category Tabs */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-black/[0.08] shadow-xs mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
            
            {/* Search Input */}
            <div className="flex items-center gap-2.5 flex-1 max-w-full md:max-w-[440px] bg-[#f8f5ee] py-2.5 px-3.5 sm:px-4 rounded-xl border border-black/[0.06] focus-within:border-ink transition-colors">
              <Search size={16} className="text-ink-muted flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by destination, country, style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm text-ink bg-transparent border-none outline-none placeholder:text-ink-faint font-medium min-w-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-ink-muted hover:text-ink text-xs font-mono flex-shrink-0 ml-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 xs:gap-2 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto -mx-1 px-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`py-1.5 xs:py-2 px-3 xs:px-3.5 rounded-full text-[11px] xs:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-ink text-white shadow-xs'
                      : 'bg-sand/60 hover:bg-sand text-ink-muted hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Destination Results Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-black/[0.08] px-4">
            <Compass size={36} className="mx-auto text-ink-muted mb-3 opacity-40" />
            <h3 className="font-display text-lg text-ink mb-1">No destinations matched</h3>
            <p className="text-xs text-ink-muted mb-4">Try adjusting your search criteria or resetting filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="py-2 px-4 rounded-full bg-ink text-white text-xs font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-white rounded-2xl overflow-hidden border border-black/[0.08] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Country Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md py-0.5 px-2.5 rounded-full text-[10px] font-mono tracking-wider uppercase text-white border border-white/15 whitespace-nowrap">
                    {dest.country}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md py-0.5 px-2 rounded-full text-[10px] font-mono text-white border border-white/15 whitespace-nowrap">
                    <Star size={10} className="text-champagne fill-champagne" />
                    <span className="font-semibold">{dest.rating || 4.9}</span>
                  </div>

                  {/* Title & Tagline overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl font-normal uppercase tracking-tight text-white mb-0.5 truncate">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-white/85 line-clamp-1 font-light text-pretty">
                      {dest.subtitle}
                    </p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    {/* Metadata strip */}
                    <div className="grid grid-cols-2 gap-2 py-2 mb-3 border-y border-black/[0.05] text-[11px] font-mono text-ink-muted">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Calendar size={12} className="text-champagne-dark flex-shrink-0" />
                        <span className="truncate whitespace-nowrap">Best: {dest.bestSeason?.split('&')[0] || 'Year-round'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0 justify-end sm:justify-start">
                        <Clock size={12} className="text-champagne-dark flex-shrink-0" />
                        <span className="truncate whitespace-nowrap">Stay: {dest.idealDays || '7-10 Days'}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    {dest.highlights && dest.highlights.length > 0 && (
                      <div className="space-y-1 mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block font-semibold">
                          Signature Highlights:
                        </span>
                        {dest.highlights.slice(0, 2).map((hl, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-ink-soft">
                            <CheckCircle2 size={12} className="text-champagne-dark flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1" title={hl}>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[9.5px] font-mono text-ink-muted uppercase block leading-none mb-0.5 whitespace-nowrap">
                        Starts at
                      </span>
                      <strong className="text-sm sm:text-base font-semibold text-ink font-display truncate block whitespace-nowrap">
                        {dest.priceFormatted}
                      </strong>
                    </div>

                    <div className="flex items-center gap-1.5 xs:gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedDestinationModal(dest)}
                        className="py-1.5 px-2.5 xs:px-3 rounded-full border border-black/15 hover:border-black/30 text-ink text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Info
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExplorePackages(dest)}
                        className="inline-flex items-center gap-1 py-1.5 px-3 xs:px-3.5 rounded-full bg-ink hover:bg-ink-soft text-white text-[11px] font-semibold tracking-wide uppercase transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span>Trips</span>
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Destination Quick Details Modal */}
      {selectedDestinationModal && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-[620px] w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-black/10 animate-fade-in flex flex-col">
            <div className="relative aspect-[16/9] w-full bg-stone-900 flex-shrink-0">
              <img
                src={selectedDestinationModal.image}
                alt={selectedDestinationModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedDestinationModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne block">
                  {selectedDestinationModal.country}
                </span>
                <h3 className="font-display text-xl xs:text-2xl uppercase truncate">
                  {selectedDestinationModal.name}
                </h3>
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs xs:text-sm text-ink-soft font-light mb-4 leading-relaxed">
                  {selectedDestinationModal.tagline || selectedDestinationModal.subtitle}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 rounded-xl bg-sand/40 text-xs font-mono mb-4">
                  <div className="min-w-0">
                    <span className="text-ink-muted uppercase block text-[9.5px] truncate">Best Season</span>
                    <span className="font-semibold text-ink text-[11px] xs:text-xs truncate block">{selectedDestinationModal.bestSeason}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-ink-muted uppercase block text-[9.5px] truncate">Recommended Stay</span>
                    <span className="font-semibold text-ink text-[11px] xs:text-xs truncate block">{selectedDestinationModal.idealDays}</span>
                  </div>
                </div>

                {selectedDestinationModal.highlights && (
                  <div className="mb-5 sm:mb-6">
                    <h4 className="text-[10.5px] font-mono uppercase tracking-wider text-ink-muted mb-2 font-semibold">
                      Key Highlights & Things To Do:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-ink-soft">
                      {selectedDestinationModal.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 min-w-0">
                          <CheckCircle2 size={13} className="text-champagne-dark flex-shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-end gap-2.5 xs:gap-3 pt-3 border-t border-black/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDestinationModal(null);
                    setIsEnquiryModalOpen(true);
                  }}
                  className="py-2.5 px-4 rounded-full border border-black/20 text-ink text-xs font-semibold uppercase tracking-wider hover:bg-sand/40 text-center"
                >
                  Custom Enquiry
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const dest = selectedDestinationModal;
                    setSelectedDestinationModal(null);
                    handleExplorePackages(dest);
                  }}
                  className="py-2.5 px-5 rounded-full bg-ink hover:bg-ink-soft text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span>Explore Packages</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
