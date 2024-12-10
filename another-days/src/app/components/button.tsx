import { CircleNotch } from '@phosphor-icons/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/util/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  cn(
    `relative inline-flex items-center justify-center whitespace-nowrap leading-normal focus-visible:outline-none`,
    `disabled:pointer-events-none disabled:bg-gray-100 disabled:text-gray-400 [&:disabled>svg]:fill-gray-400`,
  ),
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 from-black/[.15] to-black/[.15] text-white hover:bg-gradient-to-t',
        secondary: 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:border-none',
        tertiary: 'bg-white text-gray-600 hover:bg-gray-100',
        icon: 'hover:bg-gray-100 [&>svg]:size-5 rounded-full p-2',
      },
      size: {
        small: 'body-13-medium h-[32px] min-w-[60px] px-[12px] py-[6px] rounded-md',
        medium: 'body-14-semibold h-[40px] min-w-[72px] px-[14px] py-[10px] rounded-lg',
        large: 'body-15-semibold h-[44px] min-w-[72px] px-[20px] py-[14px]',
        fit: 'size-fit',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, type = 'button', variant, size, disabled, loading, asChild = false, children, ...props },
  ref,
) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size: variant === 'icon' ? 'fit' : size,
          className,
        }),
      )}
      disabled={loading || disabled}
      type={type}
      ref={ref}
      {...props}
    >
      {loading && (
        <div className="absolute flex size-full items-center justify-center">
          <CircleNotch size={size === 'large' ? 16 : size === 'small' ? 13 : 14} className="animate-spin" />
        </div>
      )}
      {!loading && children}
    </button>
  );
});
