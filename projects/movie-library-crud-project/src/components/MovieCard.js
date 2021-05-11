import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { image, title, storyline, id } = this.props;
    return (
      <div data-testid="movie-card" className="movie-card">
        <img
          src={ image }
          alt={ `${title} cover` }
        />
        <h3>{title}</h3>
        <p>{storyline}</p>
        <Link to={ `/movies/${id}` }>VER DETALHES</Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  storyline: PropTypes.string,
  id: PropTypes.number,
}.isRequired;

export default MovieCard;
