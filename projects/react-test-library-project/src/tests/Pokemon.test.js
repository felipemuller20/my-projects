import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Pokemon test', () => {
  it('Render pokemon card', () => {
    const { getByRole, getByText,
      getAllByText, getByAltText, history } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getAllByText('Electric').length).toBe(2);
    expect(getByText('Average weight: 6.0 kg'));
    const pikachuImg = getByAltText('Pikachu sprite');
    expect(pikachuImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const details = getByRole('link', {
      name: /more details/i,
    });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('star icon in favorite pokemon', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);
    const details = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    userEvent.click(getByText('Pokémon favoritado?'));
    const starImg = getByAltText('Pikachu is marked as favorite');
    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
  });
}); // describe
