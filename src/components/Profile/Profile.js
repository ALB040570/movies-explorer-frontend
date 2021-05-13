import './Profile.css';
import Header from '../Header/Header';
import Form from '../Form/Form';

function Profile(props) {

  return (
    <>
      <Header/>
      <section className="profile">
        <h2 className="profile__title">Привет, {props.name}!</h2>
        <Form
          formType = "edit"
          formName = "profile"
          inputNameValue = {props.name}
          inputEmailValue = {props.email}
          onChange = {props.handleChange}
          formButton = "Редактировать"
          logout = {props.handleLogout}
          exit = "Выйти из аккаунта">
          <label
            htmlFor="name"
            className="form__label form__label_edit">
              Имя
            </label>
          <input
            type="text"
            id="name"
            className="form__input form__input_edit"
            name="name"
            value={props.name}
            onChange={props.handleChange}
            required
          />
        </Form>
      </section>
    </>
  );
}

export default Profile;