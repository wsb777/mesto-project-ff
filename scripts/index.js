// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener("click", createCards);
function createCard(object) {
    const template = document.querySelector('#card-template').content; 
    const list = document.querySelector('.places__list');
    const item = template.querySelector('.places__item').cloneNode(true);
    const image = item.querySelector('.card__image');
    const deleteButton = item.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard)
    const title = item.querySelector('.card__title');
    title.textContent = object.name;
    image.src = object.link;
    list.append(item);
}

function deleteCard(object) {
    const card = document.querySelector('.card');
    card.remove();
}

function createCards() {
    initialCards.forEach(function(item) {
        return createCard(item);
})};