import React from 'react';
import {
  SearchFilter,
  FilterSelect,
  FilterEmptyState,
  useFilterState
} from '../common/filters';

export const ReportsView = () => {
  const allPerformanceData = [
    {
      id: 'rep-kashmir',
      name: 'The Kashmir Escape & Dal Lake',
      destination: 'Kashmir',
      category: 'Alpine & Snow',
      revenue: '₹38,40,000 / $46,000',
      numericRevenue: 46000,
      share: '34%',
      shareNum: 34,
      status: 'Confirmed Deposits',
      conversionRate: '78.4%',
      bookingsCount: 32
    },
    {
      id: 'rep-japan',
      name: 'Kyoto & Tokyo, Japan',
      destination: 'Kyoto',
      category: 'Heritage & Cultural',
      revenue: '$148,000',
      numericRevenue: 148000,
      share: '31%',
      shareNum: 31,
      status: 'Completed Journeys',
      conversionRate: '72.1%',
      bookingsCount: 28
    },
    {
      id: 'rep-amalfi',
      name: 'Amalfi Coast & Capri',
      destination: 'Amalfi',
      category: 'Coastal & Islands',
      revenue: '$122,000',
      numericRevenue: 122000,
      share: '24%',
      shareNum: 24,
      status: 'Confirmed Deposits',
      conversionRate: '68.5%',
      bookingsCount: 21
    },
    {
      id: 'rep-swiss',
      name: 'Swiss Alps & Zermatt',
      destination: 'Swiss Alps',
      category: 'Alpine & Snow',
      revenue: '$74,000',
      numericRevenue: 74000,
      share: '11%',
      shareNum: 11,
      status: 'Completed Journeys',
      conversionRate: '64.0%',
      bookingsCount: 14
    },
    {
      id: 'rep-kerala',
      name: 'Kerala Backwaters & Tea Hills',
      destination: 'Kerala',
      category: 'Wellness & Nature',
      revenue: '₹28,50,000 / $34,000',
      numericRevenue: 34000,
      share: '8%',
      shareNum: 8,
      status: 'Confirmed Deposits',
      conversionRate: '74.2%',
      bookingsCount: 19
    },
    {
      id: 'rep-goa',
      name: 'Assagao Private Villa & Yacht, Goa',
      destination: 'Goa',
      category: 'Coastal & Islands',
      revenue: '₹22,00,000 / $26,000',
      numericRevenue: 26000,
      share: '6%',
      shareNum: 6,
      status: 'Pipeline',
      conversionRate: '58.0%',
      bookingsCount: 12
    }
  ];

  const defaultFilters = {
    dateRange: 'All Time',
    destination: 'All',
    category: 'All',
    status: 'All',
    metricFocus: 'All'
  };

  const sortOptions = [
    { value: 'revenue-desc', label: 'Highest Revenue' },
    { value: 'share-desc', label: 'Highest Market Share' },
    { value: 'name-asc', label: 'Destination: A to Z' }
  ];

  const filterFn = (item, filters, search) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q);

      if (!matchesSearch) return false;
    }

    // 2. Destination
    if (filters.destination !== 'All') {
      if (!item.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
    }

    // 3. Category
    if (filters.category !== 'All') {
      if (item.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
    }

    // 4. Status
    if (filters.status !== 'All') {
      if (item.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'share-desc':
        return b.shareNum - a.shareNum;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'revenue-desc':
      default:
        return b.numericRevenue - a.numericRevenue;
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
    filteredItems: filteredPerformance
  } = useFilterState({
    items: allPerformanceData,
    defaultFilters,
    defaultSort: 'revenue-desc',
    filterFn,
    sortFn
  });

  // Calculate dynamic metrics summary
  const totalReportedRevenue = filteredPerformance.reduce((acc, curr) => acc + curr.numericRevenue, 0);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header */}
      <div>
        <span className="text-[11px] tracking-[0.14em] uppercase text-[#C8A96B] font-semibold block mb-1">
          Performance Intelligence
        </span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal uppercase text-ink tracking-tight">
          Agency Performance & Yield
        </h2>
      </div>

      {/* Reusable SearchFilter Component */}
      <SearchFilter
        search={searchQuery}
        setSearch={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        placeholder="Search destination, category, status..."
        activeCount={activeFilterCount}
        onClearAll={resetFilters}
        resultCount={filteredPerformance.length}
        resultLabel="curated destinations analyzed"
      >
        <FilterSelect
          label="Date Range"
          value={filters.dateRange}
          onChange={(val) => setFilter('dateRange', val)}
          options={[
            { value: 'All Time', label: 'All Time' },
            { value: 'Last 30 Days', label: 'Last 30 Days' },
            { value: 'Last Quarter', label: 'Last Quarter (Q1 2026)' },
            { value: 'YTD 2026', label: 'Year to Date 2026' }
          ]}
        />

        <FilterSelect
          label="Destination"
          value={filters.destination}
          onChange={(val) => setFilter('destination', val)}
          options={[
            { value: 'All', label: 'All Destinations' },
            { value: 'Kashmir', label: 'Kashmir' },
            { value: 'Kyoto', label: 'Kyoto & Tokyo' },
            { value: 'Amalfi', label: 'Amalfi Coast' },
            { value: 'Swiss Alps', label: 'Swiss Alps' },
            { value: 'Kerala', label: 'Kerala Backwaters' },
            { value: 'Goa', label: 'Goa Coast' }
          ]}
        />

        <FilterSelect
          label="Category"
          value={filters.category}
          onChange={(val) => setFilter('category', val)}
          options={[
            { value: 'All', label: 'All Categories' },
            { value: 'Heritage & Cultural', label: 'Heritage & Cultural' },
            { value: 'Coastal & Islands', label: 'Coastal & Islands' },
            { value: 'Alpine & Snow', label: 'Alpine & Snow' },
            { value: 'Wellness & Nature', label: 'Wellness & Nature' }
          ]}
        />

        <FilterSelect
          label="Status"
          value={filters.status}
          onChange={(val) => setFilter('status', val)}
          options={[
            { value: 'All', label: 'All Statuses' },
            { value: 'Confirmed Deposits', label: 'Confirmed Deposits' },
            { value: 'Completed Journeys', label: 'Completed Journeys' },
            { value: 'Pipeline', label: 'Active Pipeline' }
          ]}
        />

        <FilterSelect
          label="Metric Focus"
          value={filters.metricFocus}
          onChange={(val) => setFilter('metricFocus', val)}
          options={[
            { value: 'All', label: 'All Core Metrics' },
            { value: 'Conversion Rate', label: 'Conversion Rate' },
            { value: 'Average Booking Value', label: 'Avg Booking Value' },
            { value: 'Member Retention', label: 'Member Retention' }
          ]}
        />

        <FilterSelect
          label="Sort By"
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </SearchFilter>

      {/* Editorial Key Metrics */}
      {(filters.metricFocus === 'All' || filters.metricFocus === 'Conversion Rate') && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-black/[0.08] shadow-xs">
            <div className="text-xs text-ink-muted mb-1 font-medium">Conversion Rate</div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-status-emerald">
              71.2%
            </div>
            <div className="text-xs text-ink-muted mt-1">
              Bespoke Enquiry → Confirmed Deposit
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-black/[0.08] shadow-xs">
            <div className="text-xs text-ink-muted mb-1 font-medium">Average Booking Value</div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-ink">
              $7,850
            </div>
            <div className="text-xs text-ink-muted mt-1">
              Curated Private Multi-Day Journeys
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-black/[0.08] shadow-xs">
            <div className="text-xs text-ink-muted mb-1 font-medium">Private Member Retention</div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-champagne-dark">
              48.5%
            </div>
            <div className="text-xs text-ink-muted mt-1">
              Repeat bookings within 18 months
            </div>
          </div>
        </div>
      )}

      {/* Destination Performance List */}
      {filteredPerformance.length === 0 ? (
        <FilterEmptyState
          title="No Destination Metrics Matched"
          description="We couldn't find any destination yield reports matching your filter criteria. Try resetting category or status filters."
          onReset={resetFilters}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-black/[0.08] p-5 sm:p-7 shadow-xs">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-ink">
                Leading Curated Destinations Yield
              </h3>
              <p className="text-xs text-ink-muted">
                Market share and portfolio yield across vetted private journey dossiers.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-champagne-dark">
              Active Scope: ${totalReportedRevenue.toLocaleString()} Net
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {filteredPerformance.map((item, idx) => (
              <div
                key={item.id || idx}
                className="pb-4 border-b border-black/[0.05] last:border-b-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-xs sm:text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink">{item.name}</span>
                    <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-sand text-ink-muted">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-ink-muted">Conv: <strong>{item.conversionRate}</strong></span>
                    <strong className="text-ink font-semibold text-sm">{item.revenue}</strong>
                  </div>
                </div>

                <div className="w-full h-2.5 bg-sand/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-champagne rounded-full transition-all duration-500"
                    style={{ width: item.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
