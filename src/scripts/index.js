import {createCard} from './card.js'
import {openModal, closeModal, handleOutsideClick} from './modal.js'
import {enableValidation, clearValidation, validationConfig} from './validation.js'
import {updateLikedCards, updateAvatar, addCardFetch, profileFetch, profileInfoFetch, CardsGetFetch} from './api.js';
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
  clearValidation(popupEditProfile, validationConfig)
  openModal(popupEditProfile)
});

addCardButton.addEventListener('click', () => {
  clearValidation(popupCardAdd, validationConfig)
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
uploadAvatar.addEventListener('submit', () => {
  updateAvatar(uploadAvatar, profileImage)
  closeModal(uploadAvatar);
})


function editInfoProfile(evt) {
  evt.preventDefault();

  const titleProfile = popupEditProfile.querySelector('.popup__input_type_name');
  const aboutProfile = popupEditProfile.querySelector('.popup__input_type_description');

  editProfile(titleProfile.value, aboutProfile.value);
}

function submitAddCardForm(evt) { 
  evt.preventDefault();
  const saveButton = popupCardAdd.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  addCardFetch(titleCard, imageLink)
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
      deleteCardDOM,
      result
    );

    cardContainer.prepend(newCard);

    titleCard.value = '';
    imageLink.value = '';
  })
  .finally(() => {
    closeModal(popupCardAdd);
    saveButton.textContent = 'Сохранить';
  })
  .catch(err => {
    console.error(err);
  });
  
}

function deleteCardDOM(cardElement, result, deleteCard) {
  const currentCardId = result._id;
    const currentCardElement = cardElement;
    openModal(cardDelete);          
    document.querySelector("#delete-card-form").addEventListener('submit', () => {
      deleteCard(currentCardId, currentCardElement, cardDelete)
      .then(res => {
        if (res.ok) {
          currentCardElement.remove();
        } else {
          console.log('Ошибка при удалении карточки:', res.status);
        }
      })
      .catch(err => {
        console.error("Ошибка при загрузке данных:", err);
      });
      closeModal(cardDelete);
    });
}


function editProfile(titleProfile, aboutProfile) {
  const saveButton = popupEditProfile.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  profileFetch(titleProfile, aboutProfile)
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    profileName.textContent = data.name;
    profileDescrip.textContent = data.about;
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

enableValidation(validationConfig);
//wff-cohort-35
//b0c32310-1d90-44c0-955e-865e66a9548d
addEventListener('DOMContentLoaded', () => {
  Promise.all([profileInfoFetch(), CardsGetFetch()])
    .then(([profileRes, cardsRes]) => Promise.all([profileRes.json(), cardsRes.json()]))
    .then(([profileData, cardsData]) => {
      profileName.textContent = profileData.name;
      profileDescrip.textContent = profileData.about;
      profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
      cardsData.forEach(card => {
        const newCard = createCard(
          card.name, 
          card.link, 
          popupImage, 
          createPopupImage, 
          deleteCardDOM,
          card
        );
        cardContainer.append(newCard);
      });
      updateLikedCards();
    })
    .catch(err => {
      console.error("Ошибка при загрузке данных:", err);
    });
});