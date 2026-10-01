import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-status-emerald" />,
    warning: <AlertCircle size={18} className="text-status-amber" />,
    info: <Info size={18} className="text-champagne-dark" />
  };

  return (
    <div className="fixed bottom-[calc(64px+16px)] lg:bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 z-[2000] w-[90%] max-w-[420px] pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-3 py-3 px-5 rounded-full bg-ink text-white text-xs tracking-wide shadow-float animate-bounce duration-300">
        {icons[toast.type] || icons.info}
        <span className="flex-1">{toast.message}</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-0.5 text-white/70 hover:text-white cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
