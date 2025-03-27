const baseAddres = 'https://nomoreparties.co/v1/wff-cohort-35';
const authoKey = 'b0c32310-1d90-44c0-955e-865e66a9548d';


export function updateLikedCards() {
  Promise.all([
    CurrentUser(),
    fetch(`${baseAddres}/cards`, { headers: { authorization: authoKey } })
  ])
    .then(([userRes, cardsRes]) => {
      if (!userRes.ok || !cardsRes.ok) {
        return Promise.reject(`Ошибка: ${userRes.status}, ${cardsRes.status}`);
      }
      return Promise.all([userRes.json(), cardsRes.json()]);
    })
    .then(([userData, cards]) => {
      console.log(cards);

      cards.forEach(card => {
        const isLikedByUser = card.likes.some(like => like._id === userData._id);

        const likeButton = document.querySelector(`[data-card-id="${card._id}"]`);
        if (likeButton) {
          likeButton.classList.toggle('card__like-button_is-active', isLikedByUser);

          const likeScore = likeButton.closest('.card').querySelector('.card-like-score');
          likeScore.textContent = card.likes.length;
        }
      });
    })
    .catch(err => {
      console.error("Ошибка при загрузке данных:", err);
    });
}

export function toggleLike(evt) {
  const likeButton = evt.target;
  const cardId = likeButton.getAttribute('data-card-id');

  if (!cardId) return;

  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? 'DELETE' : 'PUT';
  likeButton.classList.toggle('card__like-button_is-active');

  fetch(`${baseAddres}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: authoKey
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
      console.error("Ошибка при загрузке данных:", err);
    });
}

export function deleteCard(currentCardId, currentCardElement, cardDelete) {
  if (currentCardId && currentCardElement) {
    return fetch(`${baseAddres}/cards/${currentCardId}`, {
      method: 'DELETE',
      headers: {
        authorization: authoKey
      }
    })
}
}

export function updateAvatar(uploadAvatar, profileImage) {
  const uploadInput = uploadAvatar.querySelector('.popup__input_type_upload-avatar').value;
  fetch(`${baseAddres}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authoKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: uploadInput
    })
  })
  profileImage.style.backgroundImage = `url('${uploadInput}')`;
}

export const addCardFetch = (titleCard, imageLink) => {
  return fetch(`${baseAddres}/cards`, {
    method: 'POST',
    headers: {
      authorization: authoKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: titleCard.value,
      link: imageLink.value
    })
  })
}

export const profileFetch = (titleProfile, aboutProfile) => {
  return fetch(`${baseAddres}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: authoKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: titleProfile,
      about: aboutProfile
    }),
  })
}

export const profileInfoFetch = () => {
  return fetch(`${baseAddres}/users/me`, {
    method: 'GET',
    headers: {
      authorization: authoKey
    }
  })
}

export const CardsGetFetch = () => {
  return fetch(`${baseAddres}/cards`, {
    method: 'GET',
    headers: {
      authorization: authoKey
    }
  })
}

export const CurrentUser = () => {
  return fetch(`${baseAddres}/users/me`, { headers: { authorization: authoKey } })
}