import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { Header } from "@/components/header";

type PageShellProps = {
  children: ReactNode;
  searchTerm?: string;
  mainClassName?: string;
  containerClassName?: string;
};

function joinClasses(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function PageShell({
  children,
  searchTerm,
  mainClassName,
  containerClassName,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header searchTerm={searchTerm} />
      <main className={joinClasses("py-6 sm:py-8", mainClassName)}>
        <Container className={containerClassName}>{children}</Container>
      </main>
    </div>
  );
}
