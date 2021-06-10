import './Register.css';
import Header from '../Header/Header';
import Form from '../Form/Form';
import useFormValidator from '../Form/useFormValidator';
import {useEffect, useState} from 'react';

function Register(props) {

  const { values, handleChange, errors, isValid, resetForm } = useFormValidator();

  // Стейты, в которых содержатся значения инпутов
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(()=>{
  setData({
    name: values.name,
    email: values.email,
    password: values.password,
      });
  },[values])

  const handleReset = () => {
    resetForm();
    props.reset();
    setData({
      name: '',
      email: '',
      password: '',
  })
  }


  const handleSubmit = (e) =>{
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onRegister(data.name, data.email, data.password);

  }

  return (
    <>
      <Header greeting='Добро пожаловать!'/>
      <Form formType = "input"
            formName = 'register'
            formButton = 'Зарегистрироваться'
            formText = 'Уже зарегистрированы?'
            link = 'signin'
            linkLabel = 'Войти'
            onChange={handleChange}
            isValid={isValid}
            errors={errors}
            values={values}
            reset={handleReset}
            onSubmit={handleSubmit}
            isInfoTooltipOpen={props.isInfoTooltipOpen}
            typeInfo={props.typeInfo}
            data={data}
            >
        <label htmlFor='name' className='form__label'> Имя</label>
        <input type='text'
          className={(!errors.name)?"form__input":"form__input form__input_error"}
          name='name'
          value={data.name||''}
          required
          onChange={handleChange}
          pattern="[A-Za-zА-ЯЁа-яё \-]{2,30}"
          disabled={props.isInfoTooltipOpen}
          />
        <span id='form-name-input-error' className={(!errors.name)?"form__error": "form__error form__error_visible"}>
          Имя должно состоять из более двух и менее 30 символов
        </span>
      </Form>
    </>
  );
}

export default Register;