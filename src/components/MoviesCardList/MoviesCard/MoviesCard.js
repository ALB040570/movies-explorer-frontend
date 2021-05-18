import {useState} from 'react';
import './MoviesCard.css';
import {Route} from 'react-router-dom';
import optionsForApi from '../../../utils/constants';

function MoviesCard(props) {

  const [isSaved, setIsSaved] = useState(false);
  const changeSave = () => {if (isSaved === false) {
    setIsSaved(true);
  } else {
    setIsSaved(false);
  }}


  return (
    <li className="movie-card">
      {props.movie.image&&<img className="movie-card__photo" src={`${optionsForApi.serverWithMoviesApiUrl}${props.movie.image.url}`} alt={props.movie.nameRU}/>}
      <h3 className="movie-card__title">{props.movie.nameRU}</h3>
      <p className="movie-card__duration">
        {props.movie.duration > 60?
        `${Math.round(props.movie.duration/60|0)}ч ${props.movie.duration%60 < 10?"0" + props.movie.duration%60: props.movie.duration%60}м`:
        `${props.movie.duration < 10?"0" + props.movie.duration: props.movie.duration}м`}
      </p>
      <Route path="/movies">
        <button className={`movie-card__button ${isSaved? "movie-card__button_small movie-card__saved": "movie-card__button_type_save"}`} onClick={changeSave}></button>
      </Route>
      <Route path="/saved-movies">
        <button className="movie-card__button movie-card__button_small movie-card__button_type_remove"></button>
      </Route>
    </li>
  );
}

export default MoviesCard;