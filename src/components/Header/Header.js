import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Logo from '../../images/logo.svg';
import Profile from '../../images/profile.svg';
import Menu from '../../images/menu.svg';
// import Navigation from '../Navigation/Navigation';
import './Header.css';

//компонент, который отрисовывает шапку сайта на страницу
function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuOpen = () => setIsMenuOpen(true);
  // const menuClose = () => setIsMenuOpen(false);

  return (
    <Switch>
      <Route exact path = '/'>
        <header className="header header_main">
          <Link to="/">
            <img className="logo" src={Logo} alt='логотип'/>
          </Link>
          <nav>
            <Link to='/signup'>
              <button className="header__button">Регистрация</button>
            </Link>
            <Link to='/signin'>
              <button className="header__button header__button_focus">Войти</button>
            </Link>
          </nav>
        </header>
      </Route>
      <Route exact path = {['/signup', '/signin']}>
        <header className="header header_start">
          <Link to="/"><img src={Logo} alt='логотип'/></Link>
          <p className="greeting">{props.greeting}</p>
        </header>
      </Route>
      <Route path={['/movies', '/saved-movies', '/profile']}>
        <header className='header'>
          <Link to="/">
            <img className="logo" src={Logo} alt='логотип'/>
          </Link>
          <div className="header__bar">
            <nav className="header__menu">
              <Link className="header__menu-link" to='/movies'>Фильмы</Link>
              <Link className="header__menu-link" to='/saved-movies'>Сохраненные фильмы</Link>
            </nav>
            <nav>
              <img className="header__menu-button" src={Menu} alt='кнопка меню' onClick = {menuOpen} />
              <Link to='/profile'>
                <button className="header__button header__button_display"><img src={Profile} alt='аккаунт'/></button>
              </Link>
            </nav>
          </div>
        </header>
      </Route>
    </Switch>


  );
}

export default Header;