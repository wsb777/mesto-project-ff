export const validationConfig = {
  formSelector: "form.popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorSelector: ".form__input-error",
  labelClass: "label.form__field",
  inputErrorActiveClass: "form__input-error_active",
  sumbitFormInactive: "form__submit_inactive",
};

const isValid = (inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(inputElement, validationConfig);
  }
};

const showInputError = (inputElement, errorMessage, validationConfig) => {
  const label = inputElement.closest(validationConfig.labelClass);
  const errorElement = label.querySelector(validationConfig.errorSelector);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorActiveClass);
};

const hideInputError = (inputElement, validationConfig) => {
  const label = inputElement.closest(validationConfig.labelClass);
  const errorElement = label.querySelector(validationConfig.errorSelector);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.inputErrorActiveClass);
  errorElement.textContent = "";
};
export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.sumbitFormInactive);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.sumbitFormInactive);
  }
};
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
// я так особо и не понял, думал эта функция очищает валидацию, чтобы можно было отправить что угодно(но по заданию она делает кнопку неактивной)
// только что я сделал этот блок по теории яндекса, но не возможно убрать ошибки после вызова функции enableValidation потому что он вешает обработчик, который сработывает при нажатии,
// то есть как бы я не хотел, а обработчик всегда будет отрабатывать последним, то есть либо его убирать, либо никак
export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) =>
    hideInputError(inputElement, validationConfig)
  );
  toggleButtonState(inputList, buttonElement);
  }