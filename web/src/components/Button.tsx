import type { ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  isLoading?: boolean;
  variantStyle?: 'default' | 'light';
  variantSize?: 'default' | 'confirmWindow';
};

export function Button({
  children,
  isLoading,
  type = 'button',
  variantStyle = 'default',
  variantSize = 'default',
  ...rest
}: Props) {
  // classename separados para legibilidade
  const baseClasses = 'rounded-sm cursor-pointer font-lato font-bold text-sm';
  const variantStyleClasses =
    variantStyle === 'light' ? 'bg-gray-500 text-gray-200' : 'bg-gray-200 text-gray-600';
  const variantSizeClasses =
    variantSize === 'confirmWindow'
      ? 'h-[40px] w-[147px] md:w-[188px]'
      : 'h-[40px] w-[294px] md:w-[344px]';

  return (
    <button
      type={type}
      disabled={isLoading}
      className={`${baseClasses} ${variantStyleClasses} ${variantSizeClasses}`}
      {...rest}
    >
      {children}
    </button>
  );
}
