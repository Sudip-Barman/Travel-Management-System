import React from 'react';
import { MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  SearchFilter,
  FilterSelect,
  FilterEmptyState,
  useFilterState
} from '../common/filters';

export const CustomersView = () => {
  const { customers } = useApp();

  const getCustomerSpendNumeric = (c) => {
    if (!c.totalSpent) return 500000;
    const cleanStr = c.totalSpent.replace(/[^0-9]/g, '');
    const num = parseInt(cleanStr, 10) || 0;
    if (c.totalSpent.includes('$')) {
      return num * 85;
    }
    return num;
  };

  const defaultFilters = {
    tier: 'All',
    city: 'All',
    trips: 'All',
    spendRange: 'All'
  };

  const sortOptions = [
    { value: 'spend-desc', label: 'Highest Total Spend' },
    { value: 'trips-desc', label: 'Most Trips Completed' },
    { value: 'name-asc', label: 'Client Name: A to Z' },
    { value: 'id-asc', label: 'Customer ID' }
  ];

  const filterFn = (c, filters, search) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.toLowerCase().includes(q)) ||
        (c.city && c.city.toLowerCase().includes(q)) ||
        (c.lastTrip && c.lastTrip.toLowerCase().includes(q));

      if (!matchesSearch) return false;
    }

    // 2. Membership Tier
    if (filters.tier !== 'All') {
      if (c.tier.toLowerCase() !== filters.tier.toLowerCase()) {
        return false;
      }
    }

    // 3. City / Geography
    if (filters.city !== 'All') {
      if (!c.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
    }

    // 4. Number of Trips
    if (filters.trips !== 'All') {
      const trips = c.totalTrips || 0;
      if (filters.trips === '1-2') {
        if (trips < 1 || trips > 2) return false;
      } else if (filters.trips === '3-4') {
        if (trips < 3 || trips > 4) return false;
      } else if (filters.trips === '5+') {
        if (trips < 5) return false;
      }
    }

    // 5. Total Spending Range
    if (filters.spendRange !== 'All') {
      const spend = getCustomerSpendNumeric(c);
      if (filters.spendRange === 'under-10l') {
        if (spend > 1000000) return false;
      } else if (filters.spendRange === '10l-20l') {
        if (spend < 1000000 || spend > 2200000) return false;
      } else if (filters.spendRange === 'above-20l') {
        if (spend <= 2000000) return false;
      }
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'spend-desc':
        return getCustomerSpendNumeric(b) - getCustomerSpendNumeric(a);
      case 'trips-desc':
        return (b.totalTrips || 0) - (a.totalTrips || 0);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'id-asc':
      default:
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
    filteredItems: filteredCustomers
  } = useFilterState({
    items: customers || [],
    defaultFilters,
    defaultSort: 'spend-desc',
    filterFn,
    sortFn
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header */}
      <div>
        <span className="text-[11px] tracking-[0.14em] uppercase text-[#C8A96B] font-semibold block mb-1">
          Private Client Directory
        </span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal uppercase text-ink tracking-tight">
          High-Net-Worth Voyager Profiles
        </h2>
      </div>

      {/* Reusable SearchFilter Component */}
      <SearchFilter
        search={searchQuery}
        setSearch={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        placeholder="Search client name, email, phone, city, dossier..."
        activeCount={activeFilterCount}
        onClearAll={resetFilters}
        resultCount={filteredCustomers.length}
        resultLabel="private clients"
      >
        <FilterSelect
          label="Customer Tier"
          value={filters.tier}
          onChange={(val) => setFilter('tier', val)}
          options={[
            { value: 'All', label: 'All Tiers' },
            { value: 'Private Member', label: 'Private Member' },
            { value: 'Platinum Voyager', label: 'Platinum Voyager' },
            { value: 'Gold Traveler', label: 'Gold Traveler' },
            { value: 'Aura Black', label: 'Aura Black VIP' }
          ]}
        />

        <FilterSelect
          label="Location"
          value={filters.city}
          onChange={(val) => setFilter('city', val)}
          options={[
            { value: 'All', label: 'All Cities' },
            { value: 'Mumbai', label: 'Mumbai, India' },
            { value: 'Delhi', label: 'Delhi, India' },
            { value: 'San Francisco', label: 'San Francisco, USA' },
            { value: 'London', label: 'London, UK' }
          ]}
        />

        <FilterSelect
          label="Trip Count"
          value={filters.trips}
          onChange={(val) => setFilter('trips', val)}
          options={[
            { value: 'All', label: 'Any Journey Count' },
            { value: '1-2', label: '1–2 Journeys' },
            { value: '3-4', label: '3–4 Journeys' },
            { value: '5+', label: '5+ Journeys (VIP)' }
          ]}
        />

        <FilterSelect
          label="Spending"
          value={filters.spendRange}
          onChange={(val) => setFilter('spendRange', val)}
          options={[
            { value: 'All', label: 'Any Spend Range' },
            { value: 'under-10l', label: 'Under ₹10L / $15k' },
            { value: '10l-20l', label: '₹10L – ₹20L / $15k–$25k' },
            { value: 'above-20l', label: 'Above ₹20L / $25k+' }
          ]}
        />

        <FilterSelect
          label="Sort By"
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </SearchFilter>

      {/* Customer Profiles List */}
      {filteredCustomers.length === 0 ? (
        <FilterEmptyState
          title="No Clients Matched"
          description="We couldn't find any voyager profiles matching your active criteria. Try broadening your membership tier or spend filters."
          onReset={resetFilters}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCustomers.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-black/[0.08] p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-champagne-dark font-mono">
                    {c.id}
                  </span>
                  <span className="text-[10.5px] px-2.5 py-0.5 rounded-sm bg-[#faf8f5] text-ink border border-black/[0.06] font-semibold">
                    {c.tier}
                  </span>
                </div>
                <span className="text-xs text-ink-muted">
                  {c.totalTrips} Bespoke Journeys Completed
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-1">
                {c.name}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted mb-4 font-sans">
                <span className="flex items-center gap-1 text-ink font-medium">
                  <MapPin size={12} className="text-champagne-dark" />
                  <span>{c.city}</span>
                </span>
                <span>•</span>
                <span>{c.email}</span>
                <span>•</span>
                <span>{c.phone}</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.06] text-xs">
                <div>
                  <span className="text-ink-muted block text-[11px]">Latest Journey Dossier</span>
                  <strong className="text-ink font-semibold">{c.lastTrip}</strong>
                </div>

                <div className="text-right">
                  <span className="text-ink-muted block text-[11px]">Cumulative Private Spend</span>
                  <strong className="text-sm font-semibold text-ink font-display">{c.totalSpent}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
