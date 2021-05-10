import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <section className="main__section promo">
      <div className="promo__conteiner">
        <h1 className="promo__title">Учебный проект студента факультета <br className="br" />Веб-разработки.</h1>
        <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
        <div className="promo__logo"></div>
    </section>
  );
}

export default Promo;