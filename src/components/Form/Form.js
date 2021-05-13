import './Form.css';
import {Link} from 'react-router-dom';
import React from 'react';

function Form(props) {
  return (
    <>
      <form
        className="form"
        name={props.formName}
        noValidate>
        <fieldset className="form__fieldset">
          <div className={(props.formType==="input")?"form__children":"form__children form__children_edit"}>
            <div className={(props.formType==="input")?"form__input-container":"form__edit-container"}>
              {props.children}
            </div>
            <div className={(props.formType==="input")?"form__input-container":"form__edit-container form__edit-container_last"}>
              <label
                className={(props.formType==="input")?"form__label": "form__label form__label_edit"}
                htmlFor="email">
                  E-mail
                </label>
              <input
                type="email"
                className={(props.formType==="input")?"form__input":"form__input form__input_edit"}
                name="email"
                value={props.inputEmailValue}
                onChange={props.onChange}
                required
                />
              {(props.formType==="input")&&<span
                  id={`${props.formName}-form-input-error`}
                  className="form__error">
                    Что-то пошло не так...
                  </span>}
            </div>
            {(props.formType==="input")&&<div className="form__input-container">
              <label
                className="form__label"
                htmlFor="password">
                    Пароль
                  </label>
              <input
                type="password"
                className="form__input form__input_error"
                name="password"
                required
                />
              <span
                id={`${props.formName}-form-input-error`}
                className="form__error form__error_visible">
                  Что-то пошло не так...
                </span>
            </div>}
          </div>

          <div className="form__input-container">
            <button type="submit" className={(props.formType==="input")?"form__button":"form__button form__button_edit"}>
              {props.formButton}
              </button>
            {(props.formType==="input")&&<p className="form__text">
              {props.formText}
              <Link to={`/${props.link}`} className="form__link">{props.linkLabel}</Link>
            </p>}
            {(props.formType==="edit")&&<button className="form__button form__button_edit form__button_exit" onClick={props.logout}>
              Выйти из аккаунта
              </button>}
          </div>
        </fieldset>
      </form>
    </>
);
}

export default Form;