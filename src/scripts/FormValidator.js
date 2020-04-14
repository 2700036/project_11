class FormValidator {
  constructor(form) {
    this.form = form;

    this.setEventListeners(this.form);
    this.checkInputValidity = this.checkInputValidity.bind(this);
  }
  setEventListeners(form) {    
    Array.from(form).forEach(el => {
      if (el.classList.contains("popup__input")) {
        el.addEventListener("input", this.checkInputValidity);
      }
    });
    form.addEventListener("input", this.setSubmitButtonState);
  }

  checkInputValidity(el) {
    const element = el.target;
    const errorElement = document.querySelector(`#error-${element.id}`);
    const errorMessage = {
      valueMissing: "Это обязательное поле",
      tooShort: "Должно быть от 2 до 30 символов",
      typeMismatch: "Здесь должна быть ссылка"
    };

    if (!element.checkValidity()) {
      reset();
      for (let elem in element.validity) {
        if (element.validity[elem]) {
          errorElement.textContent = errorMessage[elem];
          errorElement.classList.remove("error-message_hidden");
        }
      }
    } else {
      reset();
    }

    function reset() {
      errorElement.classList.add("error-message_hidden");
      errorElement.textContent = "-";
    }
  }

  setSubmitButtonState(el) {
    const form = el.target.parentNode;
    const button = form.querySelector(".button");

    if (!form.checkValidity()) {
      button.classList.remove("popup__button-active");
      button.setAttribute("disabled", true);
    } else {
      button.removeAttribute("disabled");
      button.classList.add("popup__button-active");
    }
  }
}
