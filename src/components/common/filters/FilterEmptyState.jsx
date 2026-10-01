import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

/**
 * FilterEmptyState
 * Luxury styled empty state when filters return 0 items.
 */
export const FilterEmptyState = ({
  title = 'No Matching Results',
  description = 'We could not find any results matching your active filters. Try broadening your search or resetting all filters.',
  onReset,
  className = ''
}) => {
  return (
    <div
      className={`w-full py-16 sm:py-20 px-4 flex flex-col items-center justify-center text-center bg-[#FAF8F3]/60 rounded-2xl border border-dashed border-[#E5DED1] my-6 animate-fadeIn ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[#F3EFE7] border border-[#E5DED1] flex items-center justify-center text-[#C8A96B] mb-4 shadow-xs">
        <SearchX size={26} strokeWidth={1.5} />
      </div>

      <h3 className="font-display text-xl sm:text-2xl font-normal uppercase text-[#1C1C1C] mb-2 tracking-tight">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-[#6F6A61] max-w-[420px] mb-6 leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-[#171717] hover:bg-[#C8A96B] hover:text-[#171717] text-[#FAF8F3] text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs min-h-[40px]"
        >
          <RotateCcw size={13} />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
};
