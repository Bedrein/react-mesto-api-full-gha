import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleChangeCardName(evt) {
    setName(evt.target.value);
  }

  function handleChangeCardLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="add-element"
      title="Новое место"
      titleBtn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="popup__input-container">
        <input
          id="title-input"
          type="text"
          className="popup__input popup__input_text_title"
          placeholder="Название"
          name="title"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChangeCardName}
          value={name || ''}
        />
        <span id="title-input-error" className="popup__error-input"></span>
        <input
          id="url-input"
          type="url"
          className="popup__input popup__input_link-image"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={link || ''}
          onChange={handleChangeCardLink}
        />
        <span id="url-input-error" className="popup__error-input"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
