import { initialCards } from "./cards";
import { createCard, createCards, list, template, deleteCard, likeCard} from "./card";

// окно редактирования профиля
export const WindowEditProfile = document.querySelector('.popup_type_edit');

// окно добавления карточки
export const WindowNewPlace = document.querySelector('.popup_type_new-card');

// все кнопки закрытия форм
export const formCloseButton = document.querySelectorAll('.popup__close');

// формы
const formNewCard = document.forms.new_place;
const formEditProfile = document.forms.edit_profile;

// кнопки с для обрабатывания закрытия и открытия форм
export const buttonEditProfile = document.querySelector('.profile__edit-button').addEventListener('click', ()=>{
    WindowEditProfile.classList.add('popup_is-opened');
    const formNameField = formEditProfile.elements.name;
    const formDescriptionField = formEditProfile.elements.description;
    formNameField.value = document.querySelector('.profile__title').textContent;
    formDescriptionField.value = document.querySelector('.profile__description').textContent;
});

// обработчик событий для кнопок закрытия
formCloseButton.forEach(function(elem) {
    elem.addEventListener("click", function() {
        elem.closest('div.popup').classList.remove('popup_is-opened');
    });
});

// обработчик кнопки Escape
document.addEventListener("keydown", (evt)=>{
    if (evt.key == 'Escape') {
        if (document.querySelector('.popup_is-opened') !== null) {
            document.querySelector('.popup_is-opened').classList.remove('popup_is-opened')
        };
    }
})

// обработчик на закрытие формы по клику на область вокруг
const popups = document.querySelectorAll('.popup');
popups.forEach(function(elem){
    elem.addEventListener("click", (evt)=>{
        if (document.querySelector('.popup_is-opened') !== null) {
            if (evt.target === evt.currentTarget) {
                document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
            };
        }
    })
})


function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const formNameField = formEditProfile.elements.name;
    const formDescriptionField = formEditProfile.elements.description;
    document.querySelector('.profile__title').textContent = formNameField.value;
    document.querySelector('.profile__description').textContent = formDescriptionField.value;
}

// обработчик на кнопку формы профиля
formEditProfile.addEventListener('submit', handleFormSubmit); 

// кнопка открытия формы карточки
export const buttonAddCard = document.querySelector('.profile__add-button').addEventListener('click', ()=>{WindowNewPlace.classList.add('popup_is-opened');});

//фунция для submit формы карточки
function addNewCard(evt) {
    evt.preventDefault();

    const formNameField = formNewCard.elements.place_name;
    const linkField = formNewCard.elements.link;
    initialCards.push({name: `${formNameField}`, link: `${linkField}`});
    const item = template.querySelector('.places__item').cloneNode(true);
    const image = item.querySelector('.card__image');
    const deleteButton = item.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    
    const title = item.querySelector('.card__title');
    title.textContent = formNameField.value;
    image.src = `${linkField.value}`;
    image.alt = `${formNameField.value}`;
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    formNameField.value = '';
    linkField.value = '';
    return list.prepend(item);
}

formNewCard.addEventListener('submit', addNewCard); 
// document.addEventListener("click", (evt)=>{
//     console.log(evt.target)
// })
