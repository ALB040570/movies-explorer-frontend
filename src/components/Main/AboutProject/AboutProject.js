import React from 'react';
import './AboutProject.css';




function AboutProject() {
  return (
      <section className="main__section project">
        <h2 className="main__section-title">О проекте</h2>
        <ul className="project__cards">
          <li>
            <h3 className="project__cards-title">Дипломный проект включал 5 этапов</h3>
            <p className="project__cards-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li>
            <h3 className="project__cards-title">На выполнение диплома ушло 5 недель</h3>
            <p className="project__cards-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className="project__timebar">
          <li>
            <p className="project__timebar-text project__timebar-text_activ">1 неделя</p>
            <h3 className="project__timebar-title">Back-end</h3>
          </li>
          <li>
            <p className="project__timebar-text">4 недели</p>
            <h3 className="project__timebar-title">Front-end</h3>
          </li>
        </ul>
      </section>

  );
}

export default AboutProject;