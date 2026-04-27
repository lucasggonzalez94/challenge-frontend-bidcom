import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell mainClassName="py-10 sm:py-14">
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Error 404</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          No encontramos la pagina que buscabas
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          Puede que el enlace sea incorrecto o que el contenido ya no este disponible.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
