import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const server = setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    const results = [
      {
        url: 'https://pokeapi.co/api/v2/pokemon/1',
        name: 'bulbasaur',
      },
      {
        url: 'https://pokeapi.co/api/v2/pokemon/2',
        name: 'ivysaur',
      },
    ];

    return res(
      ctx.json({
        results,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders list of Pokemon correctly', async () => {
  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>
  );

  await waitFor(() => {
    const pokemons = screen.getAllByTestId('pokemon');

    expect(pokemons).toHaveLength(2); 

    pokemons.forEach((pokemon) => {
      const pokemonImages = within(pokemon).getAllByRole('img');
      
      pokemonImages.forEach((imageElement) => {
        expect(imageElement).toHaveAttribute('alt');
        expect(imageElement).toHaveAttribute('src');

        // Simulate a click on the image
        userEvent.click(imageElement);

        // Assert that the Pokemon component is rendered
        expect(screen.getByText(/bulbasaur #/i)).toBeInTheDocument();
        expect(screen.getByText(/ivysaur #/i)).toBeInTheDocument();
      });
    });
  });
});