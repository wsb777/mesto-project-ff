// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const template = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');
document.querySelector('.profile__add-button').addEventListener('click', createCards);

function createCard(object) { 
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

function deleteCard(object) {
    object.target.parentNode.remove();
}

function createCards() {
    initialCards.forEach(function(item) {
        list.append(createCard(item));
})};