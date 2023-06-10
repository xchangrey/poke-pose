export interface PokemonStat {
  stat: number;
  name: string;
}

export interface Pokemon {
  id: string;
  url: string;
  name: string;
  image: string;
  traits: string[];
  stats: PokemonStat[];
}