import "./pages/index.css";
import { initialCards } from "./scripts/cards"
import { deleteCard, createCard, likeCard, template} from "./scripts/card.js";
import { openForm, closeForm} from "./scripts/modal";
import { isValid, enableValidation, clearValidation, validationConfig} from "./scripts/validation";
import { getUserData, getCards, editProfileData, addNewCardOnServer, deleteCardOnServer, deleteLike, likeCardOnServer, editAvatar} from "./scripts/api";

// массив карточек
export const list = document.querySelector('.places__list');
// окно редактирования профиля
export const windowEditProfile = document.querySelector('.popup_type_edit');

// окно добавления карточки
export const windowNewPlace = document.querySelector('.popup_type_new-card');

// окно аватара
export const windowAvatar = document.querySelector('.popup_type_avatar');
// все кнопки закрытия форм
export const formCloseButtons = document.querySelectorAll('.popup__close');
// формы
export const formNewCard = document.forms.new_place;
export const formEditProfile = document.forms.edit_profile;
export const formAvatar = document.forms.new_avatar;
// работа с аватаром
const formAvatarField = formAvatar.elements.link
const buttonUpdateAvatar = document.querySelector('.profile__image').addEventListener('click', () => {openForm(windowAvatar)});
const avatarEditWindow = document.querySelector('.popup_type_avatar');

function addNewAvatar(evt) {
    evt.preventDefault();
    const url = formAvatarField.value;
    editAvatar(url).then(() => {avatarEditWindow.querySelector('.popup__button').textContent = "Сохранение..."; avatar.style = "background-image: url(" + url + ");";}).catch(err => console.log(`Ошибка:${err}`)).finally(avatarEditWindow.querySelector('.popup__button').textContent = "Сохранить")
    closeForm(windowAvatar);
}
formAvatar.addEventListener('submit', addNewAvatar);
// кнопка открытия формы карточки
export const buttonAddCard = document.querySelector('.profile__add-button').addEventListener('click', ()=>{openForm(windowNewPlace)});
export const formNameCardField = formNewCard.elements.place_name;
export const linkField = formNewCard.elements.link;

// кнопки с для обрабатывания закрытия и открытия форм
const formNameField = formEditProfile.elements.name;
const formDescriptionField = formEditProfile.elements.description;
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
const avatar = document.querySelector('.profile__image')
function fillProfile(user) {
    profileTitleText.textContent = user.name;
    profileTitleDecription.textContent = user.about;
    
    avatar.style = "background-image: url(" + user.avatar + ");";
    ownerId = user._id;
}
// функция создания карточек когорты
function addCards(cardsList) {
    cardsList.forEach(function(card) {
        const newCard = createCard(card, deleteCard, likeCard, openImage, ownerId, deleteCardOnServer, likeCardOnServer, deleteLike);
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
    editProfileData(profileName, description).then(formEditProfileWindow.querySelector('.popup__button').textContent = "Сохранение...").catch(err => console.log(`Ошибка:${err}`)).finally(() => {formEditProfileWindow.querySelector('.popup__button').textContent = "Сохранить"; formNameField.value = '';formDescriptionField.value=""})
    closeForm(formEditProfileWindow);
}

// обработчик на кнопку формы профиля
formEditProfile.addEventListener('submit', handleFormEditSubmit); 

//фунция для submit формы карточки
const newCardForm = document.querySelector('.popup_type_new-card');
const buttonTextCardForm = newCardForm.querySelector('.popup__button').textContent;
function addNewCard(evt) {
    evt.preventDefault();
    const formData = {
        link: `${linkField.value}`,
        name: `${formNameCardField.value}`
    }
    const link = formData.link;
    const name = formData.name;
    addNewCardOnServer(name ,link).then((res) => {const newCard = createCard(res, deleteCard, likeCard, openImage, ownerId, deleteCardOnServer, likeCardOnServer, deleteLike); list.prepend(newCard); newCardForm.querySelector('.popup__button').textContent = "Сохранение..."}).finally(() => {newCardForm.querySelector('.popup__button').textContent = "Сохранить"; formNameCardField.value = '';linkField.value = '';})
    closeForm(newCardForm);
    return ;
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