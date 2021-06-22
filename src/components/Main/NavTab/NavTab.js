import './NavTab.css';

function NavTab(props) {
  return (
    <section className="main__section navtab">
      <a className="navtab__link" href="#project" onClick={props.onClick}>Узнать больше</a>
    </section>
  );
}

export default NavTab;