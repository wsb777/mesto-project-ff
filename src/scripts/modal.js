function closeByEsc(evt) {
    if (evt.key == 'Escape') {
        if (document.querySelector('.popup_is-opened') !== null) {
            closeForm(document.querySelector('.popup_is-opened'));
        };
    }
};
// функция открытия форм
export function openForm(object) {
    object.classList.add('popup_is-opened');
    document.addEventListener("keydown", closeByEsc)
}
// функция закрытия форм
export function closeForm(object) {
    object.classList.remove('popup_is-opened');
    document.removeEventListener("keydown", closeByEsc);
}


// обработчик на закрытие формы по клику на область вокруг
const popups = document.querySelectorAll('.popup');
popups.forEach(function(elem){
    elem.addEventListener("click", (evt)=>{
        if (document.querySelector('.popup_is-opened') !== null) {
            // обработчик кнопки Escape
            if (evt.target === evt.currentTarget) {
                closeForm(document.querySelector('.popup_is-opened'));
            };
        }
    })
})
