export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  inputElement.classList.add(config.inputErrorClass);
  inputElement.setAttribute('data-error', errorMessage);
};

const hideInputError = (formElement, inputElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  inputElement.removeAttribute('data-error');
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, "Разрешены только буквы, дефисы и пробелы", config);
  } else if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);
};

export function clearValidation(popup, config) {
  const formElement = popup.querySelector(config.formSelector);
  if (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
    });

    toggleButtonState(inputList, buttonElement);
  }
}
