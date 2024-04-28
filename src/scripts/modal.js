function closeByEsc(evt) {
  if (evt.key == "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal !== null) {
      closeModal(openedModal);
    }
  }
}
// функция открытия форм
export function openModal(object) {
  object.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
}
// функция закрытия форм
export function closeModal(object) {
  object.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}
