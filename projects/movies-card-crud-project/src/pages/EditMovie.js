import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loading: true,
      movie: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this);
  }

  componentDidMount() {
    this.fetchMovie();
  }

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie);
    this.setState({ redirect: true });
  }

  async fetchMovie() {
    const { match } = this.props;
    const { id } = match.params;
    const movie = await movieAPI.getMovie(id);
    this.setState({ loading: false, movie });
  }

  render() {
    const { loading, redirect, movie } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div data-testid="edit-movie">
        { loading ? <Loading />
          : <MovieForm movie={ movie } onSubmit={ this.handleSubmit } /> }
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.number,
}.isRequired;

export default EditMovie;
