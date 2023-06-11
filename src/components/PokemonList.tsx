
import type { ReactElement } from 'react';
import type { Pokemon } from '../types/pokemon';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePokemons from '../hooks/usePokemons';

import { getPokemonIdFromUrl } from '../utils/getPokemonIdFromUrl';
import { formatText } from '../utils/formatText';

import Header from './Header';

const PokemonList = (): ReactElement => {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [showOptions, setShowOptions] = useState(false);
  const { data, isLoading } = usePokemons(resultsPerPage, currentPage) ?? [];

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
  const handlePokemonClick = (url: string): void => {
    const pokemonId = getPokemonIdFromUrl(url);
    navigate(`/pokemon/${pokemonId}`);
  };
  const resultsPerPageOptions = [10, 20, 50, 100];

  return (
    <div className="container mx-auto py-8 bg-gray-100">
      <Header>
        <div className="flex justify-center mt-8">
          <button
            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={previousPage}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-6 h-6 mr-2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
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
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-6 h-6 ml-2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" 
              />
            </svg>
          </button>
        </div>
      </Header>
      
      {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ): (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pokemonList?.map((pokemon) => (
                <div data-testid="pokemon" key={pokemon.name} className="bg-white rounded shadow-lg p-8">
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name} 
                    onClick={() => handlePokemonClick(pokemon.url)} 
                    className="mx-auto w-full max-w-sm" 
                  />
                  <div className="mt-4">
                    <p className="font-bold text-lg">{`${formatText(pokemon.name)} #${pokemon.id}`}</p>
                    <p className="text-gray-500 mt-5">{pokemon.traits?.map(trait => (
                      <span 
                        key={trait} 
                        className='bg-gray-200 rounded-full pt-2 pb-2 px-3 mr-2'>
                          {formatText(trait)}
                      </span>
                    ))}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  );
};

export default PokemonList;
