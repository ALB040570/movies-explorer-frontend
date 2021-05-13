import Header from '../Header/Header';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';

//компонент страницы «О проекте»
function Main() {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />{/* компонент с вёрсткой баннера страницы «О проекте»*/}
        <NavTab /> {/* компонент с навигацией по странице «О проекте»*/}
        <AboutProject/> {/* компонент с описанием дипломного проекта*/}
        <Techs /> {/* компонент с использованными технологиями*/}
        <AboutMe /> {/* компонент с информацией о студенте*/}
        <Portfolio /> {/* компонент со ссылками на другие проекты*/}
      </main>
      <Footer />
    </>

  );
}

export default Main;