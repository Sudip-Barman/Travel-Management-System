import React from 'react';

export const Card = ({
  children,
  interactive = false,
  className = '',
  onClick,
  ...props
}) => {
  return (
    <div
      className={`card ${interactive ? 'card-interactive' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
