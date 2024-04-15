// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

export const template = document.querySelector('#card-template').content;

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

//лайк карточки
export function likeCard(object) {
    if (object.target.classList.contains('card__like-button_is-active')) {
        object.target.classList.remove('card__like-button_is-active');
    }
    else {
        object.target.classList.add('card__like-button_is-active');
    }
}

