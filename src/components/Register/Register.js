import './Register.css';
import Header from '../Header/Header';
import Form from '../Form/Form';

function Register() {
  return (
    <>
      <Header greeting='Добро пожаловать!'/>
      <Form formType = "input"
            formName = 'register'
            formButton = 'Зарегистрироваться'
            formText = 'Уже зарегистрированы?'
            link = 'signin'
            linkLabel = 'Войти'>
        <label htmlFor='name' className='form__label'> Имя</label>
        <input type='text' className='form__input' name='name' required/>
        <span id='form-name-input-error' className='form__error'>Что-то пошло не так...</span>
      </Form>
    </>
  );
}

export default Register;