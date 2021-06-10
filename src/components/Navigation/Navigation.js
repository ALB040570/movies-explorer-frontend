import './Navigation.css';
import {Link, Route} from 'react-router-dom';
import Profile from '../../images/profile.svg';


function Navigation(props) {

  return (
    <nav className="navigation">
      <ul className="navigation__list">



        <Route exact path={'/'}>
        {props.isMenuOpen &&
          <li className="navigation__list-item">
            <Link className="navigation__link navigation__link_active" to="/">Главная</Link>
          </li> }
          <li className="navigation__list-item">
            <Link className={props.isMenuOpen?"navigation__link":"header__button"} to="/movies">Фильмы</Link>
          </li>
          <li className="navigation__list-item">
            <Link className={props.isMenuOpen?"navigation__link":"header__button"}   to="/saved-movies">Сохраненные фильмы</Link>
          </li>
          {props.isMenuOpen &&<li className="navigation__list-item_last">
          <Link  className="header__account-text" to='/profile'>
            <div className="header__account">
              <p className="header__account-text">Аккаунт</p>
              <div className="header__account-icon">
                <img src={Profile} alt='аккаунт'/>
              </div>
            </div>
          </Link>
          </li>}
        </Route>

        <Route path={'/movies'}>
        {props.isMenuOpen &&
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/">Главная</Link>
          </li> }
          <li className="navigation__list-item">
            <Link className="navigation__link navigation__link_active" to="/movies">Фильмы</Link>
          </li>
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/saved-movies">Сохраненные фильмы</Link>
          </li>
          {props.isMenuOpen &&<li className="navigation__list-item_last">
          <Link  className="header__account-text" to='/profile'>
            <div className="header__account">
              <p className="header__account-text">Аккаунт</p>
              <div className="header__account-icon">
                <img src={Profile} alt='аккаунт'/>
              </div>
            </div>
          </Link>
          </li>}
        </Route>

        <Route path={'/saved-movies'}>
        {props.isMenuOpen &&
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/">Главная</Link>
          </li> }
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/movies">Фильмы</Link>
          </li>
          <li className="navigation__list-item">
            <Link className="navigation__link navigation__link_active" to="/saved-movies">Сохраненные фильмы</Link>
          </li>
          {props.isMenuOpen &&<li className="navigation__list-item_last">
          <Link  className="header__account-text" to='/profile'>
            <div className="header__account">
              <p className="header__account-text">Аккаунт</p>
              <div className="header__account-icon">
                <img src={Profile} alt='аккаунт'/>
              </div>
            </div>
          </Link>
          </li>}
        </Route>

        <Route path={'/profile'}>
        {props.isMenuOpen &&
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/">Главная</Link>
          </li> }
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/movies">Фильмы</Link>
          </li>
          <li className="navigation__list-item">
            <Link className="navigation__link " to="/saved-movies">Сохраненные фильмы</Link>
          </li>
          {/* {props.isMenuOpen &&<li className="navigation__list-item_last">
          <Link  className="header__account-text" to='/profile'>
            <div className="header__account">
              <p className="header__account-text">Аккаунт</p>
              <div className="header__account-icon">
                <img src={Profile} alt='аккаунт'/>
              </div>
            </div>
          </Link>
          </li>} */}
        </Route>

      </ul>
    </nav>
  );
}

export default Navigation;
