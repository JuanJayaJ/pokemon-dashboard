import { useState } from "react";
import { usePokemon, fetchPokemonByName } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import PokemonModal from "../components/PokemonModal";
import type { Pokemon } from "../types/pokemon";

export default function Dashboard() {
  const { data, isLoading } = usePokemon();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);

  if (isLoading) return <p className="p-4">Loading Pokémon...</p>;

  // filter list 100 pokemon
  const filtered = data?.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchType =
      typeFilter === "all" || p.types.includes(typeFilter.toLowerCase());
    return matchName && matchType;
  });

  // handle search
  const handleSearch = async (value: string) => {
    setSearch(value);
    if (value.trim() && !filtered?.length) {
      const result = await fetchPokemonByName(value.trim());
      setSearchedPokemon(result);
    } else {
      setSearchedPokemon(null);
    }
  };

  const pokemonToShow = searchedPokemon ? [searchedPokemon] : filtered;

  // buka modal dengan index
  const handleOpenPokemon = (index: number) => {
    setSelectedIndex(index);
    setSelectedPokemon(pokemonToShow?.[index] || null);
  };

  // navigasi prev/next
  const handlePrev = () => {
    if (selectedIndex !== null && pokemonToShow) {
      const newIndex =
        (selectedIndex - 1 + pokemonToShow.length) % pokemonToShow.length;
      setSelectedIndex(newIndex);
      setSelectedPokemon(pokemonToShow[newIndex]);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && pokemonToShow) {
      const newIndex = (selectedIndex + 1) % pokemonToShow.length;
      setSelectedIndex(newIndex);
      setSelectedPokemon(pokemonToShow[newIndex]);
    }
  };

  return (
    <div className="p-6 flex-1">
      <div className="flex gap-4 mb-6">
        <SearchBar search={search} setSearch={handleSearch} />
        <Filter typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
      </div>

      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        Showing {pokemonToShow?.length ?? 0} Pokémon
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {pokemonToShow?.map((p, idx) => (
          <PokemonCard
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            types={p.types}
            onClick={() => handleOpenPokemon(idx)}
            selected={selectedPokemon?.id === p.id}
          />
        ))}
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
