'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type MobileMenuProps = {
  isHome: boolean;
  scrolled: boolean;
};

export default function MobileMenu({ isHome, scrolled }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const iconColor = !isHome || scrolled ? 'text-text-main' : 'text-white';

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
        <span className="text-3xl leading-none">{open ? '×' : '☰'}</span>
      </button>

      {open && (
        <nav
          className="
    absolute left-0 top-full w-full
    bg-[var(--color-surface)]
    px-6 py-8
    text-text-main
  "
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
      )}
    </div>
  );
}
