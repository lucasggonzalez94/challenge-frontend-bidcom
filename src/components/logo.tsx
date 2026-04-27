import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  href?: string;
};

export function Logo({ href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label="Ir a la pagina principal"
    >
      <Image src="/logo_bidcom.svg" alt="Bidcom" width={147} height={33} priority />
    </Link>
  );
}
