import React from 'react';
import {
  X,
  MapPin,
  Car,
  Ship,
  Utensils,
  Sparkles,
  Download,
  Share2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const TripItineraryModal = () => {
  const { viewingItinerary, setViewingItinerary, showToast } = useApp();

  if (!viewingItinerary) return null;

  const days = viewingItinerary.itineraryDays || [];

  return (
    <div
      className="fixed inset-0 bg-[#101113]/65 backdrop-blur-sm z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
      onClick={() => setViewingItinerary(null)}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-[720px] max-h-[92dvh] sm:max-h-[90vh] overflow-hidden border border-black/[0.07] shadow-float relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between border-b border-black/[0.07] bg-canvas flex-shrink-0">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] xs:text-[11px] text-champagne-dark font-semibold tracking-[0.08em] uppercase block truncate">
              Confirmed Travel Dossier • {viewingItinerary.bookingRef}
            </span>
            <h3 className="font-display text-lg xs:text-xl sm:text-2xl font-semibold text-ink leading-tight truncate">
              {viewingItinerary.packageName}
            </h3>
            <p className="text-[11px] xs:text-xs text-ink-muted mt-0.5 truncate">
              {viewingItinerary.destination} • {viewingItinerary.dates}
            </p>
          </div>
          <button
            type="button"
            className="w-9 h-9 sm:w-[44px] sm:h-[44px] flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-black/[0.04] transition-colors cursor-pointer flex-shrink-0"
            onClick={() => setViewingItinerary(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {days.length === 0 ? (
            <div className="text-center py-10 sm:py-12 text-ink-muted">
              <Clock size={32} className="mx-auto mb-2 text-champagne-dark" />
              <p className="text-xs sm:text-sm">
                Your destination specialist is finalizing the bespoke arrangements.
              </p>
            </div>
          ) : (
            <div className="relative pl-5 sm:pl-6">
              {/* Vertical timeline line */}
              <div className="absolute top-3.5 bottom-3.5 left-[7px] w-0.5 bg-black/10" />

              <div className="flex flex-col gap-6 sm:gap-9">
                {days.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Node */}
                    <div className="absolute top-0.5 -left-5 sm:-left-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-ink z-[2]" />

                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                        <span className="text-[10px] xs:text-[11px] font-semibold text-champagne-dark uppercase tracking-wide">
                          {item.date} • {item.time}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] xs:text-[10px] py-0.5 px-1.5 rounded-sm bg-sand text-ink border border-black/10">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display text-base sm:text-lg font-semibold text-ink mb-1">
                        {item.title}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-1.5">
                        <MapPin size={13} className="text-champagne-dark flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      <p className="text-xs leading-[1.6] text-ink-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="py-3 sm:py-4 px-4 sm:px-6 border-t border-black/[0.07] bg-canvas flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5 flex-shrink-0">
          <div className="text-xs text-ink-muted truncate">
            Concierge: <strong className="text-ink font-semibold">{viewingItinerary.agentContact}</strong>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Share2}
              onClick={() => showToast('Itinerary share link copied to clipboard.', 'info')}
              className="flex-1 xs:flex-none justify-center"
            >
              Share
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={() => showToast('Downloading bespoke PDF Travel Dossier...', 'success')}
              className="flex-1 xs:flex-none justify-center"
            >
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
