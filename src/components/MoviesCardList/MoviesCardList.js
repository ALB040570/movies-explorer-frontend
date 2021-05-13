import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';

function MoviesCardList(props) {


  return (
    <section className="main__section main__section_narrowest">
      <ul className={`movies-list movies-list_${props.class}`}>
        {
          props.movies.map((movie) => (<MoviesCard movie = {movie}/>
           ) )
        }

      </ul>
      <button type="button" className={`additional-button additional-button_${props.class}`}>
        Ещё
        </button>
    </section>
);
}

export default MoviesCardList;