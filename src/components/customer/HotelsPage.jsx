import React, { useState } from 'react';
import {
  Hotel,
  Search,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HotelsPage = () => {
  const {
    hotels,
    setIsEnquiryModalOpen,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedHotelModal, setSelectedHotelModal] = useState(null);

  const categories = [
    { id: 'All', label: 'All Stays' },
    { id: 'Alpine', label: 'Alpine & Snow 🏔️' },
    { id: 'Heritage', label: 'Heritage & Palaces 🏰' },
    { id: 'Waterways', label: 'Lakes & Houseboats ⛵' },
    { id: 'Coastal', label: 'Coastal & Beachfront 🏖️' },
    { id: 'Cliffside', label: 'Cliffside Sanctuaries 🌊' }
  ];

  const filteredHotels = (hotels || []).filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Alpine'
        ? h.category.toLowerCase().includes('alpine') || h.destination.toLowerCase().includes('kashmir') || h.country.toLowerCase().includes('switzerland')
        : activeCategory === 'Heritage'
        ? h.category.toLowerCase().includes('heritage') || h.category.toLowerCase().includes('palace') || h.category.toLowerCase().includes('ryokan')
        : activeCategory === 'Waterways'
        ? h.category.toLowerCase().includes('houseboat') || h.category.toLowerCase().includes('waterfront') || h.category.toLowerCase().includes('lake')
        : activeCategory === 'Coastal'
        ? h.category.toLowerCase().includes('coastal') || h.destination.toLowerCase().includes('goa') || h.destination.toLowerCase().includes('bali')
        : activeCategory === 'Cliffside'
        ? h.category.toLowerCase().includes('cliffside') || h.destination.toLowerCase().includes('amalfi')
        : true;

    return matchesSearch && matchesCategory;
  });

  const handleBookHotel = (hotel) => {
    showToast(`Reservation request initiated for "${hotel.name}". Dedicated stay concierge assigned.`, 'success');
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="w-full bg-[#fbfaf8] text-ink min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-[780px] mb-7 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-sand text-champagne-dark text-[11px] font-mono tracking-widest uppercase font-semibold mb-2">
            <Hotel size={13} className="text-champagne-dark" />
            <span>Curated Hospitality</span>
          </div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink tracking-tight mb-2 sm:mb-3 text-balance leading-tight">
            Sanctuaries & Private Villas
          </h1>
          <p className="text-xs sm:text-base text-ink-muted font-light leading-relaxed text-pretty">
            Every property in our portfolio has been vetted in person. Experience heritage Rajasthan royal palaces, ski-in alpine chalets, private cedar houseboats, and cliffside Amalfi suites.
          </p>
        </div>

        {/* Filter Strip */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-black/[0.08] shadow-xs mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
            
            {/* Search Input */}
            <div className="flex items-center gap-2.5 w-full md:max-w-[400px] bg-[#f8f5ee] py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-xl border border-black/[0.06] focus-within:border-ink transition-colors">
              <Search size={16} className="text-ink-muted flex-shrink-0" />
              <input
                type="text"
                placeholder="Search stays, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm text-ink bg-transparent border-none outline-none placeholder:text-ink-faint font-medium min-w-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-ink-muted hover:text-ink text-xs font-mono flex-shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none flex-nowrap -mx-1 px-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
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

        {/* Hotels Grid */}
        {filteredHotels.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-black/[0.08] px-4">
            <Hotel size={36} className="mx-auto text-ink-muted mb-3 opacity-40" />
            <h3 className="font-display text-lg text-ink mb-1">No stays matched your query</h3>
            <p className="text-xs text-ink-muted mb-4">Try clearing your filters or exploring another destination.</p>
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
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 xs:p-4">
          <div className="bg-white rounded-2xl max-w-[580px] w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl border border-black/10 animate-fade-in">
            <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full bg-stone-900 flex-shrink-0">
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
              <div className="absolute bottom-3 left-4 right-12 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne block truncate">
                  {selectedHotelModal.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl uppercase truncate">
                  {selectedHotelModal.name}
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-xs font-mono text-ink-muted mb-4 pb-3 border-b border-black/[0.06]">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-champagne-dark" />
                  {selectedHotelModal.destination}
                </span>
                <span>·</span>
                <span className="font-semibold text-ink">
                  {selectedHotelModal.priceFormatted} / night
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-champagne-dark">
                  <Star size={11} className="fill-champagne-dark" />
                  {selectedHotelModal.rating} ({selectedHotelModal.reviewsCount})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-soft font-light mb-4 leading-relaxed">
                {selectedHotelModal.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-2.5 font-semibold">
                  Included Luxury Amenities:
                </h4>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs text-ink-soft">
                  {selectedHotelModal.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-champagne-dark flex-shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 pt-3 border-t border-black/[0.08]">
                <button
                  type="button"
                  onClick={() => setSelectedHotelModal(null)}
                  className="py-2.5 px-4 rounded-full border border-black/20 text-ink text-xs font-semibold uppercase tracking-wider hover:bg-sand/40 cursor-pointer text-center"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const h = selectedHotelModal;
                    setSelectedHotelModal(null);
                    handleBookHotel(h);
                  }}
                  className="py-2.5 px-5 rounded-full bg-ink hover:bg-ink-soft text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <span>Request Reservation</span>
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
