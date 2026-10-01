import React from 'react';
import { Compass } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Compass,
  title = 'No items found',
  description = 'Try adjusting your search criteria or check back later.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="text-center py-16 px-4 flex flex-col items-center justify-center max-w-[480px] mx-auto">
      <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center text-champagne-dark mb-4 shadow-subtle">
        <Icon size={28} />
      </div>
      <h4 className="font-display text-2xl font-medium text-ink mb-1.5">
        {title}
      </h4>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
