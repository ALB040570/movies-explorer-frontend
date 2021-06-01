import React from 'react';
import './MoviesCard.css';
import {Route} from 'react-router-dom';
import {optionsForApi} from '../../../utils/constants';


class MoviesCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isSaved: props.isSaved
    };

    this._obj=props.movie;
    this._movieId=props.movie.movieId?{movieId:props.movie.movieId}:{movieId: props.movie.id}
    this._image=props.movie.movieId?{image: props.movie.image}:{image: optionsForApi.serverWithMoviesApiUrl+props.movie.image.url}
    this._thumbnail=props.movie.movieId?{thumbnail:props.movie.thumbnail}:{thumbnail: optionsForApi.serverWithMoviesApiUrl+props.movie.image.formats.thumbnail.url}
    this._trailer=props.movie.movieId?{trailer:props.movie.trailer}:{trailer: props.movie.trailerLink}

    this._movie = Object.assign({}, this._obj, this._image, this._thumbnail, this._trailer, this._movieId )

    this._currentUser=props.currentUser

  }

  handleClick = () => {
    window.open(this.props.movie.movieId?this.props.movie.trailer:this._movie.trailer);
  }

  changeSave =() =>{

    if (!this.state.isSaved) {
    this.setState({
      isSaved: true
    });
    this.props.onSavedMovie(this._movie);

  } else {
    this.setState({
      isSaved: false
    });
    const films = JSON.parse(localStorage.getItem('savedMovies'));
    if(this.props.currentPage==='saved-movies') {

    const filter = films.filter( (movie)=> {
      return movie.movieId === this._movie.movieId;
    });

    this.props.onNotSavedMovie(filter[0]);}
    else {
      this.props.onNotSavedMovie(this.props.movie._id)
    }
  }
}


  render() {

    return (
      <li className="movie-card">
        {this.props.movie.image&&
        <img
          className="movie-card__photo"
          src={this.props.movie.movieId?this._movie.image:`${optionsForApi.serverWithMoviesApiUrl}${this.props.movie.image.url}`}
          alt={this.props.movie.nameRU}
          onClick={this.handleClick}
          />}
        <h3 className="movie-card__title">{this.props.movie.nameRU}</h3>
        <p className="movie-card__duration">
          {this.props.movie.duration > 60?
          `${Math.round(this.props.movie.duration/60|0)}ч ${this.props.movie.duration%60 < 10?"0" + this.props.movie.duration%60: this.props.movie.duration%60}м`:
          `${this.props.movie.duration < 10?"0" + this.props.movie.duration: this.props.movie.duration}м`}
        </p>
        <Route path="/movies">
          <button className={`movie-card__button ${this.state.isSaved? "movie-card__button_small movie-card__saved": "movie-card__button_type_save"}`} onClick={this.changeSave}></button>
        </Route>
        <Route path="/saved-movies">
          <button className="movie-card__button movie-card__button_small movie-card__button_type_remove" onClick={this.changeSave}></button>
        </Route>
      </li>
    );
  }


}



export default MoviesCard;