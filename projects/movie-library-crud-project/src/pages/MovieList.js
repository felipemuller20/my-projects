import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  async fetchMovies() {
    const movies = await movieAPI.getMovies();
    this.setState({ movies, loading: false });
  }

  render() {
    const { movies, loading } = this.state;

    return (loading
      ? <Loading />
      : (
        <div>
        <div data-testid="movie-list" className="movie-list">
          {movies.length === 0
            ? <Loading />
            : movies.map((movie) => (
              <MovieCard
                key={ movie.title }
                movie={ movie }
                title={ movie.title }
                storyline={ movie.storyline }
                image={ movie.imagePath }
                id={ movie.id }
              />
            ))}
        </div>
          <Link className="add-movie" to="/movies/new">ADICIONAR CARTÃO</Link>
        </div>
        ));
  }
}

export default MovieList;
