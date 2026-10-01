import React from 'react';
import {
  Plus,
  Download,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  SearchFilter,
  FilterSelect,
  FilterEmptyState,
  useFilterState
} from '../common/filters';

export const QuotationsView = () => {
  const { quotations, showToast } = useApp();

  const getQuotationAmountNumeric = (q) => {
    if (!q.amount) return 100000;
    if (q.currency === '$' || (q.amountFormatted && q.amountFormatted.includes('$'))) {
      return q.amount * 85;
    }
    return q.amount;
  };

  const defaultFilters = {
    status: 'All',
    destination: 'All',
    amountRange: 'All',
    agent: 'All'
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'amount-desc', label: 'Highest Amount' },
    { value: 'amount-asc', label: 'Lowest Amount' },
    { value: 'valid-soon', label: 'Valid Until: Soonest' }
  ];

  const filterFn = (q, filters, search) => {
    // 1. Search Query
    if (search) {
      const term = search.toLowerCase();
      const matchesSearch =
        q.clientName.toLowerCase().includes(term) ||
        q.id.toLowerCase().includes(term) ||
        (q.enquiryId && q.enquiryId.toLowerCase().includes(term)) ||
        q.destination.toLowerCase().includes(term) ||
        (q.agentName && q.agentName.toLowerCase().includes(term)) ||
        (q.notes && q.notes.toLowerCase().includes(term));

      if (!matchesSearch) return false;
    }

    // 2. Status
    if (filters.status !== 'All') {
      if (q.status !== filters.status) return false;
    }

    // 3. Destination
    if (filters.destination !== 'All') {
      if (!q.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
    }

    // 4. Amount Range
    if (filters.amountRange !== 'All') {
      const amt = getQuotationAmountNumeric(q);
      if (filters.amountRange === 'under-1.5l') {
        if (amt > 150000) return false;
      } else if (filters.amountRange === '1.5l-5l') {
        if (amt < 150000 || amt > 550000) return false;
      } else if (filters.amountRange === 'above-5l') {
        if (amt <= 500000) return false;
      }
    }

    // 5. Agent
    if (filters.agent !== 'All') {
      if (!q.agentName || !q.agentName.toLowerCase().includes(filters.agent.toLowerCase())) {
        return false;
      }
    }

    return true;
  };

  const sortFn = (a, b, sortBy) => {
    switch (sortBy) {
      case 'amount-desc':
        return getQuotationAmountNumeric(b) - getQuotationAmountNumeric(a);
      case 'amount-asc':
        return getQuotationAmountNumeric(a) - getQuotationAmountNumeric(b);
      case 'valid-soon':
        return (a.validUntil || '').localeCompare(b.validUntil || '');
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
    filteredItems: filteredQuotations
  } = useFilterState({
    items: quotations || [],
    defaultFilters,
    defaultSort: 'newest',
    filterFn,
    sortFn
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-[#eaf3ef] text-[#1e6b52] font-semibold">
            Accepted
          </span>
        );
      case 'Pending Review':
      case 'Awaiting Approval':
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-[#f8f2e7] text-[#996515] font-semibold">
            {status}
          </span>
        );
      case 'Expired':
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-stone-100 text-ink-muted font-semibold">
            Expired
          </span>
        );
      default:
        return (
          <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-sand text-ink-muted">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <span className="text-[11px] tracking-[0.14em] uppercase text-[#C8A96B] font-semibold block mb-1">
            Proposal Desk
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal uppercase text-ink tracking-tight">
            Quotations & Proposals
          </h2>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => showToast('New tailored quotation draft initialized.', 'info')}
        >
          Draft New Quotation
        </Button>
      </div>

      {/* Reusable SearchFilter Component */}
      <SearchFilter
        search={searchQuery}
        setSearch={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        placeholder="Search client, quotation ID, destination, advisor..."
        activeCount={activeFilterCount}
        onClearAll={resetFilters}
        resultCount={filteredQuotations.length}
        resultLabel="tailored proposals"
      >
        <FilterSelect
          label="Status"
          value={filters.status}
          onChange={(val) => setFilter('status', val)}
          options={[
            { value: 'All', label: 'All Statuses' },
            { value: 'Pending Review', label: 'Pending Review' },
            { value: 'Awaiting Approval', label: 'Awaiting Approval' },
            { value: 'Accepted', label: 'Accepted' },
            { value: 'Expired', label: 'Expired' }
          ]}
        />

        <FilterSelect
          label="Destination"
          value={filters.destination}
          onChange={(val) => setFilter('destination', val)}
          options={[
            { value: 'All', label: 'All Destinations' },
            { value: 'Goa', label: 'Goa' },
            { value: 'Amalfi', label: 'Amalfi Coast' },
            { value: 'Japan', label: 'Japan (Tokyo & Kyoto)' },
            { value: 'Kashmir', label: 'Kashmir Valley' }
          ]}
        />

        <FilterSelect
          label="Agent"
          value={filters.agent}
          onChange={(val) => setFilter('agent', val)}
          options={[
            { value: 'All', label: 'All Specialists' },
            { value: 'Rohan Deshmukh', label: 'Rohan Deshmukh' },
            { value: 'Elena Rostova', label: 'Elena Rostova' },
            { value: 'Julian Sterling', label: 'Julian Sterling' }
          ]}
        />

        <FilterSelect
          label="Amount"
          value={filters.amountRange}
          onChange={(val) => setFilter('amountRange', val)}
          options={[
            { value: 'All', label: 'Any Amount' },
            { value: 'under-1.5l', label: 'Under ₹1.5L / $2k' },
            { value: '1.5l-5l', label: '₹1.5L – ₹5L / $2k–$6k' },
            { value: 'above-5l', label: 'Above ₹5L / $6k+' }
          ]}
        />

        <FilterSelect
          label="Sort By"
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </SearchFilter>

      {/* Quotation Cards */}
      {filteredQuotations.length === 0 ? (
        <FilterEmptyState
          title="No Quotations Found"
          description="We couldn't find any quotations matching your selected filters. Try broadening your amount or status criteria."
          onReset={resetFilters}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredQuotations.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-black/[0.08] p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-champagne-dark font-mono">
                    {q.id}
                  </span>
                  {getStatusBadge(q.status)}
                </div>
                <span className="text-xs text-ink-muted">
                  Valid until <strong className="text-ink font-medium">{q.validUntil}</strong>
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-1">
                {q.destination}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted mb-3 font-sans">
                <span>Client: <strong className="text-ink font-medium">{q.clientName}</strong></span>
                <span>•</span>
                <span>Advisor: <strong className="text-ink font-medium">{q.agentName}</strong> ({q.agentRole})</span>
              </div>

              {/* Total Net and Items Preview */}
              <div className="bg-[#faf8f5] p-3.5 sm:p-4 rounded-xl border border-black/[0.05] mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-ink-muted block">Total Net Quotation</span>
                  <span className="font-display text-2xl font-semibold text-ink">
                    {q.amountFormatted || `$${q.amount?.toLocaleString()}`}
                  </span>
                </div>

                <div className="text-xs text-ink-muted">
                  {q.items ? `${q.items.length} itemized luxury services` : 'All-inclusive private dossier'}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.06]">
                <span className="text-xs text-ink-muted max-w-[480px]">
                  {q.notes}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Download}
                    onClick={() => showToast(`Quotation ${q.id} PDF downloaded.`, 'success')}
                  >
                    Export PDF
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Send}
                    onClick={() => showToast(`Quotation reminder dispatched to ${q.clientName}.`, 'info')}
                  >
                    Resend Link
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
