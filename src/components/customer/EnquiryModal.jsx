import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Send,
  X,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EnquiryModal = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, submitEnquiry } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: 'The Kashmir Escape',
    dates: '',
    travelers: '2 Guests',
    budget: '₹50,000 – ₹1,50,000 / $5,000 – $10,000',
    style: 'Luxury',
    accommodation: 'Boutique Heritage Villa',
    notes: ''
  });

  const tripStyles = [
    { id: 'Luxury', label: 'Luxury', desc: '5-star & private villas' },
    { id: 'Relaxation', label: 'Relaxation', desc: 'Wellness, quiet & spa' },
    { id: 'Romantic', label: 'Romantic', desc: 'Couples & private dining' },
    { id: 'Culture', label: 'Culture', desc: 'Heritage & tea ceremonies' },
    { id: 'Adventure', label: 'Adventure', desc: 'Glaciers & mountain trails' },
    { id: 'Food', label: 'Food & Wine', desc: 'Artisan cuisine & tastings' }
  ];

  const destinationOptions = [
    'The Kashmir Escape (Dal Lake & Gulmarg)',
    'Kyoto & Tokyo, Japan',
    'Amalfi Coast, Italy',
    'Bali Rainforest Sanctuary, Indonesia',
    'Goa Portuguese Heritage Villa',
    'Swiss Alps & Zermatt, Switzerland',
    'Serengeti & Masai Mara Safari',
    'Other Bespoke Sanctuary'
  ];

  const partyOptions = [
    { label: '1 Guest', sub: 'Solo Voyager' },
    { label: '2 Guests', sub: 'Couple / Honeymoon' },
    { label: 'Family of 3-4', sub: 'Curated Suite' },
    { label: 'Private Group (5+)', sub: 'Chartered Estate' }
  ];

  const budgetTiers = [
    'Under ₹50,000',
    '₹50,000 – ₹1,50,000',
    '₹1,50,000 – ₹3,50,000',
    'Ultra-Luxury ($10,000+)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    submitEnquiry(formData);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      destination: 'The Kashmir Escape',
      dates: '',
      travelers: '2 Guests',
      budget: '₹50,000 – ₹1,50,000 / $5,000 – $10,000',
      style: 'Luxury',
      accommodation: 'Boutique Heritage Villa',
      notes: ''
    });
    setIsEnquiryModalOpen(false);
  };

  if (!isEnquiryModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#101113]/65 backdrop-blur-sm z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
      onClick={() => setIsEnquiryModalOpen(false)}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-[960px] max-h-[92dvh] sm:max-h-[90vh] overflow-hidden border border-black/[0.07] shadow-float relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Cinematic Editorial Photography Story (Desktop) / Minimal Header (Mobile) */}
        <div className="md:w-5/12 bg-dark relative overflow-hidden flex flex-col justify-between p-4 xs:p-5 sm:p-8 text-white min-h-[110px] xs:min-h-[130px] sm:min-h-[160px] md:min-h-full flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
            alt="Alpine reflection"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.65] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11]/95 via-[#0d0e11]/40 to-transparent" />

          {/* Close button on mobile */}
          <button
            type="button"
            className="md:hidden absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center cursor-pointer transition-colors"
            onClick={() => setIsEnquiryModalOpen(false)}
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 pr-8 md:pr-0">
            <span className="text-[9px] xs:text-[10px] tracking-[0.2em] uppercase text-champagne-light font-semibold block mb-1">
              Private Travel Consultation
            </span>
            <h2 className="font-display text-lg xs:text-xl sm:text-2xl md:text-4xl font-normal leading-tight text-white mb-1 md:mb-2">
              Tell us about your next extraordinary journey.
            </h2>
            <p className="text-xs text-white/80 leading-relaxed hidden sm:block max-w-[280px]">
              Our senior destination specialists craft bespoke itineraries with private villas, dedicated chauffeurs, and handpicked local guides.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15 hidden md:block">
            <div className="text-[11px] text-champagne tracking-wide uppercase font-medium mb-1">
              Concierge Promise
            </div>
            <p className="text-[11.5px] text-white/70 leading-normal">
              Direct response within 4 hours. No booking commitment required.
            </p>
          </div>
        </div>

        {/* Right Side: Consultation Form */}
        <div className="md:w-7/12 flex-1 overflow-y-auto flex flex-col bg-canvas/30">
          {/* Header on desktop */}
          <div className="hidden md:flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-black/[0.07] bg-white sticky top-0 z-10">
            <div>
              <span className="text-[10px] tracking-[0.18em] uppercase text-champagne-dark font-semibold block">
                Itinerary Request
              </span>
              <h3 className="font-display text-xl font-medium text-ink">
                Bespoke Travel Brief
              </h3>
            </div>
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-black/[0.04] transition-colors cursor-pointer"
              onClick={() => setIsEnquiryModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-3.5 xs:p-5 sm:p-7 flex flex-col gap-4 sm:gap-6">
            {/* SECTION 1: Personal Details */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-champagne-dark mb-2.5 sm:mb-3 flex items-center gap-1.5">
                <span>01.</span> Primary Guest Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="text-[11px] font-medium text-ink-muted block mb-1" htmlFor="enq-fullname">
                    Full Name *
                  </label>
                  <input
                    id="enq-fullname"
                    type="text"
                    required
                    placeholder="e.g. Vikram Singhania"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs sm:text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-lg py-2 sm:py-2.5 px-3 min-h-[40px] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-ink-muted block mb-1" htmlFor="enq-email">
                    Email Address *
                  </label>
                  <input
                    id="enq-email"
                    type="email"
                    required
                    placeholder="e.g. client@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-lg py-2 sm:py-2.5 px-3 min-h-[40px] outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-medium text-ink-muted block mb-1" htmlFor="enq-phone">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    id="enq-phone"
                    type="tel"
                    placeholder="e.g. +91 98000 00000 / +1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-lg py-2 sm:py-2.5 px-3 min-h-[40px] outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Destination & Dates */}
            <div className="pt-3.5 sm:pt-4 border-t border-black/[0.07]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-champagne-dark mb-2.5 sm:mb-3 flex items-center gap-1.5">
                <span>02.</span> Destination & Travel Window
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="text-[11px] font-medium text-ink-muted block mb-1" htmlFor="enq-dest">
                    Preferred Sanctuary
                  </label>
                  <div className="relative">
                    <select
                      id="enq-dest"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full text-xs sm:text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-lg py-2 sm:py-2.5 px-3 pr-8 min-h-[40px] outline-none transition-colors cursor-pointer appearance-none"
                    >
                      {destinationOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <Compass size={14} className="text-champagne-dark absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-ink-muted block mb-1" htmlFor="enq-dates">
                    Travel Dates / Window
                  </label>
                  <div className="relative">
                    <input
                      id="enq-dates"
                      type="text"
                      placeholder="e.g. Autumn 2026, or May 10-18"
                      value={formData.dates}
                      onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                      className="w-full text-xs sm:text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-lg py-2 sm:py-2.5 px-3 pr-8 min-h-[40px] outline-none transition-colors"
                    />
                    <Calendar size={14} className="text-champagne-dark absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Party Size & Trip Style Chips */}
            <div className="pt-3.5 sm:pt-4 border-t border-black/[0.07]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-champagne-dark mb-2.5 sm:mb-3 flex items-center gap-1.5">
                <span>03.</span> Party Size & Desired Cadence
              </div>

              {/* Party size select chips */}
              <div className="mb-3.5">
                <label className="text-[11px] font-medium text-ink-muted block mb-1.5">
                  Party Size
                </label>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2">
                  {partyOptions.map((opt) => {
                    const isSelected = formData.travelers === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, travelers: opt.label })}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'bg-ink text-white border-ink shadow-sm'
                            : 'bg-white text-ink border-black/15 hover:bg-sand'
                        }`}
                      >
                        <div className="text-xs font-semibold leading-tight truncate">{opt.label}</div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-champagne-light' : 'text-ink-muted'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Elegant Trip Style Selectable Chips */}
              <div>
                <label className="text-[11px] font-medium text-ink-muted block mb-1.5">
                  Travel Mood / Style
                </label>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
                  {tripStyles.map((style) => {
                    const isSelected = formData.style === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, style: style.id })}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-150 flex items-center justify-between ${
                          isSelected
                            ? 'bg-sand border-ink text-ink font-semibold'
                            : 'bg-white border-black/15 text-ink-soft hover:bg-sand/60'
                        }`}
                      >
                        <div className="min-w-0 pr-1">
                          <div className="text-xs leading-tight truncate">{style.label}</div>
                          <div className="text-[10px] text-ink-muted leading-tight truncate">{style.desc}</div>
                        </div>
                        {isSelected && <Check size={13} className="text-ink flex-shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 4: Estimated Budget & Special Requirements */}
            <div className="pt-3.5 sm:pt-4 border-t border-black/[0.07]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-champagne-dark mb-2.5 sm:mb-3 flex items-center gap-1.5">
                <span>04.</span> Budget & Desires
              </div>

              <div className="mb-3.5">
                <label className="text-[11px] font-medium text-ink-muted block mb-1.5">
                  Target Budget Tier (Per Guest)
                </label>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-1.5 xs:gap-2">
                  {budgetTiers.map((tier) => {
                    const isSelected = formData.budget === tier;
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: tier })}
                        className={`py-2 px-2 rounded-lg border text-center cursor-pointer text-[11px] xs:text-xs transition-colors truncate ${
                          isSelected
                            ? 'bg-ink text-white border-ink font-semibold'
                            : 'bg-white text-ink border-black/15 hover:bg-sand'
                        }`}
                      >
                        {tier}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-ink-muted block mb-1" htmlFor="enq-notes">
                  Special Preferences or Desires
                </label>
                <textarea
                  id="enq-notes"
                  rows={2}
                  placeholder="e.g. Private plunge pool, dietary preferences, anniversary champagne, helicopter transfers, private tea ceremony..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs text-ink bg-white border border-black/15 focus:border-ink rounded-lg p-2.5 sm:p-3 outline-none transition-colors resize-y leading-relaxed"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-3.5 sm:pt-4 border-t border-black/[0.07] flex flex-col-reverse xs:flex-row xs:items-center justify-between gap-2.5 sm:gap-3">
              <span className="text-[10px] xs:text-[11px] text-ink-faint text-center xs:text-left">
                Dedicated advisor assigned upon submission.
              </span>

              <div className="flex gap-2 w-full xs:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEnquiryModalOpen(false)}
                  className="flex-1 xs:flex-none inline-flex items-center justify-center font-sans text-xs font-medium py-2.5 px-4 rounded-full bg-transparent hover:bg-sand border border-black/15 text-ink transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 xs:flex-none inline-flex items-center justify-center gap-1.5 font-sans text-xs font-medium py-2.5 px-5 sm:px-6 rounded-full bg-ink hover:bg-ink-soft text-white transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Submit Brief</span>
                  <Send size={13} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
