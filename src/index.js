import "./pages/index.css";
import { initialCards } from "./scripts/cards"
import { deleteCard, createCard, likeCard, template} from "./scripts/card.js";
import { buttonEditProfile, buttonAddCard, formOpen, formNameCardField, linkField, formNewCard, formClose} from "./scripts/modal";

export const list = document.querySelector('.places__list');

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
    formOpen(imagePopup);
    const link = object.target.getAttribute("src");
    const alt = object.target.getAttribute("alt");
    image.src = link;
    image.alt = alt;
    text.textContent = alt;
    
}

//фунция для submit формы карточки
function addNewCard(evt) {
    evt.preventDefault();

    const item = template.querySelector('.places__item').cloneNode(true);
    const image = item.querySelector('.card__image');
    const deleteButton = item.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    const likeButton = item.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);
    const title = item.querySelector('.card__title');
    title.textContent = formNameCardField.value;
    image.src = `${linkField.value}`;
    image.alt = `${formNameCardField.value}`;
    formClose(document.querySelector('.popup_is-opened'));
    formNameCardField.value = '';
    linkField.value = '';
    return list.prepend(item);
}

formNewCard.addEventListener('submit', addNewCard); 