// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

export const template = document.querySelector('#card-template').content;

export function createCard(object, deleteCard, likeCard, openImage, ownerId, deleteCardOnServer, likeCardOnServer, deleteLike) { 
    const item = template.querySelector('.places__item').cloneNode(true);
    const image = item.querySelector('.card__image');
    image.addEventListener('click', openImage)
    const deleteButton = item.querySelector('.card__delete-button');
    if (ownerId !== object.owner._id) {
        deleteButton.remove();
    }
    if (object._id !== null) {

    }
    const likeButton = item.querySelector('.card__like-button');
    const myLikes = object.likes.some((like) => like._id === ownerId);
    if (myLikes) {
        likeButton.classList.add("card__like-button_is-active")
    }
    const id = object._id;
    deleteButton.addEventListener('click', () => deleteCard(id, deleteCardOnServer));
    const title = item.querySelector('.card__title');
    const likeScore = item.querySelector('.like_count');
    likeScore.textContent = object.likes.length;
    likeButton.addEventListener('click', () => likeCard(id, likeCardOnServer, deleteLike));
    title.textContent = object.name;
    image.src = object.link;
    image.alt = object.name;
    item.id = object._id;
    return item;
}

//удаление карточки
export function deleteCard(id, deleteCardOnServer) {
    deleteCardOnServer(id).then(document.getElementById(`${id}`).remove()).catch(err => console.log(`Ошибка:${err}`));
}

//лайк карточки
export function likeCard(id, likeCardOnServer, deleteLike) {
    const card = document.getElementById(`${id}`);
    const likeButton = card.querySelector('.card__like-button');
    const likeScoreUpdate = card.querySelector(".like_count")
    if (likeButton.classList.contains('card__like-button_is-active')) {
        deleteLike(id).then((res) => {likeScoreUpdate.textContent = res.likes.length; likeButton.classList.remove('card__like-button_is-active')}).catch(err => console.log(`Ошибка:${err}`));
    }
    else {
        likeCardOnServer(id).then((res) => {likeScoreUpdate.textContent = res.likes.length;likeButton.classList.add('card__like-button_is-active')}).catch(err => console.log(`Ошибка:${err}`))
    }
}

