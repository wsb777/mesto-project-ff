import "./pages/index.css";
import { initialCards } from "./scripts/cards"
import { deleteCard, createCard, likeCard, template} from "./scripts/card.js";
import { openForm, closeForm} from "./scripts/modal";

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
export const linkField = formNewCard.elements.link;

// кнопки с для обрабатывания закрытия и открытия форм
const formNameField = formEditProfile.elements.name;
const formDescriptionField = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
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
function createCards() {
    initialCards.forEach(function(item) {
        list.append(createCard(item, deleteCard, likeCard,openImage));
})};
createCards();

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

const formEditProfileWindow = document.querySelector('.popup_type_edit')
function handleFormEditSubmit(evt) {
    evt.preventDefault(); 

    profileTitleText.textContent = formNameField.value;
    profileTitleDecription.textContent = formDescriptionField.value;
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
    const newCard = createCard(formData, deleteCard, likeCard, openImage);
    formNameCardField.value = '';
    linkField.value = '';
    closeForm(newCardForm);
    return list.prepend(newCard);
}


formNewCard.addEventListener('submit', addNewCard); 