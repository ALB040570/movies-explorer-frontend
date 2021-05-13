import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="main__section main__section_narrowest">
      <form className="search-form">
        <div className="search-form__container">
            <div className="searc-form__input-box">
              <input required className="search-form__input" placeholder= "Фильм"/>
              <button className="search-form__button"></button>
            </div>
            <FilterCheckbox display="filter_right"/>
        </div>
        <FilterCheckbox display="filter_bottom"/>
      </form>
    </section>
  );
}

export default SearchForm;