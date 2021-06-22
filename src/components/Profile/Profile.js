import './Profile.css';
import Header from '../Header/Header';
import Form from '../Form/Form';
import useFormValidator from '../Form/useFormValidator';
import {useEffect, useState, useContext} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Profile(props) {
   // Подписка на контекст
   const currentUser = useContext(CurrentUserContext);
  // Стейты, в которых содержатся значения инпутов
  const [data, setData] = useState({
    name: currentUser.name,
    email: currentUser.email,
      });
  const { values, handleChange, errors, isValid, resetForm, name, email} = useFormValidator();


  useEffect(()=>{
    const isChangeName = !name?currentUser.name:name;

    const isChangeEmail = !email?currentUser.email:email;
  setData({
    name: isChangeName,
    email: isChangeEmail
  })
  }
  ,[currentUser.email, currentUser.name, email, name])



  const handleReset = () => {
    resetForm();
    props.reset();
    setData({
      name: currentUser.name,
      email: currentUser.email,

  })
  }

  const handleSubmit = (e) =>{
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик

    props.onEditProfile(data);
  }

  const logout = ()=>{
    props.handleLogout();
    props.reset();
  }

  const handleSelect =(e) => {
    e.target.select();
  }

  const close = () =>{
    props.reset();
    props.close();
  }

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <Form
          formType = "edit"
          formName = "profile"
          inputEmailValue = {data.email}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClick={handleSelect}
          isValid={isValid}
          errors={errors}
          values={values}
          reset={handleReset}
          formButton = "Редактировать"
          logout = {logout}
          exit = "Выйти из аккаунта"
          close={close}
          isInfoTooltipOpen={props.isInfoTooltipOpen}
          typeInfo={props.typeInfo}
          >


          <label
            htmlFor="name"
            className="form__label form__label_edit">
              Имя
            </label>
          <input
            type="text"
            id="name"
            className={(!errors.name)?"form__input form__input_edit":"form__input form__input_error  form__input_edit"}
            name="name"
            value={data.name}
            onChange={handleChange}
            onClick={handleSelect}
            pattern="[A-Za-zА-ЯЁа-яё \-]{2,30}"
            required
            disabled={props.isInfoTooltipOpen}
          />
          <span id='form-name-input-error' className={(!errors.name)?"form__error ": "form__error error form__error_visible"}>
            Имя должно состоять из более двух и менее 30 символов
          </span>
        </Form>
      </section>
    </>
  );
}

export default Profile;