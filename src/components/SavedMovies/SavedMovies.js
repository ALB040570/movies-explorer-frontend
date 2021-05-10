import React from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import Header from '../Header/Header';

//компонент страницы с сохранёнными карточками фильмов.
function SavedMovies() {
  return (
    <>
      <Header />
      <MoviesCardList /> {/* компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством */}
      <MoviesCard /> {/*компонент одной карточки фильма*/}
    </>

  );
}

export default SavedMovies;