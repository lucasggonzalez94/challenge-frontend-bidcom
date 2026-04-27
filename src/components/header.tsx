import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { SearchForm } from "@/components/search-form";

type HeaderProps = {
  searchTerm?: string;
};

export function Header({ searchTerm }: HeaderProps) {
  return (
    <header className="bg-[#0000ff] py-4">
      <Container className="flex flex-col gap-4 md:flex-row items-center">
        <Logo />
        <SearchForm defaultValue={searchTerm} />
      </Container>
    </header>
  );
}
