import './Footer.css';

//презентационный компонент, который отрисовывает подвал
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text"> Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__year">&copy; 2021</p>
        <nav>
          <ul className ="footer__nav">
            <li><a className="footer__link" href = "https://praktikum.yandex.ru"  target="_blank"  rel="noreferrer">Яндекс.Практикум</a></li>
            <li><a className="footer__link" href = "https://github.com/ALB040570/movies-explorer-frontend.git"  target="_blank"  rel="noreferrer">Github</a></li>
            <li><a className="footer__link" href = "https://www.facebook.com/yandex.praktikum/"  target="_blank"  rel="noreferrer">Facebook</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;