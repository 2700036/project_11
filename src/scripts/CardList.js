import {Card} from './Card.js';
export class CardList {
  constructor(container, someApi, newCard, userInfo) {
    this.container = container;
    this.api = someApi;
    this.card = newCard;
    this.user = userInfo;    
    this.render();
  }
  addCard(createdCard) {
    this.container.appendChild(createdCard);
  }
  render() {
    this.api
      .getInitialCards()
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => { 
        console.log('стоит фильтр карточек по количеству лайков не менее 5');
        res.forEach(el => {
          const usersLikes = [];          
          const usersIDs = []; 
          function notLiked (likes){            
            if(likes.length === 0){return 'Это место пока никому не понравилось...'} else {return `Нравится: ${likes.join(', ')}`}
          }               
          el.likes.forEach(e => {usersIDs.push(e._id); usersLikes.push(e.name)})

          if (usersLikes.length>4){
             // филтрация вывода карт по кол-ву лайков

          const card = this.card.createCard(el); 
          Card.likesNumbers(card, el);     
          if(usersIDs.includes(this.user.userId)){
            card.querySelector(".place-card__like-icon").classList.add("place-card__like-icon_liked");
          }
          if (el.owner._id === this.user.userId){            
            card.querySelector('.place-card__delete-icon').setAttribute('style', 'display: block');
          }
          card.setAttribute('data-id', `${el._id}`);
          card.setAttribute('data-likes', `${notLiked(usersLikes)}`);
          Card.showLikes(card);
          
          this.addCard(card);
        }

        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  
}
