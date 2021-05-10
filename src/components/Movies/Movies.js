import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import FilterCheckbox from '../Movies/FilterCheckbox/FilterCheckbox';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import Header from '../Header/Header';

//компонент страницы с поиском по фильмам
function Movies() {
  return (
    <>
      <Header />
      <SearchForm />{/* форма поиска, куда пользователь будет вводить запрос*/}
      <FilterCheckbox /> {/*фильтр с чекбоксом «Только короткометражки»*/}
      <Preloader/> {/* отвечает за работу прелоадера*/}
      <MoviesCardList /> {/* компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством */}
      <MoviesCard /> {/*компонент одной карточки фильма*/}
    </>

  );
}

export default Movies;