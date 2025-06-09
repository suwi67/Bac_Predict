
import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  'aria-label'?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    'aria-label': ariaLabel,
    ...props 
  }: ButtonProps) => {
    const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-150 ease-in-out inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 focus:ring-sky-500',
      secondary: 'bg-slate-600 text-slate-200 hover:bg-slate-500 active:bg-slate-400 focus:ring-slate-500',
      danger: 'bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 focus:ring-rose-500',
      ghost: 'bg-transparent text-slate-200 hover:bg-slate-800 active:bg-slate-700 focus:ring-slate-500'
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <button
        {...props}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      >
        {children}
      </button>
    );
  }
);

export { Button };
