import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import { useState, useRef, useEffect, useContext } from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';


function MoviesCardList(props) {
  const currentUser = useContext(CurrentUserContext);
  const[contClick, setCountClik] = useState(0);//количество кликов по кнопке Ещё
  const films = JSON.parse(localStorage.getItem('savedMovies'));
  //ссылки на DOM-элемент
  const containetWithMovies = useRef(null); //в котором выводятся карточки


  //по клику cчитает количество кликов
  const handleClick = () => {
    setCountClik(contClick + 1);
  }

  //при изменении ключевого слова обнуляет количество кликов по кнопке Ещё
  useEffect(()=>{
    if (props.keyword) {
      setCountClik(0);
    }
  }, [props.keyword]);

  const isSaved=(movie)=>{
    const property=props.currentPage==='saved-movies'?movie.movieId:movie.id
    const filter = films.filter( (item)=> {
    return item.movieId === property;})
    if (filter.length===1) {
      return true}
      return false;
    }

  //прокручивает скролл до видимости последних показываемых карточек
  const scrollToBottom = () =>{

    props.currentPage==='movies'&& containetWithMovies.current.scrollTo(0, props.heightRow/props.countinRow *(props.countInPage + props.countinRow*(contClick + 2)));

  }

  //делает прокрутку скролла при каждом изменении последнего
  //индекса показываемых карточек или количества карточек в ряду
  useEffect(scrollToBottom, [props.countinRow, props.heightRow, props.countInPage, contClick, props.currentPage]);

  return (
      <section className="main__section main__section_narrowest">
          {props.currentPage==='movies'?
            <ul
              ref={containetWithMovies}
              className={`movies-list movies-list_${props.currentPage}
              ${props.countinRow*(contClick + 2)>props.countInPage&&"movies-list_scroll"}`}
              >
              {props.movies.slice(0,props.countinRow*(contClick + 1)).map((movie, index) => (

                <MoviesCard
                  key={movie.id}
                  movie = {movie}
                  onSavedMovie={props.onSavedMovie}
                  onNotSavedMovie={props.onNotSavedMovie}
                  currentUser={currentUser}
                  isSaved={isSaved(movie)}
                  currentPage={props.currentPage}
                  />
                ) )
              }
           </ul>:
           <ul  className={`movies-list movies-list_${props.currentPage}}`}>
             {props.movies.map((movie, index) => (
                <MoviesCard
                  key={movie.id}
                  movie = {movie}
                  onNotSavedMovie={props.onNotSavedMovie}
                  currentUser={currentUser}
                  isSaved={isSaved(movie)}
                  currentPage={props.currentPage}
                  />
                ) )
                }
           </ul>}
      {props.movies.length>props.countinRow*(contClick + 1)&&
        <button
          type="button"
          className={`additional-button additional-button_${props.currentPage}`}
          onClick={handleClick}
          >
          Ещё
        </button>}:


    </section>
);
}

export default MoviesCardList;