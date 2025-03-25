import {closeModal} from './modal.js';

export function updateLikedCards() {
  fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', {
    headers: {
      authorization: 'b0c32310-1d90-44c0-955e-865e66a9548d'
    }
  })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(cards => {
      console.log(cards);
      cards.forEach(card => {
        const isLikedByUser = card.likes.some(like => like._id === '012852f1f8cef796afa57ed1');
        
        if (isLikedByUser) {
          const likeButton = document.querySelector(`[data-card-id="${card._id}"]`);
          if (likeButton) {
            likeButton.classList.add('card__like-button_is-active');
            const likeScore = likeButton.closest('.card').querySelector('.card-like-score');
            likeScore.textContent = card.likes.length;
          }
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
}

export function toggleLike(evt) {
  const likeButton = evt.target;
  const cardId = likeButton.getAttribute('data-card-id');

  if (!cardId) return;

  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? 'DELETE' : 'PUT';
  likeButton.classList.toggle('card__like-button_is-active');

  fetch(`https://nomoreparties.co/v1/wff-cohort-35/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: 'b0c32310-1d90-44c0-955e-865e66a9548d'
    }
  })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      const likeScore = likeButton.closest('.card').querySelector('.card-like-score');
      likeScore.textContent = data.likes.length;
    })
    .catch(err => {
      console.error(err);
    });
}

export function deleteCard(currentCardId, currentCardElement, cardDelete) {
  if (currentCardId && currentCardElement) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-35/cards/${currentCardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'b0c32310-1d90-44c0-955e-865e66a9548d'
      }
    })
    .then(res => {
      if (res.ok) {
        currentCardElement.remove();
        currentCardId = null;
        currentCardElement = null;
      } else {
        console.log('Ошибка при удалении карточки:', res.status);
      }
    })
    .catch(err => console.error(err));
  }
  closeModal(cardDelete);
}

export function updateAvatar(uploadAvatar, profileImage) {
  const uploadInput = uploadAvatar.querySelector('.popup__input_type_upload-avatar').value;
  fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'b0c32310-1d90-44c0-955e-865e66a9548d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: uploadInput
    })
  })
  profileImage.style.backgroundImage = `url('${uploadInput}')`;
  closeModal(uploadAvatar);
}