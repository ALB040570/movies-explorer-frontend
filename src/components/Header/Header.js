import {useState} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Logo from '../../images/logo.svg';
import Profile from '../../images/profile.svg';
import Menu from '../../images/menu.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

//компонент, который отрисовывает шапку сайта на страницу
function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('jwt');

  const menuOpen = () => setIsMenuOpen(true);
  const menuClose = () => setIsMenuOpen(false);

  return (
    <Switch>
      <Route exact path = '/'>
        <header className="header header_main">
          <Link to="/">
            <img className="logo" src={Logo} alt='логотип'/>
          </Link>
          {!token?<nav>
            <Link to='/signup'>
              <button className="header__button">Регистрация</button>
            </Link>
            <Link to='/signin'>
              <button className="header__button">Войти</button>
            </Link>
          </nav>:
          <nav className="header__bar">
            <div  className={`header__menu ${isMenuOpen && 'header__menu_opened'}`}>
              <Navigation isMenuOpen={isMenuOpen}/>
            </div>
            <div
              className="header__menu-button white-menu-button"
              onClick = {menuOpen}>
                <div className="white-menu-line" />
                <div className="white-menu-line" />
                <div className="white-menu-line" />
            </div>
            {isMenuOpen && <div className="header__overlay"></div>}
            {isMenuOpen &&  <button
              type="button"
              className="header__close-button"
              onClick={menuClose}>
                </button>}
            <Link  className="header__account-text" to='/profile'>
              <div className="header__account header__button_display">
                <p className="header__account-text header__account-text_dark">Аккаунт</p>
                <div className="header__account-icon">
                  <img src={Profile} alt='аккаунт'/>
                </div>
              </div>
            </Link>
          </nav>
          }
        </header>
      </Route>
      <Route exact path = {['/signup', '/signin']}>
        <header className="header-greeting">
          <Link to="/"><img className="logo" src={Logo} alt='логотип'/></Link>
          <p className="greeting">{props.greeting}</p>
        </header>
      </Route>
      <Route path={['/movies', '/saved-movies', '/profile']}>
        <header className='header' >
          <Link  to="/">
            <img className="logo" src={Logo} alt='логотип'/>
          </Link>
          <nav className="header__bar">
            <div  className={`header__menu ${isMenuOpen && 'header__menu_opened'}`}>
              <Navigation isMenuOpen={isMenuOpen}/>
            </div>
            <img className="header__menu-button" src={Menu} alt='кнопка меню' onClick = {menuOpen} />
            {isMenuOpen && <div className="header__overlay"></div>}
            {isMenuOpen &&  <button type="button" className="header__close-button" onClick={menuClose}></button>}
            <Link  className="header__account-text" to='/profile'>
            <div className="header__account header__button_display">
                <p className="header__account-text">Аккаунт</p>
                <div className="header__account-icon">
                  <img src={Profile} alt='аккаунт'/>
                </div>
              </div>
            </Link>
          </nav>
          {/* </div> */}
        </header>
      </Route>
    </Switch>


  );
}

export default Header;