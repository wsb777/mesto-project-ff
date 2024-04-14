// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { initialCards } from "./cards";

export const template = document.querySelector('#card-template').content;
export const list = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
// document.querySelector('.profile__add-button').addEventListener('click', createCards);

export function createCard(object, deleteCard, likeCard, openImage) { 
    const item = template.querySelector('.places__item').cloneNode(true);
    const image = item.querySelector('.card__image');
    image.addEventListener('click', openImage)
    const deleteButton = item.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    const title = item.querySelector('.card__title');
    const likeButton = item.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);
    title.textContent = object.name;
    image.src = object.link;
    image.alt = object.name;
    return item;
}

//удаление карточки
export function deleteCard(object) {
    object.target.closest('li.places__item').remove();
}
// перебор массива карточек
export function createCards() {
    initialCards.forEach(function(item) {
        list.append(createCard(item, deleteCard, likeCard,openImage));
})};

//лайк карточки
export function likeCard(object) {
    if (object.target.classList.contains('card__like-button_is-active')) {
        object.target.classList.remove('card__like-button_is-active');
    }
    else {
        object.target.classList.add('card__like-button_is-active');
    }
}

//открытик картинки
export function openImage(object) {
    imagePopup.classList.add('popup_is-opened');
    const image = document.querySelector(".popup__image");
    const text = document.querySelector(".popup__caption");
    const link = object.target.getAttribute("src");
    const alt = object.target.getAttribute("alt");
    image.src = link;
    image.alt = alt;
    text.textContent = alt;
}
