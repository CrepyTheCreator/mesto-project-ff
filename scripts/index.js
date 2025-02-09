// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const addCardButton = container.querySelector('.profile__add-button');
const editProfileButton = container.querySelector('.profile__edit-button');
const popupCardAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const cardContainer = container.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');

function createCard(titleCard, imageLink) { //функция добавления карточек
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = titleCard;
  cardElement.querySelector('.card__image').setAttribute('src', imageLink);
  cardElement.querySelector('.card__image').setAttribute('alt', titleCard);

  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt){
    evt.target.classList.toggle('card__like-button_is-active')
  })

  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard)

  cardElement.querySelector('.card__image').addEventListener('click', function () {
    popupImage.querySelector('.popup__caption').textContent = titleCard;
    popupImage.querySelector('.popup__image').setAttribute('src', imageLink);
    popupImage.classList.add('popup_is-opened');
  })
  return cardElement;
}

function removeCard(event) {
  const card = event.target.closest('.card');
  if (card) {
    card.remove();
  }
}

popupImage.querySelector('.popup__close').addEventListener('click', function () {
  popupImage.classList.remove('popup_is-opened');
})

for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link);
  cardContainer.append(newCard);
}

addCardButton.addEventListener('click', function () {
  popupCardAdd.classList.add('popup_is-opened');
})

popupCardAdd.querySelector('.popup__close').addEventListener('click', function () {
  popupCardAdd.classList.remove('popup_is-opened');
})

popupCardAdd.querySelector('.popup__button').addEventListener('click', function () { //кнопка добавления карточек
  const titleCard = popupCardAdd.querySelector('.popup__input_type_card-name');
  const imageLink = popupCardAdd.querySelector('.popup__input_type_url');

  const newCard = createCard(titleCard.value, imageLink.value);
  
  cardContainer.append(newCard);
  titleCard.value = '';
  imageLink.value = '';

  popupCardAdd.classList.remove('popup_is-opened');
})

// ------------ edit профиль

editProfileButton.addEventListener('click', function () {
  document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
})

popupEdit.querySelector('.popup__close').addEventListener('click', function () {
  popupEdit.classList.remove('popup_is-opened');
})

function editProfile(titleProfile, aboutProfile) { //функция добавления карточек

  container.querySelector('.profile__title').textContent = titleProfile;
  container.querySelector('.profile__description').textContent = aboutProfile;
}

popupEdit.querySelector('.popup__button').addEventListener('click', function () {
  event.preventDefault();
  
  const titleProfile = popupEdit.querySelector('.popup__input_type_name');
  const aboutProfile = popupEdit.querySelector('.popup__input_type_description');

  editProfile(titleProfile.value, aboutProfile.value);

  titleProfile.value = '';
  aboutProfile.value = '';

  popupEdit.classList.remove('popup_is-opened');
})

