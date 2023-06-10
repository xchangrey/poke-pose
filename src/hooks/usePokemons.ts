import axios from 'axios';
import useSWR from 'swr';

async function pokemonsFetcher(url: string) {
  const res = await axios.get(url); 
  const pokemonData = await Promise.all(
    res.data.results.map(async (pokemon: any) => {
      const response = await axios.get(pokemon.url);
      const { name, sprites, types, stats: _stats } = response.data;
      const image = sprites.other.home.front_default;
      const traits = types.map((type: any) => type.type.name);
      const stats = _stats?.map((_stat: any) => ({
        stat: _stat.base_stat,
        name: _stat.stat.name,
      }));

      return { url: pokemon.url, name, image, traits, stats };
    })
  );

  return pokemonData;
}

export default function usePokemons(resultsPerPage: number, currentPage: number) {
  const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon?limit=${resultsPerPage}&offset=${(currentPage - 1) * resultsPerPage}`,
    pokemonsFetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}
