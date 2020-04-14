class PopupNewPlace extends Popup {
  constructor(pickElem, popup, list, objCard, someApi) {
    super(pickElem, popup);
    this.list = list;
    this.card = objCard;
    this.addNewPlace = someApi.addNewPlace;
    this.form.addEventListener("submit", this.newPlaceCreator.bind(this));
  }
  newPlaceCreator(event) {
    event.preventDefault();
    let newCard = {
      name: document.querySelector(".popup__input_type_name").value,
      link: document.querySelector(".popup__input_type_link-url").value
    };
    this.addNewPlace(newCard)
      .then(res => {
        const card = this.card.createCard(res);
        card
          .querySelector(".place-card__delete-icon")
          .setAttribute("style", "display: block");
        card.setAttribute("data-id", `${res._id}`);
        card.setAttribute(
          "data-likes",
          "Это место пока никому не понравилось..."
        );
        Card.showLikes(card);
        this.list.addCard(card);
        this.form.reset();
        this.popup.classList.remove("popup_is-opened");
        this.formButton.setAttribute("disabled", true);
        this.formButton.classList.remove("popup__button-active");
      })
      .catch(err => {
        console.log(err);
      });
  }
}
