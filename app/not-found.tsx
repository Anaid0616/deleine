import { ebGaramond } from '@/lib/fonts';
import Button from '@/components/Button';

/**
 * Displays a fallback page when the requested route cannot be found.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">
          404
        </p>

        <h1
          className={`${ebGaramond.className} mb-4 text-4xl text-accent md:text-5xl`}
        >
          Sidan kunde inte hittas
        </h1>

        <p className="mb-8 text-lg leading-8 text-neutral-600">
          Sidan du söker finns inte eller kan ha flyttats.
        </p>

        <Button href="/" showIcon>
          Till startsidan
        </Button>
      </div>
    </main>
  );
}
