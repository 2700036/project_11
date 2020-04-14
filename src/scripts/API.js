class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.getInitialCards = this.getInitialCards.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);
    this.addNewPlace = this.addNewPlace.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.putLike = this.putLike.bind(this);
    this.saveUserPhoto = this.saveUserPhoto.bind(this);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}cards`, {
      method: "GET",
      headers: this.headers
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      method: "GET",
      headers: this.headers
    });
  }

  saveUserInfo(name, about) {
    return fetch(`${this.baseUrl}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }) 
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewPlace(cardObj){
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardObj.name,
        link: cardObj.link
    })    
    })
    .then(res => {
      if (res.ok) {          
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCard (cardID){
    return fetch(`${this.baseUrl}cards/${cardID}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  putLike (cardID){
    return fetch(`${this.baseUrl}cards/like/${cardID}`, {
    method: "PUT",
    headers: this.headers         
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteLike (cardID){
    return fetch(`${this.baseUrl}cards/like/${cardID}`, {
    method: "DELETE",
    headers: this.headers         
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  
  saveUserPhoto (url){
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "0f96e3cb-2b6c-4da4-8233-9011a7d4981c",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: url
      })    
      })
      .then(res => {
        if (res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

}



