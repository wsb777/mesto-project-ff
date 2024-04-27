export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
};

export function enableValidation (validationConfig) {
  const formtList = document.querySelectorAll(validationConfig.formSelector);
  formtList.forEach((form) => {
    const inputList = form.querySelectorAll(validationConfig.inputSelector);
      inputList.forEach((input) => {
        input.addEventListener('input', () => isValid(input))
      })
  })
};

export function clearValidation (validationConfig) {
  const formtList = document.querySelectorAll(validationConfig.formSelector);
  formtList.forEach((form) => {
    const inputList = form.querySelectorAll(validationConfig.inputSelector);
      inputList.forEach((input) => {
        input.removeEventListener('input', () => isValid(input))
      })
  })
};

const showInputError = (element, errorMessage) => {
    element.classList.add('form__input_type_error');
    const label = element.closest('label.form__field');
    const inputError = label.querySelector('.form__input-error');
    inputError.textContent = errorMessage;
};

const hideInputError = (element) => {
    element.classList.remove('form__input_type_error');
    const label = element.closest('label.form__field');
    const inputError = label.querySelector('.form__input-error');
    inputError.textContent = "";
};

export const isValid = (myField) => {
  if (myField.validity.patternMismatch) {
    myField.setCustomValidity(myField.dataset.error);
  }
  else {
    myField.setCustomValidity("");
  }

  if (!myField.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(myField, myField.validationMessage);
    const myForm = myField.closest('form.popup__form');
    const buttonForm = myForm.querySelector('.popup__button');
    buttonForm.disabled = true;
  } else {
    // Если проходит, скроем
    hideInputError(myField);
    const myForm = myField.closest('form.popup__form');
    const allErrors = myForm.querySelector('.form__input_type_error')
    if (allErrors === null){
      const buttonForm = myForm.querySelector('.popup__button');
      buttonForm.disabled = false;
    }
  }
};
