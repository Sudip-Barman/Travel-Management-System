import React, { useState } from 'react';
import {
  Hotel,
  Star,
  CheckCircle2,
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

export const HotelsPage = () => {
  const {
    hotels,
    setIsEnquiryModalOpen,
    showToast
  } = useApp();

  const [selectedHotelModal, setSelectedHotelModal] = useState(null);

  // Normalize nightly price to INR numeric for reliable cross-currency filtering/sorting
  const getHotelPriceNumeric = (hotel) => {
    if (!hotel.pricePerNight) return 25000;
    if (hotel.priceFormatted && hotel.priceFormatted.includes('$')) {
      return hotel.pricePerNight * 85;
    }
    return hotel.pricePerNight;
  };

  const defaultFilters = {
    destination: 'All',
    propertyType: 'All',
    priceRange: 'All',
    rating: 'All'
  };

  const sortOptions = [
    { value: 'curated', label: 'Curated First' },
    { value: 'rating-desc', label: 'Rating: High to Low' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' }
  ];

  const filterFn = (hotel, filters, search) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        hotel.name.toLowerCase().includes(q) ||
        hotel.destination.toLowerCase().includes(q) ||
        hotel.country.toLowerCase().includes(q) ||
        hotel.category.toLowerCase().includes(q) ||
        (hotel.tag && hotel.tag.toLowerCase().includes(q)) ||
        (hotel.description && hotel.description.toLowerCase().includes(q)) ||
        (hotel.amenities && hotel.amenities.some((a) => a.toLowerCase().includes(q)));

      if (!matchesSearch) return false;
    }

    // 2. Destination
    if (filters.destination !== 'All') {
      const dest = filters.destination.toLowerCase();
      if (!hotel.destination.toLowerCase().includes(dest)) return false;
    }

    // 3. Property Type
    if (filters.propertyType !== 'All') {
      if (hotel.category.toLowerCase() !== filters.propertyType.toLowerCase()) {
        return false;
      }
    }

    // 4. Price Bracket
    if (filters.priceRange !== 'All') {
      const price = getHotelPriceNumeric(hotel);
      if (filters.priceRange === 'under-25k') {
        if (price > 25000) return false;
      } else if (filters.priceRange === '25k-40k') {
        if (price < 25000 || price > 40000) return false;
      } else if (filters.priceRange === 'above-40k') {
        if (price <= 40000) return false;
      }
    }

    // 5. Rating
    if (filters.rating !== 'All') {
      const minRating = parseFloat(filters.rating);
      if ((hotel.rating || 0) < minRating) return false;
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'rating-desc':
        return (b.rating || 0) - (a.rating || 0);
      case 'price-asc':
        return getHotelPriceNumeric(a) - getHotelPriceNumeric(b);
      case 'price-desc':
        return getHotelPriceNumeric(b) - getHotelPriceNumeric(a);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'curated':
      default:
        return (b.rating || 0) - (a.rating || 0);
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
    filteredItems: filteredHotels
  } = useFilterState({
    items: hotels || [],
    defaultFilters,
    defaultSort: 'curated',
    filterFn,
    sortFn
  });

  const handleBookHotel = (hotel) => {
    showToast(`Reservation request initiated for "${hotel.name}". Dedicated stay concierge assigned.`, 'success');
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="w-full bg-[#fbfaf8] text-ink min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-[780px] mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#F3EFE7] text-[#1C1C1C] border border-[#E5DED1] text-[10px] xs:text-[11px] font-mono tracking-widest uppercase font-semibold mb-2">
            <Hotel size={13} className="text-[#C8A96B]" />
            <span>Curated Hospitality</span>
          </div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink tracking-tight mb-2 sm:mb-3 text-balance leading-tight">
            Sanctuaries & Private Villas
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-ink-muted font-light leading-relaxed text-pretty">
            Every property in our portfolio has been vetted in person. Experience heritage Rajasthan royal palaces, ski-in alpine chalets, private cedar houseboats, and cliffside Amalfi suites.
          </p>
        </div>

        {/* Reusable SearchFilter Component */}
        <SearchFilter
          search={searchQuery}
          setSearch={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          placeholder="Search stays, destinations, amenities, tags..."
          activeCount={activeFilterCount}
          onClearAll={resetFilters}
          resultCount={filteredHotels.length}
          resultLabel="stays & sanctuaries"
        >
          <FilterSelect
            label="Destination"
            value={filters.destination}
            onChange={(val) => setFilter('destination', val)}
            options={[
              { value: 'All', label: 'All Destinations' },
              { value: 'Kashmir', label: 'Kashmir (Gulmarg & Dal Lake)' },
              { value: 'Udaipur', label: 'Udaipur, Rajasthan' },
              { value: 'Goa', label: 'Goa Coast' },
              { value: 'Kerala', label: 'Kerala Backwaters' },
              { value: 'Bali', label: 'Bali, Indonesia' },
              { value: 'Positano', label: 'Positano, Amalfi' },
              { value: 'Kyoto', label: 'Kyoto, Japan' }
            ]}
          />

          <FilterSelect
            label="Property Type"
            value={filters.propertyType}
            onChange={(val) => setFilter('propertyType', val)}
            options={[
              { value: 'All', label: 'All Types' },
              { value: 'Alpine Resort', label: 'Alpine Resort' },
              { value: 'Heritage Houseboat', label: 'Cedar Houseboat' },
              { value: 'Heritage Palace', label: 'Heritage Palace' },
              { value: 'Boutique Coastal', label: 'Boutique Coastal' },
              { value: 'Waterfront Sanctuary', label: 'Waterfront Sanctuary' },
              { value: 'River Valley Sanctuary', label: 'River Valley Sanctuary' },
              { value: 'Cliffside Palace', label: 'Cliffside Palace' },
              { value: 'Historic Ryokan', label: 'Historic Ryokan' }
            ]}
          />

          <FilterSelect
            label="Price Range"
            value={filters.priceRange}
            onChange={(val) => setFilter('priceRange', val)}
            options={[
              { value: 'All', label: 'Any Nightly Rate' },
              { value: 'under-25k', label: 'Under ₹25,000 / $500' },
              { value: '25k-40k', label: '₹25,000 – ₹40,000 / $500–$800' },
              { value: 'above-40k', label: 'Above ₹40,000 / $800+' }
            ]}
          />

          <FilterSelect
            label="Rating"
            value={filters.rating}
            onChange={(val) => setFilter('rating', val)}
            options={[
              { value: 'All', label: 'Any Rating' },
              { value: '4.95', label: '4.95+ Stars' },
              { value: '4.97', label: '4.97+ Stars' },
              { value: '4.98', label: '4.98+ Highest Rated' }
            ]}
          />

          <FilterSelect
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </SearchFilter>

        {/* Hotels Grid */}
        {filteredHotels.length === 0 ? (
          <FilterEmptyState
            title="No Stays Matched"
            description="We couldn't find any properties matching your current filter criteria. Try expanding your destination, price range, or amenities."
            onReset={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="group bg-white rounded-2xl overflow-hidden border border-black/[0.08] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-2.5 left-2.5 py-0.5 px-2.5 rounded-full bg-white/95 text-[9.5px] font-mono font-semibold text-ink shadow-xs whitespace-nowrap">
                    {hotel.category}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 py-0.5 px-2 rounded-full bg-black/60 backdrop-blur-md text-[9.5px] font-mono text-white border border-white/15 whitespace-nowrap">
                    <Star size={10} className="text-champagne fill-champagne" />
                    <span>{hotel.rating}</span>
                    <span className="text-white/60">({hotel.reviewsCount})</span>
                  </div>

                  {/* Tag */}
                  {hotel.tag && (
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-champagne bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/15 max-w-[80%] truncate whitespace-nowrap">
                      {hotel.tag}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-mono text-ink-muted uppercase block truncate mb-1 whitespace-nowrap">
                      {hotel.destination}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-normal text-ink group-hover:text-champagne-dark transition-colors line-clamp-1 mb-1.5 sm:mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-ink-muted font-light line-clamp-2 leading-relaxed mb-3 text-pretty min-h-[2rem]">
                      {hotel.description}
                    </p>

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hotel.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="py-0.5 px-2 rounded-md bg-[#f6f2ea] text-ink-soft text-[10px] font-mono whitespace-nowrap"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-black/[0.06] flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
                    <div className="min-w-0">
                      <span className="text-[9.5px] font-mono text-ink-muted uppercase block leading-none mb-0.5 whitespace-nowrap">
                        Nightly rate from
                      </span>
                      <div className="flex items-baseline gap-1 whitespace-nowrap">
                        <strong className="text-base sm:text-lg font-semibold text-ink font-display">
                          {hotel.priceFormatted}
                        </strong>
                        <span className="text-[10px] text-ink-muted font-sans"> / night</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end xs:self-center flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedHotelModal(hotel)}
                        className="py-1.5 px-3 rounded-full border border-black/15 hover:border-black/30 text-ink text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBookHotel(hotel)}
                        className="inline-flex items-center gap-1 py-1.5 px-3 rounded-full bg-ink hover:bg-ink-soft text-white text-[11px] font-semibold tracking-wide uppercase transition-colors cursor-pointer whitespace-nowrap"
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

      {/* Hotel Detail Modal */}
      {selectedHotelModal && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-[620px] w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-black/10 animate-fade-in flex flex-col">
            <div className="relative aspect-[16/9] w-full bg-stone-900 flex-shrink-0">
              <img
                src={selectedHotelModal.image}
                alt={selectedHotelModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedHotelModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne block">
                  {selectedHotelModal.category}
                </span>
                <h3 className="font-display text-xl xs:text-2xl uppercase truncate">
                  {selectedHotelModal.name}
                </h3>
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs xs:text-sm text-ink-soft font-light mb-4 leading-relaxed">
                  {selectedHotelModal.description}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 rounded-xl bg-sand/40 text-xs font-mono mb-4">
                  <div className="min-w-0">
                    <span className="text-ink-muted uppercase block text-[9.5px] truncate">Destination</span>
                    <span className="font-semibold text-ink text-[11px] xs:text-xs truncate block">{selectedHotelModal.destination}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-ink-muted uppercase block text-[9.5px] truncate">Guest Rating</span>
                    <span className="font-semibold text-ink text-[11px] xs:text-xs truncate block">{selectedHotelModal.rating} ({selectedHotelModal.reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="mb-5 sm:mb-6">
                  <h4 className="text-[10.5px] font-mono uppercase tracking-wider text-ink-muted mb-2 font-semibold">
                    Signature Amenities & Privileges:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedHotelModal.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-ink-soft">
                        <CheckCircle2 size={13} className="text-champagne-dark flex-shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 pt-3 border-t border-black/[0.08]">
                <div className="min-w-0">
                  <span className="text-[9px] font-mono text-ink-muted uppercase block">Rates from</span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-lg font-semibold text-ink font-display">{selectedHotelModal.priceFormatted}</strong>
                    <span className="text-xs text-ink-muted">/ night</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedHotelModal(null)}
                    className="py-2.5 px-4 rounded-full border border-black/20 text-ink text-xs font-semibold uppercase tracking-wider hover:bg-sand/40 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const hotel = selectedHotelModal;
                      setSelectedHotelModal(null);
                      handleBookHotel(hotel);
                    }}
                    className="py-2.5 px-5 rounded-full bg-ink hover:bg-ink-soft text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Reserve Stay</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
