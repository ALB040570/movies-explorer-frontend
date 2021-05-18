import Main from '../Main/Main';
import {useState} from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';


function App() {
  const history = useHistory();
   // Стейты, в которых содержатся значения инпутов
   const [name, setName] = useState('Виталий');
   const [email, setEmail] = useState('pochta@yandex.ru');

   //Обработчик изменения инпута обновляет стейт
   const handleChange = (e) =>{
       e.target.id === "name"? setName(e.target.value): setEmail(e.target.value);
   }

  const handleLogout = () => {
      history.push('/');
    }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        {/* <Route path="/saved-movies">
          <SavedMovies />
        </Route> */}
        <Route path="/profile">
          <Profile name = {name}
                   email = {email}
                   handleLogout = { handleLogout }
                   handleChange = { handleChange }/>
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path='*'>
          <PageNotFound history={history}/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
