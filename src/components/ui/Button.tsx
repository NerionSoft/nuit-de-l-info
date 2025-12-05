'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
          // Variants
          variant === 'primary' && 'bg-[#3B82F6] text-white hover:bg-[#2563EB] focus:ring-[#3B82F6]',
          variant === 'secondary' && 'bg-white text-[#151515] border border-[#D0D1C9] hover:bg-gray-50 focus:ring-gray-300',
          variant === 'ghost' && 'bg-transparent text-[#151515] hover:bg-black/5 focus:ring-gray-300',
          // Sizes
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4 text-base',
          size === 'lg' && 'h-12 px-6 text-lg',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
