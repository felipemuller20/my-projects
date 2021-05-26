import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Not found tests', () => {
  it('Page requested not found message', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/test');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
  it('Page not found has a crying Pikachu image', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/teste');
    const pikachu = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(pikachu).toBeInTheDocument();
    expect(pikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
