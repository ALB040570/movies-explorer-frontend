import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Results from '../Results/Results';
import Footer from '../Footer/Footer';

//компонент страницы с поиском по фильмам
function Movies(props) {

  return (
    <>
      <Header />
      <main className="main">
        <SearchForm onUpdateSearch={props.onChangeRequest} keyword={props.isRequest}/>
        {(props.isRequest)?
          <Results
            isFetching={props.isFetching}
            isError={props.isError}
            movies={props.selectMovies}
            keyword={props.isRequest}
            onSavedMovie={props.onSavedMovie}
            onNotSavedMovie={props.onNotSavedMovie}
            currentPage={props.currentPage}

          />:
          localStorage.getItem('movies')&&<Results
            isFetching={false}
            isError={''}
            movies={JSON.parse(localStorage.getItem('movies'))}
            keyword={JSON.parse(localStorage.getItem('keyword'))}
            onSavedMovie={props.onSavedMovie}
            onNotSavedMovie={props.onNotSavedMovie}
            currentPage={props.currentPage}
          />
          }
      </main>
      <Footer />
    </>

  );
}

export default Movies;
