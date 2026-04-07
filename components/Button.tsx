import { poppins } from '@/lib/fonts';
import { HiChevronRight } from 'react-icons/hi';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  showIcon?: boolean;
};

export default function Button({
  children,
  href,
  type = 'button',
  showIcon = false,
}: ButtonProps) {
  const baseClasses = `
    ${poppins.className}
    group inline-flex items-center gap-1

    border-2 border-[var(--color-accent)]
    text-[var(--color-accent)]

    px-6 py-2
    font-semibold

    transition-all duration-300 ease-in-out

    hover:bg-[var(--color-accent)]
    hover:text-white
  `;

  // If its a link, render an anchor tag
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        <span>{children}</span>
        {showIcon && (
          <HiChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </a>
    );
  }

  // If it's a button (incl submit)
  return (
    <button type={type} className={baseClasses}>
      <span>{children}</span>
      {showIcon && (
        <HiChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}
