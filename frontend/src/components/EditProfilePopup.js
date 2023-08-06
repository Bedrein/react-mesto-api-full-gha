import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeUserName(evt) {
    setName(evt.target.value);
  }

  function handleChangeUserDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      titleBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="popup__input-container">
        <input
          id="name-input"
          type="text"
          className="popup__input popup__input_text_name"
          placeholder="Имя"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleChangeUserName}
        />
        <span id="name-input-error" className="popup__error-input"></span>
        <input
          id="about-input"
          type="text"
          className="popup__input popup__input_text_about"
          placeholder="О себе"
          name="about"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleChangeUserDescription}
        />
        <span id="about-input-error" className="popup__error-input"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
