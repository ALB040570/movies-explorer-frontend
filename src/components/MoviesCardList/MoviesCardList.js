import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import { useState, useRef } from 'react';

function MoviesCardList(props) {
  const[countInPage,setCountInPage]=useState(12);
  const[countinRow, setCountInRow] = useState(3)
  const[startArray, setStartArray] = useState(0);
  const[endArray, setEndArray] = useState(countinRow);
  const[contClick, setCountClik] = useState(0);
  const contentUl = useRef(null);

  const handleClick = () => {
    setCountClik(contClick + 1);
    setEndArray(countinRow*(contClick + 2));
    setStartArray(0)
    endArray>countInPage&&contentUl.current.scrollIntoView(false);
    }




  return (
      <section className="main__section main__section_narrowest">
          <ul ref={contentUl} className={`movies-list movies-list_${props.class}  ${endArray>countInPage&&"movies-list_scroll"}`}>
        {
           props.movies.slice(startArray,endArray).map((movie, index) => (

              <MoviesCard key={movie.id} movie = {movie}/>

           ) )
        }

      </ul>
      {props.movies.length>endArray&&
        <button
          type="button"
          className={`additional-button additional-button_${props.class}`}
          onClick={handleClick}
          >
          Ещё
        </button>}
    </section>
);
}

export default MoviesCardList;