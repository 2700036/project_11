class PopupEdit extends Popup {
  
  constructor(pickElem, popup, someApi, userInfo) {
    super(pickElem, popup);
    this.api = someApi;
    this.userInfo = userInfo;
    this.setUserInfo = userInfo.setUserInfo;
    this.updateUserInfo = userInfo.updateUserInfo;
    this.form = this.popup.querySelector(".popup__form");
    this.sendUserInfo = this.sendUserInfo.bind(this);
    this.form.addEventListener("submit", this.sendUserInfo);
  }
  open() {
    Popup.resetErrors();
    this.popup.classList.add("popup_is-opened");
    this.popup.querySelector(
      ".popup__input_user_name"
    ).value = this.userInfo.name;
    this.popup.querySelector(
      ".popup__input_user_about"
    ).value = this.userInfo.job;
    this.popup.querySelector(
      ".popup__input_user_ava"
    ).value = this.userInfo.ava;
    this.render(this.form, this.formButton);

  }

  sendUserInfo(event) {
    event.preventDefault();
    this.api
      .saveUserInfo(
        event.target.querySelector(".popup__input_user_name").value,
        event.target.querySelector(".popup__input_user_about").value
      )     
      .then(res => {
        console.log(res);
        this.api.saveUserPhoto(event.target.querySelector(".popup__input_user_ava").value)
        .then(data => { 
         this.setUserInfo(data);
        this.updateUserInfo();
        })
      })
        .then(() => {
        this.close(this.popup);
      })
      
      .catch(err => {
        console.log(err);
      });
  }
}
