import './FilterCheckbox.css';

function FilterCheckbox(props) {

  return (
    <div className={`filter ${props.display}`}>
      <div className={`filter__button ${props.isCheckFilterClicked && 'filter__button_clicked'}`}>
        <input type='checkbox' className='filter__checkbox' onClick={props.onCheckFilterClick}></input>
      </div>
      <p className='filter__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;