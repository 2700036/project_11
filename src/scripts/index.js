import '../pages/index.css'

(function() {
  const placesList = document.querySelector(".places-list");
  const root = document.querySelector(".root");

  const addFormButton = document.querySelector(".user-info__button");
  const editInfoButton = document.querySelector(".user-info__edit-button");
  const popupPlaceAdd = document.querySelector(".popup-place-add");
  const popupEdit = document.querySelector(".popup-edit");
  const popupZoom = document.querySelector(".popup-zoom");

  const newPlaceForm = document.querySelector(".popup__form-place");
  const editForm = document.querySelector(".popup__form-edit");

  const api = new Api({
    baseUrl: "https://praktikum.tk/cohort9/",
    headers: {
      authorization: "0f96e3cb-2b6c-4da4-8233-9011a7d4981c",
      "Content-Type": "application/json"
    }
  });
  const userInfo = new UserInfo();
  const card = new Card(api);
  const cardList = new CardList(placesList, api, card, userInfo);

  const popupEditObj = new PopupEdit(
    editInfoButton,
    popupEdit,
    api,
    //REVIEW2. Надо передавать в качестве аргумента просто экземпляр userInfo и в PopupEdit вызывать с ним и setUserInfo и updateUserInfo. --- OK
    userInfo
  );
  const popupAddObj = new PopupNewPlace(
    addFormButton,
    popupPlaceAdd,
    cardList,
    card,
    api
  );
  const popupZoomObj = new PopupZoom(root, popupZoom);

  const editFormvalidator = new FormValidator(editForm);
  const NewPlaceFormvalidator = new FormValidator(newPlaceForm);

  function usersLikeRender(event, res) {
    const card = event.target.closest(".place-card");
    Card.likesNumbers(card, res);
    const usersLikes = [];
    function notLiked(likes) {
      if (likes.length === 0) {
        return "Это место пока никому не понравилось...";
      } else {
        return `Нравится: ${likes.join(", ")}`;
      }
    }
    res.likes.forEach(e => usersLikes.push(e.name));
    card.setAttribute("data-likes", `${notLiked(usersLikes)}`);
    Card.showLikes(card);
  }

  function close() {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close")
    ) {
      event.target.closest(".popup").classList.remove("popup_is-opened");
    }
  }

  api
    .getUserInfo()
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      userInfo.setUserInfo(res);
      userInfo.updateUserInfo();
    })
    .catch(err => {
      console.log(err);
    });

  function usersLikeRender(event, res) {
    const card = event.target.closest(".place-card");
    Card.likesNumbers(card, res);
    const usersLikes = [];
    function notLiked(likes) {
      if (likes.length === 0) {
        return "Это место пока никому не понравилось...";
      } else {
        return `Нравится: ${likes.join(", ")}`;
      }
    }
    res.likes.forEach(e => usersLikes.push(e.name));
    card.setAttribute("data-likes", `${notLiked(usersLikes)}`);
    Card.showLikes(card);
  }

  setLikeDeleteListener(placesList, api, usersLikeRender, card);

  placesList.addEventListener("mouseover", function(event) {
    if (event.target.classList.contains("place-card__like-icon")) {
      event.target.nextElementSibling.classList.add("like-bubble-shown");
    } else {
      const hideAll = Array.from(document.querySelectorAll(".like-bubble"));
      hideAll.forEach(el => el.classList.remove("like-bubble-shown"));
    }
  });

  function setLikeDeleteListener(placesList, api, usersLikeRender, card) {
    placesList.addEventListener("click", event => {
      if (event.target.classList.contains("place-card__like-icon")) {
        if (!event.target.classList.contains("place-card__like-icon_liked")) {
          api
            .putLike(event.target.closest(".place-card").getAttribute("data-id"))
            .then(res => {
              usersLikeRender(event, res);
            })
            .catch(err => {
              console.log(err);
            });
          card.like(event);
        }
        else {
          api
            .deleteLike(event.target.closest(".place-card").getAttribute("data-id"))
            .then(res => {
              usersLikeRender(event, res);
            })
            .catch(err => {
              console.log(err);
            });
          card.like(event);
        }
      }
      if (event.target.classList.contains("place-card__delete-icon")) {
        api
          .deleteCard(event.target.closest(".place-card").getAttribute("data-id"))
          .then(_res => {
            card.remove(event);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      document
        .querySelector(".popup_is-opened")
        .classList.remove("popup_is-opened");
    }
  });
  window.addEventListener("click", close);
})();


