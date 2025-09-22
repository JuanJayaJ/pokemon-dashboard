type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search Pokémon..."
      className="
        flex-1 px-3 py-2 text-sm rounded-md border
        bg-background text-foreground
        placeholder:text-gray-400
        border-border
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition
      "
    />
  );
}
