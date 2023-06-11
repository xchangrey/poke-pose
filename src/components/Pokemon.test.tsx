import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokemon from '../components/Pokemon';

import '@testing-library/jest-dom/extend-expect';


// Your test code here


const server = setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon/', (req, res, ctx) => {
    const data = {
      name: 'pikachu',
      sprites: {
        other: {
          home: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png',
          },
        },
      },
      types: [
        {
          type: {
            name: 'poison',
          },
        },
      ],
      stats: [
        {
          base_stat: 50,
          stat: {
            name: 'hp',
          },
        },
      ],
    };
    return res(ctx.json(data));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Pokemon information correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/pokemon/1']}>
      <Pokemon />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png'
    );

    // Verify that the Pokemon type is displayed correctly
    expect(screen.getByText(/poison/i)).toBeInTheDocument();

    // Verify that the Pokemon stats are displayed correctly
    expect(screen.getByText(/50/i)).toBeInTheDocument();
  });
});