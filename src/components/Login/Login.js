import './Login.css';
import Header from '../Header/Header';
import Form from '../Form/Form';
import useFormValidator from '../Form/useFormValidator';
import {useEffect, useState} from 'react';

function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidator();

  // Стейты, в которых содержатся значения инпутов
  const [data, setData] = useState({
    email: props.data.email,
    password:''
  });

  useEffect(()=>{
  setData({
    email: values.email,
    password: values.password,
      });
  },[values])

  const handleReset = () => {
    
    props.reset();
    resetForm();
    setData({
      email: '',
      password: '',
  })
  }


  const handleSubmit = (e) =>{
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onLogin(data.email, data.password);

  }
  return (
    <>
      <Header greeting="Рады видеть!"/>
      <Form formType = "input"
            formName = "login"
            formButton = "Войти"
            formText = "Ещё не зарегистрированы?"
            link = "signup"
            linkLabel = "Регистрация"
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
      </Form>
    </>
  );
}

export default Login;