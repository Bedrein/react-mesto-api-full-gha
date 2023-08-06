const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popupTypeEditProfile = page.querySelector('.popup_type_edit-profile');

const btnEditProfile = profile.querySelector('.profile__edit-btn');
const btnEditAvatar = profile.querySelector('.profile__avatar-edit-button');
const formPopupEditProfile = popupTypeEditProfile.querySelector(
  '.popup__form_type_edit-profile'
);

const popupTypeImage = page.querySelector('.popup_type_image');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupTypeAddCard = page.querySelector('.popup_type_add-element');
const btnAddCard = profile.querySelector('.profile__add-btn');
const popup_type_confirm = document.querySelector('.popup_type_confirm');

const formPopupEditAvatar = popupTypeEditAvatar.querySelector(
  '.popup__form_type_edit-avatar'
);
const formPopupAddCard = popupTypeAddCard.querySelector(
  '.popup__form_type_add-element'
);
const cardsContainer = document.querySelector('.elements');
const itemLiistWrapper = cardsContainer.querySelector('.element');
const cardItemTemplate = document.querySelector('#element__item-template');

export {
  formValidationConfig,
  popupTypeEditProfile,
  btnEditProfile,
  formPopupEditProfile,
  popupTypeImage,
  popupTypeAddCard,
  popupTypeEditAvatar,
  popup_type_confirm,
  btnAddCard,
  formPopupAddCard,
  itemLiistWrapper,
  cardItemTemplate,
  btnEditAvatar,
  formPopupEditAvatar,
};
