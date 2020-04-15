import {Popup} from './Popup.js';
export class PopupZoom extends Popup {
  open(event) {
    if (event.target.classList.contains("place-card__image") || event.target.classList.contains("user-info__photo")) {
      document.querySelector(".popup-zoom").classList.add("popup_is-opened");
      document
        .querySelector(".popup__image")
        .setAttribute(
          "src",
          `${event.target.style.backgroundImage.replace(
            /^[url("]+|[")]+/g,
            ""
          )}`
        );
    }
  }
}
