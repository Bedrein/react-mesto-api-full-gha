import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api.js';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth';

import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

function App() {
  //Открытие popupProfile если true
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //Открытие popupPlace если true

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  //Открытие popupAvatar если true
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] =
    useState(false);

  //Выбор конкретной карточки для открытия картинки
  const [selectedCard, setSelectedCard] = useState(null);
  const [removeCard, setRemoveCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()

      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // обработчик авторизации пользователя
  function handleLogin(data) {
    return auth
      .login(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** обработчик регистрации пользователя */
  function handleRegister(data) {
    return auth
      .register(data)
      .then((res) => {
        console.log('boom');
        setIsSuccessInfoTooltipStatus(true);
        handleInfoTooltipClick();
        navigate('/sign-in');
      })
      .catch((err) => {
        setIsSuccessInfoTooltipStatus(false);
        handleInfoTooltipClick(false);
      });
  }

  // обработчик проверки пользователя в localStorage
  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(({ data }) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  // Обработчик выхода пользователя
  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

  //обработчик булевого изменения открытия PopupnfoTooltip
  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function handleUpdateUser(data) {
    api
      .patchProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .putlikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //del
  function handleConfirmDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setRemoveCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setRemoveCard(null);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmDeleteClick}
                cards={cards}
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
        </Routes>
        <Footer />
        {/*--------------Popup-edit-Profile------------------------*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/*--------------Popup-Add-Element------------------------*/}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/*--------------Popup-delete------------------------*/}
        <PopupWithForm name="confirm" title="Вы уверены?" titleBtn="Да" />
        {/*--------------Popup-edit-avatar-----------------------*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          card={removeCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isConfirmStatus={isSuccessInfoTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
