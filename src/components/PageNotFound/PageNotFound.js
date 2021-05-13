import './PageNotFound.css';

function PageNotFound(props) {
  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button
        className="not-found__button"
        type="button"
        onClick={props.history.goBack}>
          Назад
        </button>
    </section>
  );
}

export default PageNotFound;