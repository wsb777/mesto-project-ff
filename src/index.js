import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { deleteCard, createCard, likeCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation";
import {
  getUserData,
  getCards,
  editProfileData,
  addNewCardOnServer,
  deleteCardOnServer,
  deleteLike,
  likeCardOnServer,
  editAvatar,
} from "./scripts/api";

// массив карточек
const list = document.querySelector(".places__list");

// все попупы
const popups = document.querySelectorAll(".popup");

// все кнопки закрытия форм
const closeButtons = document.querySelectorAll(".popup__close");

// элементы формы картчоки и карточек
const formNewCard = document.forms.new_place;
const newCardForm = document.querySelector(".popup_type_new-card");
const submitCardForm = newCardForm.querySelector(".popup__button");
const formNameCardField = formNewCard.elements.place_name;
const linkField = formNewCard.elements.link;

// работа с аватаром
const formAvatar = document.forms.new_avatar;
const formAvatarField = formAvatar.elements.link;
const windowAvatar = document.querySelector(".popup_type_avatar");
const submitAvatarForm = windowAvatar.querySelector(".popup__button");
const avatar = document.querySelector(".profile__image");

//элементы формы профиля
const formEditProfile = document.forms.edit_profile;
const formNameField = formEditProfile.elements.name;
const formDescriptionField = formEditProfile.elements.description;
const windowEditProfile = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const submitEditForm = windowEditProfile.querySelector(".popup__button");
const profileDescription = document.querySelector(".profile__description");

// элементы модального окна изображения
const imagePopup = document.querySelector(".popup_type_image");
const image = document.querySelector(".popup__image");
const text = document.querySelector(".popup__caption");

const buttonTextCardForm =
  newCardForm.querySelector(".popup__button").textContent;
const buttonUpdateAvatar = document
  .querySelector(".profile__image")
  .addEventListener("click", () => {
    openModal(windowAvatar);
  });

function addNewAvatar(evt) {
  evt.preventDefault();
  const url = formAvatarField.value;
  submitAvatarForm.textContent = "Сохранение...";
  editAvatar(url)
    .then(() => {
      avatar.style = "background-image: url(" + url + ");";
      closeModal(windowAvatar);
    })
    .catch((err) => console.log(`Ошибка:${err}`))
    .finally(() => (submitAvatarForm.textContent = "Сохранить"));
}
formAvatar.addEventListener("submit", addNewAvatar);
// кнопка открытия формы карточки
const buttonAddCard = document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => {
    openModal(newCardForm);
  });

// обработчик на кнопку профиля
const buttonEditProfile = document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openModal(windowEditProfile);
    formNameField.value = profileTitle.textContent;
    formDescriptionField.value = profileDescription.textContent;
  });

// обработчик событий для кнопок закрытия
closeButtons.forEach(function (elem) {
  elem.addEventListener("click", function () {
    closeModal(elem.closest("div.popup"));
  });
});

//открытик картинки
function openImage(object) {
  openModal(imagePopup);
  const link = object.target.getAttribute("src");
  const alt = object.target.getAttribute("alt");
  image.src = link;
  image.alt = alt;
  text.textContent = alt;
}
// обработчик на закрытие формы по клику на область вокруг
popups.forEach(function (elem) {
  elem.addEventListener("click", (evt) => {
    if (evt.target === elem) {
      closeModal(elem);
    }
  });
});

// функция заполнения данных пользователя
let ownerId;
function fillProfile(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;

  avatar.style = "background-image: url(" + user.avatar + ");";
  ownerId = user._id;
}
// функция создания карточек когорты
function addCards(cardsList) {
  cardsList.forEach(function (card) {
    const newCard = createCard(
      card,
      deleteCard,
      likeCard,
      openImage,
      ownerId,
      deleteCardOnServer,
      likeCardOnServer,
      deleteLike
    );
    return list.prepend(newCard);
  });
}
// функция изменения данных пользователя
function handleFormEditSubmit(evt) {
  evt.preventDefault();

  const profileName = formNameField.value;
  const description = formDescriptionField.value;
  submitEditForm.textContent = "Сохранение...";
  editProfileData(profileName, description)
    .then(() => {
      profileTitle.textContent = formNameField.value;
      profileDescription.textContent = formDescriptionField.value;
      closeModal(windowEditProfile);
    })
    .catch((err) => console.log(`Ошибка:${err}`))
    .finally(() => {
      submitEditForm.textContent = "Сохранить";
    });
}

// обработчик на кнопку формы профиля
formEditProfile.addEventListener("submit", handleFormEditSubmit);

//фунция для submit формы карточки
function addNewCard(evt) {
  evt.preventDefault();
  const formData = {
    link: `${linkField.value}`,
    name: `${formNameCardField.value}`,
  };
  const link = formData.link;
  const name = formData.name;
  submitCardForm.textContent = "Сохранение...";
  addNewCardOnServer(name, link)
    .then((res) => {
      const newCard = createCard(
        res,
        deleteCard,
        likeCard,
        openImage,
        ownerId,
        deleteCardOnServer,
        likeCardOnServer,
        deleteLike
      );
      list.prepend(newCard);
      closeModal(newCardForm);
      formNameCardField.value = "";
      linkField.value = "";
    })
    .catch((err) => console.log(`Ошибка:${err}`))
    .finally(() => {
      submitCardForm.textContent = "Сохранить";
    });
  return;
}

formNewCard.addEventListener("submit", addNewCard);

//включение валидации
enableValidation(validationConfig);

// прогрузка данных
Promise.all([getUserData(), getCards()])
  .then(([myProfile, list]) => {
    fillProfile(myProfile);
    addCards(list);
  })
  .catch((err) => console.log(`Ошибка:${err}`));
// прошу прощения за отсутвие prettier в прошлых итерациях
