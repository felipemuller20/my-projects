import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Pokedex test', () => {
  it('encountered pokemons text', () => {
    const { getByRole } = renderWithRouter(<App />);
    const text = getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });

  it('next pokemon button is working correctly', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextBtn = getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextBtn);
    expect(getByText('Charmander')).toBeInTheDocument();
    for (let index = 0; index < (pokemons.length - 1); index += 1) {
      userEvent.click(nextBtn);
    }
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('only one pokemon is showed', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  it('pokemon type button', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);
    const typeBtn = getAllByTestId('pokemon-type-button');
    expect(typeBtn[0]).toHaveTextContent('Electric');
    const poison = getByRole('button', {
      name: 'Poison',
    });
    userEvent.click(poison);
    const nextBtn = getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextBtn.disabled).toBe(true);
    expect(getByText('Ekans')).toBeInTheDocument();
  });
  it('button all reset type filter', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const allBtn = getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
