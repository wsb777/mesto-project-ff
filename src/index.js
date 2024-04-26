import "./pages/index.css";
import { initialCards } from "./scripts/cards"
import { deleteCard, createCard, likeCard, template} from "./scripts/card.js";
import { openForm, closeForm} from "./scripts/modal";
import { isValid, enableValidation, clearValidation, validationConfig} from "./scripts/validation";
import { getUserData, getCards, editProfileData, addNewCardOnServer, deleteCardOnServer} from "./scripts/api";


// массив карточек
export const list = document.querySelector('.places__list');
// окно редактирования профиля
export const windowEditProfile = document.querySelector('.popup_type_edit');

// окно добавления карточки
export const windowNewPlace = document.querySelector('.popup_type_new-card');
// все кнопки закрытия форм
export const formCloseButtons = document.querySelectorAll('.popup__close');
// формы
export const formNewCard = document.forms.new_place;
export const formEditProfile = document.forms.edit_profile;
// кнопка открытия формы карточки
export const buttonAddCard = document.querySelector('.profile__add-button').addEventListener('click', ()=>{openForm(windowNewPlace)});
export const formNameCardField = formNewCard.elements.place_name;
// formNameCardField.addEventListener('input', () => isValid(formNameCardField));
export const linkField = formNewCard.elements.link;
// linkField.addEventListener('input', () => isValid(linkField));

// кнопки с для обрабатывания закрытия и открытия форм
const formNameField = formEditProfile.elements.name;
// formNameField.addEventListener('input', () => isValid(formNameField));
const formDescriptionField = formEditProfile.elements.description;
// formDescriptionField.addEventListener('input', () => isValid(formDescriptionField));
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// обработчик на кнопку профиля
export const buttonEditProfile = document.querySelector('.profile__edit-button').addEventListener('click', ()=>{
    openForm(windowEditProfile);
    formNameField.value = profileTitle.textContent;
    formDescriptionField.value = profileDescription.textContent;
});

// обработчик событий для кнопок закрытия
formCloseButtons.forEach(function(elem) {
    elem.addEventListener("click", function() {
        closeForm(elem.closest('div.popup'));
    });
});

// перебор массива карточек
// function createCards() {
//     initialCards.forEach(function(item) {
//         list.append(createCard(item, deleteCard, likeCard,openImage));
// })};
// createCards();

//открытик картинки
const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector(".popup__image");
const text = document.querySelector(".popup__caption");
function openImage(object) {
    openForm(imagePopup);
    const link = object.target.getAttribute("src");
    const alt = object.target.getAttribute("alt");
    image.src = link;
    image.alt = alt;
    text.textContent = alt;
}

//фунция для submit формы редактирования профиля
const profileTitleText = document.querySelector('.profile__title');
const profileTitleDecription = document.querySelector('.profile__description');
// функция заполнения данных пользователя
let ownerId
function fillProfile(user) {
    profileTitleText.textContent = user.name;
    profileTitleDecription.textContent = user.about;
    ownerId = user._id;
}
// функция создания карточек когорты
function addCards(cardsList) {
    cardsList.forEach(function(card) {
        const newCard = createCard(card, deleteCard, likeCard, openImage, ownerId, deleteCardOnServer);
        return list.prepend(newCard);
    });
}
// функция изменения данных пользователя
const formEditProfileWindow = document.querySelector('.popup_type_edit')
function handleFormEditSubmit(evt) {
    evt.preventDefault(); 

    const profileName = formNameField.value;
    const description = formDescriptionField.value;
    profileTitleText.textContent = formNameField.value;
    profileTitleDecription.textContent = formDescriptionField.value;
    editProfileData(profileName, description);
    closeForm(formEditProfileWindow);
}

// обработчик на кнопку формы профиля
formEditProfile.addEventListener('submit', handleFormEditSubmit); 

//фунция для submit формы карточки
const newCardForm = document.querySelector('.popup_type_new-card');
function addNewCard(evt) {
    evt.preventDefault();

    const formData = {
        link: `${linkField.value}`,
        name: `${formNameCardField.value}`
    }
    const link = formData.link;
    const name = formData.name;
    addNewCardOnServer(name ,link)
    const newCard = createCard(formData, deleteCard, likeCard, openImage, ownerId, deleteCardOnServer);
    formNameCardField.value = '';
    linkField.value = '';
    closeForm(newCardForm);
    return list.prepend(newCard);
}

formNewCard.addEventListener('submit', addNewCard);







// включение валидации
enableValidation(validationConfig);
// прогрузка данных
Promise.all([getUserData(), getCards()])
    .then(([myProfile, list]) => {
        fillProfile(myProfile);
        addCards(list);
    })