import useSWR from 'swr';
import axios from 'axios';

async function pokemonFetcher(url: string){
  const res = await axios.get(url);
  console.log(res.data)
  return res.data;
};



const usePokemonInfo = (pokemonId: string) => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const { data, error, isLoading } = useSWR(apiUrl, pokemonFetcher);

  return {
    pokemon: data,
    isLoading,
    error,
  };
};

export default usePokemonInfo;
