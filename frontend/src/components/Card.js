import trashIcon from '../images/trash-icon.svg';
import heart from '../images/heart.svg';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button-heart ${
    isLiked && 'element__button-heart_active'
  }`;
  const handleClick = () => {
    onCardClick(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="element__item">
      <img
        src={card.link}
        alt={currentUser.name}
        className="element__image element__image_type_image"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          type="button"
          className="element__button-delete">
          <img src={trashIcon} alt="Урна" className="element__icon-trach" />
        </button>
      )}
      <div className="description">
        <h2 className="element__text">{card.name}</h2>

        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}>
          <img src={heart} alt="Сердце" className="element__icon-heart" />
          <p className="element__number-likes">{card.likes.length}</p>
        </button>
      </div>
    </li>
  );
}

export default Card;
