import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Pokemon details test', () => {
  it('render detail information', () => {
    const { getByRole, history, queryByRole,
      getByText } = renderWithRouter(<App />);
    history.push(`pokemons/${pokemons[0].id}`);
    const pokeDetails = getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(pokeDetails).toBeInTheDocument();
    const detailLink = queryByRole('link', {
      name: /more details/i,
    });
    expect(detailLink).toBeNull();
    const summary = getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();
    expect(getByText('Electric')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    const pokeSummary = pokemons[0].summary;
    expect(getByText(pokeSummary)).toBeInTheDocument();
  });

  it('render map locations of the selected pokémon', () => {
    const { getByRole, history, getByText,
      getAllByAltText } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const pokeLocation = getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(pokeLocation).toBeInTheDocument();
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();

    const mapImages = getAllByAltText('Pikachu location');
    expect(mapImages[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImages[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Detailed pokemon can be favorited', () => {
    const { history, getByLabelText, queryByAltText } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const pokeFav = getByLabelText('Pokémon favoritado?');
    expect(pokeFav).toBeInTheDocument();
    userEvent.click(pokeFav);
    const starImg = queryByAltText('Pikachu is marked as favorite');
    expect(starImg).toBeInTheDocument();
    userEvent.click(pokeFav);
    expect(starImg).not.toBeInTheDocument();
  });
});
