export class UserInfo {
  constructor() {
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.name = "";
    this.job = "";
    this.userId = "";
    this.ava = "";
  }
  setUserInfo(response) {
    
    this.name = response.name;
    this.job = response.about;
    this.userId = response._id;
    this.ava = response.avatar;
  }

   updateUserInfo() {        
        document.querySelector(".user-info__name").textContent = this.name;
        document.querySelector(".user-info__job").textContent = this.job;
        document.querySelector(".user-info__photo").setAttribute('style', `background-image: url(${this.ava})`)
      }

  }

