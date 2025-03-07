import { popupEdit, container } from "./index.js";

export function editInfoProfile(evt) {
  evt.preventDefault();
  
  const titleProfile = popupEdit.querySelector('.popup__input_type_name');
  const aboutProfile = popupEdit.querySelector('.popup__input_type_description');

  editProfile(titleProfile.value, aboutProfile.value);

  titleProfile.value = '';
  aboutProfile.value = '';

  popupEdit.classList.remove('popup_is-opened');
}

function editProfile(titleProfile, aboutProfile) {
  container.querySelector('.profile__title').textContent = titleProfile;
  container.querySelector('.profile__description').textContent = aboutProfile;
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}