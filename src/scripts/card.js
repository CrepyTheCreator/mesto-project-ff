import { toggleLike, deleteCard } from "./api.js";

export function createCard(titleCard, imageLink, popupImage, createPopupImage, openModal, cardDelete, result) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = titleCard;
  cardElement.querySelector('.card__image').setAttribute('src', imageLink);
  cardElement.querySelector('.card__image').setAttribute('alt', titleCard);
  if (result) {
    cardElement.querySelector('.card-like-score').textContent = result.likes.length;
    
  }

  if (result && result.owner._id !== "012852f1f8cef796afa57ed1") {
    cardElement.querySelector('.card__delete-button').style.display = 'none';
    cardElement.querySelector('.card__like-button').dataset.cardId = result._id;
  }else if (result && result._id) {
    cardElement.querySelector('.card__delete-button').dataset.cardId = result._id;
  }

  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike)

  deleteButton.addEventListener('click', () => {
    const currentCardId = result._id;
    const currentCardElement = cardElement;
    openModal(cardDelete);          
    document.querySelector('.delete-button').addEventListener('click', () => deleteCard(currentCardId, currentCardElement, cardDelete));
  });

  cardElement.querySelector('.card__image').addEventListener('click', () => createPopupImage(popupImage, titleCard, imageLink));
  return cardElement;
}