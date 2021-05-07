import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleBookmarkedChange = this.handleBookmarkedChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    const { movies } = this.props;
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
  }

  handleClick(data) {
    console.log(data);
  }

  handleSearchChange(event) {
    const { value } = event.target;
    this.setState({ searchText: value });
  }

  handleBookmarkedChange(event) {
    const { checked } = event.target;
    this.setState({ bookmarkedOnly: checked });
  }

  handleGenreChange(event) {
    const { value } = event.target;
    this.setState({ selectedGenre: value });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;
    let filteredMovies = movies;
    if (bookmarkedOnly) {
      filteredMovies = movies.filter((movie) => movie.bookmarked === true);
    }
    if (selectedGenre !== '') {
      filteredMovies = filteredMovies.filter((movie) => movie.genre === selectedGenre);
    }
    if (searchText !== '') {
      filteredMovies = filteredMovies.filter((movie) => (
        movie.title.includes(searchText)
         || movie.subtitle.includes(searchText)
         || movie.storyline.includes(searchText)
      ));
    }

    return (
      <div>
        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          bookmarkedOnly={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
          onSearchTextChange={ this.handleSearchChange }
          onBookmarkedChange={ this.handleBookmarkedChange }
          onSelectedGenreChange={ this.handleGenreChange }
        />
        <AddMovie onClick={ this.handleClick } />
        <MovieList
          movies={ filteredMovies }
          bookmarked={ bookmarkedOnly }
          genre={ selectedGenre }
          searchText={ searchText }
        />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieLibrary;
