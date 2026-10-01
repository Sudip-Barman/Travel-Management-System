import React from 'react';
import {
  MapPin,
  Clock,
  Mail
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  SearchFilter,
  FilterSelect,
  FilterEmptyState,
  useFilterState
} from '../common/filters';

export const EnquiriesView = () => {
  const { enquiries, updateEnquiryStatus, setAgencyTab } = useApp();

  const defaultFilters = {
    status: 'All',
    destination: 'All',
    budget: 'All',
    travelDate: 'All'
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'client-asc', label: 'Client Name: A to Z' },
    { value: 'destination-asc', label: 'Destination: A to Z' }
  ];

  const filterFn = (enq, filters, search) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        enq.customerName.toLowerCase().includes(q) ||
        enq.id.toLowerCase().includes(q) ||
        (enq.email && enq.email.toLowerCase().includes(q)) ||
        (enq.phone && enq.phone.toLowerCase().includes(q)) ||
        enq.destination.toLowerCase().includes(q) ||
        (enq.specialNotes && enq.specialNotes.toLowerCase().includes(q)) ||
        (enq.preferredStyle && enq.preferredStyle.toLowerCase().includes(q));

      if (!matchesSearch) return false;
    }

    // 2. Status
    if (filters.status !== 'All') {
      if (enq.status !== filters.status) return false;
    }

    // 3. Destination
    if (filters.destination !== 'All') {
      if (!enq.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
    }

    // 4. Budget Range
    if (filters.budget !== 'All') {
      const budgetStr = (enq.budget || '').toLowerCase();
      if (filters.budget === 'under-2l') {
        if (!budgetStr.includes('1,20,000') && !budgetStr.includes('5,000') && !budgetStr.includes('8,000')) return false;
      } else if (filters.budget === '2l-5l') {
        if (!budgetStr.includes('4,50,000') && !budgetStr.includes('10,000') && !budgetStr.includes('12,000')) return false;
      } else if (filters.budget === 'above-5l') {
        if (!budgetStr.includes('6,000,000') && !budgetStr.includes('15,000') && !budgetStr.includes('12,000')) return false;
      }
    }

    // 5. Travel Date
    if (filters.travelDate !== 'All') {
      const dates = (enq.travelDates || '').toLowerCase();
      if (filters.travelDate === 'soon') {
        if (!dates.includes('tomorrow') && !dates.includes('nov') && !dates.includes('may')) return false;
      } else if (filters.travelDate === 'oct') {
        if (!dates.includes('oct')) return false;
      } else if (filters.travelDate === 'flexible') {
        if (!dates.includes('flexible') && !dates.includes('2026')) return false;
      }
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'oldest':
        return a.id.localeCompare(b.id);
      case 'client-asc':
        return a.customerName.localeCompare(b.customerName);
      case 'destination-asc':
        return a.destination.localeCompare(b.destination);
      case 'newest':
      default:
        return b.id.localeCompare(a.id);
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
    filteredItems: filteredEnquiries
  } = useFilterState({
    items: enquiries || [],
    defaultFilters,
    defaultSort: 'newest',
    filterFn,
    sortFn
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-[#f8f2e7] text-[#996515] font-semibold">
            New Enquiry
          </span>
        );
      case 'Contacted':
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-[#f3ede2] text-ink font-semibold">
            Contacted
          </span>
        );
      case 'Quoted':
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-[#f7f3ec] text-[#9e825a] font-semibold">
            Quoted
          </span>
        );
      case 'Won':
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-[#eaf3ef] text-[#1e6b52] font-semibold">
            Confirmed Won
          </span>
        );
      default:
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-stone-100 text-ink-muted">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* View Header */}
      <div>
        <span className="text-[11px] tracking-[0.14em] uppercase text-[#C8A96B] font-semibold block mb-1">
          Client Pipelines
        </span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal uppercase text-ink tracking-tight">
          Client Enquiries
        </h2>
      </div>

      {/* Reusable SearchFilter Component */}
      <SearchFilter
        search={searchQuery}
        setSearch={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        placeholder="Search by client name, enquiry ID, email, destination..."
        activeCount={activeFilterCount}
        onClearAll={resetFilters}
        resultCount={filteredEnquiries.length}
        resultLabel="client enquiries"
      >
        <FilterSelect
          label="Status"
          value={filters.status}
          onChange={(val) => setFilter('status', val)}
          options={[
            { value: 'All', label: 'All Statuses' },
            { value: 'New', label: 'New Enquiry' },
            { value: 'Contacted', label: 'Contacted' },
            { value: 'Quoted', label: 'Quoted' },
            { value: 'Won', label: 'Confirmed Won' }
          ]}
        />

        <FilterSelect
          label="Destination"
          value={filters.destination}
          onChange={(val) => setFilter('destination', val)}
          options={[
            { value: 'All', label: 'All Destinations' },
            { value: 'Goa', label: 'Goa' },
            { value: 'Amalfi', label: 'Amalfi Coast, Italy' },
            { value: 'Japan', label: 'Japan (Tokyo & Kyoto)' },
            { value: 'Kashmir', label: 'Kashmir Valley' }
          ]}
        />

        <FilterSelect
          label="Budget"
          value={filters.budget}
          onChange={(val) => setFilter('budget', val)}
          options={[
            { value: 'All', label: 'Any Budget' },
            { value: 'under-2l', label: 'Under ₹2,00,000 / $5k' },
            { value: '2l-5l', label: '₹2,00,000 – ₹5,00,000 / $5k–$10k' },
            { value: 'above-5l', label: 'Above ₹5,00,000 / $10k+' }
          ]}
        />

        <FilterSelect
          label="Travel Date"
          value={filters.travelDate}
          onChange={(val) => setFilter('travelDate', val)}
          options={[
            { value: 'All', label: 'All Timings' },
            { value: 'soon', label: 'Departing Soon / Tomorrow' },
            { value: 'oct', label: 'Autumn / October 2026' },
            { value: 'flexible', label: 'Flexible 2026' }
          ]}
        />

        <FilterSelect
          label="Sort By"
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </SearchFilter>

      {/* Enquiry Cards */}
      {filteredEnquiries.length === 0 ? (
        <FilterEmptyState
          title="No Enquiries Found"
          description="We couldn't find any client enquiries matching your current filters. Try resetting status or destination filters."
          onReset={resetFilters}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-2xl border border-black/[0.08] p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-champagne-dark font-mono">
                    {enq.id}
                  </span>
                  {getStatusBadge(enq.status)}
                </div>
                <span className="text-xs text-ink-muted flex items-center gap-1">
                  <Clock size={12} />
                  <span>Received {enq.createdAt}</span>
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-1">
                {enq.customerName}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-muted mb-3 font-sans">
                <span className="flex items-center gap-1 text-ink font-medium">
                  <MapPin size={13} className="text-champagne-dark" />
                  <span>{enq.destination}</span>
                </span>
                <span>•</span>
                <span>{enq.travelers}</span>
                <span>•</span>
                <span>Dates: <strong className="text-ink font-medium">{enq.travelDates}</strong></span>
                <span>•</span>
                <span>Budget: <strong className="text-ink font-medium">{enq.budget}</strong></span>
              </div>

              {enq.specialNotes && (
                <p className="text-xs text-ink-soft bg-[#faf8f5] p-3 rounded-xl border border-black/[0.05] leading-relaxed mb-4">
                  "{enq.specialNotes}"
                </p>
              )}

              {/* Quick Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.06]">
                <div className="flex items-center gap-2">
                  {enq.status !== 'Contacted' && (
                    <button
                      type="button"
                      onClick={() => updateEnquiryStatus(enq.id, 'Contacted')}
                      className="py-1 px-3 rounded-full text-xs font-medium border border-black/15 hover:bg-sand/50 text-ink cursor-pointer transition-colors"
                    >
                      Mark Contacted
                    </button>
                  )}
                  {enq.status !== 'Won' && (
                    <button
                      type="button"
                      onClick={() => updateEnquiryStatus(enq.id, 'Won')}
                      className="py-1 px-3 rounded-full text-xs font-medium border border-status-emerald text-status-emerald hover:bg-status-emerald/10 cursor-pointer transition-colors"
                    >
                      Mark Won
                    </button>
                  )}
                  {enq.email && (
                    <a
                      href={`mailto:${enq.email}`}
                      className="text-xs text-ink-muted hover:text-ink flex items-center gap-1 px-2 py-1"
                      title={enq.email}
                    >
                      <Mail size={12} />
                      <span className="hidden sm:inline">{enq.email}</span>
                    </a>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  icon={FileSpreadsheet}
                  onClick={() => setAgencyTab('quotations')}
                >
                  Draft Quotation
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
