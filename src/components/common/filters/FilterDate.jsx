import React from 'react';
import { Calendar } from 'lucide-react';

/**
 * FilterDate - Luxury compact date input for SearchFilter
 */
export const FilterDate = ({
  label,
  value,
  onChange,
  className = '',
  id
}) => {
  const inputId = id || (label ? `filter-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`flex flex-col gap-1.5 w-full min-w-[130px] ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10.5px] font-semibold uppercase tracking-wider text-[#6F6A61] truncate select-none font-mono"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[38px] sm:h-[40px] bg-white text-[#1C1C1C] font-medium text-xs sm:text-[13px] pl-3 pr-7 rounded-lg border border-[#E5DED1] hover:border-[#C8A96B]/70 focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B]/25 outline-none transition-colors duration-150 cursor-pointer"
        />
        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C8A96B] flex items-center">
          <Calendar size={14} />
        </div>
      </div>
    </div>
  );
};
