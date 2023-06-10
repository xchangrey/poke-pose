export const getPokemonIdFromUrl = (url: string): string => {
  // Example URL: "https://pokeapi.co/api/v2/pokemon/25/"
  const regex = /\/(\d+)\/$/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return '';
};
