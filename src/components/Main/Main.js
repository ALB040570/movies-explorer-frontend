import Header from '../Header/Header';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import { useState } from 'react';

//компонент страницы «О проекте»
function Main() {
  const [height, setHeight] = useState(0);
  const onButtonClick = () => {
    window.scrollTo(0,height)
  };
  const element = (e)=>{
    setHeight(e.getBoundingClientRect().top)
  }
  
  return (
    <>
      <Header />
      <main className="main">
        <Promo />{/* компонент с вёрсткой баннера страницы «О проекте»*/}
        <NavTab onClick={onButtonClick}/> {/* компонент с навигацией по странице «О проекте»*/}
        <AboutProject element={element}/> {/* компонент с описанием дипломного проекта*/}
        <Techs /> {/* компонент с использованными технологиями*/}
        <AboutMe /> {/* компонент с информацией о студенте*/}
        <Portfolio /> {/* компонент со ссылками на другие проекты*/}
      </main>
      <Footer />
    </>

  );
}

export default Main;