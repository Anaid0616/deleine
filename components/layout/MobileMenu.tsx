'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

type MobileMenuProps = {
  isHome: boolean;
  scrolled: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Mobile navigation menu.
 *
 * Displays an animated hamburger menu and highlights
 * the active navigation link.
 */
export default function MobileMenu({
  isHome,
  scrolled,
  open,
  setOpen,
}: MobileMenuProps) {
  const pathname = usePathname();

  const iconColor =
    !isHome || scrolled || open ? 'text-text-main' : 'text-white';

  const links = [
    { href: '/om-deleine', label: 'Om Deleine' },
    { href: '/tjanster', label: 'Tjänster' },
    { href: '/kontakt', label: 'Kontakt' },
    { href: '/bildgalleri', label: 'Bildgalleri' },
  ];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? 'Stäng meny' : 'Öppna meny'}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`${iconColor} flex h-10 w-10 items-center justify-center`}
      >
        <div className="relative h-8 w-8">
          {/* Top line */}
          <span
            className={`
      absolute left-1/2 top-1/2
      h-0.5 w-7 bg-current
      transition-transform duration-500 ease-in-out
      ${
        open
          ? '-translate-x-1/2 -translate-y-1/2 rotate-45'
          : '-translate-x-1/2 -translate-y-2.25'
      }
    `}
          />

          {/* Middle line */}
          <span
            className={`
      absolute left-1/2 top-1/2
      h-0.5 w-7 bg-current
      -translate-x-1/2 -translate-y-1/2
      transition-all duration-300 ease-in-out
      ${open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}
    `}
          />

          {/* Bottom line */}
          <span
            className={`
      absolute left-1/2 top-1/2
      h-0.5 w-7 bg-current
      transition-transform duration-500 ease-in-out
      ${
        open
          ? '-translate-x-1/2 -translate-y-1/2 -rotate-45'
          : '-translate-x-1/2 translate-y-1.75'
      }
    `}
          />
        </div>
      </button>

      <nav
        className={`
    absolute left-0 top-[calc(100%-1px)] w-full
    bg-[var(--color-surface)]
    px-6 py-6
    text-text-main
    transition-all duration-500 ease-in-out
    ${
      open
        ? 'translate-y-0 opacity-100 visible'
        : '-translate-y-6 opacity-0 invisible pointer-events-none'
    }
  `}
      >
        <div className="flex flex-col items-center">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`
            py-2 text-lg font-medium
            underline-offset-4 decoration-1
            ${active ? 'underline' : 'no-underline'}
          `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
