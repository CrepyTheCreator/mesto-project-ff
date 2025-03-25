import {createCard} from './card.js'
import {openModal, closeModal, handleOutsideClick} from './modal.js'
import {enableValidation, clearValidation} from './validation.js'
import { updateLikedCards, updateAvatar } from './api.js';
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
const profileName = container.querySelector('.profile__title');
const profileDescrip = container.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const cardDelete = document.querySelector('.popup_type_delete-card');
const uploadAvatar = document.querySelector('.popup_type_upload-avatar');

popupImage.querySelector('.popup__close').addEventListener('click', closeModal(popupImage))

popupCardAdd.querySelector('.popup__form').addEventListener('submit', submitAddCardForm);

editProfileButton.addEventListener('click', () => {
  titleProfile.value = profileName.textContent;
  aboutProfile.value = profileDescrip.textContent;
  clearValidation(popupEditProfile)
  openModal(popupEditProfile)
});

addCardButton.addEventListener('click', () => {
  clearValidation(popupCardAdd)
  openModal(popupCardAdd)
});
popupCardAdd.querySelector('.popup__close').addEventListener('click', () => {closeModal(popupCardAdd)});
popupCardAdd.addEventListener('click', (evt) => handleOutsideClick(evt, popupCardAdd));

popupEditProfile.querySelector('.popup__close').addEventListener('click', () => closeModal(popupEditProfile));
popupEditProfile.querySelector('.popup__form').addEventListener('submit', editInfoProfile);
popupEditProfile.addEventListener('click', (evt) => handleOutsideClick(evt, popupEditProfile));

popupImage.querySelector('.popup__close').addEventListener('click', () => closeModal(popupImage));
popupImage.addEventListener('click', (evt) => handleOutsideClick(evt, popupImage));
cardDelete.querySelector('.popup__close').addEventListener('click', () => closeModal(cardDelete));
cardDelete.addEventListener('click', (evt) => handleOutsideClick(evt, cardDelete));

document.querySelector('.profile__image').addEventListener('click', () => openModal(uploadAvatar));
uploadAvatar.querySelector('.popup__close').addEventListener('click', () => closeModal(uploadAvatar));
uploadAvatar.addEventListener('click', (evt) => handleOutsideClick(evt, uploadAvatar));
uploadAvatar.querySelector('.avatar-button').addEventListener('click', () => updateAvatar(uploadAvatar, profileImage))


function editInfoProfile(evt) {
  evt.preventDefault();

  const titleProfile = popupEditProfile.querySelector('.popup__input_type_name');
  const aboutProfile = popupEditProfile.querySelector('.popup__input_type_description');

  editProfile(titleProfile.value, aboutProfile.value);
}

function submitAddCardForm(evt) { 
  evt.preventDefault();

  fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', {
    method: 'POST',
    headers: {
      authorization: 'b0c32310-1d90-44c0-955e-865e66a9548d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: titleCard.value,
      link: imageLink.value
    })
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(result => {
    const newCard = createCard(
      result.name,
      result.link,
      popupImage,
      createPopupImage,
      openModal,
      cardDelete,
      result
    );

    cardContainer.prepend(newCard);

    titleCard.value = '';
    imageLink.value = '';

    closeModal(popupCardAdd);
  })
  .catch(err => {
    console.error(err);
  });
}


function editProfile(titleProfile, aboutProfile) {
  const saveButton = popupEditProfile.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'b0c32310-1d90-44c0-955e-865e66a9548d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: titleProfile,
      about: aboutProfile
    }),
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    document.querySelector('.profile__title').textContent = data.name;
    document.querySelector('.profile__description').textContent = data.about;
  })
  .catch(err => {
    console.error(err);
    alert('Произошла ошибка при сохранении данных. Попробуйте снова.');
  })
  .finally(() => {
    closeModal(popupEditProfile);
    saveButton.textContent = 'Сохранить';
  });
}

function createPopupImage(popupImage, titleCard, imageLink) {
  popupImage.querySelector('.popup__caption').textContent = titleCard;
  popupImage.querySelector('.popup__image').setAttribute('src', imageLink);
  popupImage.querySelector('.popup__image').setAttribute('alt', titleCard);
  openModal(popupImage);
}

enableValidation();

//wff-cohort-35
//b0c32310-1d90-44c0-955e-865e66a9548d
function getInfo() {
  fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: 'GET',
    headers: {
      authorization: 'b0c32310-1d90-44c0-955e-865e66a9548d'
    }
  })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileDescrip.textContent = result.about;
      profileImage.style.backgroundImage = `url('${result.avatar}')`;
    }); 
}

function getCards() {
  fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', {
    method: 'GET',
    headers: {
      authorization: 'b0c32310-1d90-44c0-955e-865e66a9548d'
    }
  })
    .then(res => res.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        const newCard = createCard(result[i].name, result[i].link, popupImage, createPopupImage, openModal, cardDelete, result[i]);
        cardContainer.append(newCard);
      }
    }); 
}

addEventListener('DOMContentLoaded', () => {
  getInfo()
  getCards()  
  updateLikedCards()
})