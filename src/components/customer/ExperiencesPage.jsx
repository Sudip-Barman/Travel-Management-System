import React, { useState } from 'react';
import {
  Compass,
  Search,
  Clock,
  MapPin,
  ArrowRight,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExperiencesPage = () => {
  const {
    experiences,
    setIsEnquiryModalOpen,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedExpModal, setSelectedExpModal] = useState(null);

  const categories = [
    'All',
    'Snow Adventures',
    'Island Escapes',
    'Mountain Treks',
    'Food & Culture',
    'Heritage & History',
    'Beach Life',
    'Wildlife',
    'Waterways & Wellness',
    'Romantic Escapes'
  ];

  const filteredExperiences = (experiences || []).filter((exp) => {
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'All' ? true : exp.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBookExperience = (exp) => {
    showToast(`Inquiry initiated for "${exp.title}". Our concierge will confirm availability.`, 'success');
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="w-full bg-[#fbfaf8] text-ink min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-[1360px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-[780px] mb-7 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-sand text-champagne-dark text-[10px] xs:text-[11px] font-mono tracking-widest uppercase font-semibold mb-2">
            <Compass size={13} className="text-champagne-dark" />
            <span>Experiences Marketplace</span>
          </div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink tracking-tight mb-2 sm:mb-3 text-balance leading-tight">
            Bespoke Activities & Moments
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-ink-muted font-light leading-relaxed text-pretty">
            Curated private activities designed to elevate your journeys. From sunrise hot air balloon safaris in Serengeti to private shikara glides on Dal Lake, book them standalone or weave them into your custom itinerary.
          </p>
        </div>

        {/* Filter Strip: Search & Category Pills */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-black/[0.08] shadow-xs mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
            
            {/* Search Input */}
            <div className="flex items-center gap-2.5 flex-1 max-w-full md:max-w-[440px] bg-[#f8f5ee] py-2.5 px-3.5 sm:px-4 rounded-xl border border-black/[0.06] focus-within:border-ink transition-colors">
              <Search size={16} className="text-ink-muted flex-shrink-0" />
              <input
                type="text"
                placeholder="Search activities, adventures, cooking..."
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
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`py-1.5 xs:py-2 px-3 xs:px-3.5 rounded-full text-[11px] xs:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    activeCategory === cat
                      ? 'bg-ink text-white shadow-xs'
                      : 'bg-sand/60 hover:bg-sand text-ink-muted hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Grid of Experience Cards */}
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-black/[0.08] px-4">
            <Compass size={36} className="mx-auto text-ink-muted mb-3 opacity-40" />
            <h3 className="font-display text-lg text-ink mb-1">No experiences matched</h3>
            <p className="text-xs text-ink-muted mb-4">Try clearing your search query or picking another category.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="group bg-white rounded-2xl overflow-hidden border border-black/[0.08] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
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
                    <span className="absolute top-2.5 right-2.5 py-0.5 px-2 rounded-full bg-black/60 backdrop-blur-md text-[9.5px] font-mono text-champagne border border-white/20 whitespace-nowrap">
                      {exp.tag}
                    </span>
                  )}

                  {/* Duration */}
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white flex items-center gap-1 whitespace-nowrap">
                    <Clock size={11} className="text-champagne" />
                    <span>{exp.duration}</span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[9.5px] font-mono uppercase tracking-wider text-ink-muted block truncate mb-1 whitespace-nowrap">
                      {exp.location}
                    </span>
                    <h3 className="font-display text-sm xs:text-base font-normal text-ink group-hover:text-champagne-dark transition-colors line-clamp-2 text-balance leading-snug min-h-[2.5rem] mb-1.5 sm:mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-ink-muted font-light line-clamp-2 leading-relaxed mb-3 text-pretty min-h-[2rem]">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 border-t border-black/[0.06] flex items-center justify-between gap-2">
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
                        className="py-1 px-2 xs:py-1.5 xs:px-2.5 rounded-full border border-black/15 hover:border-black/30 text-ink text-[10.5px] xs:text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Info
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBookExperience(exp)}
                        className="inline-flex items-center gap-1 py-1 px-2.5 xs:py-1.5 xs:px-3 rounded-full bg-ink hover:bg-ink-soft text-white text-[10.5px] xs:text-[11px] font-semibold tracking-wide uppercase transition-colors whitespace-nowrap cursor-pointer"
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
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-[560px] w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-black/10 animate-fade-in flex flex-col">
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
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne block">
                  {selectedExpModal.category}
                </span>
                <h3 className="font-display text-lg xs:text-xl uppercase truncate">
                  {selectedExpModal.title}
                </h3>
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-xs font-mono text-ink-muted mb-4 pb-3 border-b border-black/[0.06]">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-champagne-dark" />
                    {selectedExpModal.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-champagne-dark" />
                    {selectedExpModal.duration}
                  </span>
                  <span>·</span>
                  <span className="font-semibold text-ink">
                    {selectedExpModal.price} / person
                  </span>
                </div>

                <p className="text-xs xs:text-sm text-ink-soft font-light mb-6 leading-relaxed">
                  {selectedExpModal.description}
                </p>
              </div>

              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-end gap-2.5 xs:gap-3 pt-3 border-t border-black/[0.08]">
                <button
                  type="button"
                  onClick={() => setSelectedExpModal(null)}
                  className="py-2.5 px-4 rounded-full border border-black/20 text-ink text-xs font-semibold uppercase tracking-wider hover:bg-sand/40 text-center"
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
                  className="py-2.5 px-5 rounded-full bg-ink hover:bg-ink-soft text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span>Book This Experience</span>
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
