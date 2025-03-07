import {createCard, cardAdd, initialCards} from './cards.js';
import {editInfoProfile, openModal, closeModal} from './modal.js'

export const container = document.querySelector('.content');
const addCardButton = container.querySelector('.profile__add-button');
const editProfileButton = container.querySelector('.profile__edit-button');
export const popupCardAdd = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
export const cardContainer = container.querySelector('.places__list');
export const popupEdit = document.querySelector('.popup_type_edit');
const titleProfile = popupEdit.querySelector('.popup__input_type_name');
const aboutProfile = popupEdit.querySelector('.popup__input_type_description');
const currentTitle = container.querySelector('.profile__title').textContent;
const currentAbout = container.querySelector('.profile__description').textContent;

popupImage.querySelector('.popup__close').addEventListener('click', function () {
  popupImage.classList.remove('popup_is-opened');
})
document.addEventListener("DOMContentLoaded", function() {
  for (let i = 0; i < initialCards.length; i++) {
    const newCard = createCard(initialCards[i].name, initialCards[i].link);
    cardContainer.append(newCard);
  }
});

addCardButton.addEventListener('click', () => openModal(popupCardAdd));

popupCardAdd.querySelector('.popup__close').addEventListener('click', () => {closeModal(popupCardAdd)});

popupCardAdd.querySelector('.popup__form').addEventListener('submit', cardAdd);

editProfileButton.addEventListener('click', () => {
  titleProfile.value = currentTitle;
  aboutProfile.value = currentAbout;
  openModal(popupEdit)
});

popupEdit.querySelector('.popup__close').addEventListener('click', () => closeModal(popupEdit));

popupEdit.querySelector('.popup__form').addEventListener('submit', editInfoProfile);