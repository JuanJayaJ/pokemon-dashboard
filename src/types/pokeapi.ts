export type PokeApiListResponse = {
  results: { name: string; url: string }[];
};

export type PokeApiDetailResponse = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  species: { url: string };
};

export type PokeApiSpeciesResponse = {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
};
