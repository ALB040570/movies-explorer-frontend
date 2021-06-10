import SearchForm from '../SearchForm/SearchForm';
import Results from '../Results/Results';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import useFilter from '../../utils/useFilter';
import { useState, useCallback, useEffect } from 'react';


//компонент страницы с сохранёнными карточками фильмов.
function SavedMovies(props) {
  const [filterFromSavedMovies, setFilterFromSavedMovies]=useState(props.savedMovies);
  const {filterByKeyword,fiterByCheckbox}= useFilter();


  const filter = useCallback(
    () => {
      if (props.isRequest) {
        const filterByNameRU =filterByKeyword(props.savedMovies,props.isRequest);

        setFilterFromSavedMovies(filterByNameRU);
        localStorage.setItem('filterFromSavedMovies', JSON.stringify(filterByNameRU));
        if (props.isCheckFilterClicked) {
          const filterByDuration =fiterByCheckbox(filterByNameRU);
          setFilterFromSavedMovies(filterByDuration);
          localStorage.setItem('filterFromSavedMovies', JSON.stringify(filterByDuration))
        }
      }
    },
    [filterByKeyword, fiterByCheckbox, props.isCheckFilterClicked, props.isRequest, props.savedMovies],
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
        isCheckFilterClicked={props.isCheckFilterClicked}
        onCheckFilterClick={props.onCheckFilterClick}
        />
        {props.isRequest?<Results
            onNotSavedMovie={props.onNotSavedMovie}
            currentPage={props.currentPage}
            isFetching={props.isFetching}
            isError={props.isError}
            movies={filterFromSavedMovies}
            keyword={JSON.parse(localStorage.getItem('keywordForSavedMovies'))}

          />:
            localStorage.getItem('filterFromSavedMovies')&&<Results
              isFetching={false}
              isError={''}
              movies={JSON.parse(localStorage.getItem('filterFromSavedMovies'))}
              keyword={JSON.parse(localStorage.getItem('keywordForSavedMovies'))}
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

export default SavedMovies;