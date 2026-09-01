'use client';

/**
 * Displays a fallback when an unexpected page error occurs.
 */
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h2 className="text-2xl">Något gick fel</h2>

      <p className="text-neutral-600">Sidan kunde inte laddas just nu.</p>

      <button
        type="button"
        onClick={reset}
        className="text-accent underline underline-offset-4"
      >
        Försök igen
      </button>
    </div>
  );
}
