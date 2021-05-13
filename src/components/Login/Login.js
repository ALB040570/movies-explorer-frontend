import './Login.css';
import Header from '../Header/Header';
import Form from '../Form/Form';

function Login() {
  return (
    <>
      <Header greeting="Рады видеть!"/>
      <Form formType = "input"
            formName = "login"
            formButton = "Войти"
            formText = "Ещё не зарегистрированы?"
            link = "signup"
            linkLabel = "Регистрация">
      </Form>
    </>
  );
}

export default Login;