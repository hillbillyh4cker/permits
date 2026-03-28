import React from 'react';
import { cn } from '../../utils/utils';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20',
    secondary: 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700',
    outline: 'bg-transparent border border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-500/10',
    ghost: 'bg-transparent hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white',
    danger: 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-500 hover:bg-red-500/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';
