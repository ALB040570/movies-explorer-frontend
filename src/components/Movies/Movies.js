import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Results from '../Results/Results';
import Footer from '../Footer/Footer';
import useFilter from '../../utils/useFilter';
import { useState, useCallback, useEffect } from 'react';


//компонент страницы с поиском по фильмам
function Movies(props) {
  const [moviesFromServis, setMoviesFromServis]=useState({});
  const {filterByKeyword}= useFilter();

  const filter = useCallback(
    () => {
      if (props.isRequest) {
        const filter =filterByKeyword(props.allMovies,props.isRequest);
        setMoviesFromServis(filter);
        localStorage.setItem('movies', JSON.stringify(filter))
      }
    },
    [props.allMovies, props.isRequest],
  );
useEffect(()=>{
  filter();
},[filter])



  return (
    <>
      <Header />
      <main className="main">
        <SearchForm onUpdateSearch={props.onChangeRequest} keyword={props.isRequest}/>
        { localStorage.getItem('movies')?<Results
            isFetching={false}
            isError={''}
            movies={JSON.parse(localStorage.getItem('movies'))}
            keyword={JSON.parse(localStorage.getItem('keyword'))}
            onSavedMovie={props.onSavedMovie}
            onNotSavedMovie={props.onNotSavedMovie}
            currentPage={props.currentPage}
          />:
          props.isRequest&&<Results
            isFetching={props.isFetching}
            isError={props.isError}
            movies={moviesFromServis}
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
