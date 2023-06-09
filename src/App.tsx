import React, { useEffect, useState } from 'react';
import usePokemons from './hooks/usePokemons';

interface Pokemon {
  name: string;
  image: string;
  traits: string[];
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [showOptions, setShowOptions] = useState(false);
  const { data } = usePokemons(resultsPerPage, currentPage) ?? [];

  useEffect(() => {
    setPokemonList(data as Pokemon[]);
  }, [data]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const handleResultsPerPage = (value: number) => {
    setResultsPerPage(value);
    setCurrentPage(1);
    setShowOptions(false);
  };
  const resultsPerPageOptions = [10, 20, 50, 100];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Pokémon List</h1>
      <div className="flex justify-center mt-8">
        <button
          className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={previousPage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg> Prev
        </button>
        <div className='relative mr-2'>
        <button
          className="text-gray py-2 px-4 round mr-2 border-transparent text-decoration"
          onClick={() => setShowOptions((prevValue) => !prevValue)}
        >
          <p className='underline underline-offset-8'>{`Show ${resultsPerPage} results`}</p>
        </button>
        {showOptions && (
          <div className="absolute mt-15 py-2 w-full bg-white border border-gray-300 rounded shadow">
            {resultsPerPageOptions.map((option) => (
              <button
                key={option}
                className={`block px-4 py-2 text-sm ${
                  resultsPerPage === option ? 'font-bold' : ''
                }`}
                onClick={() => handleResultsPerPage(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        </div>
        <button
          className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={nextPage}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonList?.map((pokemon) => (
          <div key={pokemon.name} className="bg-white rounded shadow p-4">
            <img src={pokemon.image} alt={pokemon.name} className="mx-auto" />
            <div className="mt-4">
              <p className="font-bold text-lg">{pokemon.name}</p>
              <p className="text-gray-500">{pokemon.traits.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default PokemonList;
