import React from 'react';

/**
 * FilterInput - Luxury compact standardized text/number input for SearchFilter
 */
export const FilterInput = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
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
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[38px] sm:h-[40px] bg-white text-[#1C1C1C] font-medium text-xs sm:text-[13px] px-3 rounded-lg border border-[#E5DED1] hover:border-[#C8A96B]/70 focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B]/25 outline-none transition-colors duration-150 placeholder:text-[#9A9489]"
      />
    </div>
  );
};
