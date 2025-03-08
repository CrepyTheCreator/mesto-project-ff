export function editProfile(titleProfile, aboutProfile) {
  document.querySelector('.profile__title').textContent = titleProfile;
  document.querySelector('.profile__description').textContent = aboutProfile;
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

export function createPopupImage(popupImage, titleCard, imageLink) {
  popupImage.querySelector('.popup__caption').textContent = titleCard;
  popupImage.querySelector('.popup__image').setAttribute('src', imageLink);
  popupImage.querySelector('.popup__image').setAttribute('alt', titleCard);
  popupImage.addEventListener('click', (evt) => handleOutsideClick(evt, popupImage));
  openModal(popupImage);
}

export function handleOutsideClick(evt, popup) {
  if (!evt.target.closest('.popup__content')) {
    closeModal(popup);
  }
}