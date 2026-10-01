import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PackageDetailModal = () => {
  const {
    selectedPackage,
    setSelectedPackage,
    setIsEnquiryModalOpen,
    setIsChatOpen
  } = useApp();

  const [expandedDay, setExpandedDay] = useState(1);
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedPackage && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [selectedPackage]);

  if (!selectedPackage) return null;

  const handleRequestQuote = () => {
    setSelectedPackage(null);
    setIsEnquiryModalOpen(true);
  };

  const handleChatWithAdvisor = () => {
    setSelectedPackage(null);
    setIsChatOpen(true);
  };

  return (
    <div
      className="fixed inset-0 bg-[#101113]/65 backdrop-blur-sm z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
      onClick={() => setSelectedPackage(null)}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-[820px] max-h-[92dvh] sm:max-h-[90vh] overflow-hidden border border-black/[0.07] shadow-float relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Minimal Header */}
        <div className="py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between border-b border-black/[0.07] bg-canvas flex-shrink-0">
          <span className="text-[10px] xs:text-[11px] tracking-[0.14em] uppercase text-champagne-dark font-semibold truncate max-w-[calc(100%-48px)]">
            Curated Journey Dossier • {selectedPackage.destination}
          </span>

          <button
            type="button"
            className="w-9 h-9 sm:w-[44px] sm:h-[44px] flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-black/[0.04] transition-colors cursor-pointer flex-shrink-0"
            onClick={() => setSelectedPackage(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Editorial Content */}
        <div ref={contentRef} className="overflow-y-auto flex-1">
          {/* Large Hero Photography with Cinematic Framing */}
          <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[340px] md:h-[400px] bg-dark flex-shrink-0">
            <img
              src={selectedPackage.image}
              alt={selectedPackage.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11]/85 via-[#0d0e11]/20 via-60% to-transparent" />

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
              <span className="text-[10px] xs:text-[11px] tracking-[0.12em] uppercase text-white/80 block mb-1">
                {selectedPackage.badge}
              </span>

              <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.1] text-white mb-1">
                {selectedPackage.title}
              </h2>
            </div>
          </div>

          <div className="p-4 xs:p-6 sm:p-8 md:p-10">
            {/* Metadata & Price Strip */}
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pb-4 border-b border-black/[0.07] mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs xs:text-sm font-semibold text-ink whitespace-nowrap">
                  {selectedPackage.days} Days · {selectedPackage.nights} Nights
                </span>
                <span className="text-ink-faint mx-1.5 sm:mx-2">•</span>
                <span className="text-xs text-ink-muted whitespace-nowrap">
                  {selectedPackage.groupType}
                </span>
              </div>

              <div className="whitespace-nowrap">
                <span className="text-[10px] xs:text-[11px] text-ink-faint mr-1.5">
                  {selectedPackage.pricePrefix || 'From'}
                </span>
                <strong className="font-display text-xl xs:text-2xl font-medium text-ink">
                  {selectedPackage.priceFormatted}
                </strong>
                <span className="text-xs text-ink-faint font-sans"> / guest</span>
              </div>
            </div>

            {/* Narrative Editorial Excerpt */}
            <p className="font-display text-base xs:text-lg sm:text-xl md:text-2xl italic leading-[1.4] text-ink-soft mb-6 sm:mb-8">
              “{selectedPackage.editorialHighlight || selectedPackage.shortDesc}”
            </p>

            {/* Sanctuary & Hotel Stay Preview */}
            <div className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-xl bg-[#f7f3ec] border border-black/[0.05] flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
              <div className="w-full sm:w-[150px] aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0 bg-dark">
                <img
                  src={selectedPackage.image}
                  alt={selectedPackage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] xs:text-[10.5px] uppercase tracking-widest text-champagne-dark font-semibold block mb-1">
                  Vetted Sanctuary Accommodation
                </span>
                <div className="font-display text-base sm:text-lg font-medium text-ink mb-1">
                  Private Heritage Suites & Boutique Retreats
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Carefully inspected hand-carved suites and cliffside retreats with dedicated round-the-clock Butler and Concierge services.
                </p>
              </div>
            </div>

            {/* Curated Highlights Block */}
            <div className="bg-[#f6f2e9] p-4 sm:p-6 rounded-xl mb-8 sm:mb-10 border border-black/[0.05]">
              <span className="text-[11px] tracking-[0.2em] uppercase text-champagne-dark font-semibold block mb-3">
                Signature Curated Inclusions
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mt-2">
                {selectedPackage.inclusions.map((inc, idx) => (
                  <div
                    key={idx}
                    className="flex items-baseline gap-2.5 text-xs text-ink-soft leading-[1.6]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-dark flex-shrink-0 mt-1" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Journey Flow */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.2em] uppercase text-champagne-dark font-semibold block">
                  Day-by-Day Journey Story
                </span>
                <span className="text-[11px] text-ink-faint">
                  {selectedPackage.days} Days Curated Flow
                </span>
              </div>
              <div className="flex flex-col gap-2.5 mt-2">
                {selectedPackage.itinerarySummary.map((item) => {
                  const isOpen = expandedDay === item.day;
                  return (
                    <div
                      key={item.day}
                      className={`border border-black/[0.07] rounded-xl overflow-hidden transition-colors ${
                        isOpen ? 'bg-white' : 'bg-canvas'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDay(isOpen ? null : item.day)}
                        className="w-full py-3 px-3.5 sm:py-3.5 sm:px-5 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                          <span className="font-display text-sm sm:text-base font-semibold text-champagne-dark flex-shrink-0">
                            Day {String(item.day).padStart(2, '0')}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-ink truncate">
                            {item.title}
                          </span>
                        </div>
                        {isOpen ? <ChevronUp size={16} className="flex-shrink-0" /> : <ChevronDown size={16} className="flex-shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="px-3.5 sm:px-5 pb-4 text-xs leading-[1.7] text-ink-muted border-t border-black/[0.07] pt-2.5">
                          {item.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Enquiry Actions */}
            <div className="flex flex-col-reverse xs:flex-row xs:items-center justify-between gap-3 pt-5 sm:pt-6 border-t border-black/[0.07]">
              <button
                type="button"
                onClick={handleChatWithAdvisor}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-medium tracking-wide text-ink border-b border-ink pb-0.5 hover:gap-2.5 transition-all cursor-pointer py-1 whitespace-nowrap"
              >
                <MessageSquare size={14} /> Speak with Destination Advisor
              </button>

              <button
                type="button"
                onClick={handleRequestQuote}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 font-sans text-xs tracking-wide font-medium py-3 px-5 sm:px-6 rounded-full min-h-[44px] bg-ink hover:bg-ink-soft text-white transition-all cursor-pointer text-center whitespace-nowrap"
              >
                <span>Request Custom Proposal</span>
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
