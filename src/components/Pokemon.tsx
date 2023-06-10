import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePokemonInfo from '../hooks/usePokemon';

interface URLParam {
  id: string;
}

const Pokemon = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams<keyof URLParam>();
  const { pokemon } = usePokemonInfo(id) ?? {};

  console.log(pokemon)

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleBackClick}
      >
        Back
      </button>
      <div className="bg-white rounded-lg shadow-md p-4">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={pokemon.name}
          className="mx-auto w-40 h-40"
        />
        <p className="text-center mt-2">{pokemon.name}</p>

        <div className="mt-4">
          {pokemon.stats.map((stat: any) => (
            <div key={stat.stat.name} className="flex justify-between items-center bg-gray-200 rounded p-2 mt-2">
              <span>{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
