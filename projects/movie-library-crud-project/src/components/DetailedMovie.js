import React from 'react';
import PropTyopes from 'prop-types';

class DetailedMovie extends React.Component {
  render() {
    const { imagePath, title, subtitle, storyline, rating, genre } = this.props;
    return (
      <div>
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <h2>{title}</h2>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
      </div>
    );
  }
}

DetailedMovie.propTypes = {
  imagePath: PropTyopes.string,
  title: PropTyopes.string,
  subtitle: PropTyopes.string,
  storyline: PropTyopes.string,
  rating: PropTyopes.number,
  genre: PropTyopes.string,
}.isRequired;

export default DetailedMovie;
