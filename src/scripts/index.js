import {initialCards} from './cards.js';
import {createCard, cardAdd} from './card.js'
import {openModal, closeModal, handleOutsideClick} from './modal.js'
import '../pages/index.css'

const container = document.querySelector('.content');
const addCardButton = container.querySelector('.profile__add-button');
const editProfileButton = container.querySelector('.profile__edit-button');
const popupCardAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const cardContainer = container.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const titleProfile = popupEditProfile.querySelector('.popup__input_type_name');
const aboutProfile = popupEditProfile.querySelector('.popup__input_type_description');
const titleCard = popupCardAdd.querySelector('.popup__input_type_card-name'); 
const imageLink = popupCardAdd.querySelector('.popup__input_type_url');

popupImage.querySelector('.popup__close').addEventListener('click', closeModal(popupImage))

document.addEventListener("DOMContentLoaded", function() {
  for (let i = 0; i < initialCards.length; i++) {
    const newCard = createCard(initialCards[i].name, initialCards[i].link, popupImage, createPopupImage);
    cardContainer.append(newCard);
  }
});

popupCardAdd.querySelector('.popup__form').addEventListener('submit', submitAddCardForm);

editProfileButton.addEventListener('click', () => {
  titleProfile.value = container.querySelector('.profile__title').textContent;
  aboutProfile.value = container.querySelector('.profile__description').textContent;
  openModal(popupEditProfile)
});

addCardButton.addEventListener('click', () => openModal(popupCardAdd));
popupCardAdd.querySelector('.popup__close').addEventListener('click', () => {closeModal(popupCardAdd)});
popupCardAdd.addEventListener('click', (evt) => handleOutsideClick(evt, popupCardAdd));

popupEditProfile.querySelector('.popup__close').addEventListener('click', () => closeModal(popupEditProfile));
popupEditProfile.querySelector('.popup__form').addEventListener('submit', editInfoProfile);
popupEditProfile.addEventListener('click', (evt) => handleOutsideClick(evt, popupEditProfile));

popupImage.querySelector('.popup__close').addEventListener('click', () => closeModal(popupImage));
popupImage.addEventListener('click', (evt) => handleOutsideClick(evt, popupImage));

function editInfoProfile(evt) {
  evt.preventDefault();
  
  const titleProfile = popupEditProfile.querySelector('.popup__input_type_name');
  const aboutProfile = popupEditProfile.querySelector('.popup__input_type_description');

  editProfile(titleProfile.value, aboutProfile.value);

  closeModal(popupEditProfile);
}

function submitAddCardForm(evt) { 
  evt.preventDefault();

  const newCard = createCard(titleCard.value, imageLink.value, popupImage, createPopupImage);
  
  cardContainer.prepend(newCard);
  titleCard.value = '';
  imageLink.value = '';

  closeModal(popupCardAdd);
}

function editProfile(titleProfile, aboutProfile) {
  document.querySelector('.profile__title').textContent = titleProfile;
  document.querySelector('.profile__description').textContent = aboutProfile;
}

function createPopupImage(popupImage, titleCard, imageLink) {
  popupImage.querySelector('.popup__caption').textContent = titleCard;
  popupImage.querySelector('.popup__image').setAttribute('src', imageLink);
  popupImage.querySelector('.popup__image').setAttribute('alt', titleCard);
  openModal(popupImage);
}