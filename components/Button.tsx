import { HiChevronRight } from 'react-icons/hi';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  showIcon?: boolean;
  loading?: boolean;
};

/**
 * Small loading spinner shown inside buttons.
 */
function Spinner() {
  return (
    <svg
      className="h-5 w-5 spinner"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />

      <path
        className="opacity-100"
        fill="currentColor"
        d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"
      />
    </svg>
  );
}

export default function Button({
  children,
  href,
  type = 'button',
  showIcon = false,
  loading = false,
}: ButtonProps) {
  const baseClasses = `
    group inline-flex items-center justify-center gap-3
    border-2 border-accent
    text-accent
    px-6 py-2
    text-lg font-medium
    min-w-[116px]
    transition-all duration-300 ease-in-out
    hover:bg-accent
    hover:text-white
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // If it's a link, render an anchor tag
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {children}

        {showIcon && !loading && (
          <HiChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </a>
    );
  }

  // If it's a button (incl submit)
  return (
    <button type={type} className={baseClasses} disabled={loading}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {children}

          {showIcon && (
            <HiChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </>
      )}
    </button>
  );
}
