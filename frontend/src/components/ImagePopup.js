import iconClose from '../images/close_icon.svg';

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type-image">
        <button
          type="button"
          onClick={onClose}
          className="popup__button-close popup__button-close_type-image">
          <img
            src={iconClose}
            alt="Крест для закрытия"
            className="popup__icon-close"
          />
        </button>
        <div className="popup__figure">
          <img src={card?.link} alt={card?.name} className="popup__image" />
          <h2 className="popup__title-image">{card?.name}</h2>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;
