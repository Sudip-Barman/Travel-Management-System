import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-sans font-medium leading-none rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none border';

  const variantClasses = {
    primary: 'bg-ink text-white border-ink hover:bg-ink-soft hover:border-ink-soft',
    secondary: 'bg-sand text-ink border-black/15 hover:bg-white hover:border-ink',
    outline: 'bg-transparent text-ink border-black/15 hover:bg-sand hover:border-ink',
    ghost: 'bg-transparent text-ink-muted border-transparent hover:bg-black/[0.04] hover:text-ink',
    white: 'bg-white text-ink border-white hover:bg-white/90',
  };

  const sizeClasses = {
    sm: 'min-h-[38px] py-2 px-4 text-[11.5px] tracking-wide',
    md: 'min-h-[44px] py-3 px-6 text-xs tracking-wide',
    lg: 'min-h-[52px] py-4 px-8 text-sm tracking-wide',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    widthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </button>
  );
};
