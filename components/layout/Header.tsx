'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { redHat } from '@/lib/fonts';

/**
 * Header component
 *
 * Fixed navigation bar that changes background color
 * when the page is scrolled.
 */
export default function Header() {
  /** Tracks whether the page has been scrolled past the threshold */
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  {
    /* Active links */
  }
  const getLinkClass = (href: string) => {
    const isActive = pathname === href;

    return `
    text-inherit
    underline-offset-4 decoration-2
    transition-all duration-200
    hover:underline
    ${isActive ? 'underline' : 'no-underline'}
  `;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[var(--color-surface)] text-[var(--color-text-main)]'
          : 'bg-transparent text-white'
      }`}
    >
      <div
        className={`w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        {/* Logo */}
        <Link href="/" aria-label="Gå till startsidan">
          <Image
            src="/deleine-logo.png"
            alt="Deleine logo"
            width={300}
            height={40}
            className={`h-auto transition-all duration-300 ${
              scrolled
                ? 'w-[250px]'
                : 'w-[300px] invert drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]'
            }`}
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className={`${redHat.className} ml-auto flex items-center gap-10 text-xl font-medium ${
            scrolled
              ? 'text-[var(--color-text-main)]'
              : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
          }`}
        >
          <Link href="/om-deleine" className={getLinkClass('/om-deleine')}>
            Om Deleine
          </Link>
          <Link href="/tjanster" className={getLinkClass('/tjanster')}>
            Tjänster
          </Link>
          <Link href="/kontakt" className={getLinkClass('/kontakt')}>
            Kontakt
          </Link>
          <Link href="/bildgalleri" className={getLinkClass('/bildgalleri')}>
            Bildgalleri
          </Link>
        </nav>
      </div>
    </header>
  );
}
