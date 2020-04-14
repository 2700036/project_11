class Popup {
  constructor(pickElem, popup) {
    /* REVIEW по заданию 9. Исправлено. Я Вам рекомендовала в 8-м задании использовать self для сохранения контекста, но этот путь, хоть и лёгкий,
    но в данном случае не совсем правильный, потому что получается, что self - это не свойство класса, а глобальная переменная, свойство
    глобального объекта window, при том такое, что его не спрячешь ни в какие IIFE-функции - оно везде будет глобальным. Но, получилось
    сохранить контекст и стандартным путем, привязав close к контексту методом bind (смотрите ниже) и изменив кое-что в самом методе close -
    смотрите дальше. */
    //self = this; //REVIEW по заданию 9
    this.pickElem = pickElem;
    this.pickElem.addEventListener("click", this.open.bind(this));
    this.popup = popup;
    this.form = this.popup.querySelector(".popup__form");
    this.formButton = this.popup.querySelector(".button");
    this.close = this.close.bind(this); //REVIEW по заданию 9
    
  }

  open() {
    Popup.resetErrors();
    this.form.reset();
    this.popup.classList.add("popup_is-opened");

    this.render(this.form, this.formButton);
    
  }
  render(form, formButton) {
    if (!form.checkValidity()) {
      formButton.classList.remove("popup__button-active");
      formButton.setAttribute("disabled", true);
    } else {
      formButton.removeAttribute("disabled");
      formButton.classList.add("popup__button-active");
    }
  }
  
  /*  REVIEW по заданию 9. Можно лучше. Лучше, чтобы метод close не зависил от event, чтобы его можно было вызывать не только как слушателя клика,
   но и как просто функцию закрытия при сабмите форм. В идеале метод close должен иметь вид:
  
  Всё остальное должно быть вынесено в обёртку close, когда он используется как слушатель клика. И добавление его как слушателя надо делать не в
 Popup, а в index.js. */
 close (popup) {
  popup.classList.remove("popup_is-opened");
}  

  static resetErrors() {
    const errors = Array.from(document.querySelectorAll(".error-message"));
    errors.forEach(el => el.classList.add("error-message_hidden"));
  }
}

