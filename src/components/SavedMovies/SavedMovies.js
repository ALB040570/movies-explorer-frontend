import SearchForm from '../SearchForm/SearchForm';
import Results from '../Results/Results';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


//компонент страницы с сохранёнными карточками фильмов.
function SavedMovies(props) {

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

          />:
          localStorage.getItem('savedMovies')&&<Results
            isFetching={false}
            isError={''}
            movies={JSON.parse(localStorage.getItem('savedMovies'))}
            keyword={JSON.parse(localStorage.getItem('keyword'))}
            onSavedMovie={props.onSavedMovie}
            onNotSavedMovie={props.onNotSavedMovie}
           
          />
          }
      </main>
      <Footer />
    </>

  );
}

export default SavedMovies;