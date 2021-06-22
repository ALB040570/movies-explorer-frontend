import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Results from '../Results/Results';
import Footer from '../Footer/Footer';
import useFilter from '../../utils/useFilter';
import { useState, useCallback, useEffect } from 'react';


//компонент страницы с поиском по фильмам
function Movies(props) {
  const {filterByKeyword, fiterByCheckbox}= useFilter();

  const [moviesFromServis, setMoviesFromServis]=useState(props.allMovies);

  const filter = useCallback(
    () => {
      if (props.isRequest) {
        const filterByNameRU =filterByKeyword(props.allMovies,props.isRequest);
        setMoviesFromServis(filterByNameRU);
        localStorage.setItem('movies', JSON.stringify(filterByNameRU));
        if (props.isCheckFilterClicked) {
          const filterByDuration =fiterByCheckbox(filterByNameRU);
          setMoviesFromServis(filterByDuration);
          localStorage.setItem('movies', JSON.stringify(filterByDuration))
        }
      }
    },
    [filterByKeyword, fiterByCheckbox, props.isCheckFilterClicked, props.allMovies, props.isRequest],
  );
useEffect(()=>{

  filter();

},[filter])



  return (
    <>
      <Header />
      <main className="main">
        <SearchForm
          onUpdateSearch={props.onChangeRequest}
          keyword={props.isRequest}
          isCheckFilterClicked={props.isCheckFilterClicked}
          onCheckFilterClick={props.onCheckFilterClick}
          />
          {props.isRequest?<Results
              isFetching={props.isFetching}
              isError={props.isError}
              movies={JSON.parse(localStorage.getItem('movies'))?JSON.parse(localStorage.getItem('movies')):moviesFromServis}
              keyword={JSON.parse(localStorage.getItem('keyword'))}
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
