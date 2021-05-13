import './Navigation.css';
import {Link, Route} from 'react-router-dom';
import Profile from '../../images/profile.svg';

function Navigation(props) {

  return (
    <nav className="navigation">
      <ul className="navigation__list">

        {props.isMenuOpen &&
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/">Главная</Link>
          </li> }

        <Route path={'/movies'}>
          <li className="navigation__list-item">
            <Link className="navigation__link navigation__link_active" to="/movies">Фильмы</Link>
          </li>
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/saved-movies">Сохраненные фильмы</Link>
          </li>
          {props.isMenuOpen &&<li className="navigation__list-item_last">
          <Link to='/profile'>
            <button className="navigation__button"><img src={Profile} alt='аккаунт'/></button>
          </Link>
          </li>}
        </Route>

        <Route path={'/saved-movies'}>
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/movies">Фильмы</Link>
          </li>
          <li className="navigation__list-item">
            <Link className="navigation__link navigation__link_active" to="/saved-movies">Сохраненные фильмы</Link>
          </li>
          {props.isMenuOpen &&<li className="navigation__list-item_last">
          <Link to='/profile'>
            <button className="navigation__button"><img src={Profile} alt='аккаунт'/></button>
          </Link>
          </li>}
        </Route>

        <Route path={'/profile'}>
          <li className="navigation__list-item">
            <Link className="navigation__link" to="/movies">Фильмы</Link>
          </li>
          <li className="navigation__list-item">
            <Link className="navigation__link " to="/saved-movies">Сохраненные фильмы</Link>
          </li>
          {props.isMenuOpen &&<li className="navigation__list-item_last">
          <Link to='/profile'>
            <button className="navigation__button navigation__link_active"><img src={Profile} alt='аккаунт'/></button>
          </Link>
          </li>}
        </Route>

      </ul>
    </nav>
  );
}

export default Navigation;
