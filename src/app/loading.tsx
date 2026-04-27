import { PageShell } from "@/components/page-shell";

export default function Loading() {
  return (
    <PageShell>
      <section aria-label="Cargando contenido" className="space-y-4">
        <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <div className="aspect-square animate-pulse rounded-lg bg-slate-200" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-5 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
