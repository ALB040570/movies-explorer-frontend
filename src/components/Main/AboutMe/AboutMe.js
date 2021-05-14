import Photo from '../../../images/photo-min.png';
import './AboutMe.css';

function AboutMe() {
  return (
      <section className="main__section main__section_narrow about-me" >
        <h2 className="main__section-title main__section-title_narrow">Студент</h2>
        <div className="about-me__grid">
          <div className="about-me__conteiner">
            <h1 className="about-me__title">Виталий</h1>
            <p className="about-me__discription">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <ul className="about-me__list">
              <li><a className="about-me__link" href = "https://www.facebook.com"  target="_blank"  rel="noreferrer">Facebook</a></li>
              <li><a className="about-me__link" href = "https://github.com"  target="_blank"  rel="noreferrer">Github</a></li>
            </ul>
          </div>
          <img  className="about-me__photo" src={Photo} alt='Фото студента'/>
        </div>
      </section>
  );
}

export default AboutMe;