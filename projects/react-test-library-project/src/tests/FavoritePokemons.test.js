import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Favorites pokemons tests', () => {
  it('Favorite pokemons with no favorite pokemon', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/favorites');
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
  it('PIkachu card if pikachu is favorite', () => {
    const { history, getByRole, getByText } = renderWithRouter(<App />);
    const pikachuDetail = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pikachuDetail);

    const favoriteBtn = getByText('Pokémon favoritado?');
    userEvent.click(favoriteBtn);
    history.push('/favorites');
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
