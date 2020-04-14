class Card {
  constructor (api){
    this.api = api;
  }

  createCard(cardData) {
    const cardName = cardData.name;
    const cardLink = cardData.link;
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.insertAdjacentHTML(
      "beforeend",
      `
          <div class="place-card__image">
              <button class="place-card__delete-icon" style="display: none;"></button>
          </div>
          <div class="place-card__description">
              <h3 class="place-card__name"></h3>
              <div style="display: flex;flex-direction: column;justify-content: space-around;align-items: center;height: 45px; position: relative">
              <button class="place-card__like-icon"></button>

              <div class="like-bubble">  
    <p class="like-bubble-likes"></p>  
</div>

              <p class="place-card__like-q">0</p>
              </div>
          </div>`
    );
    placeCard.querySelector(".place-card__name").textContent = cardName;
    placeCard.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${cardLink})`;



    
    return placeCard;
  }
  like(event) {
    
    event.target.classList.toggle("place-card__like-icon_liked");
  }
  remove(event) {
    event.target.parentElement.parentElement.parentElement.removeChild(event.target.closest(".place-card")); 

  }

  static showLikes (card){
    
    card.querySelector('.like-bubble-likes').textContent = card.getAttribute('data-likes');

  }

  static likesNumbers (fCard, fObjLikesLength){
    fCard.querySelector('.place-card__like-q').textContent = fObjLikesLength.likes.length;
  }
}
