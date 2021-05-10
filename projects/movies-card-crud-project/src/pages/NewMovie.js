import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      redirect: false,
    };
  }

  async handleSubmit(newMovie) {
    await movieAPI.createMovie(newMovie);
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    return (redirect
      ? <Redirect to="/" />
      : (
        <div data-testid="new-movie">
          <MovieForm onSubmit={ this.handleSubmit } />
        </div>
      ));
  }
}
export default NewMovie;
