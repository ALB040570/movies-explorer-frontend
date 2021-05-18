import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {useState, useEffect} from 'react';
import MoviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';


//компонент страницы с поиском по фильмам
function Movies() {
  //переменные состояния
  const[movies, setMovies]=useState([]);//для хранения всех фильмов
  const[selectMovies,setSelectMovies]=useState([]);//для хранения фильмов, найденных по фильтру
  const[isRequest, setIsRequest] = useState('');//для хранения значения для поиска фильмов
  const[isError,setIsError]=useState('');//для хранения сообщения об ошибке
  const[isLoad, setIsLoad]=useState(true);//для задержки прелодера


  //устанавливает значение фильтра для поиска
  const changeRequest = (keyword) => {
    if (keyword==="") {
    setIsRequest('');
  } else {
    setIsRequest(keyword.toLowerCase());
  }}

  //загружает данные с сервера
  useEffect(()=>{
    setIsError('');
    MoviesApi()
      .then ((moviesFromServer) => {
        setMovies(moviesFromServer)
      })
      .catch((err) => {
        setIsError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.log(err);
      });
      },[]);

  //сохраняет найденные по ключевому слову фильмы

  useEffect(()=>{

    if (isRequest) {
      const filter = movies.filter(function (movie) {
        return movie.nameRU.toLowerCase().includes(isRequest);
      });
      setSelectMovies(filter);
      console.log(filter);
      setTimeout(() => {
        setIsLoad(false);
      }, 1000);
      return () => clearTimeout();
    }

  },[isRequest, movies])


  return (
    <>
      <Header />
      <main className="main">
        <SearchForm onUpdateSearch={changeRequest}/>
        {isRequest&&
          <div>
            {isError?
              <p>{isError}</p>:
              <div>
                {isLoad?
                  <Preloader />:
                  <div>
                    {
                    selectMovies.length===0?
                      <p>Ничего не найдено</p>:
                      <MoviesCardList class="movies" movies={selectMovies}/>}
                  </div>}
              </div>}
          </div>}


      </main>
      <Footer />
    </>

  );
}

export default Movies;
