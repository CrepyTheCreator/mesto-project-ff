const baseAddres = 'https://nomoreparties.co/v1/wff-cohort-35';
const authoKey = 'b0c32310-1d90-44c0-955e-865e66a9548d';

const servCheck = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export function toggleLike(cardId, method) {
  return fetch(`${baseAddres}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: authoKey
    }
  })
    .then(servCheck)
}

export function deleteCard(currentCardId, currentCardElement) {
  if (!currentCardId || !currentCardElement) return;
  return fetch(`${baseAddres}/cards/${currentCardId}`, {
    method: 'DELETE',
    headers: { authorization: authoKey }
  })
  .then(servCheck);
}


export function updateAvatar(uploadAvatar, profileImage, uploadInput) {
  return fetch(`${baseAddres}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authoKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: uploadInput.value })
  })
  .then(servCheck)
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
  .then(servCheck)
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
  .then(servCheck)
}

export const profileInfoFetch = () => {
  return fetch(`${baseAddres}/users/me`, {
    method: 'GET',
    headers: {
      authorization: authoKey
    }
  })
  .then(servCheck)
}

export const cardsGetFetch = () => {
  return fetch(`${baseAddres}/cards`, {
    method: 'GET',
    headers: {
      authorization: authoKey
    }
  })
  .then(servCheck)
}

export const currentUser = () => {
  return fetch(`${baseAddres}/users/me`, { headers: { authorization: authoKey } })
  .then(servCheck)
}