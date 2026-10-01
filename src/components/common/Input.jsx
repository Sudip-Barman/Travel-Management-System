import React from 'react';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helper,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
          <span>{label} {required && <span className="text-red-500">*</span>}</span>
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-sm py-3 px-3.5 min-h-[44px] outline-none transition-colors"
        {...props}
      />
      {error && <span className="text-red-500 text-[11px]">{error}</span>}
      {helper && !error && <span className="text-ink-faint text-xs">{helper}</span>}
    </div>
  );
};

export const TextArea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  helper,
  required = false,
  rows = 3,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
          <span>{label} {required && <span className="text-red-500">*</span>}</span>
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-sm py-3 px-3.5 min-h-[90px] outline-none transition-colors resize-y leading-relaxed"
        {...props}
      />
      {error && <span className="text-red-500 text-[11px]">{error}</span>}
      {helper && !error && <span className="text-ink-faint text-xs">{helper}</span>}
    </div>
  );
};

export const Select = ({
  label,
  id,
  value,
  onChange,
  options = [],
  error,
  helper,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
          <span>{label} {required && <span className="text-red-500">*</span>}</span>
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-sm py-3 px-3.5 min-h-[44px] outline-none transition-colors cursor-pointer"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-[11px]">{error}</span>}
      {helper && !error && <span className="text-ink-faint text-xs">{helper}</span>}
    </div>
  );
};
