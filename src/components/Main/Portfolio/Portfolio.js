import './Portfolio.css';

function Portfolio() {
  return (
    <section className="main__section main__section_narrow portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__list-link" href='https://alb040570.github.io/how-to-learn/'
             target='_blank' rel='noreferrer'>Статичный сайт
              <div className='portfolio__list-arrow'></div>
          </a>

        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__list-link" href='https://alb040570.github.io/russian-travel/'
             target='_blank' rel='noreferrer'>Адаптивный сайт
            <div className='portfolio__list-arrow'></div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__list-link" href='https://github.com/ALB040570/react-mesto-api-full'
             target='_blank' rel='noreferrer'>Одностраничное приложение
            <div className='portfolio__list-arrow'></div>
          </a>
        </li>

      </ul>
    </section>

  );
}

export default Portfolio;