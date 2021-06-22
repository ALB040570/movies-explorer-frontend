import './PageNotFound.css';
import {useHistory} from 'react-router-dom';

function PageNotFound(props) {
  const history = useHistory();

  const handleClick=()=>{
    history.goBack();
    props.goBack();
  }

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button
        className="not-found__button"
        type="button"
        onClick={handleClick}>
          Назад
        </button>
    </section>
  );
}

export default PageNotFound;