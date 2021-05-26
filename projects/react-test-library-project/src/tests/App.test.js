import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders home, about and favorite pokémons links', () => {
    const { getByRole } = renderWithRouter(<App />);
    const homeLink = getByRole('link', {
      name: /home/i,
    });
    const aboutLink = getByRole('link', {
      name: /about/i,
    });
    const favoriteLink = getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Link home works', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const homeLink = getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Link about works', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Link favorite pokemon works', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favoritesLink = getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoritesLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Page not found working', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/teste');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
}); // Describe
