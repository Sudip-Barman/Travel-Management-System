import React, { useState } from 'react';
import {
  Compass,
  Star,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  SearchFilter,
  FilterSelect,
  FilterEmptyState,
  useFilterState
} from '../common/filters';

export const DestinationsPage = () => {
  const {
    destinations,
    setCustomerTab,
    setPackageSearchQuery,
    setDestinationFilter,
    setIsEnquiryModalOpen
  } = useApp();

  const [selectedDestinationModal, setSelectedDestinationModal] = useState(null);

  // Normalize pricing helper
  const getDestinationPrice = (dest) => {
    if (dest.startingPrice) {
      return dest.startingPrice < 10000 ? dest.startingPrice * 85 : dest.startingPrice;
    }
    return 40000;
  };

  const defaultFilters = {
    region: 'All',
    type: 'All',
    style: 'All',
    budget: 'All'
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'rating-desc', label: 'Rating: High to Low' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' }
  ];

  const filterFn = (dest, filters, search) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        dest.name.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        (dest.subtitle && dest.subtitle.toLowerCase().includes(q)) ||
        (dest.tagline && dest.tagline.toLowerCase().includes(q)) ||
        (dest.highlights && dest.highlights.some((h) => h.toLowerCase().includes(q)));

      if (!matchesSearch) return false;
    }

    // 2. Country / Region
    if (filters.region !== 'All') {
      if (filters.region === 'India') {
        if (dest.country !== 'India') return false;
      } else if (filters.region === 'International') {
        if (dest.country === 'India') return false;
      } else if (dest.country !== filters.region) {
        return false;
      }
    }

    // 3. Category / Type
    if (filters.type !== 'All') {
      if (dest.category?.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
    }

    // 4. Travel Style
    if (filters.style !== 'All') {
      const style = filters.style.toLowerCase();
      const content = `${dest.name} ${dest.subtitle || ''} ${dest.tagline || ''} ${dest.highlights?.join(' ') || ''}`.toLowerCase();

      if (style.includes('heritage') || style.includes('royal')) {
        if (dest.category !== 'Cultural' && !content.includes('heritage') && !content.includes('palace')) return false;
      } else if (style.includes('snow') || style.includes('mountain')) {
        if (dest.category !== 'Mountain' && !content.includes('snow') && !content.includes('alpine')) return false;
      } else if (style.includes('coastal') || style.includes('island')) {
        if (dest.category !== 'Coastal' && dest.category !== 'Tropical' && !content.includes('beach') && !content.includes('coast')) return false;
      } else if (style.includes('wildlife')) {
        if (dest.category !== 'Wildlife' && !content.includes('safari')) return false;
      } else if (style.includes('wellness')) {
        if (!content.includes('ayurved') && !content.includes('tea') && !content.includes('spa') && !content.includes('sanctuary')) return false;
      }
    }

    // 5. Budget Range
    if (filters.budget !== 'All') {
      const normalizedPrice = getDestinationPrice(dest);
      if (filters.budget === 'under-40k') {
        if (normalizedPrice > 40000) return false;
      } else if (filters.budget === '40k-50k') {
        if (normalizedPrice < 40000 || normalizedPrice > 55000) return false;
      } else if (filters.budget === 'above-50k') {
        if (normalizedPrice <= 50000) return false;
      }
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'rating-desc':
        return (b.rating || 0) - (a.rating || 0);
      case 'price-asc':
        return getDestinationPrice(a) - getDestinationPrice(b);
      case 'price-desc':
        return getDestinationPrice(b) - getDestinationPrice(a);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
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
    filteredItems: filteredDestinations
  } = useFilterState({
    items: destinations || [],
    defaultFilters,
    defaultSort: 'featured',
    filterFn,
    sortFn
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
        <div className="max-w-[780px] mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#F3EFE7] border border-[#E5DED1] text-[#1C1C1C] text-[10px] xs:text-[11px] font-mono tracking-widest uppercase font-semibold mb-2">
            <Compass size={13} className="text-[#C8A96B]" />
            <span>Destination Discovery</span>
          </div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink tracking-tight mb-2 sm:mb-3 text-balance leading-tight">
            Hand-Picked Sanctuaries
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-ink-muted font-light leading-relaxed text-pretty">
            From the cedar houseboats of Dal Lake to the clifftop villas of Positano, explore iconic regions vetted for unmatched hospitality, beauty, and authenticity.
          </p>
        </div>

        {/* Reusable SearchFilter Component */}
        <SearchFilter
          search={searchQuery}
          setSearch={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          placeholder="Search destinations, countries, styles..."
          activeCount={activeFilterCount}
          onClearAll={resetFilters}
          resultCount={filteredDestinations.length}
          resultLabel="destinations"
        >
          <FilterSelect
            label="Country / Region"
            value={filters.region}
            onChange={(val) => setFilter('region', val)}
            options={[
              { value: 'All', label: 'All Regions' },
              { value: 'India', label: 'Incredible India 🇮🇳' },
              { value: 'International', label: 'International 🌍' },
              { value: 'Japan', label: 'Japan' },
              { value: 'Italy', label: 'Italy' },
              { value: 'Switzerland', label: 'Switzerland' },
              { value: 'Indonesia', label: 'Indonesia' },
              { value: 'Tanzania & Kenya', label: 'East Africa' }
            ]}
          />

          <FilterSelect
            label="Category / Type"
            value={filters.type}
            onChange={(val) => setFilter('type', val)}
            options={[
              { value: 'All', label: 'All Types' },
              { value: 'Cultural', label: 'Cultural & Heritage' },
              { value: 'Coastal', label: 'Coastal & Shores' },
              { value: 'Mountain', label: 'Mountain & Alpine' },
              { value: 'Tropical', label: 'Tropical Island' },
              { value: 'Wildlife', label: 'Wildlife & Safari' }
            ]}
          />

          <FilterSelect
            label="Travel Style"
            value={filters.style}
            onChange={(val) => setFilter('style', val)}
            options={[
              { value: 'All', label: 'All Styles' },
              { value: 'Heritage & Royal', label: 'Heritage & Royal' },
              { value: 'Mountain & Snow', label: 'Snow & Alpine' },
              { value: 'Coastal & Islands', label: 'Coastal & Yachts' },
              { value: 'Wellness & Retreat', label: 'Tea & Wellness' },
              { value: 'Wildlife Expedition', label: 'Bush Safari' }
            ]}
          />

          <FilterSelect
            label="Budget"
            value={filters.budget}
            onChange={(val) => setFilter('budget', val)}
            options={[
              { value: 'All', label: 'Any Budget' },
              { value: 'under-40k', label: 'Under ₹40,000 / $3k' },
              { value: '40k-50k', label: '₹40,000 – ₹50,000 / $3k–$5k' },
              { value: 'above-50k', label: 'Above ₹50,000 / $5k+' }
            ]}
          />

          <FilterSelect
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </SearchFilter>

        {/* Destination Results Grid */}
        {filteredDestinations.length === 0 ? (
          <FilterEmptyState
            title="No Destinations Matched"
            description="We couldn't find any destinations matching your current filter criteria. Try clearing search or picking another region."
            onReset={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E5DED1] shadow-[0_4px_20px_rgba(23,23,23,0.03)] hover:shadow-md hover:border-[#D8D0C2] transition-all duration-200 flex flex-col justify-between"
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
                    <Star size={10} className="text-[#C8A96B] fill-[#C8A96B]" />
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
                    <div className="grid grid-cols-2 gap-2 py-2 mb-3 border-y border-[#E5DED1] text-[11px] font-mono text-[#6F6A61]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Calendar size={12} className="text-[#C8A96B] flex-shrink-0" />
                        <span className="truncate whitespace-nowrap">Best: {dest.bestSeason?.split('&')[0] || 'Year-round'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0 justify-end sm:justify-start">
                        <Clock size={12} className="text-[#C8A96B] flex-shrink-0" />
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
                            <CheckCircle2 size={12} className="text-[#C8A96B] flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1" title={hl}>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-3 border-t border-[#E5DED1] flex items-center justify-between gap-2">
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
                        className="py-1.5 px-2.5 xs:px-3 rounded-full border border-[#E5DED1] hover:border-[#C8A96B] bg-[#FAF8F3] hover:bg-[#F3EFE7] text-[#1C1C1C] text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Info
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExplorePackages(dest)}
                        className="inline-flex items-center gap-1 py-1.5 px-3 xs:px-3.5 rounded-full bg-[#171717] hover:bg-[#C8A96B] hover:text-[#171717] text-[#FAF8F3] text-[11px] font-semibold tracking-wide uppercase transition-colors whitespace-nowrap cursor-pointer"
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
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-[620px] w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-[#E5DED1] animate-fade-in flex flex-col">
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
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A96B] block">
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

                <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 rounded-xl bg-[#FAF8F3] text-xs font-mono mb-4 border border-[#E5DED1]">
                  <div className="min-w-0">
                    <span className="text-[#6F6A61] uppercase block text-[9.5px] truncate">Best Season</span>
                    <span className="font-semibold text-[#1C1C1C] text-[11px] xs:text-xs truncate block">{selectedDestinationModal.bestSeason}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#6F6A61] uppercase block text-[9.5px] truncate">Recommended Stay</span>
                    <span className="font-semibold text-[#1C1C1C] text-[11px] xs:text-xs truncate block">{selectedDestinationModal.idealDays}</span>
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
                          <CheckCircle2 size={13} className="text-[#C8A96B] flex-shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-end gap-2.5 xs:gap-3 pt-3 border-t border-[#E5DED1]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDestinationModal(null);
                    setIsEnquiryModalOpen(true);
                  }}
                  className="py-2.5 px-4 rounded-full border border-[#E5DED1] text-[#1C1C1C] text-xs font-semibold uppercase tracking-wider hover:bg-[#F3EFE7] hover:border-[#C8A96B] text-center cursor-pointer transition-colors"
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
                  className="py-2.5 px-5 rounded-full bg-[#171717] hover:bg-[#C8A96B] hover:text-[#171717] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
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
