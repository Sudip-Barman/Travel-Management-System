import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * FilterSelect - Luxury compact standardized dropdown for SearchFilter
 */
export const FilterSelect = ({
  label,
  value,
  onChange,
  options = [],
  className = '',
  id
}) => {
  const selectId = id || (label ? `filter-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`flex flex-col gap-1.5 w-full min-w-[130px] ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-[10.5px] font-semibold uppercase tracking-wider text-[#6F6A61] truncate select-none font-mono"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[38px] sm:h-[40px] appearance-none bg-white text-[#1C1C1C] font-medium text-xs sm:text-[13px] pl-3 pr-8 rounded-lg border border-[#E5DED1] hover:border-[#C8A96B]/70 focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B]/25 outline-none cursor-pointer transition-colors duration-150"
        >
          {options.map((opt) => {
            const optValue = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C8A96B] flex items-center">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
};
