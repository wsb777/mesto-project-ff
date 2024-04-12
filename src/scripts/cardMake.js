// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { initialCards } from "./cards";

const template = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');
document.querySelector('.profile__add-button').addEventListener('click', createCards);

export function createCard(object, deleteCard) { 
    const item = template.querySelector('.places__item').cloneNode(true);
    const image = item.querySelector('.card__image');
    const deleteButton = item.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    const title = item.querySelector('.card__title');
    title.textContent = object.name;
    image.src = object.link;
    image.alt = object.name;
    return item;
}

export function deleteCard(object) {
    object.target.closest('li.places__item').remove();
}

export function createCards() {
    initialCards.forEach(function(item) {
        list.append(createCard(item, deleteCard));
})};