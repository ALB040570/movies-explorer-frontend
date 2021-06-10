import React from 'react';
import './MoviesCard.css';
import {Route} from 'react-router-dom';
import {optionsForApi, notImage} from '../../../utils/constants';



class MoviesCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isSaved: props.isSaved
    };

    this._obj=props.movie;
    this._movieId=props.movie.movieId?{movieId:props.movie.movieId}:{movieId: props.movie.id}
    this._image=props.movie.movieId?{image: props.movie.image}:
      props.movie.image?{image: optionsForApi.serverWithMoviesApiUrl+props.movie.image.url}:
      {image: notImage}
    this._thumbnail=props.movie.movieId?{thumbnail:props.movie.thumbnail}:
      props.movie.image?{thumbnail: optionsForApi.serverWithMoviesApiUrl+props.movie.image.formats.thumbnail.url}:
      {thumbnail: notImage}
    this._trailer=props.movie.movieId?{trailer:props.movie.trailer}:
    props.movie.trailerLink?{trailer: props.movie.trailerLink}:{trailer: notImage}
    this._country=props.movie.country?{country: props.movie.country}:{country: "страна не указана"}
    this._nameEN=props.movie.nameEN?{nameEN: props.movie.nameEN}:{nameEN: "не указано наименование на английском языке"}

    this._movie = Object.assign({},
      this._obj,
      this._image,
      this._thumbnail,
      this._trailer,
      this._movieId,
      this._country,
      this._nameEN )

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
    if(this.props.currentPage==='movies') {

    const filter = films.filter( (movie)=> {
      return movie.movieId === this._movie.movieId;
    });
    this.props.onNotSavedMovie(filter[0]);}
    else {
      this.props.onNotSavedMovie(this.props.movie)
    }
  }
}


  render() {

    return (
      <li className="movie-card">
        <img
          className="movie-card__photo"
          src={this._movie.image}
          alt={this._movie.nameRU}
          onClick={this.handleClick}
          />
        <h3 className="movie-card__title">{this._movie.nameRU}</h3>
        <p className="movie-card__duration">
          {this._movie.duration > 60?
          `${Math.round(this._movie.duration/60|0)}ч ${this._movie.duration%60 < 10?"0" + this._movie.duration%60: this._movie.duration%60}м`:
          `${this._movie.duration < 10?"0" + this._movie.duration: this._movie.duration}м`}
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