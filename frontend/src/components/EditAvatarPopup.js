import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';
//import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatar = useRef();
  //const currentUser = useContext(CurrentUserContext);

  //пустой инпут
  useEffect(() => {
    inputAvatar.current.value = '';
    console.log(inputAvatar.current.value);
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    // Значение инпута из рефа
    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      titleBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="popup__input-container">
        <input
          id="url-input-avatar"
          type="url"
          className="popup__input popup__input_link-image"
          placeholder="Ссылка на картинку"
          name="link"
          required
          ref={inputAvatar}
        />
        <span id="url-input-avatar-error" className="popup__error-input"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
