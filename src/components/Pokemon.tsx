
import type { ReactElement } from 'react';
import type { Pokemon } from '../types/pokemon';

import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import usePokemonInfo from '../hooks/usePokemon';

import Header from './Header';
import { formatText } from '../utils/formatText';

interface URLParam {
  id: string;
}

const Pokemon = (): ReactElement => {
  const navigate = useNavigate();
  const { id = '' } = useParams<keyof URLParam>();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { data } = usePokemonInfo(id) ?? {};

  useEffect(() => {
    setPokemon(data as Pokemon);
  }, [data]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex flex-col max-w-md mx-auto p-16">
        <Header>
          <button
            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-8"
            onClick={handleBackClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Back
          </button>
        </Header>
        <p className="text-center font-bold text-2xl mt-2">
          {`${formatText(pokemon?.name ?? '')} #${id}`}
        </p>
        <img
          src={pokemon?.image}
          alt={pokemon?.name}
          className="mx-auto w-full mt-8 mb-8"
        />

        <div className="mt-4">
          <div className="flex justify-between rounded p-2">
            <span className="font-bold">Attribute</span>
            <span className="font-bold">Value</span>
          </div>
            {pokemon?.stats?.map((_stat: any) => (
              <div key={_stat.name} className="flex justify-between  leading-3 p-2">
                <span className='text-left'>{formatText(_stat.name)}</span>
                <span className='text-left'>{_stat.stat}</span>
              </div>
            ))}
        </div>
        <p className="text-gray-500 mt-5 text-left">
          {pokemon?.traits?.map(trait => (
            <span 
              key={trait} 
              className='bg-gray-200 rounded-full font-bold pt-2 pb-2 px-3 mr-2'>
                {formatText(trait)}
            </span>
          ))}</p>
      </div>
    </div>
  );
};

export default Pokemon;
