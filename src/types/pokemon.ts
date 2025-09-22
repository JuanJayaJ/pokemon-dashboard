export type PokemonStat = {
  name: string;
  value: number;
};

export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: PokemonStat[];
  description: string;
  height: number;
  weight: number;
  abilities: string[];
};
