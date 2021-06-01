import {useState} from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  //переменная состояния для хранения значения поля ввода ключевого слова для поиска фильма
  const[searchInputValue, setSearchInputValue] = useState(props.keyword?props.keyword:JSON.parse(localStorage.getItem('keyword')));
  const searchInput = document.getElementById('keyword');

  //обработчик изменения значения поля ввода ключевого слова
  const handleSetSearchInputValue = (e) =>{
    e.target.id === "keyword"&&setSearchInputValue(e.target.value);
    searchInput.setCustomValidity('');
    searchInput.checkValidity();
  }

  //обработчик события invalid
  const handleSetCustomValidity=()=>{
    if(searchInput.value === '') {
      searchInput.setCustomValidity('Нужно ввести ключевое слово');
    } else {
      searchInput.setCustomValidity('Фраза не должна начинаться с пробела');
    }
  }

  const handleSubmit = (e) =>{
    // действие по умолчанию не должно выполняться так, как обычно
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateSearch(searchInputValue);
    localStorage.setItem('keyword', JSON.stringify(searchInputValue))
  }

  return (
    <section className="main__section main__section_narrowest">
      <form id="search"
        name = "search"
        className="search-form"
        onSubmit = {handleSubmit}>
        <div className="search-form__container">
            <div className="searc-form__input-box">
              <input form="search"
                id="keyword"
                type="text"
                className="search-form__input"
                placeholder= "Фильм"
                pattern="^[^\s]+(\s.*)?$"
                required
                value={searchInputValue}
                onChange={handleSetSearchInputValue}
                onInvalid={handleSetCustomValidity}
                />
              <button type="submit"
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