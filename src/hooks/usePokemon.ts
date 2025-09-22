import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Pokemon } from "../types/pokemon";
import type {
  PokeApiListResponse,
  PokeApiDetailResponse,
  PokeApiSpeciesResponse,
} from "../types/pokeapi";

// 🔹 ambil 100 Pokémon untuk dashboard
const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const res = await axios.get<PokeApiListResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=1000"
  );

  const results: Pokemon[] = await Promise.all(
    res.data.results.map(async (p) => {
      const detail = await axios.get<PokeApiDetailResponse>(p.url);
      const species = await axios.get<PokeApiSpeciesResponse>(
        detail.data.species.url
      );

      const flavor = species.data.flavor_text_entries.find(
        (f) => f.language.name === "en"
      );

      return {
        id: detail.data.id,
        name: detail.data.name,
        image: detail.data.sprites.front_default,
        types: detail.data.types.map((t) => t.type.name),
        stats: detail.data.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        description: flavor ? flavor.flavor_text.replace(/\f/g, " ") : "",
        height: detail.data.height,
        weight: detail.data.weight,
        abilities: detail.data.abilities.map((a) => a.ability.name),
      };
    })
  );

  return results;
};

// 🔹 fungsi cari Pokémon by name (bisa dipakai di SearchBar)
export const fetchPokemonByName = async (name: string): Promise<Pokemon | null> => {
  try {
    const detail = await axios.get<PokeApiDetailResponse>(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    const species = await axios.get<PokeApiSpeciesResponse>(
      detail.data.species.url
    );

    const flavor = species.data.flavor_text_entries.find(
      (f) => f.language.name === "en"
    );

    return {
      id: detail.data.id,
      name: detail.data.name,
      image: detail.data.sprites.front_default,
      types: detail.data.types.map((t) => t.type.name),
      stats: detail.data.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      description: flavor ? flavor.flavor_text.replace(/\f/g, " ") : "",
      height: detail.data.height,
      weight: detail.data.weight,
      abilities: detail.data.abilities.map((a) => a.ability.name),
    };
  } catch {
    return null;
  }
};

export const usePokemon = () =>
  useQuery({ queryKey: ["pokemon"], queryFn: fetchPokemonList });
