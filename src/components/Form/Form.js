import './Form.css';
import {Link} from 'react-router-dom';


function Form(props) {

  return (
    <>
      <form
        className="form"
        name={props.formName}
        onSubmit={props.onSubmit}
        noValidate
        >
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
                className={(props.formType==="input")?(!props.errors.email)?"form__input":"form__input form__input_error":(!props.errors.email)?"form__input form__input_edit":"form__input form__input_error form__input_edit"}
                name="email"
                value={props.formName === 'register'||props.formName === 'login'?(props.data.email||''):props.inputEmailValue}
                onChange={props.onChange}
                required
                onClick={props.onClick}
                disabled={props.isInfoTooltipOpen}
                />
              <span
                  id={`${props.formName}-form-input-error`}
                  className={(!props.errors.email)?"form__error": (props.formType==="input")?"form__error form__error_visible": "form__error error form__error_visible"}>
                  {props.errors.email}
                </span>
            </div>
            {(props.formType==="input")&&<div className="form__input-container">
              <label
                className="form__label"
                htmlFor="password">
                    Пароль
                  </label>
              <input
                type="password"
                className={(!props.errors.password)?"form__input":"form__input form__input_error"}
                name="password"
                onChange={props.onChange}
                onClick={props.onClick}
                value={props.data.password||''}
                pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
                required
                disabled={props.isInfoTooltipOpen}
                // autocomplete="off"

                />
              <span
                id={`${props.formName}-form-input-error`}
                className={(!props.errors.password)?"form__error": "form__error form__error_visible"}>
                  пароль должен содержать восемь буквенно-цифровых символов, включая прописные буквы и специальные символы
                </span>
            </div>}
          </div>

          <div className="form__input-container">
            <button
              type="submit"
              className={(props.formType==="input")?
                (props.isValid?props.isInfoTooltipOpen?"form__button form__button_disabled form__button_up":"form__button":"form__button form__button_disabled"):
                (props.isValid?props.isInfoTooltipOpen?"form__button form__button_disabled form__button_editup form__button_edit":"form__button form__button_edit":"form__button form__button_disabled form__button_edit")}
              disabled={!props.isValid||props.isInfoTooltipOpen}
              >
                {props.formButton}
              </button>
              {props.isInfoTooltipOpen&&<div className={props.isInfoTooltipOpen?"form__submit-info form__submit-info_visible":"form__submit-info"}>
                <p
                  className="form__infoTooltip"
                  >
                    {props.typeInfo}
                </p>
                <button className="form__infoTooltip form__link" onClick={props.reset}>
                  Попробовать ещё раз
                </button>
                {props.formName === "profile"&&<button className="form__infoTooltip form__link" onClick={props.close}>
                  Закрыть
                </button>}
              </div>}

            {(props.formType==="input")&&<p className="form__text">
              {props.formText}
              <Link to={`/${props.link}`} className="form__link"  onClick={props.reset}>{props.linkLabel}</Link>
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