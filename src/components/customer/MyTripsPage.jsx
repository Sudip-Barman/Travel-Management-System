import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Plane,
  Building,
  Eye,
  MessageSquare,
  FileSpreadsheet,
  CheckCircle2,
  User,
  Luggage
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../common/EmptyState';

export const MyTripsPage = ({ defaultTab = 'bookings' }) => {
  const {
    bookings,
    quotations,
    acceptQuotation,
    setViewingItinerary,
    setIsChatOpen,
    setCustomerTab,
    setIsEnquiryModalOpen,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full bg-[#fbfaf8] text-ink min-h-screen py-8 sm:py-12 lg:py-14">
      <div className="w-full max-w-[1320px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-7 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-sand text-champagne-dark text-[11px] font-mono tracking-widest uppercase font-semibold mb-2">
              <Luggage size={13} className="text-champagne-dark" />
              <span>Customer Dossier</span>
            </div>
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-ink tracking-tight mb-1.5 sm:mb-2 text-balance leading-tight">
              My Trips & Dossier
            </h1>
            <p className="text-xs sm:text-base text-ink-muted font-light max-w-[560px] text-pretty">
              Manage your confirmed journeys, active travel vouchers, day-by-day timelines, and bespoke agency quotations.
            </p>
          </div>

          {/* Member Card Mini Pill */}
          <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white border border-black/[0.08] shadow-xs self-start md:self-auto flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-ink text-champagne flex items-center justify-center font-display font-medium text-sm sm:text-base flex-shrink-0">
              {user?.name ? user.name[0] : 'E'}
            </div>
            <div>
              <div className="text-xs font-semibold text-ink whitespace-nowrap">{user?.name || 'Private Member'}</div>
              <div className="text-[10px] font-mono text-champagne-dark whitespace-nowrap">{user?.tier || 'Aura Circle'}</div>
            </div>
          </div>
        </div>

        {/* Tab Switcher Strip */}
        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-black/[0.08] pb-3 mb-6 sm:mb-8 overflow-x-auto scrollbar-none flex-nowrap -mx-1 px-1">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeTab === 'bookings'
                ? 'bg-ink text-white shadow-xs'
                : 'bg-white hover:bg-sand/60 text-ink-muted hover:text-ink border border-black/[0.08]'
            }`}
          >
            <Calendar size={13} />
            <span>Active Bookings ({bookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeTab === 'quotes'
                ? 'bg-ink text-white shadow-xs'
                : 'bg-white hover:bg-sand/60 text-ink-muted hover:text-ink border border-black/[0.08]'
            }`}
          >
            <FileSpreadsheet size={13} />
            <span>Quotations ({quotations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeTab === 'profile'
                ? 'bg-ink text-white shadow-xs'
                : 'bg-white hover:bg-sand/60 text-ink-muted hover:text-ink border border-black/[0.08]'
            }`}
          >
            <User size={13} />
            <span>Profile & Preferences</span>
          </button>
        </div>

        {/* 1. Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            {bookings.length === 0 ? (
              <EmptyState
                title="No active bookings found"
                description="You have no active trip bookings under this profile. Discover handcrafted journeys to begin."
                actionLabel="Discover Journeys"
                onAction={() => setCustomerTab('packages')}
              />
            ) : (
              <div className="space-y-5 sm:space-y-8">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-black/[0.08] p-4 sm:p-7 shadow-xs"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-black/[0.06]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-champagne-dark tracking-wide font-mono">
                            REF: {booking.bookingRef}
                          </span>
                          <span className="text-[10px] py-0.5 px-2 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                            {booking.bookingStatus}
                          </span>
                        </div>
                        <h2 className="font-display text-xl sm:text-2xl font-normal text-ink">
                          {booking.packageName}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-ink-muted mt-1 font-mono">
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-champagne-dark" /> {booking.destination}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={13} className="text-champagne-dark" /> {booking.dates}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setViewingItinerary(booking)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2 px-3.5 sm:px-4 rounded-full bg-sand/70 hover:bg-sand text-ink text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Eye size={13} />
                          <span>View Itinerary</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsChatOpen(true)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2 px-3.5 sm:px-4 rounded-full bg-ink hover:bg-ink-soft text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <MessageSquare size={13} />
                          <span>Concierge</span>
                        </button>
                      </div>
                    </div>

                    {/* Flights & Stay cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
                      {/* Flights */}
                      {booking.flights && (
                        <div className="p-3.5 rounded-xl bg-sand/30 border border-black/[0.05]">
                          <div className="flex items-center gap-2 text-xs font-semibold text-ink mb-1">
                            <Plane size={14} className="text-champagne-dark" />
                            <span>Flight Status</span>
                          </div>
                          <p className="text-xs text-ink-muted">
                            Outbound: <span className="font-medium text-ink">{booking.flights.outbound}</span>
                          </p>
                          <p className="text-xs text-ink-muted">
                            Return: <span className="font-medium text-ink">{booking.flights.inbound}</span>
                          </p>
                        </div>
                      )}

                      {/* Stays */}
                      {booking.accommodations && (
                        <div className="p-3.5 rounded-xl bg-sand/30 border border-black/[0.05]">
                          <div className="flex items-center gap-2 text-xs font-semibold text-ink mb-1">
                            <Building size={14} className="text-champagne-dark" />
                            <span>Confirmed Accommodations</span>
                          </div>
                          <ul className="text-xs text-ink-muted space-y-0.5">
                            {booking.accommodations.map((acc, i) => (
                              <li key={i} className="truncate">
                                • {acc.hotel} ({acc.nights} nights)
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. Quotations Tab */}
        {activeTab === 'quotes' && (
          <div>
            {quotations.length === 0 ? (
              <EmptyState
                icon={FileSpreadsheet}
                title="No active quotations"
                description="You don't have any pending quotations right now. Request a bespoke itinerary or submit a travel brief."
                actionLabel="Request Custom Journey"
                onAction={() => setIsEnquiryModalOpen(true)}
              />
            ) : (
              <div className="space-y-5 sm:space-y-8">
                {quotations.map((quote) => {
                  const isAccepted = quote.status === 'Accepted';
                  return (
                    <div
                      key={quote.id}
                      className="bg-white rounded-2xl border border-black/[0.08] p-4 sm:p-7 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-black/[0.06]">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-mono font-semibold text-ink-muted">
                              REF: {quote.id}
                            </span>
                            <span
                              className={`text-[10px] py-0.5 px-2 rounded-full font-semibold ${
                                isAccepted
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-sand text-champagne-dark border border-black/[0.06]'
                              }`}
                            >
                              {quote.status}
                            </span>
                          </div>
                          <h2 className="font-display text-xl sm:text-2xl font-normal text-ink">
                            {quote.tripName}
                          </h2>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-ink-muted mt-1 font-mono">
                            <span>{quote.travelers}</span>
                            <span>·</span>
                            <span>{quote.dates}</span>
                          </div>
                        </div>

                        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto flex-shrink-0">
                          {!isAccepted && (
                            <button
                              type="button"
                              onClick={() => acceptQuotation(quote.id)}
                              className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 sm:px-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center whitespace-nowrap"
                            >
                              <CheckCircle2 size={13} />
                              <span>Accept Quotation</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setIsChatOpen(true)}
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 sm:px-4 rounded-full bg-ink hover:bg-ink-soft text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center whitespace-nowrap"
                          >
                            <MessageSquare size={13} />
                            <span>Discuss with Advisor</span>
                          </button>
                        </div>
                      </div>

                      {/* Itemized Breakdown */}
                      <div className="mt-4 pt-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block mb-2 font-semibold">
                          Itemized Cost Breakdown:
                        </span>
                        <div className="space-y-1.5">
                          {quote.lineItems?.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-black/[0.04]">
                              <span className="text-ink-soft pr-2">{item.description}</span>
                              <span className="font-mono font-medium text-ink flex-shrink-0">{item.amountFormatted || `$${item.amount}`}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 mt-2 text-sm font-semibold">
                          <span>Total Investment</span>
                          <span className="text-base font-display text-champagne-dark">{quote.totalFormatted || `$${quote.total}`}</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. Profile & Account Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-black/[0.08] p-4 sm:p-6 md:p-8 max-w-[800px]">
            <h2 className="font-display text-xl sm:text-2xl uppercase mb-4">Client Dossier Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono mb-6">
              <div className="p-3.5 sm:p-4 rounded-xl bg-sand/30 border border-black/[0.05]">
                <span className="text-ink-muted block text-[10px] uppercase mb-1">Full Legal Name</span>
                <span className="text-sm font-semibold text-ink">{user?.name || 'Elena Rostova'}</span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-sand/30 border border-black/[0.05]">
                <span className="text-ink-muted block text-[10px] uppercase mb-1">Direct Dossier Email</span>
                <span className="text-sm font-semibold text-ink truncate block">{user?.email || 'elena.rostova@vipvoyage.com'}</span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-sand/30 border border-black/[0.05]">
                <span className="text-ink-muted block text-[10px] uppercase mb-1">Membership Tier</span>
                <span className="text-sm font-semibold text-champagne-dark">{user?.tier || 'Aura Black Private Member'}</span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-sand/30 border border-black/[0.05]">
                <span className="text-ink-muted block text-[10px] uppercase mb-1">Member Since</span>
                <span className="text-sm font-semibold text-ink">{user?.memberSince || '2024'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0c0e] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne block">
                  Dedicated 24/7 Global Concierge
                </span>
                <span className="text-xs text-white/80">
                  Priority telephone line and encrypted messaging line active.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="py-2.5 px-4 rounded-full bg-white text-ink text-xs font-semibold uppercase tracking-wider cursor-pointer text-center flex-shrink-0"
              >
                Open Desk
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
