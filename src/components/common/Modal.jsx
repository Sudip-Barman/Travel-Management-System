import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '640px'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#101113]/65 backdrop-blur-sm z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-xl sm:rounded-md w-full max-h-[88vh] sm:max-h-[90vh] overflow-y-auto border border-black/[0.07] shadow-float relative"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle for native touch feel */}
        <div className="sm:hidden w-9 h-1 bg-black/15 rounded-full mx-auto my-2" />

        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-black/[0.07]">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-ink-muted mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-black/[0.04] transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6">{children}</div>

        {footer && (
          <div className="p-4 sm:p-6 border-t border-black/[0.07] bg-canvas flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
