'use client';

import MobileMenu from '@/components/layout/MobileMenu';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleResize = () => {
      if (mediaQuery.matches) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  {
    /* Active links */
  }
  const getLinkClass = (href: string) => {
    const isActive = pathname === href;

    return `
    text-inherit
    underline-offset-4 decoration-1
    transition-all duration-200
    hover:underline
    ${isActive ? 'underline' : 'no-underline'}
  `;
  };

  return (
    <header
      className={`top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isHome
          ? `fixed ${
              scrolled || mobileMenuOpen
                ? 'bg-[var(--color-surface)] text-[var(--color-text-main)]'
                : 'bg-transparent text-white'
            }`
          : 'sticky bg-[var(--color-surface)] text-[var(--color-text-main)]'
      }`}
    >
      <div
        className={`w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          isHome ? (scrolled ? 'py-3.5' : 'py-4') : 'py-3.5'
        }`}
      >
        {/* Logo */}
        <Link href="/" aria-label="Gå till startsidan">
          <Image
            src="/deleine-logo.png"
            alt="Deleine logo"
            width={521}
            height={153}
            className={`h-auto transition-all duration-300 ${
              !isHome || scrolled
                ? 'w-[210px] sm:w-[250px] md:w-[280px]'
                : 'w-[210px] sm:w-[250px] md:w-[300px]'
            } ${
              !isHome || scrolled || mobileMenuOpen
                ? ''
                : 'invert drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]'
            }`}
            priority
            fetchPriority="high"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className={`${redHat.className} ml-auto hidden lg:flex items-center gap-10 text-xl font-medium ${
            !isHome || scrolled
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

        {/* Mobile menu */}
        <MobileMenu
          isHome={isHome}
          scrolled={scrolled}
          open={mobileMenuOpen}
          setOpen={setMobileMenuOpen}
        />
      </div>
    </header>
  );
}
