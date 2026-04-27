import Link from "next/link";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string | undefined>;
};

function buildPageHref(
  basePath: string,
  page: number,
  query?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value) {
        params.set(key, value);
      }
    }
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

export function PaginationControls({
  currentPage,
  totalPages,
  basePath,
  query,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null;
  }

  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <nav
      aria-label="Paginacion de productos"
      className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3"
    >
      {currentPage > 1 ? (
        <Link
          href={buildPageHref(basePath, previousPage, query)}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-100"
        >
          Anterior
        </Link>
      ) : (
        <span className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-400">
          Anterior
        </span>
      )}

      <p className="text-sm text-slate-700">
        Pagina {currentPage} de {totalPages}
      </p>

      {currentPage < totalPages ? (
        <Link
          href={buildPageHref(basePath, nextPage, query)}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-100"
        >
          Siguiente
        </Link>
      ) : (
        <span className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-400">
          Siguiente
        </span>
      )}
    </nav>
  );
}
