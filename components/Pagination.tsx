type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-3"
      aria-label="Sidnavigering"
    >
      {currentPage > 1 && (
        <a
          href={
            currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`
          }
          className="px-3 py-2 text-[var(--color-accent)]"
        >
          ← Föregående
        </a>
      )}

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <a
            key={page}
            href={page === 1 ? basePath : `${basePath}?page=${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`
              min-w-10 px-3 py-2 text-center transition
              ${
                page === currentPage
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-[var(--color-accent)] hover:bg-neutral-100'
              }
            `}
          >
            {page}
          </a>
        );
      })}

      {currentPage < totalPages && (
        <a
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-2 text-[var(--color-accent)]"
        >
          Nästa →
        </a>
      )}
    </nav>
  );
}
