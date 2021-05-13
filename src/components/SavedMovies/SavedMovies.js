import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import movies from '../../utils/movies';

//компонент страницы с сохранёнными карточками фильмов.
function SavedMovies() {
  const savedMovies = movies.filter(movie => movie.isSaved === true);
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />{/* форма поиска, куда пользователь будет вводить запрос*/}
        <MoviesCardList movies={savedMovies} class="saved-movies"/> {/* компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством */}
      </main>
      <Footer />
    </>

  );
}

export default SavedMovies;