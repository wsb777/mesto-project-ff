// окно редактирования профиля
export const windowEditProfile = document.querySelector('.popup_type_edit');

// окно добавления карточки
export const windowNewPlace = document.querySelector('.popup_type_new-card');

// все кнопки закрытия форм
export const formCloseButton = document.querySelectorAll('.popup__close');

// формы
export const formNewCard = document.forms.new_place;
const formEditProfile = document.forms.edit_profile;
// функция открытия форм
export function formOpen(object) {
    object.classList.add('popup_is-opened');
    document.addEventListener("keydown", (evt)=>{
        if (evt.key == 'Escape') {
            if (document.querySelector('.popup_is-opened') !== null) {
                formClose(document.querySelector('.popup_is-opened'));
            };
        }
    })
}
// функция закрытия форм
export function formClose(object) {
    object.classList.remove('popup_is-opened');
    document.removeEventListener("keydown", (evt)=>{
        if (evt.key == 'Escape') {
            if (document.querySelector('.popup_is-opened') !== null) {
                formClose(document.querySelector('.popup_is-opened'));
            };
        }
    });
}

// кнопки с для обрабатывания закрытия и открытия форм
const formNameField = formEditProfile.elements.name;
const formDescriptionField = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
export const buttonEditProfile = document.querySelector('.profile__edit-button').addEventListener('click', ()=>{
    formOpen(windowEditProfile);
    formNameField.value = profileTitle.textContent;
    formDescriptionField.value = profileDescription.textContent;
});

// обработчик событий для кнопок закрытия
formCloseButton.forEach(function(elem) {
    elem.addEventListener("click", function() {
        formClose(elem.closest('div.popup'));
    });
});


// обработчик на закрытие формы по клику на область вокруг
const popups = document.querySelectorAll('.popup');
popups.forEach(function(elem){
    elem.addEventListener("click", (evt)=>{
        if (document.querySelector('.popup_is-opened') !== null) {
            // обработчик кнопки Escape
            if (evt.target === evt.currentTarget) {
                formClose(document.querySelector('.popup_is-opened'));
            };
        }
    })
})

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    document.querySelector('.profile__title').textContent = formNameField.value;
    document.querySelector('.profile__description').textContent = formDescriptionField.value;
}

// обработчик на кнопку формы профиля
formEditProfile.addEventListener('submit', handleFormSubmit); 

// кнопка открытия формы карточки
export const buttonAddCard = document.querySelector('.profile__add-button').addEventListener('click', ()=>{formOpen(windowNewPlace)});
export const formNameCardField = formNewCard.elements.place_name;
export const linkField = formNewCard.elements.link;


// document.addEventListener("click", (evt)=>{
//     console.log(evt.target)
// })

