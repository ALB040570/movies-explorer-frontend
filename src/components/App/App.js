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



function App() {

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
  const [isCheckFilterClicked, setIsCheckFilterClicked] = useState(localStorage.getItem('isCheck')?JSON.parse(localStorage.getItem('isCheck')):false);
  const [isCheckFilterClickedInSavedMovies, setIsCheckFilterClickedInSavedMovies] = useState(localStorage.getItem('isCheckInSavedMovies')?JSON.parse(localStorage.getItem('isCheckInSavedMovies')):false);

  const currentPage={
    1: 'movies',
    2: 'saved-movies'
  }

  const currenPathname = window.location.pathname;

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
  //очистка хранилища и полей поиска
  const clean =() => {
    setMoviesFromServis([]);
    // filterFromSavedMovies([]);
    setIsRequest('');
    setIsRequestInSavedMovies('');
    setIsCheckFilterClicked(false);
    setIsCheckFilterClickedInSavedMovies(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('keyword');
    localStorage.removeItem('keywordForSavedMovies');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('filterFromSavedMovies');
    localStorage.removeItem('isCheck');
    localStorage.removeItem('isCheckInSavedMovies');
  }
  //выход из аккаунта
  const onSignOut =() => {
    setLoggedIn(false);
    clean();
    history.push('/');
  }

  //переход на страницу при авториизации
  useEffect(()=>{

    if (loggedIn) {
      if ((currenPathname==='/signin')||(currenPathname==='/signup')) {
        return  history.push('/movies');
      }
      return history.push(currenPathname);
    }
  }, [loggedIn, history, userData, currenPathname])

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

  const onCheckFilterClick = () => {
    if (isCheckFilterClicked === false) {
      setIsCheckFilterClicked(true);
      localStorage.setItem('isCheck',JSON.stringify(true));
      setIsRequest(localStorage.getItem('keyword')?JSON.parse(localStorage.getItem('keyword')).toLowerCase():'')

    } else {
      setIsCheckFilterClicked(false);
      localStorage.setItem('isCheck',JSON.stringify(false));
      setIsRequest(localStorage.getItem('keyword')?JSON.parse(localStorage.getItem('keyword')).toLowerCase():'')
    }
  }

  const onCheckFilterClickInSavedMovies = () => {
    if (isCheckFilterClickedInSavedMovies === false) {
      setIsCheckFilterClickedInSavedMovies(true);
      localStorage.setItem('isCheckInSavedMovies',JSON.stringify(true));
      setIsRequestInSavedMovies(JSON.parse(localStorage.getItem('keywordForSavedMovies')).toLowerCase())

    } else {
      setIsCheckFilterClickedInSavedMovies(false);
      localStorage.setItem('isCheckInSavedMovies',JSON.stringify(false));
      setIsRequestInSavedMovies(JSON.parse(localStorage.getItem('keywordForSavedMovies')).toLowerCase())
    }
  }
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
        setMoviesFromServis(filmsFromServis);
        setIsFetching(false);

      })
      .catch((err) => {
        setIsError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.log(err);
      });
      },[isRequest]);

  //загружает сохраненные фильмы
  const loadSavedMovies=()=>{
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
  }
  useEffect(()=>{
    loadSavedMovies();
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
          clean();
          localStorage.setItem('jwt', res.data.token);
          setLoggedIn(true);
          setUserData({email: email});
          setInfoTooltipOpen(false);
          setTypeInfo('');
          loadSavedMovies();
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
          isFetching={isFetching}
          currentPage={currentPage[1]}
          onCheckFilterClick={onCheckFilterClick}
          isCheckFilterClicked={isCheckFilterClicked}
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
          onCheckFilterClick={onCheckFilterClickInSavedMovies}
          isCheckFilterClicked={isCheckFilterClickedInSavedMovies}
        />

        <ProtectedRoute path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onEditProfile={onEditProfile}
            isInfoTooltipOpen={isInfoTooltipOpen}
            typeInfo={typeInfo}
            reset={handleReset}
            handleLogout = { onSignOut }
            close={close}

            />

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
          <PageNotFound goBack={()=>history.goBack()}/>
        </Route>
      </Switch>

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
