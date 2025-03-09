export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", (evt) => handleEscPress(evt, popup));
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", (evt) => handleEscPress(evt, popup));
}

export function handleOutsideClick(evt, popup) {
  if (!evt.target.closest('.popup__content')) {
    closeModal(popup);
  }
}

function handleEscPress(evt, popup) {
  if (evt.key === "Escape") {
      closeModal(popup);
  }
}