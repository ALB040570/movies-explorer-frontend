import Main from '../Main/Main';
import {useState,useEffect} from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import MoviesApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import useFilter from '../../utils/useFilter';



function App() {
  const {filterByKeyword}=useFilter();

  const history = useHistory();

  //Стейты, в которых хранятся
  const[currentUser, setCurrenUser]=useState({name: '', email: '', password: ''});
  const[isRequest, setIsRequest] = useState('');//значение для поиска фильмов
  const[moviesFromServis, setMoviesFromServis]=useState([]);//  фильмы

  const[isError,setIsError]=useState('');//сообщения об ошибке
  const[isFetching,setIsFetching]=useState(true);//флаг о том, что идет загрузка данных


  const[isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);//включить или выключить сообщение
  const[typeInfo, setTypeInfo] = useState(null);//сообщение

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') ?true:null);//авторизован или нет
  const [userData,setUserData] = useState({
    email: ''
    });

  const[savedMovies, setSavedMovies]=useState([]);
  // const[filterFromSavedMovies,setFilterFromSavedMovies]=useState([]);
  const[isRequestInSavedMovies, setIsRequestInSavedMovies] = useState('');//значение для поиска фильмов

  const currentPage={
    1: 'movies',
    2: 'saved-movies'
  }

  //установка текущего пользователя
  useEffect(()=>{
    const token = localStorage.getItem('jwt');
    if (!token) {
      return
    }
    api.setToken(token)
    api.getUsersInfo()
    .then((userInfo) => {
      setCurrenUser(userInfo.data.data);

      })
    .catch((err) => {console.log(err);});
  },[loggedIn,userData]);

  //выход из аккаунта
  const onSignOut =() => {
    setLoggedIn(false);
    setMoviesFromServis([]);
    // filterFromSavedMovies([]);
    setIsRequest('');
    setIsRequestInSavedMovies('');
    localStorage.removeItem('jwt');
    localStorage.removeItem('keyword');
    localStorage.removeItem('keywordForSavedMovies');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    history.push('/');
  }

  //переход на страницу Фильмы
  useEffect(()=>{
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn, history,userData])

  //устанавливает значение фильтра для поиска
  const handleChangeRequest = (keyword) => {
    if (keyword==="") {
    setIsRequest('');
  } else {
    setIsRequest(keyword.toLowerCase());
  }}
  const handleChangeRequestInSavedMovies = (keyword) => {
    if (keyword==="") {
      setIsRequestInSavedMovies('');
  } else {
    setIsRequestInSavedMovies(keyword.toLowerCase());
  }}


   //загружает данные с сервиса beatfilm-movies
  useEffect(()=>{
    const token = localStorage.getItem('jwt');
    if (!token) {
      return
    }
    setIsError('');
    setIsFetching(true);
    isRequest&&MoviesApi()
      .then ((filmsFromServis) => {
        setMoviesFromServis(()=>filmsFromServis);
        setIsFetching(false);
      })
      .catch((err) => {
        setIsError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.log(err);
      });
      },[isRequest]);

  //загружает сохраненные фильмы
  useEffect(()=>{
    const token = localStorage.getItem('jwt');
    if (!token) {
      return
    }
    setIsError('');
    api
      .getSavedMovies()
      .then((savedMoviesFromApi) => {
        setSavedMovies(savedMoviesFromApi.data.data);
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviesFromApi.data.data));
      })
      .catch((err) => {
        setIsError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);});
  }, [isRequestInSavedMovies, loggedIn])



  const onRegister = (name, email, password) =>{
    api
      .register(name, email, password)
      .then((res) => {
        onLogin(email, password);
        setInfoTooltipOpen(false);
        setTypeInfo('');
      })
      .catch((e) => {
        setInfoTooltipOpen(true);
        if (e.data.message === 'celebrate request validation failed') {
          return setTypeInfo(`Ошибка: ${e.data.validation.body.message}`);
        }
        setTypeInfo(`Ошибка: ${e.data.message}`);
      });
  }

  const onLogin = (email, password) => {
    api
      .authorize(email, password)
      .then((res) => {
        if (res.data.token){
          localStorage.setItem('jwt', res.data.token);
          setLoggedIn(true);
          setUserData({email: email})
          setInfoTooltipOpen(false);
          setTypeInfo('');
        }
      })
      .catch((e) => {
        setInfoTooltipOpen(true);
        if (e.data.message === 'celebrate request validation failed') {
          return setTypeInfo(`Ошибка: ${e.data.validation.body.message}`);
        }
        setTypeInfo(`Ошибка: ${e.data.message}`);
      });
  }

  const handleReset=()=>{
    setInfoTooltipOpen(false);
    setTypeInfo('');
  }

  const onEditProfile = (data)=> {
    api
      .patchUsersInfo(data)
      .then((res) => {
        setCurrenUser(res.data.data);
        setInfoTooltipOpen(true);
        setTypeInfo(`Изменения сохранены`);

        })
      .catch((e) => {
        setInfoTooltipOpen(true);
        if (e.data.message === 'celebrate request validation failed') {
          return setTypeInfo(`Ошибка: ${e.data.validation.body.message}`);
        }
        setTypeInfo(`Ошибка: ${e.data.message}`);
      });

  }
  const close=()=>{
    history.push('/movies');
  }

  const handleAddMovie=(data)=> {
    api
      .postMovie(data)
      .then((newMovie) => {
        setSavedMovies(savedMovies=>{
          const films = [newMovie.data.data, ...savedMovies];
          localStorage.setItem('savedMovies', JSON.stringify(films));
          return films;
        });

      })
    .catch((err) => {console.log(err);});
  }


   const handleMoveDelete=(movie) =>{
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteMovie(movie._id)
    .then((newMovie) => {
    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newMovies = savedMovies.filter((m,i,savedMovies) => m._id !== movie._id ? newMovie : false);
      // Обновляем стейт
       setSavedMovies(newMovies);
       localStorage.setItem('savedMovies', JSON.stringify(newMovies));
       return newMovies;
    })
    .catch((err) => {console.log(err);});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <ProtectedRoute path="/movies"
          loggedIn={loggedIn}
          component={Movies}
          onChangeRequest={handleChangeRequest}
          isRequest={isRequest}
          isError={isError}
          onSavedMovie = {handleAddMovie}
          onNotSavedMovie={handleMoveDelete}
          allMovies = {moviesFromServis}
          isFetching={isRequest?isFetching:false}
          currentPage={currentPage[1]}
        />

       <ProtectedRoute path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          onChangeRequest={handleChangeRequestInSavedMovies}
          onNotSavedMovie={handleMoveDelete}
          isRequest={isRequestInSavedMovies}
          currentPage={currentPage[2]}
          savedMovies = {savedMovies}
          isFetching={false}
          isError={isError}
        />

        <Route path="/profile">
          <Profile
            onEditProfile={onEditProfile}
            isInfoTooltipOpen={isInfoTooltipOpen}
            typeInfo={typeInfo}
            reset={handleReset}
            handleLogout = { onSignOut }
            close={close}

            />
        </Route>
        <Route path="/signin">
          <Login onLogin={onLogin}
            data={userData}
            isInfoTooltipOpen={isInfoTooltipOpen}
            typeInfo={typeInfo}
            reset={handleReset}
            />
        </Route>
        <Route path="/signup">
          <Register onRegister = {onRegister}
            isInfoTooltipOpen={isInfoTooltipOpen}
            typeInfo={typeInfo}
            reset={handleReset}
          />
        </Route>
        <Route path='*'>
          <PageNotFound history={history}/>
        </Route>
      </Switch>

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
