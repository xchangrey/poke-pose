import useSWR from 'swr';
import axios from 'axios';

async function pokemonFetcher(url: string){
  const res = await axios.get(url);
  const { name, sprites, types, stats: _stats } = res.data;
  const image = sprites.other.home.front_default;
  const traits = types.map((type: any) => type.type.name);
  const stats = _stats?.map((_stat: any) => ({
    stat: _stat.base_stat,
    name: _stat.stat.name,
  }));

  return { name, image, traits, stats };
};



export default function usePokemonInfo(pokemonId: string) {
  const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, pokemonFetcher);

  return {
    data,
    isLoading,
    error,
  };
};
