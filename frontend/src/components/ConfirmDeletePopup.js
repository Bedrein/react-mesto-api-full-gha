import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmDeletePopup({ isOpen, onClose, card, onSubmitDelete }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitDelete(card);
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      titleBtn="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmDeletePopup;
