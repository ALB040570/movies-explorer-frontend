import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Results.css'
import {useState, useEffect, useCallback} from 'react';


function Results(props) {

  const largeViewport = window.matchMedia("(min-width: 1280px)");
  const middleViewport = window.matchMedia("(min-width: 768px)");

  //переменные для хранения состояния
  const[countInPage,setCountInPage]=useState(12); //количества карточек на странице
  const[countinRow, setCountInRow] = useState(3); //количества карточек в одной строке
  ////максимальная высота ряда с карточками
  const[heightRow, setHeightRow] = useState(291);


  const handleChangeSizeViewport = useCallback((e) => {
    setCountInPage(largeViewport.matches?12:middleViewport.matches?8:5);
    setCountInRow(largeViewport.matches?3:middleViewport.matches?2:1);
    setHeightRow(largeViewport.matches?291:middleViewport.matches?278:238);
  },[largeViewport.matches, middleViewport.matches])

  useEffect(()=>{
    handleChangeSizeViewport();
  },[handleChangeSizeViewport])

  window.addEventListener( "resize", handleChangeSizeViewport);


  return (
    <>
      {props.isError?
        <p className="result__message">{props.isError}</p>:
        <>
          {props.isFetching?
            <Preloader />:
            <>
              {props.movies.length===0?
                props.keyword&&<p className="result__message">Ничего не найдено</p>:
                <MoviesCardList
                  movies={props.movies}
                  keyword={props.keyword}
                  countInPage={countInPage}
                  countinRow={countinRow}
                  heightRow={heightRow}
                  onSavedMovie={props.onSavedMovie}
                  onNotSavedMovie={props.onNotSavedMovie}
                  currentPage={props.currentPage}
                  />}
            </>}
        </>}

  </>
  )

}

export default Results;

