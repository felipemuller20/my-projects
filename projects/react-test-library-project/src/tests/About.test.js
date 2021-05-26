import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Component About tests', () => {
  it('pokedex info?', () => {
    const { history, getByRole, getByText } = renderWithRouter(<App />);
    history.push('/about');

    const aboutText = getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();

    const firstParag = getByText('This application simulates a Pokédex, '
     + 'a digital encyclopedia containing all Pokémons');
    expect(firstParag).toBeInTheDocument();
    const secondParag = getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    expect(secondParag).toBeInTheDocument();

    const pokedexImg = getByRole('img');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
}); // describe
