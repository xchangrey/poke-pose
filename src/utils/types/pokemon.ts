export interface PokemonStat {
  stat: number;
  name: string;
}

export interface Pokemon {
  url: string;
  name: string;
  image: string;
  traits: string[];
  stats: PokemonStat[];
}