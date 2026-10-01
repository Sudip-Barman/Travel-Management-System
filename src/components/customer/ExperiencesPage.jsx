import React, { useState } from 'react';
import {
  Compass,
  Clock,
  ArrowRight,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  SearchFilter,
  FilterSelect,
  FilterEmptyState,
  useFilterState
} from '../common/filters';

export const ExperiencesPage = () => {
  const {
    experiences,
    setIsEnquiryModalOpen,
    showToast
  } = useApp();

  const [selectedExpModal, setSelectedExpModal] = useState(null);

  // Helper to normalize price to numeric INR for sorting and filtering
  const getExperiencePriceNumeric = (exp) => {
    if (!exp.price) return 3000;
    const cleanStr = exp.price.replace(/[^0-9]/g, '');
    const num = parseInt(cleanStr, 10) || 0;
    if (exp.price.includes('$')) {
      return num * 85;
    }
    return num;
  };

  const defaultFilters = {
    destination: 'All',
    category: 'All',
    duration: 'All',
    priceRange: 'All'
  };

  const sortOptions = [
    { value: 'recommended', label: 'Curated & Recommended' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'duration-asc', label: 'Duration: Short to Long' },
    { value: 'title-asc', label: 'Title: A to Z' }
  ];

  const filterFn = (exp, filters, search) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        exp.title.toLowerCase().includes(q) ||
        exp.location.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q) ||
        (exp.tag && exp.tag.toLowerCase().includes(q));

      if (!matchesSearch) return false;
    }

    // 2. Destination
    if (filters.destination !== 'All') {
      const dest = filters.destination.toLowerCase();
      const matchesDest =
        (exp.destinationQuery && exp.destinationQuery.toLowerCase().includes(dest)) ||
        exp.location.toLowerCase().includes(dest) ||
        exp.title.toLowerCase().includes(dest);

      if (!matchesDest) return false;
    }

    // 3. Category
    if (filters.category !== 'All') {
      if (exp.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
    }

    // 4. Duration
    if (filters.duration !== 'All') {
      const dur = (exp.duration || '').toLowerCase();
      if (filters.duration === 'short') {
        if (!dur.includes('2') && !dur.includes('3') && !dur.includes('hour')) return false;
        if (dur.includes('4') || dur.includes('5') || dur.includes('day') || dur.includes('overnight')) return false;
      } else if (filters.duration === 'medium') {
        if (!dur.includes('4') && !dur.includes('5') && !dur.includes('6')) return false;
      } else if (filters.duration === 'fullday') {
        if (!dur.includes('full day')) return false;
      } else if (filters.duration === 'overnight') {
        if (!dur.includes('overnight') && !dur.includes('night')) return false;
      }
    }

    // 5. Price Range
    if (filters.priceRange !== 'All') {
      const priceNum = getExperiencePriceNumeric(exp);
      if (filters.priceRange === 'under-3500') {
        if (priceNum > 3500) return false;
      } else if (filters.priceRange === '3500-6000') {
        if (priceNum < 3500 || priceNum > 6500) return false;
      } else if (filters.priceRange === 'above-6000') {
        if (priceNum <= 6000) return false;
      }
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'price-asc':
        return getExperiencePriceNumeric(a) - getExperiencePriceNumeric(b);
      case 'price-desc':
        return getExperiencePriceNumeric(b) - getExperiencePriceNumeric(a);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'duration-asc':
        return (a.duration || '').localeCompare(b.duration || '');
      case 'recommended':
      default:
        return 0;
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
    filteredItems: filteredExperiences
  } = useFilterState({
    items: experiences || [],
    defaultFilters,
    defaultSort: 'recommended',
    filterFn,
    sortFn
  });

  const handleBookExperience = (exp) => {
    showToast(`Inquiry initiated for "${exp.title}". Dedicated experience designer assigned.`, 'success');
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="w-full bg-[#fbfaf8] text-ink min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-[780px] mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#F3EFE7] text-[#1C1C1C] border border-[#E5DED1] text-[10px] xs:text-[11px] font-mono tracking-widest uppercase font-semibold mb-2">
            <Compass size={13} className="text-[#C8A96B]" />
            <span>Experiences Marketplace</span>
          </div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink tracking-tight mb-2 sm:mb-3 text-balance leading-tight">
            Bespoke Activities & Moments
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-ink-muted font-light leading-relaxed text-pretty">
            Curated private activities designed to elevate your journeys. From sunrise hot air balloon safaris in Serengeti to private shikara glides on Dal Lake, book them standalone or weave them into your custom itinerary.
          </p>
        </div>

        {/* Reusable SearchFilter Component */}
        <SearchFilter
          search={searchQuery}
          setSearch={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          placeholder="Search activities, adventures, cooking, locations..."
          activeCount={activeFilterCount}
          onClearAll={resetFilters}
          resultCount={filteredExperiences.length}
          resultLabel="experiences"
        >
          <FilterSelect
            label="Destination"
            value={filters.destination}
            onChange={(val) => setFilter('destination', val)}
            options={[
              { value: 'All', label: 'All Destinations' },
              { value: 'Kashmir', label: 'Kashmir' },
              { value: 'Bali', label: 'Bali' },
              { value: 'Kyoto', label: 'Kyoto' },
              { value: 'Goa', label: 'Goa' },
              { value: 'Serengeti', label: 'Serengeti' },
              { value: 'Amalfi', label: 'Amalfi Coast' },
              { value: 'Kerala', label: 'Kerala' },
              { value: 'Rajasthan', label: 'Rajasthan' },
              { value: 'Ladakh', label: 'Ladakh' }
            ]}
          />

          <FilterSelect
            label="Category"
            value={filters.category}
            onChange={(val) => setFilter('category', val)}
            options={[
              { value: 'All', label: 'All Categories' },
              { value: 'Snow Adventures', label: 'Snow Adventures' },
              { value: 'Island Escapes', label: 'Island Escapes' },
              { value: 'Mountain Treks', label: 'Mountain Treks' },
              { value: 'Food & Culture', label: 'Food & Culture' },
              { value: 'Heritage & History', label: 'Heritage & History' },
              { value: 'Beach Life', label: 'Beach Life' },
              { value: 'Wildlife', label: 'Wildlife Safari' },
              { value: 'Waterways & Wellness', label: 'Waterways & Wellness' },
              { value: 'Romantic Escapes', label: 'Romantic Escapes' },
              { value: 'Royal Heritage', label: 'Royal Heritage' },
              { value: 'Himalayan Expeditions', label: 'Himalayan Expeditions' }
            ]}
          />

          <FilterSelect
            label="Duration"
            value={filters.duration}
            onChange={(val) => setFilter('duration', val)}
            options={[
              { value: 'All', label: 'Any Duration' },
              { value: 'short', label: 'Under 3 Hours' },
              { value: 'medium', label: '4 – 6 Hours' },
              { value: 'fullday', label: 'Full Day' },
              { value: 'overnight', label: 'Overnight' }
            ]}
          />

          <FilterSelect
            label="Price"
            value={filters.priceRange}
            onChange={(val) => setFilter('priceRange', val)}
            options={[
              { value: 'All', label: 'Any Price' },
              { value: 'under-3500', label: 'Under ₹3,500 / $50' },
              { value: '3500-6000', label: '₹3,500 – ₹6,000 / $50–$100' },
              { value: 'above-6000', label: 'Above ₹6,000 / $100+' }
            ]}
          />

          <FilterSelect
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </SearchFilter>

        {/* Grid of Experience Cards */}
        {filteredExperiences.length === 0 ? (
          <FilterEmptyState
            title="No Experiences Matched"
            description="We couldn't find any activities matching your selected filters. Try clearing search or picking another category."
            onReset={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E5DED1] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
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
                  
                  {/* Category Pill */}
                  <span className="absolute top-2.5 left-2.5 py-0.5 px-2.5 rounded-full bg-white/95 text-[9.5px] font-mono font-semibold text-ink shadow-xs whitespace-nowrap">
                    {exp.category}
                  </span>

                  {/* Tag */}
                  {exp.tag && (
                    <span className="absolute top-2.5 right-2.5 py-0.5 px-2 rounded-full bg-black/60 backdrop-blur-md text-[9.5px] font-mono text-[#C8A96B] border border-white/20 whitespace-nowrap">
                      {exp.tag}
                    </span>
                  )}

                  {/* Duration */}
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white flex items-center gap-1 whitespace-nowrap">
                    <Clock size={11} className="text-[#C8A96B]" />
                    <span>{exp.duration}</span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[9.5px] font-mono uppercase tracking-wider text-ink-muted block truncate mb-1 whitespace-nowrap">
                      {exp.location}
                    </span>
                    <h3 className="font-display text-sm xs:text-base font-normal text-ink group-hover:text-[#C8A96B] transition-colors line-clamp-2 text-balance leading-snug min-h-[2.5rem] mb-1.5 sm:mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-ink-muted font-light line-clamp-2 leading-relaxed mb-3 text-pretty min-h-[2rem]">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 border-t border-[#E5DED1] flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[9px] xs:text-[9.5px] font-mono text-ink-muted uppercase block leading-none mb-0.5 whitespace-nowrap">
                        Starting from
                      </span>
                      <strong className="text-xs xs:text-sm sm:text-base font-semibold text-ink font-display truncate block whitespace-nowrap">
                        {exp.price}
                      </strong>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedExpModal(exp)}
                        className="py-1 px-2 xs:py-1.5 xs:px-2.5 rounded-full border border-[#E5DED1] hover:border-[#C8A96B] text-ink text-[10.5px] xs:text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Info
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBookExperience(exp)}
                        className="inline-flex items-center gap-1 py-1 px-2.5 xs:py-1.5 xs:px-3 rounded-full bg-[#171717] hover:bg-[#C8A96B] hover:text-[#171717] text-[#FAF8F3] text-[10.5px] xs:text-[11px] font-semibold tracking-wide uppercase transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span>Reserve</span>
                        <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Experience Detail Modal */}
      {selectedExpModal && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-[560px] w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-[#E5DED1] animate-fade-in flex flex-col">
            <div className="relative aspect-[16/10] w-full bg-stone-900 flex-shrink-0">
              <img
                src={selectedExpModal.image}
                alt={selectedExpModal.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedExpModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A96B] block">
                  {selectedExpModal.category}
                </span>
                <h3 className="font-display text-lg xs:text-xl uppercase truncate">
                  {selectedExpModal.title}
                </h3>
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs xs:text-sm text-ink-soft font-light mb-4 leading-relaxed">
                  {selectedExpModal.description}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 rounded-xl bg-[#FAF8F3] text-xs font-mono mb-4 border border-[#E5DED1]">
                  <div className="min-w-0">
                    <span className="text-ink-muted uppercase block text-[9.5px] truncate">Location</span>
                    <span className="font-semibold text-ink text-[11px] xs:text-xs truncate block">{selectedExpModal.location}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-ink-muted uppercase block text-[9.5px] truncate">Duration</span>
                    <span className="font-semibold text-ink text-[11px] xs:text-xs truncate block">{selectedExpModal.duration}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DED1] mb-5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-ink-muted">Experience Investment</span>
                    <span className="font-semibold text-ink text-sm font-display">{selectedExpModal.price}</span>
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    Includes dedicated private guide, equipment, and tailored itinerary briefing.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5DED1]">
                <button
                  type="button"
                  onClick={() => setSelectedExpModal(null)}
                  className="py-2 px-4 rounded-full border border-[#E5DED1] text-ink text-xs font-semibold uppercase tracking-wider hover:bg-[#F3EFE7] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const exp = selectedExpModal;
                    setSelectedExpModal(null);
                    handleBookExperience(exp);
                  }}
                  className="py-2 px-5 rounded-full bg-[#171717] hover:bg-[#C8A96B] hover:text-[#171717] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Reserve Experience</span>
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
