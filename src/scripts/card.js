import { toggleLike, deleteCard, CurrentUser } from "./api.js";
import { closeModal } from "./modal.js";

export function createCard(titleCard, imageLink, popupImage, createPopupImage, deleteCardDOM, result) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = titleCard;
  cardElement.querySelector('.card__image').setAttribute('src', imageLink);
  cardElement.querySelector('.card__image').setAttribute('alt', titleCard);
  if (result) {
    cardElement.querySelector('.card-like-score').textContent = result.likes.length;
    
  }
  
  CurrentUser()
  .then((userRes) => {
    if (!userRes.ok) {
      return Promise.reject(`Ошибка: ${userRes.status}`);
    }
    return userRes.json();
  })
  .then((userData) => {
    const currentUserId = userData._id;

    if (result && result.owner._id !== currentUserId) {
      deleteButton.style.display = 'none';
    } else if (result && result._id) {
      deleteButton.dataset.cardId = result._id;
    }
  })
  .catch((err) => {
    console.error("Ошибка при получении данных пользователя:", err);
  });


  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike)

  deleteButton.addEventListener('click', () => {deleteCardDOM(cardElement, result, deleteCard)});

  cardElement.querySelector('.card__image').addEventListener('click', () => createPopupImage(popupImage, titleCard, imageLink));
  return cardElement;
}