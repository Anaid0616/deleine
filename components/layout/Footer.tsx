import Link from 'next/link';
import Image from 'next/image';
import { redHat } from '@/lib/fonts';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] text-[var(--color-text-main)] mt-20">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* Logo + text */}
        <div>
          <Image
            src="/footer-logo.png"
            alt="Deleine logo"
            width={90}
            height={130}
            className="h-auto mb-4"
          />

          <p className="max-w-[250px]">
            Professionell hårvård, med lugn och gemenskap i fokus.
          </p>
        </div>

        {/* Navigation */}
        <div className={redHat.className}>
          <h3 className="text-base font-semibold mb-4">Navigation</h3>

          <ul className="space-y-2">
            <li>
              <Link href="/om-deleine" className="hover:underline">
                Om Deleine
              </Link>
            </li>
            <li>
              <Link href="/tjanster" className="hover:underline">
                Tjänster
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:underline">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/bildgalleri" className="hover:underline">
                Bildgalleri
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <h3 className="text-base font-semibold mb-4">Kontakt</h3>

          <ul className="space-y-2">
            <li>Telefon: 0722 50 74 74</li>
            <li>Email: deleineab@outlook.com</li>
            <li>Adress: Gustav III:s Boulevard 17, Solna</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10 text-center text-sm py-4">
        © {new Date().getFullYear()} Deleine. Alla rättigheter reserverade.
      </div>
    </footer>
  );
}
