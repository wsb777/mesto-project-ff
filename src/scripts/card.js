// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { deleteCardOnServer } from ".."

export const template = document.querySelector('#card-template').content;

export function createCard(object, deleteCard, likeCard, openImage, ownerId, deleteCardOnServer, likeCardOnServer, deleteLike) { 
    const item = template.querySelector('.places__item').cloneNode(true);
    const image = item.querySelector('.card__image');
    image.addEventListener('click', openImage)
    const deleteButton = item.querySelector('.card__delete-button');
    if (ownerId !== object.owner._id) {
        deleteButton.remove();
    }
    deleteButton.addEventListener('click', () => deleteCard(object._id, deleteCardOnServer));
    const title = item.querySelector('.card__title');
    const likeButton = item.querySelector('.card__like-button');
    const likeScore = item.querySelector('.like_count');
    likeScore.textContent = object.likes.length;
    likeButton.addEventListener('click', () => likeCard(object._id, likeCardOnServer, deleteLike));
    title.textContent = object.name;
    image.src = object.link;
    image.alt = object.name;
    item.id = object._id;
    return item;
}

//удаление карточки
export function deleteCard(id, deleteCardOnServer) {
    document.getElementById(`${id}`).remove();
    deleteCardOnServer(id);
}

//лайк карточки
export function likeCard(id, likeCardOnServer, deleteLike) {
    const card = document.getElementById(`${id}`);
    const likeButton = card.querySelector('.card__like-button')
    if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
        deleteLike(id);
    }
    else {
        likeButton.classList.add('card__like-button_is-active');
        likeCardOnServer(id);
    }
}

