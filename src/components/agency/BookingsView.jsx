import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  SearchFilter,
  FilterSelect,
  FilterEmptyState,
  useFilterState
} from '../common/filters';

export const BookingsView = () => {
  const { bookings, setViewingItinerary } = useApp();

  const getBookingPriceNumeric = (b) => {
    if (!b.totalPrice) return 100000;
    if (b.currency === '$' || (b.priceFormatted && b.priceFormatted.includes('$'))) {
      return b.totalPrice * 85;
    }
    return b.totalPrice;
  };

  const defaultFilters = {
    destination: 'All',
    bookingStatus: 'All',
    paymentStatus: 'All',
    travelDate: 'All'
  };

  const sortOptions = [
    { value: 'departure', label: 'Departure: Soonest First' },
    { value: 'price-desc', label: 'Total Price: High to Low' },
    { value: 'price-asc', label: 'Total Price: Low to High' },
    { value: 'ref', label: 'Booking Ref ID' }
  ];

  const filterFn = (b, filters, search) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        b.customerName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        (b.bookingRef && b.bookingRef.toLowerCase().includes(q)) ||
        (b.packageName && b.packageName.toLowerCase().includes(q)) ||
        (b.destination && b.destination.toLowerCase().includes(q)) ||
        (b.hotelName && b.hotelName.toLowerCase().includes(q)) ||
        (b.flightCode && b.flightCode.toLowerCase().includes(q));

      if (!matchesSearch) return false;
    }

    // 2. Destination
    if (filters.destination !== 'All') {
      const dest = filters.destination.toLowerCase();
      if (!b.destination.toLowerCase().includes(dest) && !b.packageName.toLowerCase().includes(dest)) {
        return false;
      }
    }

    // 3. Booking Status
    if (filters.bookingStatus !== 'All') {
      if (b.bookingStatus.toLowerCase() !== filters.bookingStatus.toLowerCase()) {
        return false;
      }
    }

    // 4. Payment Status
    if (filters.paymentStatus !== 'All') {
      const pay = (b.paymentStatus || '').toLowerCase();
      if (filters.paymentStatus === 'paid') {
        if (!pay.includes('paid in full')) return false;
      } else if (filters.paymentStatus === 'deposit') {
        if (!pay.includes('deposit')) return false;
      } else if (filters.paymentStatus === 'pending') {
        if (!pay.includes('pending') && !pay.includes('due')) return false;
      }
    }

    // 5. Travel Date
    if (filters.travelDate !== 'All') {
      const dates = (b.dates || '').toLowerCase();
      if (filters.travelDate === 'tomorrow') {
        if (!dates.includes('tomorrow')) return false;
      } else if (filters.travelDate === 'may') {
        if (!dates.includes('may')) return false;
      } else if (filters.travelDate === 'autumn') {
        if (!dates.includes('oct') && !dates.includes('nov')) return false;
      }
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'price-desc':
        return getBookingPriceNumeric(b) - getBookingPriceNumeric(a);
      case 'price-asc':
        return getBookingPriceNumeric(a) - getBookingPriceNumeric(b);
      case 'ref':
        return a.bookingRef.localeCompare(b.bookingRef);
      case 'departure':
      default:
        // Departing Tomorrow first
        if (a.bookingStatus === 'Departing Tomorrow') return -1;
        if (b.bookingStatus === 'Departing Tomorrow') return 1;
        return a.id.localeCompare(b.id);
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
    filteredItems: filteredBookings
  } = useFilterState({
    items: bookings || [],
    defaultFilters,
    defaultSort: 'departure',
    filterFn,
    sortFn
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header */}
      <div>
        <span className="text-[11px] tracking-[0.14em] uppercase text-[#C8A96B] font-semibold block mb-1">
          Operations Desk
        </span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal uppercase text-ink tracking-tight">
          Confirmed Departures & Bookings
        </h2>
      </div>

      {/* Reusable SearchFilter Component */}
      <SearchFilter
        search={searchQuery}
        setSearch={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        placeholder="Search customer, booking ref, flight, package..."
        activeCount={activeFilterCount}
        onClearAll={resetFilters}
        resultCount={filteredBookings.length}
        resultLabel="confirmed departures"
      >
        <FilterSelect
          label="Booking Status"
          value={filters.bookingStatus}
          onChange={(val) => setFilter('bookingStatus', val)}
          options={[
            { value: 'All', label: 'All Statuses' },
            { value: 'Departing Tomorrow', label: 'Departing Tomorrow' },
            { value: 'Confirmed', label: 'Confirmed Future Departure' }
          ]}
        />

        <FilterSelect
          label="Payment Status"
          value={filters.paymentStatus}
          onChange={(val) => setFilter('paymentStatus', val)}
          options={[
            { value: 'All', label: 'All Payments' },
            { value: 'paid', label: 'Paid in Full' },
            { value: 'deposit', label: 'Deposit Paid (Balance Due)' }
          ]}
        />

        <FilterSelect
          label="Destination"
          value={filters.destination}
          onChange={(val) => setFilter('destination', val)}
          options={[
            { value: 'All', label: 'All Destinations' },
            { value: 'Kashmir', label: 'Kashmir Valley' },
            { value: 'Amalfi', label: 'Amalfi Coast, Italy' },
            { value: 'Tokyo', label: 'Japan (Tokyo & Kyoto)' },
            { value: 'Goa', label: 'Goa Coast' }
          ]}
        />

        <FilterSelect
          label="Travel Date"
          value={filters.travelDate}
          onChange={(val) => setFilter('travelDate', val)}
          options={[
            { value: 'All', label: 'All Dates' },
            { value: 'tomorrow', label: 'Departing Tomorrow' },
            { value: 'may', label: 'May 2026' },
            { value: 'autumn', label: 'Autumn / Oct–Nov 2026' }
          ]}
        />

        <FilterSelect
          label="Sort By"
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </SearchFilter>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <FilterEmptyState
          title="No Bookings Matched"
          description="We couldn't find any confirmed departures matching your active filters. Try resetting status or destination filters."
          onReset={resetFilters}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-black/[0.08] p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-champagne-dark font-mono">
                    {b.bookingRef}
                  </span>
                  <span
                    className={`text-[10.5px] px-2.5 py-0.5 rounded-sm font-semibold ${
                      b.bookingStatus === 'Departing Tomorrow'
                        ? 'bg-[#f8f2e7] text-[#996515]'
                        : 'bg-[#eaf3ef] text-[#1e6b52]'
                    }`}
                  >
                    {b.bookingStatus}
                  </span>
                </div>
                <span className="text-xs text-ink-muted">
                  Concierge: <strong className="text-ink font-medium">{b.agentContact}</strong>
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-1">
                {b.packageName}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-muted mb-3 font-sans">
                <span>Client: <strong className="text-ink font-medium">{b.customerName}</strong> ({b.travelersCount} Guests)</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-ink">
                  <Calendar size={13} className="text-champagne-dark" />
                  <span>{b.dates}</span>
                </span>
                <span>•</span>
                <span>Stay: <strong className="text-ink font-medium">{b.hotelName}</strong></span>
                {b.flightCode && (
                  <>
                    <span>•</span>
                    <span>Flight: <strong className="text-ink font-mono font-medium">{b.flightCode}</strong></span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.06]">
                <div>
                  <span className="text-[11px] text-ink-muted block">Settlement Status</span>
                  <span className="text-xs font-semibold text-status-emerald flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>{b.paymentStatus} ({b.priceFormatted || `$${b.totalPrice?.toLocaleString()}`})</span>
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  icon={Eye}
                  onClick={() => setViewingItinerary(b)}
                >
                  Inspect Flight & Voucher
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
