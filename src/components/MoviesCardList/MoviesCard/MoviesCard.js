import {useState} from 'react';
import './MoviesCard.css';
import {Route} from 'react-router-dom';
import Preloader from '../../../images/preloader-min.png';

function MoviesCard(props) {

  const [isSaved, setIsSaved] = useState(false);
  const changeSave = () => {if (isSaved === false) {
    setIsSaved(true);
  } else {
    setIsSaved(false);
  }}

  const [srcOnLoad, setsrcOnLoad] = useState(Preloader);
  const changeSrc = () => {
    setsrcOnLoad(props.movie.image)
  }

  return (
    <li className="movie-card">
      <img className="movie-card__photo" src={srcOnLoad} onLoad={changeSrc} alt={props.movie.nameRU}/>
      <h3  className="movie-card__title">{props.movie.nameRU}</h3>
      <p  className="movie-card__duration">{props.movie.duration}</p>
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