import success from '../images/ok.svg';
import error from '../images/error.svg';
import iconClose from '../images/close_icon.svg';

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container-infoTooltip">
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

        <img
          className="popup__status"
          src={props.isConfirmStatus ? success : error}
          alt={
            props.isConfirmStatus
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте еще раз'
          }
        />

        <p className="popup__message">
          {props.isConfirmStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
        </p>
      </div>
    </section>
  );
}

export default InfoTooltip;
