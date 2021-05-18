import {useState} from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  const[searchInputValue, setSearchInputValue] = useState('');

  const handleChange = (e) =>{
    e.target.id === "keyword"&&setSearchInputValue(e.target.value);
  }

  const handleSubmit = (e) =>{
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateSearch(searchInputValue);
    // document.getElementById('keyword').checkValidity();
    // console.log(e.target.value);
 // Если в поле не введён текст, выводится ошибка «Нужно ввести ключевое слово»
    // if (searchInputValue===''||null) {
    //   console.error();
    //   document.getElementById('keyword').setCustomValidity("Нужно ввести ключевое слово");
    // } else {
    //   document.getElementById('keyword').setCustomValidity("");
    // }

}


  return (
    <section className="main__section main__section_narrowest">
      <form id="search"
        name = "search"
        className="search-form"
        onSubmit = {handleSubmit}>
        <div className="search-form__container">
            <div className="searc-form__input-box">
              <input
                form="search"
                id="keyword"
                type="text"
                className="search-form__input"
                placeholder= "Фильм"
                onChange={handleChange}
                pattern="^[^\s]+(\s.*)?$"
                value={searchInputValue}

                />
              <button
                type="submit"
                className="search-form__button">

                </button>
            </div>
            <FilterCheckbox display="filter_right"/>
        </div>
        <FilterCheckbox display="filter_bottom"/>
      </form>
    </section>
  );
}

export default SearchForm;