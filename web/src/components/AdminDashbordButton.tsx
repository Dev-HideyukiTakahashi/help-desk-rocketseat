import type { ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  isLoading?: boolean;
  variantSize?: 'default' | 'mobile';
};

export function AdminDashbordButton({
  children,
  isLoading,
  type = 'button',
  variantSize = 'default',
  ...rest
}: Props) {
  // classename separados para legibilidade
  let baseClasses =
    'bg-gray-200 text-gray-600 rounded-sm font-lato text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1 h-[40px] w-[40px] md:h-[40px] md:w-[92px]';

  if (variantSize === 'mobile') {
    baseClasses =
      'bg-gray-200 text-gray-600 rounded-sm font-lato text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center h-[28px] w-[28px]';
  }

  return (
    <button
      type={type}
      disabled={isLoading}
      className={`${baseClasses} ${isLoading} && 'cursor-progress'`}
      {...rest}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 5.33325C16.7364 5.33325 17.3334 5.93021 17.3334 6.66659V14.6666H25.3334C26.0698 14.6666 26.6667 15.2635 26.6667 15.9999C26.6667 16.7363 26.0698 17.3333 25.3334 17.3333H17.3334V25.3333C17.3334 26.0696 16.7364 26.6666 16 26.6666C15.2637 26.6666 14.6667 26.0696 14.6667 25.3333V17.3333H6.66671C5.93033 17.3333 5.33337 16.7363 5.33337 15.9999C5.33337 15.2635 5.93033 14.6666 6.66671 14.6666H14.6667V6.66659C14.6667 5.93021 15.2637 5.33325 16 5.33325Z"
          fill="currentColor"
        />
      </svg>
      <span className="hidden sm:inline">{isLoading ? 'Aguarde . . .' : children}</span>
    </button>
  );
}
