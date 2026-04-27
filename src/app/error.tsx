"use client";

import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export default function GlobalError() {
  return (
    <PageShell mainClassName="py-10 sm:py-14">
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Error</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Ocurrio un problema inesperado
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          No pudimos completar la accion. Intenta nuevamente en unos segundos.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Ir al inicio
        </Link>
      </section>
    </PageShell>
  );
}
