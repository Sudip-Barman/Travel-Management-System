import React from 'react';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, X, RotateCcw } from 'lucide-react';

/**
 * SearchFilter
 * 
 * Luxury standardized filter container:
 * ┌─────────────────────────────────────────────────────┐
 * │ 🔍 Search...                              [ Filters ]│
 * ├─────────────────────────────────────────────────────┤
 * │ Destination     Category      Price      Status     │
 * │ [Select ▾]       [Select ▾]    [Select ▾] [Select ▾]│
 * └─────────────────────────────────────────────────────┘
 *
 * @param {Object} props
 * @param {string} props.search - Search string
 * @param {Function} props.setSearch - Search change handler
 * @param {boolean} props.showFilters - Boolean to show/hide filter row
 * @param {Function} props.setShowFilters - Toggle show/hide
 * @param {string} props.placeholder - Search input placeholder
 * @param {number} props.activeCount - Count of currently active filters
 * @param {Function} props.onClearAll - Reset/clear callback
 * @param {number} props.resultCount - Count of filtered items
 * @param {string} props.resultLabel - Label for results (e.g. "destinations")
 * @param {React.ReactNode} props.children - Page-specific filters (FilterSelect, FilterInput, etc.)
 */
export const SearchFilter = ({
  search = '',
  setSearch,
  showFilters = false,
  setShowFilters,
  placeholder = 'Search...',
  activeCount = 0,
  onClearAll,
  resultCount,
  resultLabel = 'results',
  children,
  className = ''
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-[#E5DED1] shadow-[0_4px_24px_rgba(23,23,23,0.03)] overflow-hidden transition-all duration-200 mb-6 sm:mb-8 ${className}`}
    >
      {/* Top Search & Filter Toggle Row */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-4 p-2.5 sm:p-3.5 bg-white">
        {/* Search Input */}
        <div className="flex items-center gap-2.5 flex-1 bg-[#FAF8F3] focus-within:bg-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg border border-[#E5DED1] focus-within:border-[#C8A96B] focus-within:ring-2 focus-within:ring-[#C8A96B]/20 transition-all duration-150 min-h-[38px] sm:min-h-[40px]">
          <Search size={16} className="text-[#9A9489] flex-shrink-0" />
          <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm text-[#1C1C1C] bg-transparent border-none outline-none placeholder:text-[#9A9489] font-medium min-w-0"
            aria-label={placeholder}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="w-4 h-4 rounded-full flex items-center justify-center text-[#9A9489] hover:text-[#1C1C1C] hover:bg-black/5 transition-colors flex-shrink-0 cursor-pointer"
              title="Clear search text"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Filters Toggle Button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 sm:gap-2 h-[38px] sm:h-[40px] px-3.5 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold border transition-all duration-150 cursor-pointer select-none ${
              showFilters
                ? 'bg-[#F3EFE7] text-[#1C1C1C] border-[#C8A96B] shadow-xs'
                : activeCount > 0
                ? 'bg-[#FAF8F3] text-[#1C1C1C] border-[#C8A96B] hover:bg-[#F3EFE7]'
                : 'bg-[#FAF8F3] hover:bg-[#F3EFE7] hover:border-[#C8A96B] text-[#1C1C1C] border-[#E5DED1]'
            }`}
            aria-expanded={showFilters}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal
              size={14}
              className={showFilters || activeCount > 0 ? 'text-[#C8A96B]' : 'text-[#6F6A61]'}
            />
            <span className="tracking-wide">Filters</span>
            {activeCount > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-mono font-bold rounded-full bg-[#171717] text-[#FAF8F3]"
              >
                {activeCount}
              </span>
            )}
            {showFilters ? (
              <ChevronUp size={14} className="text-[#6F6A61]" />
            ) : (
              <ChevronDown size={14} className="text-[#6F6A61]" />
            )}
          </button>
        </div>
      </div>

      {/* Directly Underneath Filter Section */}
      {showFilters && (
        <div className="border-t border-[#E5DED1] bg-[#FAF8F3] p-3.5 sm:p-5 transition-all duration-200">
          {/* Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-end">
            {children}
          </div>

          {/* Sub-strip with live result count & reset */}
          {(activeCount > 0 || resultCount !== undefined || onClearAll) && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3.5 border-t border-[#E5DED1] text-xs">
              <span className="text-[#6F6A61] text-[11.5px]">
                {resultCount !== undefined ? (
                  <>
                    Showing <strong className="text-[#1C1C1C] font-semibold">{resultCount}</strong> {resultLabel}
                  </>
                ) : null}
              </span>

              {onClearAll && (activeCount > 0 || search) && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#6F6A61] hover:text-[#C8A96B] transition-colors cursor-pointer ml-auto"
                >
                  <RotateCcw size={11} className="text-[#C8A96B]" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
