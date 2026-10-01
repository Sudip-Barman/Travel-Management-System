import React from 'react';
import {
  Calendar,
  MapPin,
  Plane,
  Building,
  Clock,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../common/EmptyState';

export const CustomerBookings = () => {
  const { bookings, setViewingItinerary, setIsChatOpen, setCustomerTab } = useApp();

  return (
    <section className="pt-16 md:pt-24 lg:pt-36 pb-20 md:pb-28 lg:pb-36 bg-canvas">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-6 lg:px-9">
        <div className="max-w-[680px] mb-12 sm:mb-16">
          <span className="text-[11px] tracking-[0.2em] uppercase text-champagne-dark font-semibold block mb-1.5">
            Confirmed Journeys
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.15] text-ink mb-2">
            My Active Travel Dossier
          </h2>
          <p className="text-base text-ink-muted leading-[1.68]">
            Access all travel vouchers, scheduled flights, hotel reservations, and day-by-day concierge timelines.
          </p>
        </div>

        {bookings.length === 0 ? (
          <EmptyState
            title="No active bookings found"
            description="You have no active trip bookings under this profile. Discover handcrafted journeys to begin."
            actionLabel="Discover Journeys"
            onAction={() => setCustomerTab('packages')}
          />
        ) : (
          <div className="flex flex-col gap-12 sm:gap-16">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg border border-black/[0.08] p-6 sm:p-8 md:p-10 shadow-subtle"
              >
                {/* Booking Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-black/[0.07]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-champagne-dark tracking-wide">
                        REF: {booking.bookingRef}
                      </span>
                      <span className="text-[10.5px] py-0.5 px-2 rounded-sm bg-status-emerald-bg text-status-emerald font-semibold">
                        {booking.bookingStatus}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-ink mb-1">
                      {booking.packageName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-champagne-dark" /> {booking.destination}
                      </span>
                      <span className="text-black/20">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-champagne-dark" /> {booking.dates}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-ink-faint block">Payment Settlement</span>
                    <span className="text-xs font-semibold text-status-emerald">
                      {booking.paymentStatus}
                    </span>
                    <div className="font-display text-xl font-semibold text-ink mt-0.5">
                      {booking.priceFormatted || `$${booking.totalPrice.toLocaleString()}`}
                    </div>
                  </div>
                </div>

                {/* Key Logistics Cards */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 my-6">
                  <div className="p-3 sm:p-3.5 bg-sand rounded-sm border border-black/[0.05]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Building size={14} className="text-champagne-dark" />
                      <span className="text-[11px] font-semibold uppercase text-ink-muted">
                        Sanctuary / Suite
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-ink">
                      {booking.hotelName}
                    </div>
                  </div>

                  <div className="p-3 sm:p-3.5 bg-sand rounded-sm border border-black/[0.05]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Plane size={14} className="text-champagne-dark" />
                      <span className="text-[11px] font-semibold uppercase text-ink-muted">
                        Flight Coordination
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-ink">
                      {booking.flightCode}
                    </div>
                  </div>

                  <div className="p-3 sm:p-3.5 bg-sand rounded-sm border border-black/[0.05]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock size={14} className="text-champagne-dark" />
                      <span className="text-[11px] font-semibold uppercase text-ink-muted">
                        On-Call Concierge
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-ink">
                      {booking.agentContact}
                    </div>
                  </div>
                </div>

                {/* Booking Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/[0.07]">
                  <div className="text-xs text-ink-muted">
                    VIP Airport Transfers & Luggage Porter Confirmed
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsChatOpen(true)}
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-medium py-2 px-3.5 rounded-full min-h-[38px] bg-transparent hover:bg-sand border border-black/15 text-ink transition-colors cursor-pointer"
                    >
                      <MessageSquare size={14} /> Concierge Chat
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewingItinerary(booking)}
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-medium py-2 px-4 rounded-full min-h-[38px] bg-ink hover:bg-ink-soft text-white transition-all cursor-pointer"
                    >
                      <Eye size={14} /> View Day-by-Day Itinerary
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
