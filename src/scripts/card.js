export function createCard(titleCard, imageLink, popupImage, createPopupImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = titleCard;
  cardElement.querySelector('.card__image').setAttribute('src', imageLink);
  cardElement.querySelector('.card__image').setAttribute('alt', titleCard);

  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike)

  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard)

  cardElement.querySelector('.card__image').addEventListener('click', () => createPopupImage(popupImage, titleCard, imageLink));
  return cardElement;
}

function removeCard(evt) {
  const card = evt.target.closest('.card');
  if (card) {
    card.remove();
  }
}

function toggleLike(evt){
  evt.target.classList.toggle('card__like-button_is-active')
}