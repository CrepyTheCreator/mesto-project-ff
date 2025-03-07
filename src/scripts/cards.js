import { popupImage, popupCardAdd, cardContainer } from "./index.js";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(titleCard, imageLink) { //функция добавления карточек
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = titleCard;
  cardElement.querySelector('.card__image').setAttribute('src', imageLink);
  cardElement.querySelector('.card__image').setAttribute('alt', titleCard);

  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt){
    evt.target.classList.toggle('card__like-button_is-active')
  })

  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard)

  cardElement.querySelector('.card__image').addEventListener('click', function () {
    popupImage.querySelector('.popup__caption').textContent = titleCard;
    popupImage.querySelector('.popup__image').setAttribute('src', imageLink);
    popupImage.classList.add('popup_is-opened');
  })
  return cardElement;
}

function removeCard(evt) {
  const card = evt.target.closest('.card');
  if (card) {
    card.remove();
  }
}

export function cardAdd(evt) { 
  evt.preventDefault();
  const titleCard = popupCardAdd.querySelector('.popup__input_type_card-name');
  const imageLink = popupCardAdd.querySelector('.popup__input_type_url');

  const newCard = createCard(titleCard.value, imageLink.value);
  
  cardContainer.append(newCard);
  titleCard.value = '';
  imageLink.value = '';

  popupCardAdd.classList.remove('popup_is-opened');
}