export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-[var(--color-accent)]" />

      <span className="sr-only">Laddar sidan...</span>
    </div>
  );
}
