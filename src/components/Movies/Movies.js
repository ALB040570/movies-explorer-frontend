import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import movies from '../../utils/movies';

//компонент страницы с поиском по фильмам
function Movies() {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />{/* форма поиска, куда пользователь будет вводить запрос*/}
        <MoviesCardList movies={movies} class="movies"/> {/* компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством */}
      </main>
      <Footer />
    </>

  );
}

export default Movies;