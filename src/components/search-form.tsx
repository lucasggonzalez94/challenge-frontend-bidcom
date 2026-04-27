import { IoSearchOutline } from "react-icons/io5";

type SearchFormProps = {
  defaultValue?: string;
};

export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  return (
    <form action="/search" method="get" className="w-full">
      <div className="flex h-11 w-full items-center overflow-hidden rounded-sm border border-slate-300 bg-white">
        <input
          id="search"
          name="s"
          type="search"
          defaultValue={defaultValue}
          placeholder="¿Que estas buscando?"
          className="h-full w-full px-3 text-sm text-slate-900 outline-none"
        />
        <button
          type="submit"
          className="grid h-full w-12 place-items-center border-l border-slate-300 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Buscar"
        >
          <IoSearchOutline aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
