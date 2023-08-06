import iconClose from '../images/close_icon.svg';

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          type="button"
          className="popup__button-close"
          onClick={props.onClose}>
          <img
            src={iconClose}
            alt="Крест для закрытия"
            className="popup__icon-close"
          />
        </button>

        <h2 className={`popup__heading popup__heading_type-${props.name}`}>
          {props.title}
        </h2>
        <form
          action="#"
          name={`form-${props.name}`}
          method="post"
          className={`popup__form popup__form_type_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}>
          {props.children}
          <div className="popup__button-container">
            <button type="submit" className="popup__button">
              {props.titleBtn}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
