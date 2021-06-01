import SearchForm from '../SearchForm/SearchForm';
import Results from '../Results/Results';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import useFilter from '../../utils/useFilter';
import { useState, useCallback, useEffect } from 'react';

//компонент страницы с сохранёнными карточками фильмов.
function SavedMovies(props) {
  const [filterFromSavedMovies, setFilterFromSavedMovies]=useState(props.savedMovies);
  const {filterByKeyword}= useFilter();

  const filter = useCallback(
    () => {

        const filter =filterByKeyword(props.savedMovies,props.isRequest);

        setFilterFromSavedMovies(filter);
    },
    [ props.isRequest, props.savedMovies],
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
        currentPage={props.currentPage}
        />
        {localStorage.getItem('savedMovies')&&<Results
            onNotSavedMovie={props.onNotSavedMovie}
            currentPage={props.currentPage}
            isFetching={props.isFetching}
            isError={props.isError}
            movies={props.isRequest?filterFromSavedMovies:JSON.parse(localStorage.getItem('savedMovies'))}
            keyword={props.isRequest}

          />}
      </main>
      <Footer />
    </>

  );
}

export default SavedMovies;