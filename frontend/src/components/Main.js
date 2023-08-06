import editButton from '../images/edit-button.svg';
import plusButton from '../images/add-button.svg';
import Card from './Card';
// import iconClose from '../images/close_icon.svg';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      {/*--------------Profile--------------------------*/}
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <button
              className="profile__avatar-edit-button"
              onClick={onEditAvatar}
              type="button">
              <img
                src={currentUser.avatar}
                alt="Аватар"
                className="profile__avatar"
              />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__about">{currentUser.about}</p>
            </div>
            <button
              className="profile__edit-btn"
              onClick={onEditProfile}
              type="button">
              <img
                src={editButton}
                alt="Карандаш"
                className="profile__image-edit-btn"
              />
            </button>
          </div>
        </div>
        <button className="profile__add-btn" onClick={onAddPlace} type="button">
          <img src={plusButton} alt="Плюс" className="profile__image-add-btn" />
        </button>
      </section>
      {/*--------------Elements--------------------------*/}
      <section className="elements">
        <ul className="element">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
