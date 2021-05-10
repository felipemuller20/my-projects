import React from 'react';
import PropTypes from 'prop-types';

class MoviesText extends React.Component {
  render() {
    const { titleValue, handleChange, subtitleValue,
      imagePathValue, storylineValue } = this.props;
    return (
      <div>
        <label data-testid="title-input-label" htmlFor="input-label">
          Título
          <input
            type="text"
            data-testid="title-input"
            id="input-label"
            name="title"
            value={ titleValue }
            onChange={ handleChange }
          />
        </label>
        <label data-testid="subtitle-input-label" htmlFor="subtitleLabel">
          Subtítulo
          <input
            id="subtitleLabel"
            name="subtitle"
            value={ subtitleValue }
            data-testid="subtitle-input"
            onChange={ handleChange }
          />
        </label>
        <label data-testid="image-input-label" htmlFor="imageInput">
          Imagem
          <input
            data-testid="image-input"
            id="imageInput"
            type="text"
            name="imagePath"
            value={ imagePathValue }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="storyline-text" data-testid="storyline-input-label">
          Sinopse
          <textarea
            id="storyline-text"
            value={ storylineValue }
            name="storyline"
            onChange={ handleChange }
            data-testid="storyline-input"
          />
        </label>
      </div>
    );
  }
}

MoviesText.propTypes = {
  titleValue: PropTypes.string.isRequired,
  subtitleValue: PropTypes.string.isRequired,
  imagePathValue: PropTypes.string.isRequired,
  storylineValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MoviesText;
